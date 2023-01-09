<template>
  <!-- <div  v-if="loading" :class="loading == true ? 'spinner-border text-primary' : ''">
      oihgfj
</div> -->

  <div
    ref="main"
    id="vue-trading-view"
    :style="cursorBool == false ? 'cursor:crosshair' : 'cursor:pointer'"
    :class="overlay == true ? 'overlay' : ''"
  >
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div class="btn-group btn-group-sm" role="group" aria-label="First group">
        <button
          type="button"
          v-for="(items, index) in intervals"
          :key="index"
          class="btn days-text-btn"
          :class="inter == items.val ? 'active' : ''"
          @click="candleChart(items.val, items.num)"
        >
          {{ items.val }}
        </button>
      </div>
      <!-- <i
      id="icon"
        
        class="fas fa-redo-alt d-flex"
        @click="resetLines"
       
      ></i>
      <br /> -->
      <br />
      <span text style="font-weight: 350"
        >&nbsp;{{ $route.params.slug }} - {{ inter }}
      </span>
      <ChartHeadLine
        :color="o < c ? '#59c893' : '#f15360'"
        :open="o"
        :high="h"
        :low="l"
        :close="c"
        :chk="overlay"
      />
      <br />
    </div>
  </div>
</template>

<script>
import { createChart } from "lightweight-charts";
import axios from "axios";
import ChartHeadLine from "@/components/ChartHeadLine.vue";

export default {
  name: "Chart",
  components: {
    ChartHeadLine,
  },
  data: () => ({
    slug: "BTCUSDT",
    //chart variables
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
    intervals: [
      { val: "1m", num: 1 },
      { val: "5m", num: 5 },
      { val: "15m", num: 15 },
      { val: "30m", num: 30 },
      { val: "1h", num: 60 },
      { val: "12h", num: 720 },
      { val: "1d", num: 1440 },
      { val: "1w", num: 10080 },
      { val: "1M", num: 10080 },
    ],
    chartHeight: 330,
    chartWidth: 1200,
    w: null,
    cursorBool: false,
  }),
  mounted() {
    window.addEventListener("resize", this.checkSize);
    this.loading = this.overlay = true;
    this.symbol = this.$route.params.slug;
    var width = this.$refs.main.getBoundingClientRect();
    this.w = width.width - 5;
    this.create();
    this.candleChart("1m", 1);
  },
  watch: {
    $route: function () {
      this.overlay = true;
      this.symbol = this.$route.params.slug;
      this.candleChart(this.inter, this.cal);
    },
  },

  methods: {
    checkSize() {
      this.w = screen.width;
      var newW = this.w - 40;
      if (this.w > 991) {
        var width = this.$refs.main.getBoundingClientRect();
        this.w = width.width - 5;
        this.chart.resize(this.w, 300);
      } else {
        this.chart.resize(newW, 300);
      }
    },
    tvChart(slug) {
      this.symbol = slug;
    

      this.o = "";
      this.l = "";
      this.c = "";
      this.h = "";
      if (this.connection1) {
        this.connection1.close();
      }
      this.chart.priceScale().applyOptions({ autoScale: true });
      this.candleChart(this.inter, this.cal);
    },
    /*****************************creating chart *************/
    create() {
      this.chart = createChart(document.getElementById("vue-trading-view"), {
        height: 330,
        width: this.w,
        interval: "1",
        style: "1",
        locale: "in",
      });
      this.chart.applyOptions({
        timeScale: {
          rightOffset: 12,
          barSpacing: 3,
          fixLeftEdge: true,
          lockVisibleTimeRangeOnResize: true,
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
        visible: this.overlay1,
        upColor: "#59c893",
        downColor: "#f15360",
        priceFormat: {
          type: "custom",
          minMove: "0.000001",
          formatter: (price) => {
            if (price < 0.000001) return parseFloat(price).toPrecision(4);
            else if (price >= 0.000001 && price < 1)
              return parseFloat(price).toPrecision(4);
            else return parseFloat(price).toPrecision(7);
          },
        },
      });
      this.chart
        .timeScale()
        .subscribeVisibleTimeRangeChange(this.onVisibleTimeRangeChanged);
      this.chart.subscribeCrosshairMove(this.handleCrosshairMoved);
    },
    /******************************calling api******************* */
    async candleChart(str, num) {
      this.chart.priceScale().applyOptions({ autoScale: true });

      this.inter = str;
      this.cal = num;
      this.request = {
        method: "UNSUBSCRIBE",
        // params: ["btcusdt@kline_1m"],
        params: [this.symbol.toLowerCase() + "@kline_" + this.inter],
        //params: ["btcusdt@kline_" + str],
        id: 312,
      };
      this.overlay = true;
      this.data1 = [];
      var uri =
        "http://192.168.1.9:3000/chart?symbol=" +
        this.symbol +
        "&interval=" +
        str;
      await axios.get(uri).then((res) => {
        this.candle = res.data;
        this.overlay = this.loading = false;
      });
      var candle = this.candle;
      for (var i = 0; i < candle.length; i++) {
        this.data1.push({
          time: candle[i][0] / 1000 + 19800,
          open: candle[i][1],
          high: candle[i][2],
          low: candle[i][3],
          close: candle[i][4],
          // volume: candle[i][5],
          closetime: candle[i][6] / 1000 + 19800,
          trades: candle[i][8],
        });
      }
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
      this.connection1 = new WebSocket("wss://stream.binance.com:9443/ws");
      this.connection1.onopen = function () {
        console.log("Successfully connected to the trade history...");
      };
      var ccStreamer = this.connection1;
      var $this = this;
      this.connection1.onopen = function onStreamOpen() {
        var subRequest2 = {
          method: "SUBSCRIBE",
          // params: ["btcusdt@kline_1m"],
          params: [$this.symbol.toLowerCase() + "@kline_" + str],
          //params: ["btcusdt@kline_" + str],
          id: 3,
        };
        this.request = subRequest2;
        ccStreamer.send(JSON.stringify(subRequest2));
        ccStreamer.onmessage = function (event) {
          const obj = JSON.parse(event.data);

          if (obj.e) {
            var bar_data = {
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
        };
      };
    },
    /*************************************************chart scaling initial********************************************************** */
    scalingChart() {
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
        console.log("reached extereme left");
        var uri =
          "http://192.168.1.9:3000/chart?symbol=" +
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
        for (var i = 0; i < candle.length; i++) {
          d.push({
            time: candle[i][0] / 1000 + 19800,
            open: candle[i][1],
            high: candle[i][2],
            low: candle[i][3],
            close: candle[i][4],
            // volume: candle[i][5],
            closetime: candle[i][6] / 1000 + 19800,
            trades: candle[i][8],
          });
        }
        this.data1.shift();
        var ds = this.data1;
        var olddata = d.reverse();
        for (var x = 0; x < olddata.length; x++) {
          ds.unshift(olddata[x]);
        }
        this.lastIndexTime = this.data1[0].time;
        this.data1 = ds;
        this.candleSeries.setData(this.data1);
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
  },
};
</script>
<style scoped>
button.btn.days-text-btn:focus {
  box-shadow: none;
  outline: none;
}

button.btn.days-text-btn.active {
  background-color: #ccc;
  border-radius: 0;
}
.overlay {
  opacity: 0.5;
  position: relative;
  color: white;
}
#icon {
  /* color:red;
  background-color: red;
position:relative; */
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
}
</style>
