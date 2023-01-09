<template>
  <div>
    <div class="order_tab_box">
      <div
        id="orderdepth-loader"
        v-if="loader == true"
        class="spinner-border"
        role="status"
        style="margin: 0 auto"
      >
        <span class="visually-hidden">Loading...</span>
      </div>

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            background-color: var(--black)
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Order Volume
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div class="container-fluid order-custom-table">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-6 table-main-1">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Volume</th>
                      <th style="text-align: right">Buy Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(item, index) in marketbuy"
                      :key="index"
                      :class="buy_price"
                      :style="myStyles(item.width, 'green')"
                    >
                      <td class="green-color">{{ item.volume.toFixed(5) }}</td>
                      <td style="text-align: right">{{ item.buyprice }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-6 col-md-6 col-6 table-main-2">
                <table class="table">
                  <thead>
                    <tr>
                      <th style="text-align: left">Sell Price</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody style="background-color:var(--black)">
                    <tr
                      v-for="(item, index) in marketsell"
                      :key="index"
                      :class="sell_price"
                      :style="myStyles(item.width, 'red')"
                    >
                      <td class="red-color" style="text-align: left">
                        {{ item.sellprice }}
                      </td>
                      <td>{{ item.volume.toFixed(5) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-xl-12">
                <div
                  v-if="marketsell.length == 0 && marketbuy.length == 0 && loader == false"
                  class="
                    warning-text
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                  style="height: 300px"
                >
                  <p>No orders get placed yet...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div class="container-fluid order-custom-table">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-6 table-main-1">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Volume</th>
                      <th style="text-align: right">Bid Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(item, index) in orderbuy"
                      :key="index"
                      :style="myStyles(item.width, 'green')"
                    >
                      <td class="green-color">{{ item.volume.toFixed(5) }}</td>
                      <td style="text-align: right">{{ item.buyprice }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-6 col-md-6 col-6 table-main-2">
                <table class="table">
                  <thead>
                    <tr>
                      <th style="text-align: left">Ask Price</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in ordersell"
                      :key="index"
                      :style="myStyles(item.width, 'red')"
                    >
                      <td class="red-color" style="text-align: left">
                        {{ item.sellprice }}
                      </td>
                      <td>{{ item.volume.toFixed(5) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-xl-12">
                <div
                  v-if="ordersell.length == 0 && orderbuy.length == 0 && loader == false"
                  class="
                    warning-text
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                  style="height: 300px"
                >
                  <p>No orders get placed yet...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--order_tab_box-->
  </div>
</template>

<script>
import ApiClass from "../api/api";
export default {
  name: "OrderDepth",
  data: () => ({
    marketdepthConnection: null,
    marketbuy: [],
    marketsell: [],
    orderbuy: [],
    ordersell: [],
    sell_price: "table_sell_row",
    buy_price: "table_buy_row",
    slug: "BTCUSDT",
    socketChk: false,
    loader: false,
    alldata: [],
  }),

  destroyed() {
    this.marketdepthConnection.close();
  },

  mounted() {
    console.log("hi in order");
    this.slug = this.$route.params.slug;
    if (this.$store.getters.getMarketCurrency) {
      this.alldata = this.$store.getters.getMarketCurrency;

      var data = this.alldata?.filter((o) => {
        return o.symbol == this.slug;
      });

      this.socketChk = data[0].listed;
    }
    console.log("check==", this.socketChk);
    this.getMarketData(this.slug);
    var $this = this;
    this.marketdepthConnection = $this.socketChk
      ? new WebSocket(ApiClass.nodeWebsocket)
      : new WebSocket("wss://stream.binance.com:9443/ws");

    this.marketdepthConnection.onopen = function () {
      // console.log("Successfully connected to the background-color: var(--black)...");
    };

    var ccStreamer = this.marketdepthConnection;
    const postfix = "@depth10@1000ms";
    this.marketdepthConnection.onopen = function onStreamOpen() {
      // console.log("socket check==", typeof $this.socketChk);
      var subRequest2 = "";
      if ($this.socketChk) {
        subRequest2 = {
          method: "ADD",
          params: [$this.slug.toLowerCase() + "@depth"],
          id: 3,
        };
      } else {
        subRequest2 = {
          method: "SUBSCRIBE",
          params: [$this.slug.toLowerCase() + postfix],
          id: 3,
        };
      }
      // console.log('socket responseeeeeeee====s',subRequest2);
      ccStreamer.send(JSON.stringify(subRequest2));

      ccStreamer.onmessage = function (event) {
        const obj = JSON.parse(event.data);

        // console.log(obj);

        $this.marketDepthMethode(obj);
      };
    };
  },
  methods: {
    marketDepthMethode(obj) {
      var $this = this;
      if (obj["lastUpdateId"]) {
        var depth_buy = obj["bids"];
        var depth_sell = obj["asks"];

        const depth_buy_sum_vol = $this.getArraySum(depth_buy);
        const depth_sell_sum_vol = $this.getArraySum(depth_sell);

        const MAX_Volume =
          depth_buy_sum_vol > depth_sell_sum_vol
            ? depth_buy_sum_vol
            : depth_sell_sum_vol;

        $this.marketbuy = [];
        $this.marketsell = [];
        var x = [];
        var y = [];

        var arr = obj["bids"].concat(obj["asks"]);
        var all_volume_arr = [];
        for (const prop in arr) {
          if (arr[prop][1] != 0) {
            all_volume_arr.push(arr[prop][1]);
          }
        }

        const MAX_ORDER_Volume = $this.getMAxOrderVolume(all_volume_arr);

        var order_buy = [];
        var order_sell = [];

        // background-color: var(--black) CALCULATION BUY SIDE
        for (const mainIndex in depth_buy) {
          let d_price = parseFloat(depth_buy[mainIndex][0]);
          let d_volume = parseFloat(depth_buy[mainIndex][1]);

          const ADD_VOL =
            mainIndex == 0 ? d_volume : d_volume + x[x.length - 1]["volume"];

          x.push({
            buyprice: d_price,
            volume: ADD_VOL,
            width: Math.floor($this.getRowWidth(ADD_VOL, MAX_Volume)) + "%",
          });
          //for order volume variable
          order_buy.push({
            buyprice: d_price,
            volume: d_volume,
            width:
              Math.floor($this.getRowWidth(d_volume, MAX_ORDER_Volume)) + "%",
          });
        }

        // background-color: var(--black) CALCULATION SELL SIDE

        for (const mainIndex in depth_sell) {
          let d_price = parseFloat(depth_sell[mainIndex][0]);
          let d_volume = parseFloat(depth_sell[mainIndex][1]);

          const S_ADD_VOL =
            mainIndex == 0 ? d_volume : d_volume + y[y.length - 1]["volume"];

          y.push({
            sellprice: d_price,
            volume: S_ADD_VOL,
            width: Math.floor($this.getRowWidth(S_ADD_VOL, MAX_Volume)) + "%",
          });
          //for order volume variable
          order_sell.push({
            sellprice: d_price,
            volume: d_volume,
            width:
              Math.floor($this.getRowWidth(d_volume, MAX_ORDER_Volume)) + "%",
          });
        }

        // SET DATA TO MAIN VARIABLES
        $this.loader = false;
        $this.marketbuy = x;
        $this.marketsell = y;
        $this.orderbuy = order_buy;
        $this.ordersell = order_sell;
      }
    },

    getSumAndGreater(array) {
      return {
        sum: this.getArraySum(array),
        max: this.getMAxOrderVolume(array),
      };
    },
    // for order voume
    getMAxOrderVolume(arr) {
      return Math.max(
        ...arr.map((e) => (Array.isArray(e) ? this.getMAxOrderVolume(e) : e))
      );
    },
    getArraySum(array) {
      return array
        .map((v) => parseFloat(v[1]))
        .reduce((sum, current) => sum + current, 0);
    },
    getRowWidth(vol, max_volume) {
      return (vol * 100) / max_volume;
    },

    myStyles(percentage, type) {
      var col1 = type == "green" ? "var(--bg-green)" : "var(--bg-red)";
      var col2 = "var(--white)";
      const direction = type == "green" ? "left" : "right";
      return {
        // width: wid,

        // background : "-webkit-gradient(linear, left top,right top, color-stop(" + percentage + "%," + col1 + "), color-stop(" + percentage + "%," + col2 + "))",
        // background : "-moz-linear-gradient(left center," + col1 + " " + percentage + "%, " + col2 + " " + percentage + "%)",
        // background : "-o-linear-gradient(left," + col1 + " " + percentage + "%, " + col2 + " " + percentage + "%)",
        background:
          "linear-gradient(to " +
          direction +
          "," +
          col1 +
          " " +
          percentage +
          ", " +
          col2 +
          " " +
          percentage +
          ")",
      };
    },

    async getMarketData(symbol = "BTCUSDT") {
      let response2 = "";
      this.loader = true;
      if (this.socketChk) {
        var data_with = symbol.slice(symbol.length - 3, symbol.length);
        data_with = data_with == "SDT" ? "USDT" : data_with;
        var data = symbol.replace(data_with, "");
        response2 = await ApiClass.getNodeRequest(
          "orders/order-book?currency=" + data + "&with_currency=" + data_with,
          false
        );
      } else {
        response2 = await ApiClass.getNodeRequest(
          "list-crypto/market-data/" + symbol,
          false
        );
      }
console.log('');
      const market_data = response2.data;
      this.marketDepthMethode(market_data.data);  
      this.loader = false;
    },
  },
};
</script>

<style scoped>
.order_tab_box {
  min-height: 411px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  background-color: var(--black);
  position: relative;
}

.nav-tabs {
  justify-content: end;
  background-color: var(--order-nav-bg);
  border-radius: 4px 4px 0px 0px;
}

.nav-tabs .nav-link:focus-visible {
  outline: none;
}

.nav-tabs {
  border-bottom: none;
}

.nav-tabs .nav-link {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--white);
  min-height: 40px;
  border: none;
}

.nav-tabs .nav-link.active {
  color: var(--nav-active);
  background-color: var(--white);
  border-radius: 0;
  border-top: 3px solid var(--white);
}

table.table {
  background-color: var(--black);
  margin-bottom: 0;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

table.table thead tr th {
  text-align: center;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  color: var(--depth-table-head);
}

table.table tbody {
  border-top: none;
}

table.table tbody tr {
  border: none !important;
}

table.table tbody tr td {
  text-align: center;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: var(--order-depth-td);
  border: none;
}

table.table tbody tr td.green-color {
  color: var(--green);
  background-color: var(--black);
}

table.table tbody tr td.red-color {
  color: var(--red);
}

.table-main-1 {
  padding-right: 0;
  border-right: 1px solid var(--upper-border);
}

.table-main-2 {
  padding-left: 0;
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
  .order_tab_box {
    margin-bottom: 10px;
  }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .order_tab_box {
    margin-bottom: 10px;
  }
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .order_tab_box {
    margin-bottom: 10px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .order_tab_box {
    margin-bottom: 15px;
    margin-top: 20px;
  }
  table.table thead tr th {
    font-size: 10px;
    padding: 5px 5px;
  }
  .nav-tabs {
    justify-content: center;
  }
  .order-custom-table {
    padding: 0;
  }
}

div#orderdepth-loader {
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
}

.order-custom-table {
  padding: 0px;
}
</style>