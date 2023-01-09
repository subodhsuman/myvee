<template>
  <div>
    <div class="chart-main-box" ref="main" id="vue-trading-view" :class="overlay == true ? 'overlay' : ''">
      <div class="chart-upper-box">
        <div class="row chart-upper-row align-items-center">
          <div class="col-xl-9 col-lg-9 col-md-9  col-sm-9 col-12">
            <div class="timeline-buttons">
              <div class="btn-group" role="group" aria-label="Third group">
                <button type="button" v-for="(item, index) in TimelineButtons" :key="index" class="btn btn-light"
                  :class="item.val == cInter ? ' active' : ''" @click="candleChart(item.val, item.num)">
                  {{ item.val }}
                </button>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div class="reset-btn-box">
              <ul class="chart-list-box">
                <li>
                  <em id="icon" @click="resetLines" class="fas fa-redo-alt"></em>
                </li>
                <li>
                  <div class="toggle-box">
                    <!-- checkbox Input -->
                    <input :checked="theme_checked" @change="changed" type="checkbox" name="checkbox1"
                      id="toggle-box-checkbox" />

                    <!-- Day Label  -->
                    <label for="toggle-box-checkbox" class="toggle-box-label-left"></label>
                    <!-- Night label -->
                    <label for="toggle-box-checkbox" class="toggle-box-label"></label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-middle-box">
        <div class="row chart-middle-row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="chart-price-main-box">
              <h6>
                {{ $route.params.slug }} - {{ cInter }}
                <span>O<span :class="o <= c ? 'price-color green-color' : 'price-color'">{{ o }}</span>
                </span>

                <span>H<span :class="o <= c ? 'price-color green-color' : 'price-color'">{{ h }}</span>
                </span>

                <span>L<span :class="o <= c ? 'price-color green-color' : 'price-color'">{{ l }}</span>
                </span>

                <span>C<span :class="o <= c ? 'price-color green-color' : 'price-color'">{{ c }}</span>
                </span>

                <span>Change<span :class="o <= c ? 'price-color green-color' : 'price-color'">{{ parseFloat(c -
                o).toFixed(2) }} ({{
                    parseFloat(((c - o) / o) * 100).toFixed(2)
                    }}%)</span></span>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div id="trading-chart" :style="cursorBool == false ? 'cursor:crosshair' : 'cursor:grab'">
        <div class="chart-loader" v-if="loading">
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClass from "@/api/api";
import { createChart } from "lightweight-charts";
import axios from "axios";

