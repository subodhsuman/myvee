<template>
  <div class="" id="main-exchange">
    <!--`maind ${!theme_checked ? 'night' : ''}`-->
    <!-- Webiste View -->
    <section class="exchange_main_sec">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-2 col-lg-3 col-md-12">
            <ExchangeSidebar />
          </div>
          <!--col-xl-2 col-lg-4 col-md-12-->

          <div class="col-xl-8 col-lg-6 col-md-12">
            <div class="row inner-row mb-3">
              <div
                class="col-xl-12 col-lg-12 col-md-12 mb-3 exchange_upper_col"
              >
                <ExchangeUpperBox :key="top_bar_key" />
              </div>
              <!--col-xl-12 col-lg-12 col-md-12-->

              <div class="col-xl-12 col-lg-12 col-md-12">
                <!-- <VueTradingView
                  :options="{
                    autosize: true,
                    symbol: 'BTCUSDT',
                    interval: 'D',
                    timezone: 'Etc/UTC',
                    theme: 'light',
                  }"
                /> -->
                <!-- <VueTradingViewChart/> -->
                <ChartNew :key="chart_key" />

                <!--vue_trading_box-->
              </div>
              <!--col-xl-12 col-lg-12 col-md-12-->
            </div>
            <!--row inner-row-->

            <div class="row row_middle_row mb-3" v-if="$store.state.isMob">
              <div class="col-xl-6 col-lg-12 col-md-6 mb-4">
                <OrderCompleted />
              </div>
              <!--col-xl-12 col-lg-12 col-md-6-->

              <div class="col-xl-6 col-lg-12 col-md-6">
                <BuySell :key="buy_sell_key" />
              </div>
              <!--col-xl-12 col-lg-12 col-md-6-->
            </div>
            <!--row order-inner-row-->

            <div class="row bottom_row">
              <div class="col-xl-7 col-lg-12 col-md-6">
                <OrderDepth :key="order_depth_key" />
              </div>
              <!--col-xl-7 col-lg-12 col-md-6-->

              <div class="col-xl-5 col-lg-12 col-md-6">
                <TradeHistory :key="trade_history_key" />
              </div>
              <!--col-xs-5 col-lg-12 col-md-6-->
            </div>
            <!--row bottom_row-->
          </div>
          <!--col-xl-8 col-lg-6 col-md-12-->

          <div class="col-xl-2 col-lg-3 col-md-12" v-if="!$store.state.isMob">
            <div class="row order-inner-row">
               <div v-if="!token">
                  <div class="col-xl-12 col-lg-12 col-md-6 mb-4">
                    <OrderCompleted />
                  </div>


                    <div class="col-xl-12 col-lg-12 col-md-6">
                    <BuySell :key="buy_sell_key" />
                  </div>

                   </div>
                <div v-else>

                    <div class="col-xl-12 col-lg-12 col-md-6">
                    <BuySell :key="buy_sell_key" />
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-6 mb-4">
                    <OrderCompleted />
                  </div>

               </div>
              <!--col-xl-12 col-lg-12 col-md-6-->

          
              <!--col-xl-12 col-lg-12 col-md-6-->
            </div>
            <!--row order-inner-row-->
          </div>
          <!--col-xl-2 col-lg-3 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-fluid-->
    </section>
    <!--exchange_main_sec-->
  </div>
</template>

<script>
import ExchangeSidebar from "@/components/ExchangeSidebar.vue";
import ExchangeUpperBox from "@/components/ExchangeUpperBox.vue";
import TradeHistory from "@/components/TradeHistory.vue";
import OrderDepth from "@/components/OrderDepth.vue";
import OrderCompleted from "@/components/OrderCompleted.vue";
// import BuySell from "@/components/BuySell.vue";
import BuySell from "@/components/BuySellComponent.vue";

import ChartNew from "@/components/ChartNew.vue";
import ApiClass from "../api/api";

