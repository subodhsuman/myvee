<template>
  <div>
    <div class="market-main-box">
      <div class="container">


        <div class="row bottom-row">
          <div class="col-xl-9 col-lg-12 col-md-12 mx-auto">
            <div class="table-box">
                                <div class="pair-table">
                    <div class="table-responsive">
                      <table
                        class="table text-center table-borderless table-hover"
                      >
                        <thead>
                          <tr
                            v-for="(market_table, index) in market_table_data"
                            :key="index"
                          >
                            <th>{{ market_table.market_pair }}</th>
                            <th class="open-price" style="text-align:end;">{{ market_table.market_price }}</th>
                            <!-- <th>{{ market_table.market_volume }}</th> -->
                            <th class="change" style="text-align:end;">{{ market_table.market_change }}</th>
                            <!-- <th>{{ market_table.market_trend }}</th> -->
                            <th class="trade-sec" style="text-align:end; padding-right: 37px;">{{ market_table.market_trade }}</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="(pair_table, index) in pair_table_data"
                            :key="index"
                          >
                            <td class="currency-list">
                              <!-- <span class="currency-image"
                                ><img
                                  src="../assets/portfolio_icon/btc.png"
                                  alt=""
                                  class="img-fluid" /></span
                              >
                             {{ pair_table.table_pair }} / -->
                              <span class="currency_pair">{{
                                pair_table.symbol.slice(
                                  0,
                                  pair_table.symbol.length - 4
                                ) + "/USDT"
                              }}</span>
                            </td>
                            <td class="open-price" style="text-align:end;">
                              {{ parseFloat(pair_table.openPrice) }}
                            </td>
                            <!-- <td>
                              {{ pair_table.table_volume }}
                            </td> -->
                            <td class="change" 
                              :style="
                                pair_table.priceChangePercent > 0
                                  ? 'color: var(--green); text-align:end; padding-right: 37px;'
                                  : 'color: var(--red) ; text-align:end; padding-right: 37px;'
                                 
                              "
                            >
                              {{ pair_table.priceChangePercent }}%
                            </td>

                            <!-- <td>
                              <img
                                :src="pair_table.table_chart"
                                alt=""
                                class="img-fluid"
                              />
                            </td> -->
                            <td class="trade-sec" style="text-align:end;">
                              <button
                                type="button"
                                class="btn btn-primary"
                                id="trade-btn"
                                @click="$router.push('exchange/'+pair_table.symbol)"
                              >
                                Trade
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--table-responsive-->
                  </div>
                  <!--pair-table-->
              <!-- <div id="myTabContent" class="tab-content">
                <div
                  id="usdt"
                  role="tabpanel"
                  aria-labelledby="usdt-tab"
                  class="tab-pane show active"
                >

                </div>
              </div> -->
            </div>
            <!--table-box-->
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
        <!--row bottom-row-->

        <div class="row button-row">
          <div class="col-xl-6 col-lg-6 col-md-6 mx-auto">
            <div class="btn-box">
              <router-link to="/market" class="view-btn"
                >View More
                <svg
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"
                  ></path>
                  <path
                    d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"
                  ></path></svg
              ></router-link>
            </div>
            <!--btn-box-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->
        </div>
        <!--button-row-->
      </div>
      <!--container-->
    </div>
  </div>
</template>

