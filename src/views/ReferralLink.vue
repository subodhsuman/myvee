<template>
  <div>
    <section class="referral_page d-flex justify-content-center align-items-center">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-8 mb-3">
              <!-- <router-link to="/settings" class="text-dark fs-4 ">
              <i class="fad fa-reply-all" style="color:var(--white)"></i>
              </router-link> -->
             <button @click="backTo()" class="btn text-dark fs-4 router-link-active">
                  <i class="fad fa-reply-all" style="color:var(--white)"></i>
              </button>

          </div>
          <div class="col-md-8 col-lg-8 col-xl-8">
            <div class="banner_box text-center">
              <div class="heading_box mb-5">
                <h1 class="text-light">Myvee Referral Program</h1>
                <!-- <h3 class="text-light">Refer & earn 50% of trading fee paid by your friends as reward. Be your own Boss!
                </h3> -->
                <h3 class="text-light">Refer & earn more rewards. Be your own Boss!
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="getToken">
      <!--row heading-row-->

      <!--***************** section end ***********************-->
      <section class="reward_content">
        <div class="container-fluid">
          <div class="row px-5 mb-4 justify-content-center">
            <div class="col-md-6 col-lg-4 col-xl-4">
              <div class="reward_box mb-4">
                <div class="heading text-center pt-4">
                  <h3>TOTAL REFERRALS </h3>
                  <h4 class="fw-bold" style="color:var(--white)">{{ totalLink }}

                  </h4>
                </div>
                <div class="icons text-end p-2">
                  <img src="@/assets/images/icons/icon1.svg" alt="text">
                </div>
              </div>
            </div>
            <!-- first row end -->
            <div class="col-md-6 col-lg-4 col-xl-4">
              <div class="reward_box mb-4">
                <div class="heading text-center pt-4">
                  <h3>TOTAL REWARDS</h3>
                  <h4 class="fw-bold" style="color:var(--white)">{{ totalR }} {{ refData.length != 0 ? refData[0].rewards.currency : ''}}</h4>
                </div>
                <div class="icons text-end p-2">
                  <img src="@/assets/images/icons/icon2.svg" alt="text">
                </div>
              </div>
            </div>
            <!-- /second row end -->
            <!-- <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-3">
            <div class="reward_box mb-4">
              <div class="heading text-center pt-4">
                <h3>YOUR REWARD RATE</h3>
                <h4 class="fw-bold">50%</h4>
              </div>
              <div class="icons text-end p-2">
                <img src="@/assets/images/icons/icon3.svg" alt="text">
              </div>
            </div>
          </div> -->
            <!-- third row end -->
          </div>
          <!-- REWARD RATING END -->
          <div class="row  justify-content-center ">
            <div class="col-md-10 col-lg-10 col-xl-6 ">
              <div class="social_box p-4">
                <div class="my-3 text-center">
                  <p class="text-light fw-bold">share your links & earn more!</p>
                </div>
                <form>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control shadow-none" aria-label="Refer Link" v-model="referral_link"
                      readonly aria-describedby="basic-addon1" id="referral">
                    <span class="input-group-text" style="cursor:pointer;" id="basic-addon1" @click="copyLink('referral')">
                      <!-- <img src="@/assets/images/icons/copy.svg" alt="text"> -->
                      {{copy}}
                    </span>
                  </div>
                  <div class="btn-group d-flex justify-content-center">
                    <a href="https://www.facebook.com/profile.php?id=100085630628385" class="btn  btn_facebook mb-2 " aria-current="page">
                      <img src="@/assets/images/icons/facebook.svg" alt="icons">
                    </a>
                    <a href="#" class="btn btn_wtsaap mb-2">
                      <img src="@/assets/images/icons/wtsaap.svg" alt="icons">
                    </a>
                    <a href="#" class="btn btn_telegram mb-2">
                      <img src="@/assets/images/icons/telegram.svg" alt="icons">
                    </a>
                    <a href="#" class="btn  btn_twitter mb-2">
                      <img src="@/assets/images/icons/twitter.svg" alt="icons">
                    </a>
                  </div>
                  <!-- <div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">
                    <a href="https://www.facebook.com/"><button type="button" class="btn btn_facebook mb-2"> 
                      <img src="@/assets/images/icons/facebook.svg" alt="icons"></button></a>
                    <a href="https://web.whatsapp.com/"><button type="button" class="btn btn_wtsaap mb-2"><img
                          src="@/assets/images/icons/wtsaap.svg" alt="icons"></button>
                    </a>
                    <a href="https://web.telegram.org/k/"> <button type="button" class="btn btn_telegram mb-2"><img
                          src="@/assets/images/icons/telegram.svg" alt="icons"></button></a>
                    <a href="https://twitter.com/login"> <button type="button" class="btn btn_twitter mb-2"><img
                          src="@/assets/images/icons/twitter.svg" alt="icons"></button></a>
                  </div> -->
                </form>
                <div class="text-center my-3">
                  <p class="text-light fw-bold">(Your Code:{{ referral_code }})</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
    <!--************************ section end ****************************-->
    <div v-else>
      <section class="rating_box">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-11 col-lg-12 col-xl-10">
              <div class="list_box text-center">
                <ul class="list-group list-group-horizontal justify-content-center">
                  <!-- <li class="list-group-item border-0"> <img src="@/assets/images/referral_image/image1.png" alt="text"
                    class="img-fluid border border-5  border-secondary rounded-circle mb-3"><br>
                  <span class="my-3">Earn 50% as reward <br> of every trading fee</span>
                </li> -->
                  <li class="list-group-item border-0"><img src="@/assets/images/referral_image/image2.png" alt="text"
                      class="img-fluid border border-5  border-secondary rounded-circle mb-3"><br>
                    <span class="my-3">Payout every 24 hours!</span>
                  </li>
                  <li class="list-group-item border-0"><img src="@/assets/images/referral_image/image3.png" alt="text"
                      class="img-fluid border border-5  border-secondary rounded-circle mb-3"><br>
                    <span class="my-3">Unlimited referrals</span>
                  </li>
                  <li class="list-group-item border-0"><img src="@/assets/images/referral_image/image4.png" alt="text"
                      class="img-fluid border border-5  border-secondary rounded-circle mb-3"><br>
                    <span class="my-3">Unlimited rewards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- section end -->
      <section class="working_referral">
        <div class="container">
          <div class="row mb-4">
            <div class="col-md-12 col-lg-12 col-xl-12">
              <div class="text-center">
                <h2 class="fw-bold" style="color:#52441A">How it works?</h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-6 col-xl-4">
              <div class="working_box text-center px-3 p-5 mb-5">
                <div class="btn_box">
                  <button type="button" class="btn btn-signup shadow-none border-secondary text-light">Signup</button>
                </div>
                <div class="heading_box my-3">
                  <h3 class="text-light fw-bold">Get Your link</h3>
                </div>
                <div class="text-light">
                  <p class="text-light">Join Myvee and get your unique tracking link. You'll earn for customers who
                    sign
                    up through this link.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-4">
              <div class="working_box text-center px-3 py-5 mb-5">
                <div class="input-group mb-3  text-light">
                  <input type="text" class="form-control shadow-none border-0"
                    placeholder="myvee/signup?referral=hu76ggrd" aria-label="Username"
                    aria-describedby="basic-addon1" disabled>
                  <span class="input-group-text  " id="basic-addon1">share</span>
                </div>
                <div class="heading_box my-3">
                  <h3 class="text-light fw-bold">Share Your link</h3>
                </div>
                <div class="text-light">
                  <p class="text-light">Share your links via Telegram, Twitter, Emails or anyway you want. The more you
                    promote, the more you earn.</p>
                </div>
              </div>

            </div>
            <div class="col-md-6 col-lg-6 col-xl-4">
              <div class="working_box text-center px-3 py-5 mb-5">
                <div class="btn-group text-light " role="group" aria-label="Basic example">
                  <button type="button" class="btn btn_reward shadow-none">Reward</button>
                  <button type="button" class="btn btn_reward  shadow-none">$$</button>

                </div>
                <div class="heading_box my-3">
                  <h3 class="text-light fw-bold">Share Your link</h3>
                </div>
                <div class="text-light">
                  <!-- <p class="text-light">You earn 50% as reward of every trading fee paid by your friends. Even while
                    you're asleep!</p> -->
                  <p class="text-light">You earn reward of every user who register through this link. Even while
                    you're asleep!</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row  justify-content-center mt-5">
            <div class="col-md-7 col-lg-5 col-xl-5">
              <router-link to="/login"> <button type="button" class="btn btn-login shadow-none  w-100 p-2">Login To
                  Participate</button>
              </router-link>

            </div>
          </div>
        </div>

      </section>
      <!--  section end-->
      <section class="accordion_page">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-8 col-xl-6">
              <div>
                <h2 class="fw-bold text-light mb-5 text-center">Frequently Asked Questions</h2>
              </div>
              <div class="accordion  " id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header fw-bold" id="headingOne">
                    <button class="accordion-button shadow-none text-light" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      1. How much can I earn in this referral program?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body text-light">
                      You can earn unlimited rewards! Every time your friend registered successfully, you get assets
                      as
                      reward in Myvee. The more you invite friends, the more you earn.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed shadow-none text-light" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                      aria-controls="collapseTwo">
                      2. When will the referral rewards be credited to my account?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body text-light">
                      All rewards earned for a day are credited to your account at once in the next 24 hours. Usually
                      early in the morning.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed shadow-none  text-light" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                      aria-controls="collapseThree">
                      3. Do you have any tips that will help me earn more rewards?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body text-light">
                      The more you invite friends, the more you earn.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
    <!-- section end -->
  </div>
