<template>
  <div class="main-body" style="background-color: #000">
    <section class="banner-sec">
      <div class="container">
        <div class="row align-items-center banner-top-row mb-5">
          <div class="col-xl-6 col-lg-6 col-md-12">
            <div class="banner-info">
              <h1>
                <span>{{ BrandName }}</span> Exchange
              </h1>
              <h2>
                The most trusted <span>cryptocurrency</span> <br />
                trading <span>platform</span>
              </h2>

              <div class="signup-btn">
                <div class="start-form-box">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                    v-model.trim="$v.email.$model"
                    autocomplete="off"
                  />
                  <div class="error" v-if="submitted && !$v.email.required">
                    Email is required
                  </div>
                  <div class="error" v-if="submitted && !$v.email.email">
                    This must be an email
                  </div>
                </div>
                <!--start-form-box-->
                <button
                  type="button"
                  @click="nextRegis()"
                  class="btn btn-primary signup-btn-text"
                >
                  Get Started
                </button>
              </div>
              <!--signup-btn-->
            </div>
            <!--banner-info-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->

          <div class="col-xl-6 col-lg-6 col-md-12 order-first order-sm-1">
            <div class="banner-image">
              <img
                src="../assets/Landing_Page/banner.png"
                alt=""
                class="img-fluid"
              />
            </div>
            <!--banner-image-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->
        </div>
        <!--banner-top-row-->

        <CoinChangeMobile v-if="$store.state.isMob" />

        <div class="row bottom-row" v-else>
          <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div class="swiper-container">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide>
                  <div class="container">
                    <div class="row exchnage_live_price justify-content-center">
                      <div
                        class="col-xl-2 col-lg-2 col-md-2 col-6"
                        v-for="(coin, index) in coinData"
                        :key="index"
                      >
                        <div class="price-main-box">
                          <h4 class="currency-name">
                            {{ coin.currency }}/{{ coin.pair_with }}
                            <span :style="changeColor(coin.change)"
                              >{{ coin.change }}%</span
                            >
                          </h4>
                          <h5 class="currency-price-text">
                            ${{ parseFloat(coin.price) }}
                          </h5>
                        </div>
                        <!--price-main-box-->
                      </div>
                      <!--row exchange_live_price-->
                    </div>
                  </div>
                  <!--container-->
                </swiper-slide>
                <swiper-slide>
                  <div class="container">
                    <div class="row exchnage_live_price justify-content-center">
                      <div
                        class="col-xl-2 col-lg-2 col-md-2 col-6"
                        v-for="(coin, index) in coinData2"
                        :key="index"
                      >
                        <div class="price-main-box">
                          <h4 class="currency-name">
                            {{ coin.currency }}/{{ coin.pair_with }}
                            <span :style="changeColor(coin.change)"
                              >{{ coin.change }}%</span
                            >
                          </h4>
                          <h5 class="currency-price-text">
                            ${{ parseFloat(coin.price) }}
                          </h5>
                        </div>
                        <!--price-main-box-->
                      </div>
                    </div>
                  </div>
                  <!--currency-slide-text-->
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--banner-sec-->

    <section class="coin-list">
      <MainHeading heading_main_title="Coin List" />
      <div class="container">
        <div class="row slider-top-row">
          <div class="col-xl-10 col-lg-12 col-md-12 mx-auto">
            <div class="swiper-container-new">
              <swiper class="swiper-new" :options="swiperOptions">
                <swiper-slide
                  class="new-slides"
                  v-for="(allswiper, index) in allswipers"
                  :key="index"
                >
                  <div class="new_image_box">
                    <a :href="allswiper.link" target="blank">
                      <img
                        loading="lazy"
                        :src="allswiper.image"
                        class="img-fluid"
                        alt=""
                      />
                      <!-- {{allswiper}} -->
                    </a>
                  </div>
                  <!--new_image_box-->
                </swiper-slide>
                <div
                  class="swiper-button-prev bottom-btn-prev"
                  slot="button-prev"
                ></div>
                <div
                  class="swiper-button-next bottom-btn-next"
                  slot="button-next"
                ></div>
              </swiper>
            </div>
            <!--swiper-container-->
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-->
      <CoinListTable />
    </section>
    <!--coin-list-sec-->

    <section class="mobile-app-sec">
      <div class="container">
        <MainHeading
          heading_main_title="Start Your Cryptocurrency Journey Today"
          :heading_main_desc="brandHeading"
        />

        <div class="row align-items-center">
          <div class="col-xl-6 col-lg-6 col-md-6">
            <div class="mobile-app-heading">
              <h3>Trade Anytime, Anywhere</h3>
              <h4>
                The <span>{{ BrandFullName }} App</span> and
                <span>Website</span>
                <br />
                offer you an easy and quick way to <br />
                start <span>Trading</span>
              </h4>

              <div class="download-list-box">
                <ul class="mobile-download">
                  <li>
                    <router-link to=""
                      ><img
                        loading="lazy"
                        src="../assets/Landing_Page/banner-sub-image-1.svg"
                        alt=""
                        class="img-fluid"
                    /></router-link>
                  </li>
                  <li>
                    <router-link to=""
                      ><img
                        loading="lazy"
                        src="../assets/Landing_Page/banner-sub-image-2.svg"
                        alt=""
                        class="img-fluid"
                    /></router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!--mobile-app-heading-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->

          <div
            class="
              col-xl-6 col-lg-6 col-md-6
              mobile-postion-box
              order-first order-sm-1
            "
          >
            <div class="laptop-image-box">
              <img
                loading="lazy"
                src="../assets/Landing_Page/banner.png"
                alt=""
                class="img-fluid"
              />
            </div>
            <!--laptop-image-box-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--mobile-app-sec-->

    <section class="why-choose">
      <div class="container">
        <MainHeading
          heading_main_title="Why choose us?"
          heading_main_desc="Proven track record  operation by holding the principles of Security, Transparency and Integrity"
        />

        <div class="row justify-content-center">
          <div
            class="col-xl-3 col-lg-6 col-md-6"
            v-for="(ChooseBox, index) in ChooseBoxData"
            :key="index"
          >
            <ChooseBox :Choose="ChooseBox" />
          </div>
          <!--col-xl-3 col-lg-3 col-md-6-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--why-choose-->

    <!-- <section class="join-sec">
      <div class="container">
        <MainHeading
          heading_main_title="Exchange Calculator"
          heading_main_desc="Find out the current bitcoin value with our easy-to-use converter"
        />

        <div class="row align-items-center justify-content-center">
          <div class="col-xl-4 col-lg-5 col-md-5">
            <div class="currency-change-box">
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01"
                  ><img
                    loading="lazy"
                    :src="selectedCoinImg"
                    alt=""
                    class="img-fluid"
                /></label>
                <select class="form-select" v-model="selected" @change="currencySelect" id="inputGroupSelect01"  >
                  <option value="choose">Choose...</option>
                  <option v-for="(coin, index) in dataUsdt" :key="index" :value="coin">{{coin.currency}}</option>
                 
                </select>
              </div>

              <div class="input-group">
                <input onpaste="return false;"
                onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == 1)))"
                v-model="pair_price"
                  type="text"
                  class="form-control"
                  placeholder=""
                  aria-label=""
                />
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-lg-2 col-md-2">
            <div class="calculator-arrows">
              <img
                loading="lazy"
                src="../assets/Landing_Page/form-arrow.png"
                alt=""
                class="img-fluid"
              />
            </div>
          </div>

          <div class="col-xl-4 col-lg-5 col-md-5">
            <div class="currency-change-box">
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01"
                  ><img
                    loading="lazy"
                    src="../assets/tether.png"
                    alt=""
                    class="img-fluid"
                /></label>
                <select class="form-select" id="inputGroupSelect01"> 
                  <option value="USDT">USDT</option> 
                </select>
              </div>

              <div class="input-group">
                <input
                disabled
                v-model="pair_with_price"
                  type="text"
                  class="form-control"
                  placeholder=""
                  aria-label=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section class="get_in_touch">
      <div class="container">
        <MainHeading heading_main_title="Get In Touch" />

        <div class="row">
          <div
            class="col-xl-3 col-lg-6 col-md-6 mb-3"
            v-for="(get, index) in get_in_touch_data"
            :key="index"
          >
            <GetInTouch :Get="get" />
          </div>
          <!--col-xl-3 col-lg-3 col-md-3-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--get_in_touch-->

    <section class="community-sec">
      <div class="container">
        <div class="row align-items-end justify-content-center mb-4">
          <div class="col-xl-6 col-lg-6 col-md-6">
            <div class="community-heading">
              <h2>Join The Community</h2>
              <p>Join the conversation in any of our worldwide communities</p>
            </div>
            <!--community-heading-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->

          <div class="col-xl-6 col-lg-6 col-md-6 order-first order-sm-1">
            <div class="community-image">
              <img
                loading="lazy"
                src="../assets/Landing_Page/community-image.png"
                alt=""
                class="img-fluid"
              />
            </div>
            <!--community-image-->
          </div>
          <!--col-xl-6 col-lg-6 col-md-6-->
        </div>
        <!--row-->

        <div class="row link-bottom-row mt-5">
          <div
            class="col-xl-4 col-lg-4 col-md-4"
            v-for="(social, index) in Social_Links_Data"
            :key="index"
          >
            <SocialLinks :Social="social" />
          </div>
          <!--col-xl-4 col-lg-4 col-md-4-->
        </div>
        <!--row link-bottom-row-->
      </div>
      <!--container-->
    </section>
    <!--community-sec-->
  </div>