<script>
import ApiClass from "../api/api";
import axios from "axios";
export default {
  name: "CoinListTable",

  data() {
    return {
      /****************************************** TABS DATA LOOP START *******************************************/
      tab: "Core Assets",
      tabs_pair_data: ["Core Assets"],
      market_table_data: [
        {
          market_pair: "Market",
          market_price: "Price",
          // market_volume: "Volume",
          market_change: "24H Change",
          // market_trend: "Price Trend",
          market_trade: "Action",
        },
      ],

      pair_table_data: [],

      pair_table_dataAssets: [],

  
      //  core_data: [],
      // gainers: [],
      // losers: [],
      tickers: [],
      // x: [],
      connection: null,

      /****************************************** TABS DATA LOOP FINISH *******************************************/
    };
  },

  async mounted() {


    var uri = ApiClass.nodeUrl + "dashboard/market-gainers";
    await axios.get(uri).then((res) => {
      this.pair_table_dataAssets = this.pair_table_data = res.data.data.core_data;
      this.tickers = res.data.data.tickers;
    });
    this.webSoc();
  },

  methods: {

    webSoc() {
      const ticker_subs = this.tickers;
      this.connection = new WebSocket("wss://stream.binance.com:9443/ws");
      this.connection.onopen = function () {
        // console.log("Successfully connected to the echo websocket server...");
      };
      var ccStreamer = this.connection;
      this.connection.onopen = function onStreamOpen() {
        var subRequest2 = {
          method: "SUBSCRIBE",
          params: ticker_subs,
          id: 1,
        };
        ccStreamer.send(JSON.stringify(subRequest2));
      };
      this.connection.onclose = function () {
        // console.log(
        //   "Successfully disconnected to the echo websocket server..."
        // );
      };

      var $this = this;
      this.connection.onmessage = function (event) {
        var soc_data = event.data;
        soc_data = JSON.parse(soc_data);
        $this.pair_table_data.find((o) => {
          if (o.symbol == soc_data.s) {
            (o.lastPrice = parseFloat(soc_data.c)),
              (o.priceChangePercent = parseFloat(soc_data.P).toFixed(2));
          }
        });
        // console.log($this.dataList);
      };
    },
  },
};
</script>

<style scoped>
.row.middle-inner-row {
  margin-bottom: 25px;
}

.nav-box .nav-tabs {
  border-bottom: none;
}

.nav-box .nav-tabs .nav-link {
  background-color: transparent;
  border: none;
  color: #000;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 0;
  border-radius: 0;
}

.nav-box .nav-tabs .nav-link.active {
  color: #fff;
  background-color: #393939;
  border-radius: 0;
}

.pair-table {
  background-color: #fff;
}

table.table {
  margin-bottom: 0;
}

.table-hover tbody tr:hover button#trade-btn {
  background: #000;
  border-color: #000;
  color: #fff;
}

table.table tbody {
  border-top-width: 1px !important;
}

table.table thead tr th {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #8f8585;
  border-bottom: 1px solid #ccc;
}

table.table tbody tr td {
  vertical-align: middle;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: #000;
  cursor: pointer;
}

button#trade-btn {
  width: 120px;
  height: 37px;
  text-align: center;
  border-radius: 2px;
  background: #ededed;
  color: #000;
  transition: all 0.3s ease;
  border-color: #ededed;
  text-transform: capitalize;
}

button#trade-btn:focus {
  box-shadow: none;
}

.search-box .input-group {
  justify-content: end;
}

.search-box .input-group .form-control {
  max-width: 270px;
  border-color: #cccccc;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.search-box .input-group .form-control:focus {
  box-shadow: none;
  border-color: #cccccc;
}

span#search-icon {
  background-color: transparent;
  border-color: #cccccc;
}

td.currency-list {
  width: 150px;
}

span.currency-image img {
  max-width: 25px;
  float: left;
}

.btn-box a.view-btn {
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  font-family: "Poppins";
  transition: all 0.5s ease;
}

.btn-box a.view-btn .icon {
  color: #000;
  transition: all 0.5s ease;
}

.btn-box {
  text-align: center;
  margin-top: 50px;
}

.btn-box a.view-btn:hover {
  transition: all 0.5s ease;
  color: #0d6efd;
  text-decoration: underline;
}

.btn-box a.view-btn:hover .icon {
  fill: #0d6efd;
  transition: all 0.5s ease;
  text-decoration: underline;
}

@media all and (min-width: 320px) and (max-width: 767px) {
  table.table tbody tr td {
    max-width: 153px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  table.table thead tr th {
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