export default {
  name: "Chart",
  data: () => ({
    slug: "BTCUSDT",
    symbol: "BTCUSDT",
    candle: [],
    chart: [],
    candleSeries: [],
    connection1: null,
    chart_connections: null,
    overlay: false,
    loading: false,
    lastIndexTime: "",
    firstIndexTime: "",
    inter: "",
    data1: [],
    oldlastTime: null,
    overlay1: true,
    cal: null,
    request: null,
    o: null,
    c: null,
    h: null,
    l: null,
    initialVal: null,
    diff: "",
    per: "",
    hoverparam: "",
    olBoolean: true,
    cInter: "1m",
    TimelineButtons: [
      { val: "1m", num: 1 },
      { val: "5m", num: 5 },
      { val: "15m", num: 15 },
      { val: "30m", num: 30 },
      { val: "1h", num: 60 },
      { val: "2h", num: 120 },
      // { val: "4h", num: 240 },
      // { val: "6h", num: 360 },
      { val: "12h", num: 720 },
      { val: "1d", num: 1440 },
      { val: "1w", num: 10080 },
      // { val: "1M", num: 18000 },
    ],
    chartHeight: 330,
    chartWidth: 1200,
    w: null,
    cursorBool: false,
    theme_checked: true,
    chartAdd: null,
    alldata: [],
    socketChk: false,
  }),
  created() {
    // let c_theme = localStorage.getItem("theme_checked");
    // this.theme_checked = c_theme == "true" ? true : false;
  },
  mounted() {
    this.setthememethod(this.$store.state.new_theme);

    window.addEventListener("resize", this.checkSize);
    this.loading = this.overlay = true;
    this.symbol = this.$route.params.slug;

    if (this.$refs.main) {
      var width = this.$refs.main.getBoundingClientRect();
      this.w = width.width - 5;
    }
    this.create();

    // Chnage Chart Color
    if (this.$store.getters.getMarketCurrency) {
      this.alldata = this.$store.getters.getMarketCurrency;
      var data = this.alldata?.filter((o) => {
        return o.symbol == this.symbol;
      });

      this.socketChk = data[0].listed;
    }

    if (this.$store.getters.chartColor) {
      this.chartAdd = this.$store.getters.chartColor;
      this.applyThemeopt();
    }
    this.candleChart("1m", 1);
  },
  watch: {
    $route: function () {
      this.overlay = true;
      this.symbol = this.$route.params.slug;
      this.candleChart(this.inter, this.cal);
    },
    "$store.getters.chartColor": function () {
      this.chartAdd = this.$store.getters.chartColor;
      // this.create();
      this.applyThemeopt();
    },
  },

  methods: {
    setthememethod(val = null){
      this.theme_checked = val;
      this.$store.commit('setnewtheme',val)
      let exchange = document.getElementById('main-exchange').classList;
      val?exchange.add('night'):exchange.remove('night');
      // Change Chart Color
      let chartOptions = val
        ? this.chartColor("#101621", "#808080", "#808080")
        : this.chartColor("#ffffff", "#000000", "#d6dcde");
        this.$store.commit("SET_CHART_THEME", chartOptions);
    },
    changed(event){
      this.setthememethod(event.target.checked)
    },
    checkSize() {
      this.w = screen.width;
      var newW = this.w - 40;
      if (this.w > 991 && this.$refs.main) {
        var width = this.$refs.main.getBoundingClientRect();
        this.w = width.width - 5;
        this.chart.resize(this.w, 300);
      } else {
        this.chart.resize(newW, 300);
      }
    },
    /*****************************creating chart *************/
    create() {
      this.chart = createChart(document.getElementById("trading-chart"), {
        height: 330,
        width: this.w,
        interval: "1",
        style: "1",
        locale: "in",
      });
      this.chart.applyOptions({
        timeScale: {
          rightOffset: 12,
          barSpacing: 2,
          rightBarStaysOnScroll: true,
          visible: true,
          timeVisible: true,
          secondsVisible: true,
        },
        leftPriceScale: {
          visible: false,
        },
        rightPriceScale: {
          visible: true,
        },
        crosshair: {
          mode: 0,
        },
      });
      this.candleSeries = this.chart.addCandlestickSeries({
        upColor: "#59c893",
        downColor: "#f15360",
        visible: this.overlay1,
        priceFormat: {
          type: "custom",
          // minMove: "0.000001",
          formatter: (price) => {
            if (price < 0.000001) return parseFloat(price).toPrecision(5);
            else if (price >= 0.000001 && price < 1)
              return parseFloat(price).toPrecision(4);
            else if (parseInt(price) == 1 || parseInt(price) == 4)
              return parseFloat(price).toFixed(3);
            else return parseFloat(price).toFixed(2);
          },

          minMove: "0.000000001",
        },
      });
      this.chart
        .timeScale()
        .subscribeVisibleTimeRangeChange(this.onVisibleTimeRangeChanged);
      this.chart.subscribeCrosshairMove(this.handleCrosshairMoved);
    },
    /******************************calling api******************* */
    async candleChart(str, num) {


      this.inter = this.cInter = str;
      this.cal = num;
      var $this = this;
      this.request = {
        method: "UNSUBSCRIBE",
        params: [$this.symbol.toLowerCase() + "@kline_" + this.inter],
        id: 312,
      };
      this.overlay = true;

      this.data1 = [];
      var uriBase = this.socketChk ? "orders/getohlc" : "chart";
      var uri =
        ApiClass.nodeUrl +
        uriBase +
        "?symbol=" +
        this.symbol +
        "&interval=" +
        str;

      await axios.get(uri).then((res) => {
 
        this.candle = res.data;
        this.overlay = this.loading = false;
      });

      this.data1 = this.candle ? this.setCandleData(this.candle) : [];

      this.candleSeries.setData(this.data1);
      this.scalingChart();

      this.o = parseFloat(this.data1[this.data1.length - 1].open);
      this.c = parseFloat(this.data1[this.data1.length - 1].close);
      this.h = parseFloat(this.data1[this.data1.length - 1].high);
      this.l = parseFloat(this.data1[this.data1.length - 1].low);
      // this.loading = false;
      this.lastIndexTime = this.data1[0].time;
      this.firstIndexTime = this.data1[this.data1.length - 1].time;
      if (this.connection1) {
        this.connection1.close();
      }
  
      this.connection1 = this.socketChk
        ? new WebSocket(ApiClass.nodeWebsocket)
        : new WebSocket("wss://stream.binance.com:9443/ws");

      this.connection1.onopen = function () {
        console.log("Successfully connected to the trade history...");
      };
      var ccStreamer = this.connection1;
      var subRequest2;
      this.connection1.onopen = function onStreamOpen() {

        if ($this.socketChk) {
          subRequest2 = {
            method: "ADD",
            params: [$this.symbol.toLowerCase() + "@kline"],
          };
        } else {
          subRequest2 = {
            method: "SUBSCRIBE",
            params: [$this.symbol.toLowerCase() + "@kline_" + str],
            id: 3,
          };
        }

        this.request = subRequest2;
        var bar_data;
        ccStreamer.send(JSON.stringify(subRequest2));
        ccStreamer.onmessage = function (event) {
          let obj = JSON.parse(event.data);
          if ($this.socketChk && Array.isArray(obj)) {
      
            obj = obj[0];
    
            bar_data = {
              // time: new Date(obj.start_time).getTime(),
              time: obj.start_time / 1000 + 19800,
              open: parseFloat(obj.ohlc.o),
              high: parseFloat(obj.ohlc.h),
              low: parseFloat(obj.ohlc.l),
              close: parseFloat(obj.ohlc.c),
              closetime: obj.end_time / 1000 + 19800,
            };

            $this.candleSeries.update(bar_data);

            if ($this.hoverparam.time == undefined) {
              $this.o = parseFloat(obj.ohlc.o);
              $this.c = parseFloat(obj.ohlc.c);
              $this.h = parseFloat(obj.ohlc.h);
              $this.l = parseFloat(obj.ohlc.l);
            }
          }

          if (!$this.socketChk) {
            if (obj.e) {
              bar_data = {
                time: parseInt(obj.k.t / 1000) + 19800,
                open: obj.k.o,
                high: obj.k.h,
                low: obj.k.l,
                close: obj.k.c,
                closetime: parseInt(obj.k.T / 1000) + 19800,
                trades: obj.k.n,
              };
              $this.candleSeries.update(bar_data);
              if ($this.hoverparam.time == undefined) {
                $this.o = parseFloat(obj.k.o);
                $this.c = parseFloat(obj.k.c);
                $this.h = parseFloat(obj.k.h);
                $this.l = parseFloat(obj.k.l);
              }
            }
          }
        };
      };
    },
    /****************************** initial zoomed scaling */
    setCandleData(chartData = []) {
      var getData = [];

      if (this.socketChk) {
        chartData.data?.forEach((e) => {
       
          getData.push({

            time: e.start_time / 1000 + 19800,
            open: parseFloat(e.ohlc.o),
            high: parseFloat(e.ohlc.h),
            low: parseFloat(e.ohlc.l),
            close: parseFloat(e.ohlc.c),
            // closetime: new Date(e.end_time).getTime(),
            closetime: e.end_time / 1000 + 19800,
          });
        });
        return getData;
      }

      for (var i = 0; i < chartData.length; i++) {
        getData.push({
          time: chartData[i][0] / 1000 + 19800,
          open: parseFloat(chartData[i][1]),
          high: parseFloat(chartData[i][2]),
          low: parseFloat(chartData[i][3]),
          close: parseFloat(chartData[i][4]),
          // volume: candle[i][5],
          closetime: chartData[i][6] / 1000 + 19800,
          trades: chartData[i][8],
        });
      }
      return getData;
    },
    /*************************************************chart scaling initial********************************************************** */
    scalingChart() {
      this.chart.priceScale().applyOptions({ autoScale: true });
      var to = this.chart.timeScale().getVisibleRange().to;
      var from = to - 60 * 60 * this.cal;
      this.chart.timeScale().setVisibleRange({ from, to });
      this.chart.timeScale().applyOptions({
        rightOffset: 10,
      });
    },
    /********************************************************reset lines ********************************************************************/
    resetLines() {
      // this.chart.timeScale().scrollToRealTime(); //  with animation back to right

      this.chart.timeScale().resetTimeScale();
      this.scalingChart();
    },
    /*******************visible time range ********************************************************************/
    async onVisibleTimeRangeChanged(newVisibleTimeRange) {
      var endT = parseInt(this.lastIndexTime - 19800) * 1000;
      var self = this;
      document.onmousedown = function () {
        self.cursorBool = true;
      };
      document.onmouseup = function () {
        self.cursorBool = false;
      };

      // var startT = endT - 2 * this.cal * 10800000;
      if (
        this.lastIndexTime == newVisibleTimeRange.from &&
        this.oldlastTime != this.lastIndexTime
      ) {
        this.oldlastTime = this.lastIndexTime;
        var uri =
          ApiClass.nodeUrl +
          "chart?symbol=" +
          this.symbol +
          "&interval=" +
          this.inter +
          // "&start_time=" +
          // startT +
          "&end_time=" +
          endT;
        var candle;
        await axios.get(uri).then((res) => {
          candle = res.data;
        });

        var d = [];
        d = candle ? this.setCandleData(candle) : [];
        d.splice(-1);
        Array.prototype.push.apply(d, this.data1);
        this.data1 = d;
        this.candleSeries.setData(this.data1);
        this.lastIndexTime = this.data1[0].time;
      }
    },

    /*************************************crosshair work ***********************************************************************/
    handleCrosshairMoved(param) {
      this.hoverparam = param;
      const ohlc = param.seriesPrices.get(this.candleSeries);
      this.initialVal = ohlc;
      this.olBoolean = false;
      if (ohlc) {
        this.o = parseFloat(ohlc.open);
        this.c = parseFloat(ohlc.close);
        this.h = parseFloat(ohlc.high);
        this.l = parseFloat(ohlc.low);
      }
    },

    // changed(event) {
    //   localStorage.setItem("theme_checked", event.target.checked);
    //   var element = document.getElementById("main-exchange");
    //   !event.target.checked
    //     ? element.classList.remove("night")
    //     : element.classList.add("night");

    //   // Change Chart Color
    //   let chartOptions = event.target.checked
    //     ? this.chartColor("#101621", "#808080", "#808080")
    //     : this.chartColor("#ffffff", "#000000", "#d6dcde");
    //   this.$store.commit("SET_CHART_THEME", chartOptions);
    // },
    applyThemeopt() {
      var chartAddop = this.chartAdd;
      this.chart.applyOptions(chartAddop);
    },
  },
};
</script>
<style scoped>
.chart-main-box {
  border: 1px solid var(--border-color);
  background: var(--white);
}

