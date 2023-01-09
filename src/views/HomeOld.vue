<template>
  <div class="main-body" style="background-color: #000">
    <section class="banner-sec">
      <div class="container">
        <div class="row align-items-center banner-row-text mb-5">
          <div class="col-xl-6 col-lg-6 col-md-12">
            <div class="banner-info">
              <h1><span>{{BrandName}}</span> Exchange</h1>
              <h2>
                The most trusted <span>cryptocurrency</span> <br> trading <span>platform</span>
              </h2>

              <div class="signup-btn">
                <div class="start-form-box">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                  />
                </div>
                <!--start-form-box-->
                <button type="button" class="btn btn-primary signup-btn-text">
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
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--banner-sec-->

    <section class="change-price">
      <div class="container">
        <CoinChangeMobile v-if="$store.state.isMob" />

        <div class="row upper-row mt-5 mb-3" v-else>
          <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div class="swiper-container">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide>
                  <div class="container">
                    <div class="row exchnage_live_price justify-content-center">
                     
                      <div class="col-xl-2 col-lg-2 col-md-2 col-6" v-for="(coin , index) in coinData " :key="index">
                        <div class="price-main-box">
                          <h4 class="currency-name">
                        
                            {{coin.currency}}/{{coin.pair_with}}
                            <span  :style="changeColor(coin.change)">{{ coin.change}}%</span>
                          </h4>
                          <h5 class="currency-price-text">${{parseFloat(coin.price)}}</h5>
                          <!-- <h6 class="currency-main-price">$48765.35</h6> -->
                        </div>
                        <!--price-main-box-->
                      </div>
            
                    <!--row exchnage_live_price-->
                  </div>
                  </div>
                  <!--container-->
                </swiper-slide>
                <swiper-slide>
                  <div class="container">
                    <div class="row exchnage_live_price justify-content-center">
                      <div class="col-xl-2 col-lg-2 col-md-2 col-6" v-for="(coin , index) in coinData2" :key="index">
                        <div class="price-main-box">
                          <h4 class="currency-name">
                            
                           {{coin.currency}}/{{coin.pair_with}}
                            <span   :style="changeColor(coin.change)">{{ coin.change}}%</span>
                          </h4>
                           <h5 class="currency-price-text">${{parseFloat(coin.price)}}</h5>
                          <!-- <h5 class="currency-price-text">{{coin.price}}</h5> -->
                          <!-- <h6 class="currency-main-price">$48765.35</h6> -->
                        </div>
                        <!--price-main-box-->
                      </div>
                    
                    </div>
                    </div>
                    <!--currency-slide-text-->
                </swiper-slide>


                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
              </swiper>
            </div>
          </div>
        </div>
        <!--row-->

        <div class="row">
          <div class="col-xl-10 col-lg-12 col-md-12 mx-auto">
            <div class="swiper-container-new">
              <swiper class="swiper-new" :options="swiperOptions">
                <swiper-slide class="new-slides" v-for="(allswiper,index) in allswipers" :key="index" >
                 
                  <div class="new_image_box"   >
                    <img
                      loading="lazy"
                      :src="allswiper.image"
                      class="img-fluid"
                      alt=""
                    />
                    
                  </div>
                  <!--new_image_box-->
                </swiper-slide>
            <!-- <swiper-slide class="new-slides">
                  <div class="new_image_box">
                    <img
                      loading="lazy"
                      src="../assets/Landing_Page/news_slide_2.jpg"
                      class="img-fluid"
                      alt=""
                    />
                  </div> 
                </swiper-slide>
                  <swiper-slide class="new-slides">
                  <div class="new_image_box">
                    <img
                      loading="lazy"
                      src="../assets/Landing_Page/news_slide_3.jpg"
                      class="img-fluid"
                      alt=""
                    />
                  </div> 
                </swiper-slide>
                <swiper-slide class="new-slides">
                  <div class="new_image_box">
                    <img
                      loading="lazy"
                      src="../assets/Landing_Page/news_slide_4.jpg"
                      class="img-fluid"
                      alt=""
                    />
                  </div> 
                </swiper-slide>   -->

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
    </section>
    <!--change-price-->

    <section class="coin-list">
      <div class="container-fluid">
        <MainHeading heading_main_title="Coin List" />
        <div class="row">
          <div class="col-xl-11 col-lg-12 col-md-12 mx-auto">
            <div class="coin-wrapper">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" v-for="(tabs_pair, index) in tabs_pair_data"
                        :key="index">
                   <button class="nav-link" id="home-tab" :class="tab == tabs_pair.key ? 'active' : ''"
                          @click="pairChange(tabs_pair.key)" data-bs-toggle="tab" data-bs-target="#gainer" type="button"
                          role="tab" aria-controls="home" aria-selected="true">
                          {{ tabs_pair.value }}
                        </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="gainer"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Market</th>
                        <th scope="col">Price</th>
                        <th scope="col">change 24H</th>
                        <!-- <th scope="col">Chart 24H</th> -->
                        <th scope="col">Trade</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="currency in tableData" :key="currency.symbol">
                        <th scope="row">
                          <div class="market-main market-name">
                            <!-- <img
                              loading="lazy"
                              src="../assets/portfolio_icon/bitcoin_icon.png"
                              alt=""
                              class="img-fluid"
                            /> -->
                            <h6>{{(currency.symbol)}}  </h6>
                          </div>
                        </th>
                        <td>
                          <div class="market-main market-price">
                            <h6 :style="{ color: currency.count > 1 ? 'red' : 'green' }">${{parseFloat(currency.lastPrice)}}</h6>
                          </div>
                        </td>
                        <td>
                          <div class="market-main market-price-high">
                            <div class="high-price-inner">
                              <span class="rate-box rate-up" :style="changeColor(currency.priceChangePercent)">{{currency.priceChangePercent}}</span>
                            </div>
                          </div>
                        </td>
                        <!-- <td>
                          <div class="market-main market-price-chart">
                            <img
                              loading="lazy"
                              src="../assets/Landing_Page/chart-image.png"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                        </td> -->
                        <td>
                          <div class="market-main market-buy-btn">
                            <button type="button" class="btn btn-light">
                              Buy
                            </button>
                          </div>
                        </td>
                      </tr>
                   
                    </tbody>
                  </table>
                </div>
              
              </div>
            </div>
            <!--coin-wrapper-->
          </div>
          <!--col-xl-11 col-lg-12 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--coin-list-->

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
                The <span>{{BrandFullName}} App</span> and <span>Website</span>
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

    <section class="multiple-buy">
      <div class="container">
        <MainHeading
          heading_main_title="Multiple Ways To Buy Crypto"
          heading_main_desc="Your choice if favorite payment methods"
        />

        <div class="row justify-content-center">
          <div class="col-xl-5 col-lg-7 col-md-12 mb-3">
            <div class="multiple-main-box">
              <div class="row multiple-inner-row">
                <div class="col-xl-8 col-lg-8 col-md-8">
                  <div class="multiple-content">
                    <h5>Buy With Visa/Master Card 24/7</h5>
                    <p>
                      Don't miss out on the SAFE & FAST way to <br />
                      get Crypto
                    </p>
                    <a href="javascript:void(0)" class="buy-crypto-btn"
                      >Buy With Cards</a
                    >
                  </div>
                  <!--multiple-content-->
                </div>
                <!--col-xl-8 col-lg-8 col-md-8-->
              </div>
              <!--row multiple-inner-row-->

              <div class="multiple-after-effect"></div>
            </div>
            <!--multiple-main-box-->
          </div>
          <!--col-xl-5 col-lg-6 col-md-12-->

          <div class="col-xl-5 col-lg-7 col-md-12">
            <div class="multiple-main-box">
              <div class="row multiple-inner-row">
                <div class="col-xl-8 col-lg-8 col-md-8">
                  <div class="multiple-content">
                    <h5>Buy With local currency on P2P</h5>
                    <p>
                      Always 0% fee.Multiple payment methods <br />
                      to choose: Bank Trnasfer/ Swift/ Paypal
                    </p>
                    <a href="javascript:void(0)" class="buy-crypto-btn"
                      >Buy Now</a
                    >
                  </div>
                  <!--multiple-content-->
                </div>
                <!--col-xl-8 col-lg-8 col-md-8-->
              </div>
              <!--row multiple-inner-row-->

              <div class="multiple-after-effect"></div>
            </div>
            <!--multiple-main-box-->
          </div>
          <!--col-xl-5 col-lg-6 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--multiple-buy-->

    <section class="join-sec">
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
            <!--currency-change-box-->
          </div>
          <!--col-xl-4 col-lg-4 col-md-5-->

          <div class="col-xl-2 col-lg-2 col-md-2">
            <div class="calculator-arrows">
              <img
                loading="lazy"
                src="../assets/Landing_Page/form-arrow.png"
                alt=""
                class="img-fluid"
              />
            </div>
            <!--calculator-arrows-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-2-->

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
            <!--currency-change-box-->
          </div>
          <!--col-xl-4 col-lg-4 col-md-5-->
        </div>
        <!--row align-items-center-->
      </div>
      <!--container-->
    </section>
    <!--join-sec-->

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
import MainHeading from "@/components/MainHeading.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import GetInTouch from "@/components/GetInTouch.vue";
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
  },
  data() {
    return {
        tab: "core",
        tabs_pair_data: [{key:"core", value:"CORE ASSETS"},{key:"gainer", value:"TOP GAINERS"},{key:"loser", value:"TOP LOSERS"}],
      pair_price:1,
      pair_with_price:'0',
      selectedCoinImg:'',
      selected:'choose',
      BrandName:Brand.name,
      market_currency:[],
      BrandFullName:Brand.brand_name,
      brandHeading:Brand.name + " has a variety of features that make it an ideal place to buy and sell digital assets",

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
          get_title: Brand.name+" Blog",
          get_description:
            " News and updates from the world’s leading cryptocurrency exchange.",
        },

        {
          get_image: get_icon_3,
          get_title: "Community",
          get_description:
            Brand.brand_name+"is global. Join the discussion in our worldwide communities.",
        },

        {
          get_image: get_icon_4,
          get_title: "Careers",
          get_description:
            " Help build the future of technology. Start your new career at " + Brand.brand_name+".",
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
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false,
        // },
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
      allswipers:[],
      dataUsdt:[],
      coinSwiper:[], 
      firstswiperCoin:1,
      binance_All_Market:[],
      tableData : [],
      coreAssetData : [],
      topGainerData : [],
      topLosserData : [],
      tickers : [],
      connection3:"",

      
    };
  },
 async  mounted(){
      var url  = ApiClass.baseUrl;  
      await fetch(url+'banner/get').then(res=> {
        res.json().then(ress=>{
          if(ress.status_code == "1") 
          this.allswipers = ress.data
        });
        console.log("this.allswipers", this.allswipers);
        //  const data2 = await ApiClass.getNodeRequest("list-crypto/get", false); 
 });  

    
  },
  methods:{
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
        pairChange(pair){
          var x = [];
          if(pair == "core"){
           x =  this.tableData =  this.coreAssetData  
          }
          else if(pair == "gainer"){
           x =  this.tableData = this.topGainerData 
          }
         else if(pair == "loser"){
           x =  this.tableData = this.topLosserData  
          }
          
            this.connection3.onmessage = function (event) {
          var e_data = event.data;
          e_data = JSON.parse(e_data);
            x.find((o) => {
            if (o.symbol == e_data.s) { 
             
                (o.count = o.lastPrice < e_data.c ? 1 : 2);
              o.priceChangePercent = parseFloat(e_data.P).toFixed(2);
              

              o.lastPrice = parseFloat(e_data.c);
            }
          });
          }

        },
      async getTopCoin() {
          var response2 = await ApiClass.getNodeRequest('dashboard/market-gainers', false)
        var coinData = response2.data; 
      
      this.$store.commit("SET_TOP_COIN_DATA", coinData.data);
      this.setTopCoin(coinData.data);     
      this.pairChange(this.tab)
    },
    setTopCoin(coindata) { 
      // console.log(coindata)
      this.coreAssetData = coindata.core_data
      this.topGainerData = coindata.gainers
      this.topLosserData = coindata.losers
      this.tickers = coindata.tickers
       this.webSocketSubs();
      this.pairChange(this.tab)
      
    },
      changeColor(change){
     return  change >=0 ? "color: var(--green) ": "color: var(--red)"

    },
    currencySelect(){
      this.oldprice = parseFloat(this.selected.price)
      this.selectedCoinImg = this.selected.image
      this.pair_with_price = parseFloat(this.selected.price);
 
    }
  },
  watch:{
    pair_price : function(value){
    this.pair_with_price =  this.selected == "choose" ? '0' : value * this.oldprice;
       
    }
  },
    async created(){
         var response2 = await ApiClass.getNodeRequest('list-crypto/get', false)
       var  data2 = response2.data; 
   
     this.$store.commit("SET_LIST_DATA", data2); 
     this.coinSwiper = this.dataUsdt = data2.data.USDT;

       var topCoinData = this.$store.getters.getTopCoin; 
    topCoinData ? this.setTopCoin(topCoinData) : "";
    this.getTopCoin();
     
  },
    destroyed() { 
  
    this.connection3.close();
  },
  computed:{
  
    coinData(){ 
      return this.coinSwiper.slice(0,5)   
    },
    coinData2(){
       return this.coinSwiper.slice(5,10)
    }
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

section.change-price {
  padding-bottom: 30px;
}

.swiper {
  width: auto;
  height: 150px;
}

.currency-slide-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* .swiper-slide {
  display: flex;
  align-items: center;
} */

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
  padding-bottom: 5px;
  color: #fff;
}

