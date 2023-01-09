<template>
    <div>
        <section class="banner-sec">
            <div class="container">
                <div class="row top-row">
                    <div class="col-xl-8 col-lg-8 col-md-8 mx-auto">
                        <div class="banner-info">
                            <h1 style="color:#DCA92D">myvee Exchange</h1>
                            <h2>
                                the most trusted <span>cryptocurrency</span> <br />
                                trading <span>platform</span>
                            </h2>
    
                            <div class="signup-form">
                                <div class="signup-btn">
                                    <div class="start-form-box mx-auto mx-md-0 me-md-3">
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Email" v-model.trim="$v.email.$model" autocomplete="off" />
    
                                    </div>
                                    <!--start-form-box-->
                                    <button type="button" @click="nextRegis()" class="btn btn-primary signup-btn-text">
                                        Get Started
                                    </button>
                                </div>
                                <!--signup-btn-->
    
                                <div class="error text-start" v-if="submitted && !$v.email.required">
                                    Email is required
                                </div>
                                <div class="error text-start" v-if="submitted && !$v.email.email">
                                    This must be an email
                                </div>
                            </div>
                            <!--signup-form-->
                        </div>
                        <!--banner-info-->
                    </div>
                    <!--col-xl-8 col-lg-8 col-md-8-->
                </div>
                <!--row top-row-->
    
                <CoinChangeMobile v-if="$store.state.isMob" />
                <div class="row bottom-row" v-else>
                    <div class="col-xl-12 col-lg-12 col-md-12">
                        <div class="row" v-if="skeletonLoad">
                            <div v-for="item in 4" :key="item" class="col-xl-3 col-lg-3 col-md-3">
                                <span class="test-loader" style="display: inline-block">
                                    <h3 class="test-loader mb-0">
                                        <VueSkeletonLoader type="rect" :width="130" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" />
                                        <span style="display: inline-block">
                                            <VueSkeletonLoader type="rect" :width="60" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" /></span>
                                    </h3>
                                    <h4 class="mb-0">
                                        <VueSkeletonLoader type="rect" :width="200" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" />
                                    </h4>
                                </span>
                            </div>
                        </div>
                        <div class="price-slider">
                            <VueSlickCarousel v-bind="settings" :adaptiveHeight="true">
                                <div class="slider-main-box">
                                    <div class="row slider-inner-row justify-content-center">
                                        <div class="col-xl-3 col-lg-3 col-md-2" v-for="(priceslider, index) in usdtPair.slice(0, 4)" :key="index">
                                            <div class="price-box">
                                                <h3>
                                                    {{ priceslider.currency }}/{{ priceslider.pair_with }}
                                                    <span :style="{
                                  color:
                                    priceslider.change > 0
                                      ? 'var(--green)'
                                      : 'var(--red)',
                                }">{{ priceslider.change }}%</span>
                                                </h3>
                                                <h4>${{ priceslider.price }}</h4>
                                            </div>
                                            <!--price-box-->
                                        </div>
                                        <!--col-xl-2 col-lg-2 col-md-2-->
                                    </div>
                                    <!--row slider-inner-row-->
                                </div>
                                <!--slider-main-box slide-1-->
    
                                <div class="slider-main-box">
                                    <div class="row slider-inner-row justify-content-center">
                                        <div class="col-xl-3 col-lg-3 col-md-2" v-for="(priceslidertwo, index) in usdtPair.slice(4, 8)" :key="index">
                                            <div class="price-box">
                                                <h3>
                                                    {{ priceslidertwo.currency }}/{{
                                priceslidertwo.pair_with
                              }}
                                                    <span :style="{
                                  color:
                                    priceslidertwo.change > 0
                                      ? 'var(--green)'
                                      : 'var(--red)',
                                }">{{ priceslidertwo.change }}%</span>
                                                </h3>
                                                <h4>${{ priceslidertwo.price }}</h4>
                                            </div>
                                            <!--price-box-->
                                        </div>
                                        <!--col-xl-2 col-lg-2 col-md-2-->
                                    </div>
                                    <!--row slider-inner-row-->
                                </div>
                                <!--slider-main-box slide-2-->
                            </VueSlickCarousel>
                        </div>
                        <!--price-slider-->
                    </div>
                    <!--col-xl-12 col-lg-12 col-md-12-->
                </div>
                <!--row bottom-row-->
            </div>
            <!--container-->
        </section>
        <!--banner-sec-->
    
        <section class="startup-sec">
            <div class="container">
                <!-- <Heading  /> -->
                <!-- title="startup" info="Startup Exchange is the largest entrepreneurship community at Myvee Exchange" -->
                <div class="row startup-top-row" v-if="StartupSliderData.length != 0">
                    <div class="col-xl-12 col-lg-12 col-md-12">
                        <div class="subbanner-slider">
                           <VueSlickCarousel v-bind="subbanner"  :adaptiveHeight="true">
                                <div class="subslider" v-for="(startupslider, index) in StartupSliderData" :key="index">
                                    <a :href="startupslider.link" target="blank" class="img-fluid">
                                        <img :src="startupslider.image" class="img-fluid" />
                                    </a>
                                </div>
                            </VueSlickCarousel> 
                        </div>
                      
                    </div>
                   
                </div>
                <!--row startup-top-row-->
    
                <Heading title="coinlist" info="Get access to new digital assets before they appear on other exchanges" />
                <div class="row startup-middle-row mt-3">
                    <div class="col-xl-10 col-lg-12 col-md-12 col-sm-12 mx-auto mb-5">
                        <div class="table-responsive">
                            <table class="table table-borderless text-nowrap">
                                <thead>
                                    <tr v-for="(tableheading, index) in TableHeadingData" :key="index">
                                        <th class="image-head" scope="col"></th>
                                        <th scope="col">{{ tableheading.currencyname }}</th>
                                        <th scope="col">{{ tableheading.currencyprice }}</th>
                                        <th class="volume-head" scope="col">
                                            {{ tableheading.currencyvolume }}
                                        </th>
                                        <th scope="col">{{ tableheading.currencychange }}</th>
                                        <th class="action-head text-center" scope="col">
                                            {{ tableheading.currencyaction }}
                                        </th>
                                    </tr>
                                </thead>
    
                                <tbody v-if="tableLoad">
                                    <tr v-for="item in 6" :key="item">
                                        <th scope="row">
                                            <VueSkeletonLoader type="circle" :width="30" :height="30" animation="wave" color="#adb5bd" wave-color="#fff" />
                                        </th>
                                        <td v-for="item in 5" :key="item">
                                            <VueSkeletonLoader type="rect" :width="130" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" />
                                        </td>
                                    </tr>
                                </tbody>
    
                                <tbody v-if="!tableLoad">
                                    <tr v-for="(tabledata, index) in usdtPair.slice(0, 6)" :key="index">
                                        <th class="image-head" scope="row">
                                            <div class="currency-main-box" id="currency-image">
                                                <img :src="tabledata.image" alt="" style="width:35px" />
                                            </div>
                                        </th>
                                        <td>
                                            <div class="currency-main-box" id="currency-name">
                                                <h6>
                                                    {{ tabledata.currency }}/{{ tabledata.pair_with }}
                                                </h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="currency-main-box" id="currency-price">
                                                <h6>${{ tabledata.price }}</h6>
                                            </div>
                                        </td>
                                        <td class="volume-head">
                                            <div class="currency-main-box" id="currency-price">
                                                <h6>${{ parseFloat(tabledata.volume).toFixed(2) }}</h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="currency-main-box" id="currency-change">
                                                <h6 :style="{
                                color:
                                  tabledata.change > 0
                                    ? 'var(--green)'
                                    : 'var(--red)',
                              }">
                                                    {{ tabledata.change }}%
                                                </h6>
                                            </div>
                                        </td>
                                        <td class="action-head">
                                            <div class="currency-main-box text-center" id="trade-btn">
                                                <router-link :to="'/exchange/' + tabledata.symbol">
                                                    <button type="button" class="btn btn-primary">
                                                        Trade
                                                    </button>
                                                </router-link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--col-xl-10 col-lg-12 col-md-12-->
    
                    <div class="col-xl-10 col-lg-10 col-md-10 mx-auto">
                        <div class="more-link text-center">
                            <router-link to="/market" class="more-text">View More Market</router-link>
                        </div>
                        <!--more-link-->
                    </div>
                    <!--col-xl-10 col-lg-10 col-md-10-->
                </div>
                <!--startup-middle-row-->
            </div>
            <!--container-->
        </section>
        <!--startup-sec-->
    
        <section class="mobile-app-sec">
            <div class="container">
                <Heading title="Trade Anytime, Anywhere" info="Myvee has a variety of features that make it an ideal place to buy and sell digital assets" />
                <div class="row align-items-center mt-5">
                    <div class="col-xl-6 col-lg-6 col-md-7">
                        <div class="app-info">
                            <h6 class="pb-4">
                                The <span> Myvee Exchange App </span>And <span>Website</span><br />
                                Offer You An Easy And Quick Way To <br />
                                <span>Start Trading</span>
                            </h6>
    
                            <div class="qr-box">
                                <div class="qr-image">
                                    <img :src="
                          generateQRCode(
                            'xyztryhhgjdsjkfkshsdcklsjcjsdcljsdjkjsklvjsdvklskdvpdfkvodfk'
                          )
                        " class="qr-code img-fluid" alt="" />
                                </div>
                                <!--qr-image-->
    
                                <div class="qr-info">
                                    <span>scan QR code <br />
                                        download android / IOS app</span>
    
                                    <ul class="link-list mt-5">
                                        <li>
                                            <a href="#">
                                                <div class="link-list-box">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: var(--white)">
                                                        <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.025-1.154-.229-1.729-.764-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"></path>
                                                    </svg>
                                                    <p>Apple</p>
                                                </div>
                                            </a>
                                        </li>
    
                                        <li>
                                            <a href="#">
                                                <div class="link-list-box">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: var(--white)">
                                                        <path d="M18.344 8.71c-.707 0-1.279.572-1.279 1.278v4.53a1.278 1.278 0 1 0 2.558 0v-4.53c0-.706-.572-1.278-1.279-1.278zm-12.688 0c-.707 0-1.279.572-1.279 1.278v4.53a1.278 1.278 0 1 0 2.558 0v-4.53A1.277 1.277 0 0 0 5.656 8.71zm8.889-3.809.768-1.388a.343.343 0 0 0-.133-.47.344.344 0 0 0-.471.135l-.789 1.42c-.588-.235-1.236-.368-1.92-.368s-1.332.132-1.92.367l-.789-1.418a.344.344 0 0 0-.471-.135.345.345 0 0 0-.133.47l.768 1.388C8.072 5.69 7.148 7.099 7.148 8.71c0 .011 0 .021.002.034-.002.006-.002.013-.002.019v.001h9.703V8.71c.001-1.611-.923-3.019-2.306-3.809zM9.76 6.869a.346.346 0 1 1 .005-.693.346.346 0 0 1-.005.693zm4.48 0a.347.347 0 0 1 0-.692.346.346 0 0 1 0 .692zM7.148 16.12c0 .646.525 1.171 1.174 1.171h.586v2.401a1.279 1.279 0 0 0 2.558 0v-2.401h1.066v2.401c0 .707.572 1.278 1.277 1.278.709 0 1.281-.571 1.281-1.278v-2.401h.586c.648 0 1.174-.524 1.174-1.171V9.028H7.148v7.092z"></path>
                                                    </svg>
                                                    <p>Android</p>
                                                </div>
                                            </a>
                                        </li>
    
                                        <li>
                                            <a href="#">
                                                <div class="link-list-box">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: var(--white)">
                                                        <path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.729c.6-.336.929-.812.929-1.34 0-.527-.329-1.004-.928-1.34l-2.783-1.563-3.133 3.132 2.841 2.84zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098L4.1 4.002zm8.854 8.855L4.902 20.91c.154.059.32.09.495.09.312 0 .637-.092.968-.276l9.255-5.197-2.666-2.67z"></path>
                                                    </svg>
                                                    <p>Play Store</p>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <!--qr-info-->
                            </div>
                            <!--qr-box-->
                        </div>
                        <!--app-info-->
                    </div>
                    <!--col-xl-6 col-lg-6 col-md-6-->
                    <div class="col-xl-6 col-lg-6 col-md-5 order-first order-sm-1">
                        <div class="mobile-app-image">
                            <img src="../assets/new_images/anywhere.png" alt="" class="img-fluid" />
                        </div>
                        <!--mobile-app-image-->
                    </div>
                    <!--col-xl-6 col-lg-6 col-md-6-->
                </div>
                <!--row-->
            </div>
            <!--container-->
        </section>
        <!--mobile-app-sec-->
    
        <section class="why-choose-sec">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-4 col-lg-4 col-md-8 mx-auto">
                        <div class="why-choose-image">
                            <img src="../assets/new_images/device.png" alt="devices" />
                        </div>
                    </div>
                    <!--col-xl-4 col-lg-6 col-md-6-->
    
                    <div class="col-xl-8 col-lg-8 col-md-12">
                        <div class="choose-info">
                            <Heading title="Why Choose Us?" info="Proven track record operation by holding the principles of Security, Transparency and Integrity" />
    
                            <div class="row inner-row">
                                <div class="col-xl-6 col-lg-6 col-md-6 mb-4" v-for="(choosedata, index) in ChooseDataBox" :key="index">
                                    <div class="choose-main-box">
                                        <div class="choose-icon align-items-start">
                                            <img :src="require(`@/assets/${choosedata.chooseicon}`)" alt="" class="img-fluid" />
                                            <div>
    
                                            <h4 class="mb-2">{{ choosedata.choosetitle }}</h4>
                                            <div class="choose-info">
                                            <p>{{ choosedata.choosepara }}</p>
                                        </div>
                                            </div>
                                        </div>
                                        <!--choose-icon-->
    
                                        
                                        <!--choose-info-->
                                    </div>
                                    <!--choose-main-box-->
                                </div>
                                <!--col-xl-6 col-lg-6 col-md-6-->
                            </div>
                            <!--row inner-row-->
                        </div>
                        <!--choose-info-->
                    </div>
                    <!--col-xl-8 col-lg-6 col-md-6-->
                </div>
                <!--row-->
            </div>
            <!--container-->
        </section>
        <!--why-choose-sec-->
    
        <section class="join-community">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 top-column">
                        <div class="row join-info-row align-items-center">
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div class="join-info">
                                    <h3 class="mb-0 pb-3">
                                        Grow Your Crypto Portfolio With Myvee App
                                    </h3>
                                    <p class="mb-0">&bull; Check Exchange Rates</p>
                                    <p class="mb-0">&bull; Instant Trading Anytime Anywhere</p>
                                    <p class="mb-0">
                                        &bull; Multi-Platform Support (Android, iOS, Google Play
                                        Store)
                                    </p>
                                </div>
                                <!--join-info-->
                            </div>
                            <!--col-xl-6 col-lg-6 col-md-6-->
    
                            <div class="col-xl-6 col-lg-6 col-md-6 order-first order-sm-1">
                                <div class="join-image text-center">
                                    <img src="../assets/new_images/grow.png" alt="" class="img-fluid" />
                                </div>
                                <!--join-info-->
                            </div>
                            <!--col-xl-6 col-lg-6 col-md-6-->
                        </div>
                        <!--join-info-row-->
                    </div>
                    <!--col-xl-12 col-lg-12 col-md-12-->
    
                    <!-- <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="row join-link-row justify-content-center">
                  <div
                    class="col-xl-2 col-lg-2 col-md-2 col-4"
                    v-for="(joinlist, index) in JoinData"
                    :key="index"
                  >
                    <a href="javascript:void(0)">
                      <div class="join-link-box">
                        <img
                          :src="require(`@/assets/${joinlist.joinicon}`)"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div> -->
                    <!--col-xl-12 col-lg-12 col-md-12-->
                </div>
                <!--row-->
            </div>
            <!--container-->
        </section>
        <!--join-community-->
    
        <section class="start-trading-sec">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-8 mx-auto">
                        <div class="trading-info text-center">
                            <h4 class="pb-4">Start Trading Now</h4>
                            <div class="signup-form pb-4">
                                <div class="signup-btn" id="trading-sign">
                                    <div class="start-form-box mx-auto mx-md-0 me-md-3">
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Email" v-model.trim="$v.email1.$model" autocomplete="off" />
    
                                    </div>
                                    <!--start-form-box-->
                                    <button type="button" @click="nextRegis1()" class="btn btn-primary signup-btn-text">
                                        Get Started
                                    </button>
                                </div>
                                <!--signup-btn-->
                                <div class="error text-start" v-if="submitted1 && !$v.email1.required">
                                    Email is required
                                </div>
                                <div class="error text-start" v-if="submitted1 && !$v.email1.email">
                                    This must be an email
                                </div>
                            </div>
                            <!--signup form-->
                            <span>already have an account?
                                <router-link to="/signup" style="color: var( --signup-btn);
        text-decoration: underline;">Sign in</router-link></span>
                        </div>
                        <!--trading-info-->
                    </div>
                    <!--col-xl-8 col-lg-8 col-md-8-->
                </div>
                <!--row-->
            </div>
            <!--container-->
        </section>
        <!--start-trading-sec-->
    
        <!--modal-->
        <!-- Modal -->
        <!-- <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalElement">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="position-relative">
           <div class="modal_close">
              <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
          </div>
          <div class="modal-body p-0">
          <div class="poster">
             <img src="../assets/modal-img.png" class="img-fluid" alt="poster">
          </div>
          </div>
        </div>
      </div>
    </div> -->
        <!--modal-->
    </div>
    </template>
    
    <script>
    import ApiClass from "../api/api.js"
    // import { Modal } from 'bootstrap';
    import VueSlickCarousel from "vue-slick-carousel";
    import "vue-slick-carousel/dist/vue-slick-carousel.css";
    import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
    import {
        required,
        email
    } from "vuelidate/lib/validators";
    import Heading from "@/components/Home_New/Heading.vue";
    import Choose from "@/assets/jsonfiles/Choose.json";
    import CoinChangeMobile from "@/views/Mobile_Sections/CoinChangeMobile.vue";
    import Community from "@/assets/jsonfiles/Community.json";
    import VueSkeletonLoader from "skeleton-loader-vue";
    export default {
        name: "Home",
        components: {
            VueSlickCarousel,
            Heading,
            CoinChangeMobile,
            VueSkeletonLoader,
        },
    
        data() {
            return {
                email: null,
                email1: null,
                submitted: false,
                submitted1: false,
    
                skeletonLoad: true,
                tableLoad: true,
    
                /*--------------LIVE PRICE JS START--------------------------*/
    
                settings: {
                    dots: false,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: true,
                    verticalSwiping: true,
                    // autoplay: true,
                    // speed: 1000,
                    cssEase: "linear",
                },
    
                usdtPair: [],
    
                /*--------------LIVE PRICE JS FINISH--------------------------*/
    
                /*--------------STARTUP JS START--------------------------*/
    
                StartupSliderData: [],
    
                subbanner: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 0,
                    autoplay: true,
                    speed: 1000,
                    autoplaySpeed: 2000,
                    cssEase: "linear",
                    pauseOnFocus: true,
                    pauseOnHover: true,
    
                    responsive: [{
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                initialSlide: 2,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ],
                },
    
                TableHeadingData: [{
                    currencyname: "Market",
                    currencyprice: "Price",
                    currencyvolume: "Volume",
                    currencychange: "24H Change",
                    currencyaction: "Action",
                }, ],
                /*--------------STARTUP JS FINISH--------------------------*/
    
                /*--------------CHOOSE BOX JS START--------------------------*/
    
                ChooseDataBox: Choose.ChooseData,
                /*--------------CHOOSE BOX JS FINISH--------------------------*/
    
                /*--------------COMMUNITY BOX JS START--------------------------*/
    
                JoinData: Community.CommunityLink,
                /*--------------COMMUNITY BOX JS FINISH--------------------------*/
            };
        },
    
        validations() {
            return {
                email: {
                    required,
                    email,
                },
                email1: {
                    required,
                    email,
                },
            };
        },
        async mounted() {
            // setTimeout(() => {
            //   this.modalElement = new Modal(this.$refs.modalElement);
            //   this.modalElement.show();
            // }, 3000);
    
            this.generateQRCode();
            var url = ApiClass.baseUrl;
            let ress = await fetch(url + "banner/get").then((result) => result.json());
            console.log( ress,"data is here");
    
        
            if (ress.status_code == "1") {
                this.StartupSliderData = ress.data;
            }
            this.getCoinList();
    
            // var myModal = document.getElementById("exampleModal");
            //   document.onreadystatechange = function () {
            //   myModal.show();
            // };
        },
        computed: {
            currentTabComponent: function () {
                return "tab-" + this.currentTab.toLowerCase();
            },
        },
    
        methods: {
            async getCoinList() {
                var response2 = await ApiClass.getNodeRequest("list-crypto/get", false);
                var data2 = await response2.data;
                this.usdtPair = await data2.data.USDT;
                this.skeletonLoad = false;
                this.tableLoad = false;
                // alert(this.tableLoad);
                // alert(this.skeletonLoad)
                // console.log(this.usdtPair);
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
    
            nextRegis1() {
                //  to="{, params: { email: 123 }}"
                this.submitted1 = true;
                if (this.$v.email1.$invalid) {
                    return;
                }
                this.submitted1 = false;
                this.$router.push({
                    name: "SignUp",
                    params: {
                        email: this.email1,
                    },
                });
            },
    
            generateQRCode(address) {
                return (
                    "https://chart.googleapis.com/chart?cht=qr&chl=" +
                    address +
                    "&chs=160x160&chld=L|0"
                );
            },
        },
    };
    </script>
    
    <style scoped>
    /*--------------COMMON CSS START--------------------------*/
    
    
    
    .start-trading-sec{
        background-color: var(--section-bg);
    }
    
    /*--------------COMMON CSS FINISH--------------------------*/
    /*--------------BANNER SECTION CSS START--------------------------*/
    
    .row.top-row {
        margin-bottom: 150px;
    }
    
    .price-box {
        max-width: 200px;
        margin: 0 auto;
    }
    
    .banner-sec {
        background-image: url(../assets/home_images/banner.png);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 520px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    
    .banner-sec::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #111111;
        z-index: -1;
    }
    
    .banner-info {
        text-align: center;
        position: relative;
    }
    
    .banner-info h1 {
        text-transform: uppercase;
        color: var(--white);
        font-size: 50px;
        font-weight: 600;
        font-family: "Poppins";
        margin: 0;
        padding-bottom: 15px;
    }
    
    .banner-info h2 {
        text-transform: uppercase;
        color: var(--white);
        line-height: 41px;
        font-size: 26px;
        font-weight: 400;
        margin-bottom: 0;
        padding-bottom: 15px;
    }
    
    .signup-btn {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .start-form-box .form-control {
        min-height: 50px;
        min-width: 350px;
        border-radius: 3px;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        color: var(--black);
        border-color: var(--white);
    }
    
    .start-form-box .form-control:focus {
        box-shadow: none;
    }
    
    .signup-btn .signup-btn-text {
        min-height: 48px;
        background: var(--signup-btn);
        border-color: var(--signup-btn);
        min-width: 150px;
        font-size: 16px;
        font-weight: 500;
        font-family: "Poppins";
        border-radius: 3px;
    }
    
    .signup-btn .signup-btn-text:focus {
        box-shadow: none;
    }
    
    .slider-main-box {
        height: auto;
    }
    
    .price-box h3 {
        margin-bottom: 0;
        font-size: 20px;
        text-transform: uppercase;
        padding-bottom: 8px;
        color: var(--white);
        font-weight: 500;
    }
    
    .price-box h3 span {
        font-size: 16px;
        font-weight: 400;
        margin-left: 8px;
    }
    
    .price-box h4 {
        margin-bottom: 0;
        font-size: 18px;
        font-weight: 400;
        color: var(--white);
    }
    
    /*--------------BANNER SECTION CSS FINISH--------------------------*/
    /*--------------STARTUP SECTION CSS START--------------------------*/
    
    section.startup-sec {
        background: var(--section-bg);
    }
    
    .subslider img {
        max-width: 300px;
    }
    
    .row.startup-top-row {
        margin-bottom: 100px;
    }
    
    .table thead tr th {
        font-size: 14px;
        font-weight: 500;
        color: var(--white);
        text-transform: uppercase;
        font-family: "Poppins";
    }
    
    .table tbody tr th {
        vertical-align: middle;
    }
    
    .table tbody tr th .currency-main-box {
        max-width: 40px;
        margin: 0 auto;
    }
    
    .table tbody tr td {
        vertical-align: middle;
    }
    
    .table tbody tr td .currency-main-box h6 {
        font-size: 15px;
        text-transform: uppercase;
        font-weight: 500;
        font-family: "Poppins";
        color: var(--white);
        margin-bottom: 0;
    }
    
    .table tbody tr td {
        padding: 0.7rem 0.7rem;
    }
    
    .table tbody tr th {
        padding: 0.7rem 0.7rem;
    }
    
    .table tbody tr td .currency-main-box button.btn.btn-primary {
        min-width: 120px;
        min-height: 37px;
        text-align: center;
        border-radius: 2px;
        background: var(--fav-color);
        color: var(--white);
        transition: all 0.3s ease;
        border-color: var(--fav-color);
        text-transform: capitalize;
        font-size: 17px;
        font-weight: 500;
    }
    
    .more-link.text-center a.more-text {
        text-decoration: none;
        font-size: 14px;
        color: var(--white);
        font-weight: 500;
        transition: all 0.5s ease;
    }
    
    .more-link.text-center a.more-text:hover {
        color: var(--hover-link);
        transition: all 0.5s ease;
    }
    
    /*--------------STARTUP SECTION CSS FINISH--------------------------*/
    /*--------------MOBILE APP SECTION CSS START--------------------------*/
    
    section.mobile-app-sec {
        background: #242424;
    }
    
    .app-info h6 {
        margin-bottom: 0;
        font-size: 25px;
        line-height: 38px;
        color: var(--white);
        text-transform: uppercase;
        font-weight: 300;
    }
    
    .app-info h6 span {
        font-weight: 500;
    }
    
    .qr-box {
        display: flex;
        align-items: center;
    }
    
    .qr-image {
        margin-right: 15px;
    }
    
    .qr-info span {
        font-size: 16px;
        color: var(--white);
        text-transform: capitalize;
        font-weight: 400;
    }
    
    ul.link-list {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    ul.link-list li {
        text-align: center;
        margin-left: 34px;
        vertical-align: middle;
        color: var(--white);
    }
    
    ul.link-list li a {
        text-decoration: none;
        color: var(--white);
        font-size: 15px;
    }
    
    ul.link-list li:nth-child(1) {
        margin-left: 0;
    }
    
    /* 
    
    /*--------------MOBILE APP SECTION CSS FINISH--------------------------*/
    /*--------------WHY CHOOSE SECTION CSS START--------------------------*/
    
    section.why-choose-sec {
        position: relative;
        overflow: hidden;
        background-color: #111111;
    }
    
    section.why-choose-sec::before {
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        width: 1920px;
        height: 200px;
        background-image: url(../assets/home_images/wave.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
        opacity: 0.1;
    }
    
    .why-choose-image img {
        max-width: 400px;
    }
    
    .choose-icon {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 11px;
    }
    
    .choose-icon img {
        max-width: 80px;
    }
    
    .choose-icon h4 {
        font-size: 17px;
        font-weight: 500;
        color: var(--white);
        margin-bottom: 0;
        line-height: 24px;
    }
    
    .choose-info p {
        margin: 0;
        font-size: 15px;
        line-height: 25px;
        font-weight: 400;
        color: var(--white);
    }
    
    /*--------------WHY CHOOSE SECTION CSS FINISH--------------------------*/
    /*--------------JOIN COMMUNITY SECTION CSS START--------------------------*/
    
    section.join-community {
        background-color: #242424;
    }
    
    /* .top-column {
        margin-bottom: 100px;
    } */
    
    .join-info h3 {
        color: var(--white);
        font-size: 30px;
        font-weight: 500;
        text-transform: uppercase;
        font-family: "Poppins";
        line-height: 43px;
    }
    
    .join-info p {
        font-size: 16px;
        color: var(--white);
        font-weight: 400;
        font-family: "Poppins";
        padding-bottom: 5px;
    }
    
    .join-link-box {
        width: 50px;
        height: 50px;
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 33px;
    }
    
    /*--------------JOIN COMMUNITY SECTION CSS FINISH--------------------------*/
    /*--------------START TRADING SECTION CSS START--------------------------*/
    
    div#trading-sign .start-form-box .form-control {
        background-color: var(--trading-form);
    }
    
    .trading-info.text-center h4 {
        font-size: 35px;
        text-transform: capitalize;
        font-weight: 600;
        font-family: "Poppins";
        margin-bottom: 0;
        color: rgb(220, 169, 45);
    }
    
    .trading-info span {
        font-size: 14px;
        text-transform: capitalize;
        font-weight: 500;
        color: var(--white);
    }
    
    h3.test-loader .loader {
        display: inline-block;
    }
    
    .modal_close {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        background-color: #fff;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .btn-close {
        width: 0.5em !important;
        height: 0.5rem !important;
    }
    
    .poster img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    
    /*--------------START TRADING SECTION CSS FINISH--------------------------*/
    
    /*--------------NEW CSS START--------------------------*/
    
    .signup-form .error {
        max-width: 504px;
        margin: 0 auto;
        padding-top: 4px;
    }
    
    /*--------------NEW CSS FINISH--------------------------*/
    
    @media all and (min-width: 1200px) and (max-width: 1399px) {
        .subslider img {
            max-width: 250px;
            margin: 0 auto;
        }
    
        .why-choose-image img {
            max-width: 350px;
        }
    }
    
    @media all and (min-width: 1025px) and (max-width: 1199px) {
        .subslider img {
            max-width: 200px;
        }
    
        .app-info h6 br {
            display: none;
        }
    
        .choose-icon {
            display: block;
        }
    
        .choose-icon h4 {
            font-size: 15px;
        }
    
        .choose-icon img {
            margin-bottom: 12px;
        }
    
        .why-choose-image img {
            max-width: 300px;
        }
    }
    
    @media all and (min-width: 992px) and (max-width: 1024px) {
        .subslider img {
            max-width: 270px;
            margin: 0 auto;
        }
    
        .app-info h6 br {
            display: none;
        }
    
        .choose-icon {
            display: block;
        }
    
        .choose-icon h4 {
            font-size: 15px;
        }
    
        .choose-icon img {
            margin-bottom: 12px;
        }
    
        .why-choose-image img {
            max-width: 300px;
        }
    }
    
    @media all and (min-width: 768px) and (max-width: 991px) {
        .banner-sec {
            min-height: auto;
        }
    
        .banner-info h2 {
            font-size: 24px;
        }
    
        .banner-info h2 br {
            display: none;
        }
    
        .row.top-row {
            margin-bottom: 130px;
        }
    
        .subslider img {
            max-width: 200px;
            margin: 0 auto;
        }
    
        .app-info h6 br {
            display: none;
        }
    
        .app-info h6 {
            font-size: 20px;
            line-height: 31px;
        }
    
        .qr-box {
            align-items: flex-start;
        }
    
        .qr-info span {
            font-size: 14px;
        }
    
        section.why-choose-sec::before {
            display: none;
        }
    
        .join-info h3 {
            font-size: 22px;
        }
    
        .join-info p {
            font-size: 13px;
        }
    }
    
    @media all and (min-width: 320px) and (max-width: 767px) {
        .row.top-row {
            margin-bottom: 80px;
        }
    
        .banner-sec {
            min-height: auto;
            background-image: none;
            background-color: var(--dark-bg);
        }
    
        .banner-sec::before {
            display: none;
        }
    
        .banner-info h1 {
            font-size: 30px;
        }
    
        .banner-info h2 br {
            display: none;
        }
    
        .banner-info h2 {
            line-height: 28px;
            font-size: 15px;
        }
    
        .signup-btn {
            display: block;
        }
    
        .start-form-box .form-control {
            min-width: 300px;
            margin-bottom: 10px;
        }
    
        .subslider img {
            margin: 0 auto;
            max-width: 230px;
        }
    
        .app-info h6 {
            font-size: 18px;
            line-height: 30px;
            text-align: center;
        }
    
        .app-info h6 br {
            display: none;
        }
    
        .qr-box {
            display: block;
        }
    
        .qr-image {
            text-align: center;
            margin-right: 0;
            margin-bottom: 10px;
        }
    
        .qr-info {
            text-align: center;
        }
    
        ul.link-list {
            margin-top: 25px !important;
            justify-content: center;
        }
    
        .mobile-app-image {
            margin-bottom: 35px;
        }
    
        .why-choose-image img {
            max-width: 280px;
        }
    
        .why-choose-image {
            margin-bottom: 20px;
            text-align: center;
        }
    
        .choose-icon {
            display: block;
            text-align: center;
        }
        .choose-icon p{
            /* word-break: break-all; */
            text-align: justify;
        }
    
        .choose-icon img {
            margin-bottom: 10px;
            text-align: center;
        }
    
        section.why-choose-sec::before {
            display: none;
        }
    
        .join-info h3 {
            font-size: 20px;
            text-align: center;
        }
    
        .join-info p {
            text-align: left;
        }
    
        .join-image {
            margin-bottom: 25px;
        }
    
        .trading-info.text-center h4 {
            font-size: 30px;
        }
    /* 
        .volume-head {
            display: none;
        } */
    /* 
        .action-head {
            display: none;
        } */
    
        /* .image-head {
            display: none;
        } */
    
        .table thead tr th {
            font-size: 13px;
        }
    
        .table tbody tr td .currency-main-box h6 {
            font-size: 12px;
        }
    
        .table tbody tr td {
            padding: 0.7rem 0.5rem;
        }
    
        .join-link-box {
            margin: 0 auto;
            margin-bottom: 19px;
        }
    }
    section {
        padding: 40px 0;
    }
    </style>
    