button.btn.btn-light {
  background-color: transparent;
  border: none;
  transition: all 0.5s ease;
  font-size: 12px;
  font-weight: 500;
  color: var(--chart-tab-btn);
  padding: 0.375rem 7px;
}

button.btn.btn-light:hover {
  transition: all 0.5s ease;
  color: var(--black);
}

button.btn.btn-light.active {
  color: var(--black);
}

button.btn.btn-light:focus {
  box-shadow: none;
}

.chart-upper-box {
  border-bottom: 1px solid var(--border-color);
}

.reset-btn-box {
  text-align: right;
}

.reset-btn-box ul.chart-list-box {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.reset-btn-box ul.chart-list-box li {
  margin-right: 15px;
}

.reset-btn-box ul.chart-list-box li:nth-child(2) {
  margin-right: 0;
}

.reset-btn-box .fas {
  cursor: pointer;
  color: var(--black);
}

.chart-price-main-box {
  border-bottom: 1px solid var(--border-color);
  padding: 5px 6px 5px;
}

.chart-price-main-box h6 {
  margin-bottom: 0;
  font-size: 15px;
  color: var(--black);
  font-weight: 500;
  font-family: "Poppins";
}

.chart-price-main-box h6 span {
  font-size: 12px;
  padding-left: 5px;
  font-weight: 400;
}

.chart-price-main-box h6 span.price-color {
  padding-left: 1px;
  color: var(--red);
  font-size: 12px;
}

.chart-price-main-box h6 span.price-color.green-color {
  color: var(--green);
}

.overlay {
  opacity: 0.5;
  position: relative;
  color: var(--white);
}

#trading-chart {
  position: relative;
}