</template>

<script>
// import SettingsLayout from "@/layouts/SettingsLayout.vue";
import exactMath from "exact-math"
// import Pagination from "vue-pagination-2";

import ApiClass from "@/api/api";
// import ActivityLogVue from './ActivityLog.vue';
// import LoginVue from '../Auth/Login.vue';
// import {
//     required,
//     minLength,
//     sameAs
// } from 'vuelidate/lib/validators';
export default {
  name: "Referral-Link",
  components: {
    // SettingsLayout,
    // Pagination,
  },
  data() {
    return {
      referral_link: "",
      referral_code: "",
      copy: "Copy",
      refData: [],
      user: [],
      getToken: false,
      totalLink:0
      ,
    };
  },

   mounted() {
    this.getToken = localStorage.getItem("token") ? true : false;
    console.log(this.getToken);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.referral_link =  ApiClass.VUE_DOMAIN + "signup?referral=" + this.user.referral_code;
    this.referral_code = this.user.referral_code;
    this.getToken ? this.callback() : ''; 
  },
  computed: { 
    totalR() {
      let s  = 0;
      this.refData?.map((el) => {
       s =  exactMath.add(s , el.rewards.amount);        
      });
        return s;
    }
  },
  methods: {
    async callback() {
      let res = await ApiClass.getRequest(
        "user/getReferrals",
        true
      );
      console.log(res);
      if (res.data.status_code == 1) {
        this.totalLink = res.data.data.length;
        this.refData = res.data.data.filter(x => x.is_reward);
      }
    },
  
    copyLink(id) {
      var copyText = document.getElementById(id);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      var res = document.execCommand("copy");         
      this.copy = res ? "Copied" : "Copy";
      window.setInterval(() => {
            this.copy="Copy";
          window.getSelection().removeAllRanges();
      }, 2000);
    },
    backTo()
    {
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
.working_referral, .reward_content{
  background-color: #111111;
}










/* .name_setting_box p:nth-child(1) {
  font-weight: 600;
}

.form-box {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 75px 75px;
}
span.badge {
  height: 24px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.pagination_box {
  padding: 0 19px;
  display: flex;
  justify-content: end;
} */




.referral_page {
  min-height: 20vh;
  background-color: #111111;
}

.banner_box .heading_box h1 {
  font-size: 28px;
  font-weight: 600;
}

.banner_box .heading_box h3 {
  font-size: 18px;
  font-weight: 600;
}

.list-group-item {
  background-color: unset;

}

.reward_box {
  background-color: var(--nav-active);
  border-radius: 8px;
  min-height: 110px;
  position: relative;
  left: 0;
  top: -126px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-left: 6px solid var(--border-box);

}

.reward_box .heading h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-text);
}

.social_box {
  background-color:#393939;
  min-height: 250px;
  border-radius: 5px;
}

.btn-group>.btn-group:not(:last-child)>.btn,
.btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}