</template>

<script>
import ApiClass from "@/api/api";
import Brand from "../assets/brand/name.json";
import { required, email } from "vuelidate/lib/validators";
import MainHeading from "@/components/MainHeading.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import GetInTouch from "@/components/GetInTouch.vue";
import CoinListTable from "@/components/CoinListTable.vue";
import ChooseBox from "@/components/ChooseBox.vue";
import CoinChangeMobile from "@/views/Mobile_Sections/CoinChangeMobile.vue";
import get_icon_1 from "@/assets/Landing_Page/get-icon-1.png";
import get_icon_2 from "@/assets/Landing_Page/get-icon-2.png";
import get_icon_3 from "@/assets/Landing_Page/get-icon-3.png";
import get_icon_4 from "@/assets/Landing_Page/get-icon-4.png";
export default {
  name: "Home",
  components: {
    MainHeading,
    SocialLinks,
    GetInTouch,
    CoinChangeMobile,
    CoinListTable,
    ChooseBox,
  },
  data() {
    return {
      email: null,
      submitted: false,
      tab: "core",
      tabs_pair_data: [
        {
          key: "core",
          value: "CORE ASSETS",
        },
        {
          key: "gainer",
          value: "TOP GAINERS",
        },
        {
          key: "loser",
          value: "TOP LOSERS",
        },
      ],
      pair_price: 1,
      pair_with_price: "0",
      selectedCoinImg: "",
      selected: "choose",
      BrandName: Brand.name,
      market_currency: [],
      BrandFullName: Brand.brand_name,
      brandHeading:
        Brand.name +
        " has a variety of features that make it an ideal place to buy and sell digital assets",

      Social_Links_Data: [
        {
          icon_name: "fab fa-telegram-plane",
          link_name: "Telegram",
        },

        {
          icon_name: "fab fa-twitter",
          link_name: "Twitter",
        },

        {
          icon_name: "fab fa-youtube",
          link_name: "Youtube",
        },
      ],

      get_in_touch_data: [
        {
          get_image: get_icon_1,
          get_title: "24 / 7 Support",
          get_description:
            " Got a problem? Just get in touch. Our support team is available 27/7",
        },

        {
          get_image: get_icon_2,
          get_title: Brand.name + " Blog",
          get_description:
            " News and updates from the world’s leading cryptocurrency exchange.",
        },

        {
          get_image: get_icon_3,
          get_title: "Community",
          get_description:
            Brand.brand_name +
            "is global. Join the discussion in our worldwide communities.",
        },

        {
          get_image: get_icon_4,
          get_title: "Careers",
          get_description:
            " Help build the future of technology. Start your new career at " +
            Brand.brand_name +
            ".",
        },
      ],

      swiperOption: {
        direction: "vertical",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },

      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 50,
        // loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
      allswipers: [],
      dataUsdt: [],
      coinSwiper: [],
      firstswiperCoin: 1,
      binance_All_Market: [],
      tableData: [],
      coreAssetData: [],
      topGainerData: [],
      topLosserData: [],
      tickers: [],
      connection3: "",

      ChooseBoxData: [
        {
          choose_icon: require("@/assets/Landing_Page/choose_icon_1.png"),
          choose_head: "Comprehensive protection with security and law funds",
          choose_info:
            "Myvee protects your funds with both centralized and decentralized methods. It is also the first exchange to invest millions in security and law funds to add extra protection for your assets.",
        },

        {
          choose_icon: require("@/assets/Landing_Page/choose_icon_2.png"),
          choose_head: "Efficient trading and instant deposit/withdrawal",
          choose_info:
            "As an established exchange with cutting-edge technology, Bitqix Exchange offers an efficient and convenient trading system as well as an instant deposit and withdrawal service.",
        },

        {
          choose_icon: require("@/assets/Landing_Page/choose_icon_3.png"),
          choose_head: "Stable and reliable since 2020",
          choose_info:
            "Myvee Exchange has been operating stably and reliably. With our constant exploration of innovative technologies, we strive to offer you the best trading experience.",
        },

        {
          choose_icon: require("@/assets/Landing_Page/choose_icon_4.png"),
          choose_head: "An exchange that lives up to your expectations",
          choose_info:
            "As one of the earliest and largest cryptocurrency exchanges, Gate.io always complies strictly with regulations and has never allowed for market manipulation. We are continuously committed to being open, transparent, and cooperative.",
        },
      ],
    };
  },
  validations: {
    email: { required, email },
  },
  async mounted() {
    var url = ApiClass.baseUrl;
    await fetch(url + "banner/get").then((res) => {
      res.json().then((ress) => {
        if (ress.status_code == "1") this.allswipers = ress.data;
      });
      console.log("this.allswipers", this.allswipers);
      //  const data2 = await ApiClass.getNodeRequest("list-crypto/get", false);
    });
  },
  methods: {
    webSocketSubs() {
      const ticker_subs = this.tickers;

      this.connection3 = new WebSocket("wss://stream.binance.com:9443/ws");

      this.connection3.onopen = function () {
        // console.log("Successfully connected to the echo websocket server...");
      };

      var ccStreamer = this.connection3;

      this.connection3.onopen = function onStreamOpen() {
        // console.log("Stream Open");
        var subRequest2 = {
          method: "SUBSCRIBE",
          params: ticker_subs,
          id: 1,
        };
        ccStreamer.send(JSON.stringify(subRequest2));
      };

      this.connection3.onclose = function () {
        // console.log(
        //   "Successfully disconnected to the echo websocket server..."
        // );
      };
    },
    nextRegis() {
      //  to="{, params: { email: 123 }}"
      this.submitted = true;
      if (this.$v.email.$invalid) {
        return;
      }
      this.submitted = false;
      this.$router.push({
        name: "SignUp",
        params: {
          email: this.email,
        },
      });
    },
    pairChange(pair) {
      var x = [];
      if (pair == "core") {
        x = this.tableData = this.coreAssetData;
      } else if (pair == "gainer") {
        x = this.tableData = this.topGainerData;
      } else if (pair == "loser") {
        x = this.tableData = this.topLosserData;
      }

      this.connection3.onmessage = function (event) {
        var e_data = event.data;
        e_data = JSON.parse(e_data);
        x.find((o) => {
          if (o.symbol == e_data.s) {
            o.count = o.lastPrice < e_data.c ? 1 : 2;
            o.priceChangePercent = parseFloat(e_data.P).toFixed(2);

            o.lastPrice = parseFloat(e_data.c);
          }
        });
      };
    },
    async getTopCoin() {
      var response2 = await ApiClass.getNodeRequest(
        "dashboard/market-gainers",
        false
      );
      var coinData = response2.data;

      this.$store.commit("SET_TOP_COIN_DATA", coinData.data);
      this.setTopCoin(coinData.data);
      this.pairChange(this.tab);
    },
    setTopCoin(coindata) {
      // console.log(coindata)
      this.coreAssetData = coindata.core_data;
      this.topGainerData = coindata.gainers;
      this.topLosserData = coindata.losers;
      this.tickers = coindata.tickers;
      this.webSocketSubs();
      this.pairChange(this.tab);
    },
    changeColor(change) {
      return change >= 0 ? "color: var(--green) " : "color: var(--red)";
    },
    currencySelect() {
      this.oldprice = parseFloat(this.selected.price);
      this.selectedCoinImg = this.selected.image;
      this.pair_with_price = parseFloat(this.selected.price);
    },
  },
  watch: {
    pair_price: function (value) {
      this.pair_with_price =
        this.selected == "choose" ? "0" : value * this.oldprice;
    },
  },
  async created() {
    var response2 = await ApiClass.getNodeRequest("list-crypto/get", false);
    var data2 = response2.data;

    this.$store.commit("SET_LIST_DATA", data2);
    this.coinSwiper = this.dataUsdt = data2.data.USDT;

    var topCoinData = this.$store.getters.getTopCoin;
    topCoinData ? this.setTopCoin(topCoinData) : "";
    this.getTopCoin();
  },
  destroyed() {
    this.connection3.close();
  },
  computed: {
    coinData() {
      return this.coinSwiper.slice(0, 5);
    },
    coinData2() {
      return this.coinSwiper.slice(5, 10);
    },
  },
};
</script>