.price-main-box h6 {
  margin-bottom: 0;
  color: rgb(183, 189, 198);
  font-weight: 400;
}

.new-slides.swiper-slide {
  justify-content: center;
}

.new_image_box img {
  border-radius: 4px;
}

.swiper-container-new .swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 25px;
  color: #000;
}

.swiper-button-prev.bottom-btn-prev {
  height: 50px;
  width: 50px;
  background-color: #fff;
  border-radius: 29px;
}

.swiper-button-next.bottom-btn-next {
  height: 50px;
  width: 50px;
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

.coin-list {
  padding: 80px 0;
}

.coin-wrapper ul.nav-tabs {
  margin-bottom: 45px;
  border-bottom: none;
  justify-content: center;
}

.coin-wrapper ul.nav-tabs .nav-link {
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  color: #000;
  font-size: 18px;
  margin-left: 30px;
}

.coin-wrapper ul.nav-tabs .nav-link.active {
  border-bottom: 3px solid #000;
}

.coin-wrapper {
  padding: 24px 24px;
  border-radius: 4px;
  border: 1px solid rgba(223, 226, 231, 0.8);
  box-shadow: 0 6px 8px 0 rgb(47 76 116 / 8%);
  background-color: #fff;
}

table.table tbody {
  border-top: none;
}

table.table tbody tr td {
  vertical-align: middle;
}

table.table tbody tr {
  transition: all 0.5s ease;
  cursor: pointer;
}


table.table tbody tr th {
  vertical-align: middle;
}

.market-main.market-name {
  display: flex;
  align-items: center;
}

.market-main.market-name img {
  max-width: 28px;
}

.market-main.market-name h6 {
  padding-left: 10px;
}

.market-main h6 {
  margin-bottom: 0;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 17px;
  color: #000;
}

.market-main.market-name h6 span {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #a9a6a6;
}

.high-price-inner {
  width: 107px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaf6f3;
}

.market-main.market-price-high span.rate-box.rate-up {
  color: #12b886;
}

table.table thead tr th {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  color: #000;
}

.market-main .btn-light {
  background-color: var(--green);
  text-transform: uppercase;
  font-size: 15px;
  color: #fff;
  width: 70px;
  font-weight: 600;
}

.market-main .btn-light:focus {
  box-shadow: none;
}

.low-price-inner {
  width: 107px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #feeeee;
}

.market-main.market-price-low span.rate-box.rate-low {
  color: #fa5252;
}
/****==== COIN LIST CSS FINISH ====****/
/****==== MOBILE APP CSS START ====****/

.mobile-app-sec {
  /* background-image: url(../assets/Landing_Page/mobile_app_bg.svg); */
  background: #000000;
  background: linear-gradient(to left, #303030, #000000);
  height: 750px;
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
/****==== MULTIPLE BUY CSS START ====****/

.multiple-buy {
  padding: 80px 0;
}

.multiple-main-box {
  border-radius: 4px;
  padding: 25px 20px;
  background-color: #f3f7ff;
  position: relative;
  overflow: hidden;
}

.multiple-main-box::after,
.multiple-main-box::before {
  z-index: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  display: inline-block;
  content: "";
}

.multiple-main-box::before {
  top: -119px;
  right: -80px;
  width: 240px;
  height: 240px;
  background-image: -webkit-gradient(linear,left top,left bottom,from(#cfdfff),to(rgba(228, 237, 255, 0)));
  background-image: -o-linear-gradient(top, #cfdfff 0,rgba(228, 237, 255, 0) 100%);
  background-image: linear-gradient(180deg, #cfdfff, rgba(228, 237, 255, 0));
}

.multiple-main-box::after {
  top: -49px;
  right: -10px;
  width: 100px;
  height: 100px;
  background-color: #f3f7ff;
}

.multiple-content {
  position: relative;
  z-index: 1;
}

.multiple-content h5 {
  color: #1c242c;
  font-size: 17px;
  font-weight: 600;
  line-height: 21px;
  margin: 0;
  padding-bottom: 10px;
  text-transform: uppercase;
}

.multiple-content p {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #000;
  padding-bottom: 30px;
  line-height: 22px;
}

.multiple-content a.buy-crypto-btn {
  color: #fff;
  overflow: hidden;
  padding: 12px 32px;
  position: relative;
  border-radius: 4px;
  background-color: #0066ed;
  -webkit-box-shadow: 0 4px 18px #a5c3ff;
  box-shadow: 0 4px 18px #a5c3ff;
  text-decoration: none;
}

.multiple-after-effect {
  right: 117px;
  bottom: -82px;
  z-index: 0;
  width: 155px;
  height: 155px;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  display: inline-block;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#e4edff),
    to(rgba(228, 237, 255, 0))
  );
  background-image: -o-linear-gradient(
    top,
    #e4edff 0,
    rgba(228, 237, 255, 0) 100%
  );
  background-image: linear-gradient(180deg, #e4edff, rgba(228, 237, 255, 0));
}

.multiple-after-effect::after {
  content: "";
  top: 48px;
  left: 48px;
  z-index: 0;
  width: 59px;
  height: 59px;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  display: inline-block;
  background-color: #f3f7ff;
}
/****==== MULTIPLE BUY CSS FINISH ====****/
/****==== JOIN CSS START ====****/

section.join-sec {
  background: #000000;
  background: -webkit-linear-gradient(to right, #434343, #000000);
  background: linear-gradient(to right, #434343, #000000);
  padding: 80px 0;
}

.currency-change-box select#inputGroupSelect01 {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  color: #000;
  font-family: "Poppins";
}

.currency-change-box label.input-group-text {
  background-color: #fff;
  border-right: none;
}

.currency-change-box label.input-group-text img {
  max-width: 35px;
}

.currency-change-box select#inputGroupSelect01:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.currency-change-box .form-control {
  min-height: 48px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.currency-change-box .form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.calculator-arrows {
  text-align: center;
}

.calculator-arrows img {
  cursor: pointer;
}
/****==== JOIN CSS FINISH ====****/
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
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .row.banner-row-text {
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
    height: auto;
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
    display: none;
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
