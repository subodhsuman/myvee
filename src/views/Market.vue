<template>
<div class="market-main">
    <section class="market-main-box">
        <div class="container">
            <!-- <MainHeading heading_main_title="Market" /> -->

            <div class="row top-row" v-if="show">
                <div class="col-xl-3 col-lg-6 col-md-6" v-for="(market_box, index) in MarketBoxData" :key="index">

                    <MarketData :MarketData="market_box" />

                </div>
                <!--col-xl-3 col-lg-3 col-md-3-->
            </div>
            <!--row-->

            <div class="row middle-row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="heading-inner-box">
                        <Heading title="Market" />
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="middle-wrapper">
                        <div class="row middle-inner-row">
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div class="nav-box">
                                    <ul class="nav nav-tabs nav-pills nav-fill" id="myTab" role="tablist">

                                        <li class="nav-item" role="presentation" v-for="(tabs_pair, index) in tabs_pair_data" :key="index">
                                            <button class="nav-link" id="usdt-tab" :class="tab == tabs_pair ? 'active' : ''" @click="pairChange(tabs_pair)" data-bs-toggle="tab" data-bs-target="#usdt" type="button" role="tab" aria-controls="usdt" aria-selected="true">
                                                {{ tabs_pair }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <!--nav-box-->
                            </div>
                            <!--col-xl-6 col-lg-6 col-md-6-->
                        </div>
                        <!--row middle-inner-row-->
                    </div>
                    <!--middle-wrapper-->
                </div>
                <!--col-xl-12 col-lg-12 col-md-12-->
            </div>
            <!--row middle-row-->

            <div class="row bottom-row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="table-box">
                        <div id="myTabContent" class="tab-content">
                            <div id="usdt" role="tabpanel" aria-labelledby="usdt-tab" class="tab-pane show active">

                                <div class="pair-table">
                                    <div class="table-responsive">
                                        <table class="table text-center table-hover">
                                            <thead>
                                                <tr v-for="(market_table, index) in market_table_data" :key="index">
                                                    <th>{{ market_table.market_pair }}</th>
                                                    <th>{{ market_table.market_price }}</th>
                                                    <th>{{ market_table.market_high }}</th>
                                                    <th>{{ market_table.market_low }}</th>
                                                    <th>{{ market_table.market_change }}</th>
                                                    <th>{{ market_table.market_trade }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                              <tr v-if="pair_table_data.length == 0 && tab == 'MYV' && !loading2">
                                                <td colspan="6">                                              
                                                    Coming Soon                                              
                                                </td>  
                                              </tr>                                         
                                              <tr v-if="loading2">
                                                <td colspan="6">
                                                  <div  class="spinner-border" role="status">
                                                      <span class="visually-hidden">Loading...</span>
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr v-else v-for="(pair_table, index) in pair_table_data" :key="index" @click="$router.push('exchange/'+pair_table.symbol)">
                                                  <td>{{ pair_table.currency }}</td>
                                                  <td :style="{ color: pair_table.flag == 2 ? 'red' : 'green' }">
                                                      {{ parseFloat(pair_table.price) }}
                                                  </td>
                                                  <td style="color: var(--green)">
                                                      {{ parseFloat(pair_table.high )}}
                                                  </td>
                                                  <td style="color: var(--red)">
                                                      {{ parseFloat(pair_table.low )}}
                                                  </td>
                                                  <td :style="{ color: pair_table.change >= 0 ? 'var(--green)' : 'var(--red)' }">
                                                      {{ pair_table.change }}%
                                                  </td>
                                                  <td>
                                                      <button type="button" class="btn btn-primary" id="trade-btn">
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
                            </div>
                        </div>
                    </div>
                    <!--table-box-->
                </div>
                <!--col-xl-12 col-lg-12 col-md-12-->
            </div>
            <!--row bottom-row-->
        </div>
        <!--container-->
    </section>
    <!--market-main-box-->
</div>
</template>

<script>
import ApiClass from "@/api/api";
// import MainHeading from "@/components/MainHeading.vue";
import Heading from "@/components/Home_New/Heading.vue";
import MarketData from "@/components/MarketData.vue";
// import fs from 'browserify-fs';
// import JsonFile from '@/jsonFiles/dashboard_market_chart.json';
// import JsonFile from '../jsonFiles/dashboard_market_chart.json';

export default {
    name: "Market",
    components: {
        // MainHeading,
        MarketData,
        Heading
    },

    data() {
        return {
            loading2:false,
            dataBTCUSDT: [],
            dataETHUSDT: [],
            dataTRXUSDT: [],
            dataXRPUSDT: [],
            /****************************************** MARKET DATA LOOP START *******************************************/
            MarketBoxData: [{
                    market_pair: "Btc-Usdt",
                    market_price: "0",
                    market_change: "0",
                    market_subprice: "0",
                    change_percantage_color: "var(--green)",
                    seriesSpark3: [{
                        data: [],
                    }, ],
                    chartOptionsSpark3: {
                        chart: {
                            animations: {
                                enabled: false,
                            },
                            type: "area",
                            height: 100,
                            sparkline: {
                                enabled: true,
                            },
                        },

                        stroke: {
                            curve: "smooth",
                            width: 1,
                            lineCap: 'butt',
                        },
                        fill: {
                            opacity: 0.3,
                        },
                        xaxis: {
                            crosshairs: {
                                width: 1,
                            },
                        },
                        yaxis: {
                            min: 0,
                        },
                    },
                },

                {
                    market_pair: "ETH-Usdt",
                    market_price: "0",
                    market_change: "0",
                    market_subprice: "0",
                    change_percantage_color: "var(--green)",
                    seriesSpark3: [{
                        data: [],
                    }, ],
                    chartOptionsSpark3: {
                        chart: {
                            animations: {
                                enabled: false,
                            },
                            type: "area",
                            height: 100,
                            sparkline: {
                                enabled: true,
                            },
                        },

                        stroke: {
                            curve: "smooth",
                            width: 1,
                            lineCap: 'butt',
                        },
                        fill: {
                            //  colors: ["rgb(255, 0, 0)"],
                            //     colors: ["#34c38f"],
                            opacity: 0.3,
                        },
                        xaxis: {
                            crosshairs: {
                                width: 1,
                            },
                        },
                        yaxis: {
                            min: 0,
                        },
                    },
                },

                {
                    market_pair: "TRX-Usdt",
                    market_price: "0",
                    market_change: "0",
                    market_subprice: "0",
                    change_percantage_color: "var(--green)",
                    seriesSpark3: [{
                        data: [],
                    }, ],
                    chartOptionsSpark3: {
                        chart: {
                            animations: {
                                enabled: false,
                            },
                            type: "area",
                            height: 100,
                            sparkline: {
                                enabled: true,
                            },
                        },

                        stroke: {
                            curve: "smooth",
                            width: 1,
                            lineCap: 'butt',
                        },
                        fill: {

                            opacity: 0.3,
                        },
                        xaxis: {
                            crosshairs: {
                                width: 1,
                            },
                        },
                        yaxis: {
                            min: 0,
                        },
                    },
                },

                {
                    market_pair: "XRP-Usdt",
                    market_price: "0",
                    market_change: "0",
                    market_subprice: "0",
                    change_percantage_color: "var(--green)",
                    seriesSpark3: [{
                        data: [],
                    }, ],
                    chartOptionsSpark3: {
                        chart: {
                            animations: {
                                enabled: false,
                            },
                            type: "area",
                            height: 100,
                            sparkline: {
                                enabled: true,
                            },
                        },

                        stroke: {
                            curve: "smooth",
                            width: 1,
                            lineCap: 'butt',
                        },
                        fill: {
                            // colors: ["rgb(255, 0, 0)"],
                            opacity: 0.3,
                        },
                        xaxis: {
                            crosshairs: {
                                width: 1,
                            },
                        },
                        yaxis: {
                            min: 0,
                        },
                    },
                },
            ],

            /****************************************** MARKET DATA LOOP FINISH *******************************************/
            /****************************************** TABS DATA LOOP START *******************************************/
            tab: "USDT",
            tabs_pair_data: ["USDT", "BTC", "TRX", "MYV"],
            market_table_data: [{
                market_pair: "Pair",
                market_price: "Last Price",
                market_high: "24H High",
                market_low: "24H Low",
                market_change: "24H Change",
                market_trade: "Trade",
            }, ],

            pair_table_data: [],

            pair_table_dataUSDT: [],

            pair_table_dataBTC: [],

            pair_table_dataTRX: [],

            pair_table_dataMYV: [],
            tickers: [],
            connection2: '',
            show: false,
            /****************************************** TABS DATA LOOP FINISH *******************************************/
        };
    },

    mounted() {

        // this.webSocketSubs();
        // this.pairChange(this.tab);

    },

    methods: {

        getSeriesData({
            market_pair,
            market_price,
            market_change,
            market_subprice,
            color_rgb = 'rgb(60, 166, 129)',
            s_data = []
        }) {
            return {
                market_pair,
                market_price,
                market_change,
                market_subprice,
                change_percantage_color: "var(--green)",
                seriesSpark3: [{
                    data: s_data,
                }, ],
                chartOptionsSpark3: {
                    chart: {
                        type: "area",
                        height: 100,
                        sparkline: {
                            enabled: true,
                        },
                    },
                    colors: [color_rgb],
                    // stroke: {
                    //   curve: "smooth",
                    //   width: 1,
                    //   lineCap: 'butt',
                    // },
                    // fill: {
                    //   opacity: 0.3,
                    // },
                    // xaxis: {
                    //   crosshairs: {
                    //     width: 1,
                    //   },
                    // },
                    // yaxis: {
                    //   min: 0,
                    // },
                },
            }
        },

        async getChartData() {
            var x = await ApiClass.getNodeRequest('dashboard/market-chart', false)
            x = x.data;
            this.$store.commit("SET_MARKET_CHART_DATA", x);
            this.setChartData(x)
        },

        async setChartData(x) {
            this.MarketBoxData[0].seriesSpark3[0].data = this.dataBTCUSDT = x.data.BTCUSDT;
            this.MarketBoxData[1].seriesSpark3[0].data = this.dataETHUSDT = x.data.ETHUSDT;
            this.MarketBoxData[2].seriesSpark3[0].data = this.dataTRXUSDT = x.data.TRXUSDT;
            this.MarketBoxData[3].seriesSpark3[0].data = this.dataXRPUSDT = x.data.XRPUSDT;
            // this.MarketBoxData[0].seriesSpark3[0].data = this.dataBTCUSDT = x.data.BTCUSDT.map((ele) => ele[4]);
            // this.MarketBoxData[1].seriesSpark3[0].data = this.dataETHUSDT = x.data.ETHUSDT.map((ele) => ele[4]);
            // this.MarketBoxData[2].seriesSpark3[0].data = this.dataTRXUSDT = x.data.TRXUSDT.map((ele) => ele[4]);
            // this.MarketBoxData[3].seriesSpark3[0].data = this.dataXRPUSDT = x.data.XRPUSDT.map((ele) => ele[4]);

            this.show = true;
        },
        async getListData() {
            this.loading2 = true;
            let data2 = await ApiClass.getNodeRequest('list-crypto/get', false);
            if(data2.data.status_code == 1 ){
              this.loading2 = false;
              data2 = data2.data;
              this.$store.commit("SET_LIST_DATA", data2);
              this.setListData(data2)
              this.pairChange("USDT")
            }

        },
        setListData(data2) {
            this.webSocketSubs();
            // console.log('hihi',data2);
            this.pair_table_dataUSDT = data2.data.USDT;
            this.pair_table_dataBTC = data2.data.BTC;
            this.pair_table_dataTRX = data2.data.TRX;
            this.pair_table_dataETH = data2.data.ETH;
            this.tickers = data2.tickers;
            this.pairChange("USDT")
        },
        webSocketSubs() {
            const ticker_subs = this.tickers.map((v) => {
                return v.toLowerCase() + "@ticker";
            });
            //  console.log("Starting connection2 to WebSocket Server");
            this.connection2 = new WebSocket("wss://stream.binance.com:9443/ws");

            this.connection2.onopen = function () {
                // console.log("Successfully connected to the echo websocket server...");
            };

            var ccStreamer = this.connection2;

            this.connection2.onopen = function onStreamOpen() {
                // console.log("Stream Open");
                var subRequest2 = {
                    method: "SUBSCRIBE",
                    params: ticker_subs,
                    id: 1,
                };
                ccStreamer.send(JSON.stringify(subRequest2));
            };

            this.connection2.onclose = function () {
                // console.log(
                //   "Successfully disconnected to the echo websocket server..."
                // );
            };
        },

        pairChange(pair) {

            var x = [];
            this.tab = pair;
            if (pair == "USDT") {
                x = this.pair_table_data = this.pair_table_dataUSDT;
            } else if (pair == "BTC") {
                x = this.pair_table_data = this.pair_table_dataBTC;
            } else if (pair == "TRX") {
                x = this.pair_table_data = this.pair_table_dataTRX;                
            } else if (pair == "MYV") {
                x = this.pair_table_data = this.pair_table_dataMYV;             
            }

            var $this = this;
            this.connection2.onmessage = function (event) {
                var e_data = event.data;
                e_data = JSON.parse(e_data);

                // for show live data on chart 
                if (e_data.s == "BTCUSDT") {

                    $this.MarketBoxData[0] = $this.getSeriesData({
                        market_pair: 'BTC-USDT',
                        market_change: parseFloat(e_data.P).toFixed(2) >= 0 ? "+" + parseFloat(e_data.P).toFixed(2) : parseFloat(e_data.P).toFixed(2),
                        market_price: parseFloat(e_data.c),
                        market_subprice: parseFloat(e_data.h),
                        color_rgb: parseFloat(e_data.P) >= 0 ? 'rgb(60, 166, 129)' : 'rgb(224, 34, 34)',
                        s_data: $this.dataBTCUSDT
                    });
                    // $this.MarketBoxData[0].chartOptionsSpark3 = parseFloat(e_data.P) >= 0 ? { colors: ['rgb(60, 166, 129)'] } : { colors: ['rgb(224, 34, 34)'] }

                } else if (e_data.s == "ETHUSDT") {

                    $this.MarketBoxData[1] = $this.getSeriesData({
                        market_pair: 'ETH-USDT',
                        market_change: parseFloat(e_data.P).toFixed(2) >= 0 ? "+" + parseFloat(e_data.P).toFixed(2) : parseFloat(e_data.P).toFixed(2),
                        market_price: parseFloat(e_data.c),
                        market_subprice: parseFloat(e_data.h),
                        color_rgb: parseFloat(e_data.P) >= 0 ? 'rgb(60, 166, 129)' : 'rgb(224, 34, 34)',
                        s_data: $this.dataETHUSDT
                    });
                } else if (e_data.s == "TRXUSDT") {

                    $this.MarketBoxData[2] = $this.getSeriesData({
                        market_pair: 'TRX-USDT',
                        market_change: parseFloat(e_data.P).toFixed(2) >= 0 ? "+" + parseFloat(e_data.P).toFixed(2) : parseFloat(e_data.P).toFixed(2),
                        market_price: parseFloat(e_data.c),
                        market_subprice: parseFloat(e_data.h),
                        color_rgb: parseFloat(e_data.P) >= 0 ? 'rgb(60, 166, 129)' : 'rgb(224, 34, 34)',
                        s_data: $this.dataTRXUSDT
                    });
                } else if (e_data.s == "XRPUSDT") {

                    $this.MarketBoxData[3] = $this.getSeriesData({
                        market_pair: 'XRP-USDT',
                        market_change: parseFloat(e_data.P).toFixed(2) >= 0 ? "+" + parseFloat(e_data.P).toFixed(2) : parseFloat(e_data.P).toFixed(2),
                        market_price: parseFloat(e_data.c),
                        market_subprice: parseFloat(e_data.h),
                        color_rgb: parseFloat(e_data.P) >= 0 ? 'rgb(60, 166, 129)' : 'rgb(224, 34, 34)',
                        s_data: $this.dataXRPUSDT
                    });
                }

                x.find((o) => {
                    if (o.symbol == e_data.s) {
                        o.change = parseFloat(e_data.P).toFixed(2);
                        (o.high = parseFloat(e_data.h)),
                        (o.low = parseFloat(e_data.l)),
                        (o.flag = o.price < e_data.c ? 1 : 2);

                        o.price = parseFloat(e_data.c);
                    }
                });
            };
        },

    },

    async created() {
        var chartData = this.$store.getters.getMarketChart
        chartData ? this.setChartData(chartData) : '';
        var data2 = this.$store.getters.getListData
        data2 ? this.setListData(data2) : '';
        this.getChartData();
        this.getListData();

    },
    destroyed() {
        this.connection2.close();
    },
};
</script>

<style scoped>
.market-main {
    background: var(--section-bg);
}

section.market-main-box {
    padding: 80px 0;
}

.row.top-row {
    margin-bottom: 70px;
}

.middle-wrapper {
    background-color: var(--black);
    /* box-shadow: rgb(0 0 0 / 16%) 0px 1px 3px; */
}

.nav-box .nav-tabs {
    border-bottom: none;
}

.nav-box .nav-tabs .nav-link {
    background-color: transparent;
    border: none;
    color: var(--white);
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 0;
    border-radius: 0;
}

.nav-box .nav-tabs .nav-link.active {
    color: var(--white);
    background-color: #393939;
    border-radius: 0;
}

.pair-table {
    background-color: var(--black);
    box-shadow: rgb(100 100 111 / 10%) 0px 7px 16px 0px;
}

table.table {
    margin-bottom: 0;
    border: 1px solid #ccc;
}

.table-hover tbody tr:hover button#trade-btn {
    background: var(--fav-color);
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
}

table.table tbody tr td {
    vertical-align: middle;
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
    color: var(--white);
    cursor: pointer;
}

button#trade-btn {
    width: 120px;
    height: 37px;
    text-align: center;
    border-radius: 2px;
    background: var(--fav-color);
    color: var(--white);
    transition: all 0.3s ease;
    border: none;
    text-transform: capitalize;
}

button#trade-btn:focus {
    box-shadow: none;
}

#exchnage-sidebar-loader {
    position: relative;
    top: 1px;
    left: 590px;
    right: 0;
    margin: 0 auto;
}

@media all and (min-width: 320px) and (max-width: 767px) {
    section.market-main-box {
        padding: 40px 0;
    }

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
