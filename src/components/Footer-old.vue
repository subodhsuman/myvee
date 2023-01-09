<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-4 col-6">
            <div class="footer-box">
              <h2>About</h2>
              <ul class="links-list">
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'btx_token' } }"
                    >BTX Token</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'btx_api' } }"
                    >BTX API</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'Legal', params: { slug: 'blog' } }"
                    >Blog</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'careers' } }"
                    >Careers</router-link
                  >
                </li>
              </ul>


            
            
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4 col-6">
            <div class="footer-box">
              <h2>Products</h2>
              <ul class="links-list">
                <li>
                  <router-link
                    :to="{ name: 'Exchange', params: { slug: 'BTCUSDT' } }"
                    >Exchange</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'otc_desk' } }"
                    >OTC Desk</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'nft_marketplace' } }"
                    >NFT Marketplace</router-link
                  >
                </li>
              </ul>
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4 col-6">
            <div class="footer-box">
              <h2>Legal</h2>
              <ul class="links-list">
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'terms_of_use' } }"
                    >Terms Of Use</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'privacy_policy' } }"
                    >Privacy Policy</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'risk_disclosure' } }"
                    >Risk Disclosure</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'compliance' } }"
                    >Compliance</router-link
                  >
                </li>
              </ul>
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4 col-6">
            <div class="footer-box">
              <h2>Support</h2>
              <ul class="links-list">
                <li>
                  <router-link
                    :to="{ name: 'Help', params: { slug: 'help_center' } }"
                    >Help Center</router-link
                  >
                </li>

                <li v-if="loggedIn">
                  <router-link to="/request/token">List Your Token</router-link>
                </li>

                <li>
                  <router-link
                    :to="{ name: 'Help', params: { slug: 'media_assets' } }"
                    >Media Assets</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'Help', params: { slug: 'fees' } }">
                    Fees</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Help', params: { slug: 'security' } }"
                    >Security</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/newsLetter"
                    >News Letter</router-link
                  >
                </li>
              </ul>
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4 col-6">
            <div class="footer-box">
              <h2>Socials</h2>
              <ul class="links-list">
                <li>
                  <a href="https://www.facebook.com/Bitqix-107438551892695"
                    ><em class="fab fa-facebook-f"></em>
                    <span>Facebook</span></a
                  >
                </li>
                <li>
                  <a href="https://twitter.com/bitqix"
                    ><em class="fab fa-twitter"></em> <span>Twitter</span></a
                  >
                </li>
                <li>
                  <a href="https://www.instagram.com/bitqix_official/"
                    ><em class="fab fa-instagram"></em>
                    <span>Instagram</span></a
                  >
                </li>
                <!-- <li>
                  <a to=""
                    ><em class="fab fa-youtube"></em> <span>Youtube</span></a
                  >
                </li> -->
                <li>
                  <a href="https://t.me/Bitqix"
                    ><em class="fab fa-telegram"></em> <span>Telegram</span></a
                  >
                </li>
              </ul>
            </div>
            <!--footer-box-->
          </div>
          <!--col-xl-2 col-lg-2 col-md-4 col-6-->

          <div class="col-xl-2 col-lg-2 col-md-4 col-6">
            <div class="footer-box">
              <h2>Buy Crypto</h2>
              <ul class="links-list">
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'buy_bitcoin' } }"
                    >Buy Bitcoin</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'buy_ethereum' } }"
                    >Buy Ethereum</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'buy_tron' } }"
                    >Buy Tron</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'Legal', params: { slug: 'buy_litecoin' } }"
                    >Buy Litecoin</router-link
                  >
                </li>
              </ul>
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
              <p>copyright © 2021.All Rights Reserved</p>
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
export default {
  name: "Footer",
  data() {
    return {
      loggedIn: false,
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
  },
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
