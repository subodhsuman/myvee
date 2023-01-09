<template>
  <div>
    <div class="main-heading-box">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="heading-inner-box">
              <h2>{{ heading_main_title }}</h2>
              <p>
                {{ heading_main_desc }} <br />
                {{ heading_sub_desc }}
              </p>
            </div>
            <!--heading-inner-box-->
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </div>
    <!--main-heading-box-->
  </div>
</template>

<script>
export default {
  name: "MainHeading",

  props: {
    heading_main_title: String,
    heading_main_desc: String,
    heading_sub_desc: String,
  },
};
</script>

<style scoped>
.heading-inner-box {
  text-align: center;
  margin-bottom: 50px;
}

.heading-inner-box h2 {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 30px;
  color: #fff;
  position: relative;
}

.heading-inner-box h2::before {
  position: absolute;
  content: "";
  top: 8px;
  left: 290px;
  background-image: url(../assets/Landing_Page/before-white.png);
  height: 15px;
  width: 255px;
  background-size: contain;
  background-repeat: no-repeat;
}

.heading-inner-box h2::after {
  position: absolute;
  content: "";
  top: 8px;
  right: 290px;
  background-image: url(../assets/Landing_Page/after-white.png);
  height: 15px;
  width: 255px;
  background-size: contain;
  background-repeat: no-repeat;
}

.heading-inner-box p {
  color: #fff;
  font-size: 15px;
  font-family: "Poppins";
  margin: 0;
  font-weight: 400;
}

section.mobile-app-sec .heading-inner-box {
  margin-bottom: 90px;
}

section.mobile-app-sec .heading-inner-box h2 {
  color: #fff;
}

section.mobile-app-sec .heading-inner-box h2::after {
  background-image: url(../assets/Landing_Page/after-white.png);
  right: 0;
}

section.mobile-app-sec .heading-inner-box h2::before {
  background-image: url(../assets/Landing_Page/before-white.png);
  left: 0;
}

section.mobile-app-sec .heading-inner-box p {
  color: #fff;
}

.multiple-buy .heading-inner-box h2::after {
  right: 130px;
}

.multiple-buy .heading-inner-box h2::before {
  left: 130px;
}

section.get_in_touch .heading-inner-box h2::after {
  right: 270px;
}

section.get_in_touch .heading-inner-box h2::before {
  left: 270px;
}

section.join-sec .heading-inner-box h2::after {
  right: 190px;
}

section.join-sec .heading-inner-box h2::before {
  left: 190px;
}

section.cryptobuysell-sec .heading-inner-box h2::before {
  left: 230px;
}

section.cryptobuysell-sec .heading-inner-box h2::after {
  right: 230px;
}

section.buy-sell-hint .heading-inner-box h2::before {
  left: 90px;
}

section.buy-sell-hint .heading-inner-box h2::after {
  right: 90px;
}