.btn_facebook {
  background-color: rgba(64, 92, 150, 1);

}

.btn_wtsaap {
  background-color: rgba(96, 180, 116, 1);

}

.btn_telegram {
  background-color: rgba(56, 144, 186, 1);

}

.btn_twitter {
  background-color: rgba(19, 140, 199, 1);

}

.social_box .btn-group .btn {
  padding: 10px 50px;
  border-radius: 5px !important;
  margin-right: 10px;
}

.rating_box {
  background-color: #111111;
  min-height: 300px;
}

.list-group .list-group-item span {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-text);
}

.working_box {
  background-color: #393939;;
  min-height: 280px;
}

.working_box h3 {
  font-size: 23px;
}


.btn-signup {
  padding: 6px 30px;
  cursor:unset;
}

.btn_reward {
  color: var(--white);
  border-radius: 5px;
  border: 1px solid #6c757d;
  padding: 6px 40px;
  cursor:unset;
}

.working_box p {
  font-weight: 500;
}

/* .btn-group>.btn-group:not(:last-child)>.btn,
.btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
} */

.accordion_page {
  background-color: #111111;
  min-height: 400px;
}

.btn-login {
  background-color: #198754;
  font-weight: 700;
  border: 1px solid #198754;
  border-radius: 8px;
  color: var(--white);
}

