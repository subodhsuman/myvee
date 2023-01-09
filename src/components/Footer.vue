<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-4  col-12 mb-3 col-sm-6">
            <div class="footer-box">
              <h2>About</h2>
              <ul class="links-list">
                <!-- <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'btx_token' } }">BTX Token</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'btx_api' } }">BTX API</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'blog' } }">Blog</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'careers' } }">Careers</router-link>
                </li> -->

                <li>
                  <!-- <router-link :to="{ name: 'About', params: { slug: 'bitqix' } }">Myvee</router-link> -->
                  <router-link :to="{ name: 'About', params: { slug: 'myvee' } }">Myvee</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'About', params: { slug: 'digital_assets' } }">Introduction to digital
                    assets</router-link>
                </li>

                <li>
                  <!-- <router-link :to="{ name: 'About', params: { slug: 'raferral_program' } }">Referral Program
                  </router-link> -->
                  <router-link to="/referralProgram">Referral Program
                  </router-link>

                </li>

                <li>
                  <router-link :to="{ name: 'About', params: { slug: 'privacy_policy' } }">Privacy Policy</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'About', params: { slug: 'money_laundaring' } }">anti money laundaring
                  </router-link>
                </li>
              </ul>




            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4  col-12 mb-3 col-sm-6">
            <div class="footer-box">
              <h2>Products</h2>
              <ul class="links-list">
                <li>
                  <router-link :to="{ name: 'Exchange', params: { slug: 'BTCUSDT' } }">Exchange</router-link>
                </li>
                <!-- <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'otc_desk' } }">OTC Desk</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'nft_marketplace' } }">NFT Marketplace
                  </router-link>
                </li> -->

                <li>
                  <router-link :to="{ name: 'Exchange', params: { slug: 'BTCUSDT' } }">Spot Trading</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Exchange', params: { slug: 'BTCUSDT' } }">Buy Crypto</router-link>
                </li>

                <!-- <li>
                  <router-link :to="{ name: 'Products', params: { slug: 'ieo' } }">IEO</router-link>
                </li> -->

                <li>
                  <router-link :to="{ name: 'Products', params: { slug: 'fees' } }">
                    Fees</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Products', params: { slug: 'api' } }"> API</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Products', params: { slug: 'mobile_app' } }">Mobile App</router-link>
                </li>
              </ul>
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->



          <div class="col-xl-2 col-lg-2 col-md-4 col-12 mb-3 col-sm-6">
            <div class="footer-box">
              <h2>Support</h2>
              <ul class="links-list">
                <!-- <li>
                  <router-link :to="{ name: 'Help', params: { slug: 'help_center' } }">Help Center</router-link>
                </li>

                <li v-if="loggedIn">
                  <router-link to="/request/token">List Your Token</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Help', params: { slug: 'media_assets' } }">Media Assets</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Help', params: { slug: 'fees' } }">
                    Fees</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Help', params: { slug: 'security' } }">Security</router-link>
                </li> -->
                <li>
                  <router-link :to="{ name: 'Support', params: { slug: 'blog' } }">Blog</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Support', params: { slug: 'faq' } }">FAQ</router-link>
                </li>



                <li>
                  <!-- <router-link :to="{ name: 'Support', params: { slug: 'listing_ieo' } }">apply for listing/IEO
                  </router-link> -->
                  <!-- <router-link to="/request/token">apply for listing/IEO
                  </router-link> -->

                </li>

                <li>
                  <router-link :to="{ name: 'Support', params: { slug: 'user_agreement' } }">user agreement
                  </router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Support', params: { slug: 'terms_and_condition' } }">Terms & Condition
                  </router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Support', params: { slug: 'disclaimer' } }">Disclaimer</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Support', params: { slug: 'contact_us' } }">contact us</router-link>
                </li>
              </ul>
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4 col-12 mb-3 col-sm-6">
            <div class="footer-box">
              <h2>Socials</h2>
              <ul class="links-list">
                <li>
                  <a href="https://www.facebook.com/profile.php?id=100085630628385"><em class="fab fa-facebook-f"></em>
                    <span>Facebook</span></a>
                </li>
                <!-- <li>
                  <a href="#"><em class="fab fa-twitter"></em> <span>Twitter</span></a>
                </li> -->
                <li>
                  <a href="https://www.instagram.com/myveecoin/"><em class="fab fa-instagram"></em>
                    <span>Instagram</span></a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCd5ti8rAwBMEcleFg3dAhiQ/videos"
                    ><em class="fab fa-youtube"></em> <span>Youtube</span></a
                  >
                </li>
                <!-- <li>
                  <a href="#"><em class="fab fa-telegram"></em> <span>Telegram</span></a>
                </li> -->
              </ul>
            </div>
            <!--  telegram and twitter link  https://t.me/Bitqix   https://twitter.com/bitqix -->
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->


          <div class="col-xl-4 col-lg-4 col-md-6 col-12">
            <div class="footer-box">
              <h2 class="pb-2">News letter</h2>
              <p class="m-0 mb-2 text-white">Subscribe here to get the latest coin listings, market data updates,
                contest alerts, news and more.</p>

              <div class="form-page">
                <form @submit.prevent="submitForm">

                  <div class="row form-row">
                    <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
                      <div class="input-group">
                        <input type="email" class="form-control input-control" placeholder="Email" aria-label="Username"
                          aria-describedby="basic-addon1" v-model="email">

                      </div>

                      <div class="error" v-if="submitted && !$v.email.required">
                        Email is required
                      </div>
                      <div class="error" v-if="submitted && !$v.email.email">
                        This must be an email
                      </div>
                    </div>
                    <!--col-xl-12 col-lg-12 col-md-12-->

                    <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="submit-btn">
                        <button type="submit" class="btn submit-btn">Submit</button>
                      </div>
                    </div>
                    <!--col-xl-12 col-lg-12 col-md-12-->

                  </div>
                  <!--row form-row-->
                </form>
              </div>

            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->


        </div>
      </div>
      <!--row-->
      <!--container-->
    </footer>
    <!--footer-->

    <div class="copy-right-main-box">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="copyright-text">
              <p>copyright © 2022.All Rights Reserved</p>
            </div>
            <!--copyright-text-->
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClass from "../api/api.js";
import {
  required,
  email
} from "vuelidate/lib/validators";
export default {
  name: "Footer",
  data() {
    return {
      loggedIn: false,

      loading: false,
      submitted: false,
      email: "",
    };
  },


  validations: {
    email: {
      required,
      email,
    },
  },


  mounted() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
        this.email = "";
  },


  methods: {
    async submitForm() {
      this.submitted = true;

      if (this.$v.email?.$invalid) {
        return;
      }
      this.submitted = false;
      this.loading = true;
      
      var form =
      {
        email: this.email
      }

      var result = await ApiClass.postRequest(
        "newsletter",
        false,
        form
      );
      if (result.data.status_code == 1) {

        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: result.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
        this.email = "";
      } else {

        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: result.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }

      this.loading = false;

    },

  }
 
};
</script>