.chart-loader {
  position: absolute;
  top: 130px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  z-index: 4;
  text-align: center;
}

/**** THEME TOGGLE CHANGE CSS START ****/

div#price-fav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-box-label-left:before,
.toggle-box-label-left:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /*transition*/
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
  outline: none;
}

.toggle-box input[type="checkbox"],
.toggle-box input[type="checkbox"]:active {
  position: absolute;
  top: -5000px;
  height: 0;
  width: 0;
  opacity: 0;
  border: none;
  outline: none;
}

.toggle-box label {
  display: inline-block;
  position: relative;
  padding: 0px;
  font-size: 14px;
  cursor: pointer;
  color: rgba(149, 149, 149, 0.51);
  font-weight: normal;
}

.toggle-box-label-left:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  line-height: 34px;
  text-indent: 40px;
  height: 16px;
  width: 16px;
  margin: 4px;
  /*border-radius*/
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  right: 26px;
  bottom: 0px;
  background: #ffb200;
  transform: rotate(-45deg);
  box-shadow: 0 0 10px white;
}

.toggle-box-label-left:after {
  content: "";
  display: inline-block;
  width: 40px;
  height: 24px;
  /*border-radius*/
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  vertical-align: middle;
  margin: 0 10px;
  border: 2px solid #ffb200;
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left:before {
  right: 17px;
  box-shadow: 5px 5px 0 0 #eee;
  background: transparent;
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left:after {
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid white;
}

.toggle-box input[type="checkbox"]+.toggle-box-label-left {
  color: rgba(250, 250, 250, 0.51);
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left {
  color: rgba(149, 149, 149, 0.51);
  font-weight: normal;
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left+.toggle-box-label {
  color: rgba(250, 250, 250, 0.51);
}

/**** THEME TOGGLE CHANGE CSS FINISH ****/

@media all and (min-width: 320px) and (max-width: 767px) {
  .chart-price-main-box h6 span {
    display: inline-block;
  }

  .chart-price-main-box h6 span.price-color {
    font-size: 11px;
  }

  button.btn.btn-light {
    padding: 0.375rem 4px;
  }

  .reset-btn-box {
    padding-right: 6px;
  }

  .reset-btn-box ul.chart-list-box li {
    margin-right: 1px;
  }

  .toggle-box-label-left:before {
    right: 16px;
  }

  .toggle-box-label-left:after {
    margin-right: 0;
  }

  .toggle-box input[type="checkbox"]:checked+.toggle-box-label-left:before {
    right: 8px;
  }

  .reset-btn-box ul.chart-list-box {
    margin-left: 4px;
    margin-bottom: 5px;
  
  }
}
@media all and (min-width: 320px) and (max-width: 576px) {
  .reset-btn-box ul.chart-list-box {
    justify-content: start;
  }
}
</style>