.btn-login:hover {
  background-color: transparent;
  cursor: pointer;
  color: #198754;
}

button.accordion-button.shadow-none.collapsed {
  font-weight: 600;
  background-color: #393939;
}

.accordion-button:not(.collapsed) {
  color: #000;
  font-weight: 600;
  background-color: #393939;
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
}

.accordion-item {

  border: 1px solid #393939;
  background-color: #393939;
}

.accordion-body {
  font-weight: 500;
  font-size: 15px;
  background-color: #393939;
}

.accordion-button.collapsed:after {
  /* background-image: url('@/assets/images/icons/dropup.svg') !important; */
  background-image: url('../assets/images/icons/dropup.svg')!important;
}

.accordion-button:not(.collapsed)::after {
  transform: rotate(0deg) !important;
  background-image: url('../assets/images/icons/dropdown.svg') !important
}

.working_box {
  position: relative;
  overflow: hidden;
}

.working_box::before {
  position: absolute;
  counter-increment: my-sec-counter;
  content: "" counter(my-sec-counter) " ";
  height: 65px;
  width: 65px;
  bottom: 24px;
  right: 0;
  font-size: 75px;
  color: white;
  opacity: 30%;
}
 .input-group .input-group-text{
  background-color: var(--signup-btn);
  color: var(--buy-active-color);
  font-weight: 600;
 }


@media all and (min-width: 1200px) and (max-width: 1399px) {
  .working_box{
    min-height: 330px;
  }
}

@media all and (min-width: 992px) and (max-width: 1199px) {}

@media all and (min-width: 768px) and (max-width: 991px) {}

@media all and (min-width: 320px) and (max-width: 767px) {
  .reward_box {
    position: unset;
  }

  .btn-group {
    flex-wrap: wrap;
  }

  ul.list-group.list-group-horizontal {
    flex-wrap: wrap;
  }

}
</style>