<style scoped>
footer.footer {
  padding: 80px 0;
  background: var(--dark-bg);
  /* background: linear-gradient(to right, #434343, #000000); */
}

.footer-box h2 {
  text-transform: uppercase;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 0;
  padding-bottom: 10px;
}

.footer-box ul.links-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer-box ul.links-list li {
  padding-bottom: 10px;
}

.footer-box ul.links-list li a {
  text-transform: capitalize;
  color: #e9e9e9;
  text-decoration: none;
  font-size: 15px;
  font-weight: 400;
}

.footer-box ul.links-list li a .fab {
  background-color: var(--social-link);
  border-radius: 72px;
  margin-right: 10px;
  height: 40px;
  width: 40px;
  padding: 12px 14px;
  text-align: center;
}

.copy-right-main-box {
  background: #000000;
  background: linear-gradient(to right, #434343, #000000);
  /* border-top: 1px solid #fff; */
  padding: 15px 0;
}

.copyright-text {
  text-align: center;
}

.copyright-text p {
  color: #fff;
  margin-bottom: 0;
  text-transform: capitalize;
}


/******* NEWS CSS START *******/
.form-page .form-control {
  min-height: 45px;
  border-radius: 3px;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  color: var(--black);
  border-color: var(--white);
}

.form-page .form-control:focus {
  box-shadow: none;
}


.submit-btn .submit-btn {
  min-height: 40px;
  background: var(--signup-btn);
  border-color: var(--signup-btn);
  min-width: 150px;
  font-size: 16px;
  font-weight: 500;
  font-family: "Poppins";
  border-radius: 3px;
  color: var(--white);
}

.submit-btn .submit-btn:focus {
  box-shadow: none;
}

@media all and (min-width: 768px) and (max-width: 991px) {
  footer.footer {
    padding: 40px 0;
  }

  .footer-box {
    margin-bottom: 15px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  footer.footer {
    padding: 40px 0;
  }

  .footer-box h2 {
    font-size: 20px;
  }
}
</style>