@media all and (min-width: 1200px) and (max-width: 1399px) {
  section.mobile-app-sec .heading-inner-box h2::before {
    height: 9px;
    width: 175px;
    top: 14px;
  }

  section.mobile-app-sec .heading-inner-box h2::after {
    height: 9px;
    width: 175px;
    top: 14px;
  }

  .heading-inner-box h2::before {
    left: 200px;
  }

  .heading-inner-box h2::after {
    right: 200px;
  }

  .multiple-buy .heading-inner-box h2::before {
    left: 45px;
  }
  .multiple-buy .heading-inner-box h2::after {
    right: 45px;
  }
  section.join-sec .heading-inner-box h2::before {
    left: 100px;
  }

  section.join-sec .heading-inner-box h2::after {
    right: 100px;
  }

  section.get_in_touch .heading-inner-box h2::before {
    left: 170px;
  }

  section.get_in_touch .heading-inner-box h2::after {
    right: 170px;
  }

  section.cryptobuysell-sec .heading-inner-box h2::before {
    left: 130px;
  }

  section.cryptobuysell-sec .heading-inner-box h2::after {
    right: 130px;
  }
      section.buy-sell-hint .heading-inner-box h2::before {
    display: none;
  }
  section.buy-sell-hint .heading-inner-box h2::after {
    display: none;
  }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
  .heading-inner-box h2::before {
    left: 122px;
  }

  .heading-inner-box h2::after {
    right: 122px;
  }

  .heading-inner-box h2 {
    font-size: 25px;
  }

  section.mobile-app-sec .heading-inner-box h2::before {
    height: 14px;
    width: 152px;
    top: 10px;
    left: 0;
  }

  section.mobile-app-sec .heading-inner-box h2::after {
    height: 14px;
    width: 152px;
    top: 10px;
    right: 0;
  }

  .multiple-buy .heading-inner-box h2::before {
    left: 0;
  }

  .multiple-buy .heading-inner-box h2::after {
    right: 0;
  }

  section.join-sec .heading-inner-box h2::before {
    left: 34px;
  }

  section.join-sec .heading-inner-box h2::after {
    right: 34px;
  }

  section.get_in_touch .heading-inner-box h2::before {
    left: 100px;
  }

  section.get_in_touch .heading-inner-box h2::after {
    right: 100px;
  }

  section.cryptobuysell-sec .heading-inner-box h2::before {
    left: 70px;
  }

  section.cryptobuysell-sec .heading-inner-box h2::after {
    right: 70px;
  }
  section.buy-sell-hint .heading-inner-box h2::before {
    display: none;
  }
  section.buy-sell-hint .heading-inner-box h2::after {
    display: none;
  }

    section.buy-sell-hint .heading-inner-box h2::before {
    display: none;
  }
  section.buy-sell-hint .heading-inner-box h2::after {
    display: none;
  }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .heading-inner-box h2::before {
    left: 122px;
  }

  .heading-inner-box h2::after {
    right: 122px;
  }

  .heading-inner-box h2 {
    font-size: 25px;
  }

  section.mobile-app-sec .heading-inner-box h2::before {
    height: 14px;
    width: 152px;
    top: 10px;
    left: 0;
  }

  section.mobile-app-sec .heading-inner-box h2::after {
    height: 14px;
    width: 152px;
    top: 10px;
    right: 0;
  }

  .multiple-buy .heading-inner-box h2::before {
    left: 0;
  }

  .multiple-buy .heading-inner-box h2::after {
    right: 0;
  }

  section.join-sec .heading-inner-box h2::before {
    left: 34px;
  }

  section.join-sec .heading-inner-box h2::after {
    right: 34px;
  }

  section.get_in_touch .heading-inner-box h2::before {
    left: 100px;
  }

  section.get_in_touch .heading-inner-box h2::after {
    right: 100px;
  }

  section.cryptobuysell-sec .heading-inner-box h2::before {
    left: 70px;
  }

  section.cryptobuysell-sec .heading-inner-box h2::after {
    right: 70px;
  }

  section.buy-sell-hint .heading-inner-box h2::before {
    display: none;
  }
  section.buy-sell-hint .heading-inner-box h2::after {
    display: none;
  }
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .heading-inner-box h2 {
    font-size: 26px;
  }

  .heading-inner-box p {
    font-size: 14px;
  }
}

@media all and (min-width: 320px) and (max-width: 768px) {
  .heading-inner-box h2::before {
    display: none;
  }
  .heading-inner-box h2::after {
    display: none;
  }

  section.mobile-app-sec .heading-inner-box {
    margin-bottom: 40px;
  }

  section.cryptobuysell-sec .heading-inner-box {
    margin-bottom: 20px;
  }
  section.cryptobuysell-sec .heading-inner-box h2 {
    font-size: 27px;
  }

  section.buy-sell-hint .heading-inner-box h2 {
    font-size: 28px;
  }

  section.buy-sell-hint .heading-inner-box p br {
    display: none;
  }
}
</style>