<style scoped>
.banner-sec {
  background: #000000;
  background: linear-gradient(to left, #303030, #000000);
  height: 80vh;
  display: flex;
  align-items: center;
}

.banner-info h1 {
  color: #fff;
  text-transform: uppercase;
  font-size: 55px;
  margin: 0;
  font-weight: 300;
  padding-bottom: 6px;
}

.banner-info h1 span {
  font-weight: 600;
}

.banner-info h2 {
  color: #fff;
  font-weight: 300;
  line-height: 42px;
  margin: 0;
  font-size: 29px;
  padding-bottom: 15px;
  text-transform: uppercase;
}

.banner-info h2 span {
  text-transform: uppercase;
  font-weight: 600;
}

.signup-btn {
  display: flex;
  align-items: center;
}

.start-form-box .form-control {
  min-height: 50px;
  min-width: 260px;
  border-radius: 2px;
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.start-form-box .form-control:focus {
  box-shadow: none;
  border-color: #fff;
}

.signup-btn .signup-btn-text {
  width: auto;
  background-color: transparent;
  border-color: #fff;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  min-width: 150px;
  min-height: 50px;
  transition: all 0.5s ease;
  margin-left: 14px;
  border-radius: 2px;
}

.signup-btn .signup-btn-text:hover {
  transition: all 0.5s ease;
  background-color: #fff;
  color: #000;
}

.signup-btn .signup-btn-text:focus {
  box-shadow: none;
}
/****==== CHANGE PRICE CSS START ====****/

.row.bottom-row {
  margin-top: 130px;
}

.swiper {
  width: auto;
  height: 50px;
}

.currency-slide-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-main-box h4 {
  margin-bottom: 0;
  font-size: 18px;
  text-transform: uppercase;
  padding-bottom: 5px;
  color: #fff;
}

.price-main-box h4 span {
  font-size: 15px;
}

.price-main-box h5 {
  font-size: 16px;
  margin-bottom: 0;
  color: #fff;
}

.new-slides.swiper-slide {
  justify-content: center;
}
.new_image_box {
  text-align: center;
}

.new_image_box img {
  border-radius: 4px;
}

.swiper-container-new .swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 20px;
  color: #000;
}

.swiper-button-prev.bottom-btn-prev {
  height: 35px;
  width: 35px;
  background-color: #fff;
  border-radius: 29px;
}

.swiper-button-next.bottom-btn-next {
  height: 35px;
  width: 35px;
  background-color: #fff;
  border-radius: 29px;
}

.new_image_box {
  overflow: hidden;
}

.new_image_box img {
  transition: all 0.5s ease;
  cursor: pointer;
}

.new_image_box:hover.new_image_box img {
  transform: scale(1.1);
  transition: all 0.5s ease;
}
/****==== CHANGE PRICE CSS FINISH ====****/
/****==== COIN LIST CSS START ====****/

section.coin-list {
  background-color: #fff;
  padding: 80px 0;
  padding-bottom: 80px;
}

.row.slider-top-row {
  margin-bottom: 100px;
}
/****==== COIN LIST CSS FINISH ====****/
/****==== MOBILE APP CSS START ====****/

.mobile-app-sec {
  background: #000000;
  background: linear-gradient(to left, #303030, #000000);
  min-height: 950px;
  padding: 80px 0;
  display: flex;
  align-items: center;
}

.mobile-app-heading h3 {
  font-size: 50px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
  margin-bottom: 55px;
  font-family: "Poppins";
  position: relative;
}

.mobile-app-heading h3::before {
  position: absolute;
  content: "";
  background-color: #ccc;
  height: 3px;
  width: 150px;
  bottom: -19px;
  left: 0;
}

.mobile-app-heading h3::after {
  position: absolute;
  content: "";
  background-color: #ccc;
  height: 3px;
  width: 160px;
  bottom: -26px;
  left: 0;
}

.mobile-app-heading h4 {
  color: #fff;
  font-weight: 300;
  line-height: 43px;
  margin: 0;
  font-size: 29px;
  padding-bottom: 30px;
  text-transform: capitalize;
}

.mobile-app-heading h4 span {
  text-transform: uppercase;
  font-weight: 600;
}

.download-list-box ul.mobile-download {
  padding: 0;
  margin: 0;
}

.download-list-box ul.mobile-download li {
  display: inline-block;
  padding-left: 16px;
}

.download-list-box ul.mobile-download li:nth-child(1) {
  padding-left: 0;
}

.download-list-box ul.mobile-download li a {
  text-decoration: none;
}

.download-list-box ul.mobile-download li a img {
  max-width: 150px;
  height: 44px;
  transition: all 0.5s ease;
}

.download-list-box ul.mobile-download li a img:hover {
  transform: translate(0px, -10px);
  transition: all 0.5s ease;
}
/****==== MOBILE APP CSS FINISH ====****/
/****==== CHOOSE SEC CSS START ====****/

.why-choose {
  padding: 80px 0;
  background-color: #fff;
  min-height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/****==== CHOOSE SEC CSS FINISH ====****/
/****==== GET IN TOUCH CSS START ====****/

.get_in_touch {
  padding: 80px 0;
}
/****====  GET IN TOUCH CSS FINISH ====****/
/****==== COMMUNITY SEC CSS START ====****/

.community-sec {
  padding: 80px 0;
}

.community-image {
  text-align: end;
}

.community-heading h2 {
  margin: 0;
  padding-bottom: 13px;
  text-transform: uppercase;
  font-size: 45px;
  color: #fff;
  font-weight: 500;
}

.community-heading p {
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}
/****==== COMMUNITY SEC CSS FINISH ====****/
/****==== MEDIA QUERY CSS START ====****/

@media all and (min-width: 1200px) and (max-width: 1399px) {
  .banner-sec {
    height: 60vh;
  }
  .multiple-main-box {
    min-height: 240px;
  }
  .multiple-content h5 {
    font-size: 16px;
  }
  .multiple-content p {
    font-size: 14px;
  }
  .multiple-content p br {
    display: none;
  }
    .price-main-box h4 {
    font-size: 14px;
  }
  .price-main-box h4 span {
    font-size: 12px;
  }
  .price-main-box h5 {
    font-size: 14px;
  }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
  .banner-sec {
    height: 60vh;
  }
  .banner-info h2 {
    font-size: 28px;
  }
  .swiper-button-prev.bottom-btn-prev {
    display: none;
  }
  .swiper-button-next.bottom-btn-next {
    display: none;
  }
  .mobile-app-sec {
    height: auto;
    padding: 40px 0;
  }
  .mobile-app-heading h4 br {
    display: none;
  }
  .community-heading h2 {
    font-size: 40px;
  }
  .community-heading p {
    font-size: 15px;
  }

  .price-main-box h4 {
    font-size: 14px;
  }
  .price-main-box h4 span {
    font-size: 12px;
  }
    .price-main-box h5 {
    font-size: 14px;
  }
  
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .banner-info h1 {
    font-size: 50px;
  }
  .banner-info h2 {
    font-size: 28px;
  }
  .swiper-button-prev.bottom-btn-prev {
    display: none;
  }
  .swiper-button-next.bottom-btn-next {
    display: none;
  }
  .mobile-app-sec {
    height: auto;
    padding: 40px 0;
  }
  .mobile-app-heading h4 br {
    display: none;
  }
  .community-heading h2 {
    font-size: 40px;
  }
  .community-heading p {
    font-size: 15px;
  }

  .price-main-box h4 {
    font-size: 14px;
  }
  .price-main-box h4 span {
    font-size: 12px;
  }
    .price-main-box h5 {
    font-size: 14px;
  }
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .row.banner-top-row {
    flex-direction: column-reverse;
  }
  .banner-info {
    text-align: center;
  }
  .banner-info h1 {
    font-size: 40px;
  }
  .banner-info h2 {
    font-size: 26px;
  }
  .banner-image {
    margin-bottom: 30px;
    text-align: center;
  }
  .banner-image img {
    max-width: 450px;
  }
  .signup-btn {
    max-width: 450px;
    margin: 0 auto;
  }
  .change-price {
    padding-top: 30px;
  }
  .swiper-button-prev.bottom-btn-prev {
    display: none;
  }
  .swiper-button-next.bottom-btn-next {
    display: none;
  }
  .coin-list {
    padding: 40px 0;
  }
  .mobile-app-sec {
    min-height: 650px;
    padding: 40px 0;
  }
  .mobile-app-heading h3 {
    font-size: 30px;
    margin-bottom: 45px;
  }
  .mobile-app-heading h4 {
    font-size: 23px;
    line-height: 33px;
  }
  .mobile-app-heading h4 br {
    display: none;
  }
  .multiple-main-box {
    max-width: 550px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .get_in_touch {
    padding: 40px 0;
  }
  .community-sec {
    padding: 40px 0;
  }
  .community-heading h2 {
    font-size: 30px;
  }
  .community-heading p {
    text-align: center;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .banner-sec {
    height: 80vh;
  }
  .banner-image {
    margin-bottom: 28px;
  }
  .banner-info h1 {
    font-size: 32px;
    text-align: center;
  }
  .banner-info h2 {
    font-size: 22px;
    text-align: center;
    line-height: 32px;
  }
  .banner-info h2 br {
    display: none;
  }
  .signup-btn {
    text-align: center;
    display: block;
  }
  .start-form-box .form-control {
    margin-bottom: 15px;
  }
  .coin-list {
    display: block;
  }
  .change-price {
    padding-top: 30px;
  }
  .swiper-button-prev.bottom-btn-prev {
    display: none;
  }
  .swiper-button-next.bottom-btn-next {
    display: none;
  }
  .mobile-app-sec {
    height: auto;
    padding: 40px 0;
  }
  .mobile-app-heading h3 {
    text-align: center;
    font-size: 30px;
  }
  .mobile-app-heading h3::before {
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .mobile-app-heading h3::after {
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .mobile-app-heading h4 {
    line-height: 31px;
    font-size: 20px;
    text-align: center;
  }
  .mobile-app-heading h4 br {
    display: none;
  }
  .download-list-box ul.mobile-download {
    text-align: center;
  }
  .download-list-box ul.mobile-download li {
    padding-left: 12px;
  }
  .laptop-image-box {
    margin-bottom: 30px;
  }
  .multiple-main-box {
    margin-bottom: 25px;
  }
  .multiple-content {
    text-align: center;
  }
  .multiple-content h5 {
    line-height: 27px;
  }
  .multiple-content p br {
    display: none;
  }
  section.join-sec {
    padding: 40px 0;
  }
  .calculator-arrows {
    margin: 25px 0;
  }
  .get_in_touch {
    padding: 40px 0;
  }
  .community-sec {
    padding: 40px 0;
  }
  .community-image {
    margin-bottom: 25px;
  }
  .community-heading h2 {
    text-align: center;
    line-height: 46px;
  }
  .community-heading p {
    text-align: center;
  }
  .main-link-box {
    padding: 15px 11px;
  }
}
</style>