export default {
  name: "Exchange",
  components: {
    ExchangeSidebar,
    ExchangeUpperBox,
    // VueTradingViewChart,
    ChartNew,
    OrderDepth,
    OrderCompleted,
    BuySell,
    TradeHistory,
  },
  data() {
    return {
      trade_history_key: 1,
      order_depth_key: 1,
      top_bar_key: 1,
      chart_key: 1,
      buy_sell_key: 1,
      theme_checked: false,
      token:''
    };
  },

  created() {
    // let c_theme = localStorage.getItem("theme_checked");
    // this.theme_checked = c_theme == "true" ? true : false;

    // // Change Chart Color
    // let chartOptions = this.theme_checked
    //   ? 
    //   this.chartColor("#ffffff", "#000000", "#d6dcde")
    //   : 
    //   this.chartColor("#101621", "#808080", "#808080");
    // this.$store.commit("SET_CHART_THEME", chartOptions);

    // console.log( this.trade_history_key,this.order_depth_key,this.top_bar_key,this.chart_key);
    //  this.trade_history_key =  this.order_depth_key = this.top_bar_key = this.chart_key = 1;
  },
  async mounted() {
    let ress = await ApiClass.getNodeRequest("dashboard/all-symbols", false);
    ress = ress.data;
      this.token=localStorage.getItem("token")
    console.log("token is here",this.token);
    // this.$store.commit("SET_EXCHANGE_LIST", ress.data);
  

    let c_slug = this.$route.params.slug;
    if (!ress.data.includes(c_slug)) {
      location.replace("/exchange/BTCUSDT");
    }
  },
  watch: {
    $route: function () {
      this.trade_history_key = this.trade_history_key + 1;
      this.order_depth_key = this.order_depth_key + 1;
      // this.top_bar_key = this.top_bar_key + 1;
      this.chart_key = this.chart_key + 1;
      this.buy_sell_key = this.buy_sell_key + 1;
    },
  },
};
</script>

<style scoped>
.maind {
  min-height: 100%;
}

.maind {
  /* background-image: linear-gradient(
    to bottom,
    #252a44 30%,
    #88d9ff,
    #24206c,
    #e5ebf5 80%
  ); */
  /* color: #333; */
  background-size: 100% 400%;
  background-position: 100% 0%;
  transition: all 0.8s;
}

.night {
  background-position: 100% 100%;
  color: white;
  --test:#000;
  --exchange-bg: #232324;
  --border-color: #9d9797;
  --green: #23ac50;
  --red: #f1432f;
  --black: #fff;
  --white: #000;
  --nav-active: #d6dce2;
  --nav-bg: #101621;
  --serach-border: #ccc;
  --pair-list: #9b9b9b;
  --ticker-border: hsla(0, 0%, 59.2%, 0.2);
  --ticker-sub: #92989b;
  --fav-color: #ff9b00;
  --exchange-scroll: hsl(210deg 4% 78%);
  --box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  --upper-border: #fff;
  --order-nav-bg: #404142;
  --depth-table-head: #bdbdbdf1;
  --order-depth-td: #a8a7a7;
  --login-bg: rgba(19, 16, 16, 0.7);
  --login-span-color: rgb(28, 27, 33);
  --login-border-color: rgba(28, 27, 33, 0.07);
  --chart-tab-btn: rgb(177, 177, 178);
  --limit-tab-bg: #404142;
  --buy-active-color: #fff;
  --bg-red: rgb(255 61 0 / 0.2);
  --bg-green: rgb(43 205 118 / 0.4);
    --cross-white: url('../assets/cross-white.svg')
}

#main-exchange {
  background-color: var(--exchange-bg);
}
section.exchange_main_sec {
  padding: 10px 0;
  overflow: hidden;
  margin-top: 0px;
  padding-bottom: 70px;
  padding-top: 17px;
}

div#vue-trading-view {
  /* height: 40vh; */
  border: 1px solid #ccc;
}

/* @media all and (min-width: 1024px) and (max-width: 1199px) {
  .exchange_upper_col {
    display: none;
  }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .exchange_upper_col {
    display: none;
  }
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .exchange_upper_col {
    display: none;
  }
}

@media all and (min-width: 320px) and (max-width: 768px) {
  .exchange_upper_col {
    display: none;
  }
} */
</style>
