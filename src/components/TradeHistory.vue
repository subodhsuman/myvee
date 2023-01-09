<template>
  <div>
    <div class="trading_main_box">
      <div
        id="trading-loader"
        v-if="loader == true"
        class="spinner-border"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="tradng-heading">
        <h6>Trade History</h6>
      </div>
      <!--trading-heading-->

      <table class="table">
        <thead>
          <tr>
            <th>Price</th>

            <th>Volume</th>

            <th>Time</th>
          </tr>
        </thead>
        <tbody v-if="loader == false">
          <tr
            class="bg-green"
            v-for="(item, index) in tradehistory"
            :key="index"
            :class="item.type == false ? 'bg-green' : 'bg-red'"
          >
            <td :class="item.type == false ? 'font-green' : 'font-red'">
              {{ item.price }}
            </td>

            <td :class="item.type == false ? 'font-green' : 'font-red'">
              {{ item.volume }}
            </td>

            <td :class="item.type == false ? 'font-green' : 'font-red'">
              {{ item.time }}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="warning-text d-flex align-items-center justify-content-center"
        style="height: 300px"
        v-if="tradehistory.length == 0 && loader == false"
      >
        No Trade matched yet..
      </div>
    </div>
    <!--trading_main_box-->
  </div>
</template>


<script>
import ApiClass from "../api/api";

const web_socket_d = "@trade";

export default {
  name: "TradeHistory",
  data: () => ({
    tradehistory: [],
    treadhistoryConnection: null,
    slug: "BTCUSDT",
    socketChk: false,
    alldata: [],
    loader: false,
  }),
  mounted() {
    this.slug = this.$route.params.slug;
    if (this.$store.getters.getMarketCurrency) {
      this.alldata = this.$store.getters.getMarketCurrency;

      let data = this.alldata?.filter((o) => {
        return o.symbol == this.slug;
      });

      this.socketChk = data[0].listed;
    }
    this.getTradeHistory(this.$route.params.slug);

    this.treadhistoryConnection = this.socketChk
      ? new WebSocket(ApiClass.nodeWebsocket)
      : new WebSocket("wss://stream.binance.com:9443/ws");

    this.treadhistoryConnection.onopen = function () {
      console.log("Successfully connected to the trade history...");
    };

    this.treadhistoryConnection.onclose = function (event) {
      console.log("Successfully Disconnected to the trade history...");
      console.log(event);
    };
    var ccStreamer = this.treadhistoryConnection;
    var $this = this;
    this.treadhistoryConnection.onopen = function onStreamOpen() {
      var subRequest2;
      if ($this.socketChk) {
        subRequest2 = {
          method: "ADD",
          params: [$this.slug.toLowerCase() + web_socket_d],
          id: 3,
        };
      } else {
        subRequest2 = {
          method: "SUBSCRIBE",
          params: [$this.slug.toLowerCase() + web_socket_d],
          id: 3,
        };
      }

      ccStreamer.send(JSON.stringify(subRequest2));
      let trade_speed = 0;

      ccStreamer.onmessage = function (event) {
        const obj = JSON.parse(event.data);
        // $this.loader = false;
        // console.log("TRADE SOCKET==", obj.s);

        if (obj.s == "BTCUSDT") {
          console.log('innnnnnn btcusdt tradeeeee');
          trade_speed = trade_speed + 1;

          if (trade_speed % 20 == 0) {
            if (obj["e"] == "trade") {
              if ($this.tradehistory.length < 10) {
                $this.tradehistory.unshift({
                  price: parseFloat(obj["p"]),
                  volume: parseFloat(obj["q"]),
                  time: new Date(+obj["T"]).toLocaleTimeString("en-GB"),
                  type: obj["m"],
                });
              } else {
                $this.tradehistory.pop();
                $this.tradehistory.unshift({
                  price: parseFloat(obj["p"]),
                  volume: parseFloat(obj["q"]),
                  time: new Date(+obj["T"]).toLocaleTimeString("en-GB"),
                  type: obj["m"],
                });
              }
            }
          }
          return;
        }

        if (obj["e"] == "trade") {
          console.log('innnnnnn otherrrrrrrrrrr tradeeeee');

          if ($this.tradehistory.length < 10) {
            $this.tradehistory.unshift({
              price: parseFloat(obj["p"]),
              volume: parseFloat(obj["q"]),
              time: new Date(+obj["T"]).toLocaleTimeString("en-GB"),
              type: obj["m"],
            });
          } else {
            $this.tradehistory.pop();
            $this.tradehistory.unshift({
              price: parseFloat(obj["p"]),
              volume: parseFloat(obj["q"]),
              time: new Date(+obj["T"]).toLocaleTimeString("en-GB"),
              type: obj["m"],
            });
          }
        }
      };
    };
  },

  destroyed() {
    this.treadhistoryConnection.close();
  },

  created() {
    // Call Api For Get Latest Data
  },

  methods: {
    async getTradeHistory(symbol = "BTCUSDT") {
      var response2 = "";

      this.loader = true;
      if (this.socketChk) {
        var data_with = symbol.slice(symbol.length - 3, symbol.length);
        data_with = data_with == "SDT" ? "USDT" : data_with;
        var data = symbol.replace(data_with, "");
        // console.log(data_with, data);
        response2 = await ApiClass.getNodeRequest(
          "orders/trade-book?currency=" + data + "&with_currency=" + data_with,
          false
        );
      }

      if (!this.socketChk) {
        response2 = await ApiClass.getNodeRequest(
          "list-crypto/trade-history/" + symbol,
          false
        );
      }
      this.loader = false;
      console.log({ response2 });
      const trades_Data = response2?.data;
      let newData = trades_Data?.data.map((v) => {
        return {
          price: parseFloat(v["p"]),
          volume: parseFloat(v["q"]),
          time: new Date(+v["T"]).toLocaleTimeString("en-GB"),
          type: v["m"],
        };
      });

      // SET API DATA TO VARIBALE
      this.tradehistory = [];
      this.tradehistory = newData;
    },
  },
};
</script>


<style scoped>
.tradng-heading {
  background-color: var(--order-nav-bg);
  padding: 11px 11px;
}

.tradng-heading h6 {
  margin-bottom: 0;
  text-transform: uppercase;
  font-family: "Poppins";
  font-size: 13px;
  font-weight: 600;
  color: var(--black);
}

.trading_main_box {
  box-shadow: var(--box-shadow);
  overflow: hidden;
  min-height: 411px;
  position: relative;
  background: var(--white);
}

table.table {
  margin-bottom: 0;
  position: relative;
}

table.table thead tr th {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--depth-table-head);
}

table.table tbody {
  border-top: none;
}

table.table tbody tr td {
  text-align: center;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: var(--black);
  border: none;
}

table.table tbody tr.bg-green {
  background-color: var(--bg-green);
}

table.table tbody tr.bg-red {
  background-color: var(--bg-red);
}

table.table tbody tr td.font-green {
  color: var(--green);
}

table.table tbody tr td.font-red {
  color: var(--red);
}

div#trading-loader {
  position: absolute;
  top: 200px;
  left: 0;
  margin: 0 auto;
  right: 0;
}
</style>