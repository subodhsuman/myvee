<template>
  <div>
    <div class="row coin_mobile_change_row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-12">
        <div class="mobile_price_change_box">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) in dataUsdt" :key="index">
              <div class="price-main-box">
                <h4 class="currency-name">
                 {{ item.currency}}/{{item.pair_with}}
                  <span style="color: var(--green)">{{item.change}}%</span>
                </h4>
                <h5 class="currency-price-text">${{parseFloat(item.price)}}</h5>
                <!-- <h6 class="currency-main-price">$48765.35</h6> -->
              </div>
              <!--price-main-box-->
            </swiper-slide>
          </swiper>
        </div>
        <!--mobile_price_change_box-->
      </div>
      <!--col-xl-12 col-lg-12 col-md-12 col-12-->
    </div>
    <!--row-->
  </div>
</template>

<script>
import ApiClass from "@/api/api";
export default {
  name: "CoinChangeMobile",
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          767: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },
      },
      dataUsdt:[],
    };
  },
  async mounted() {
    var response2 = await ApiClass.getNodeRequest("list-crypto/get", false);
    var data2 = response2.data;

    this.$store.commit("SET_LIST_DATA", data2);
    this.dataUsdt = data2.data.USDT.slice(0,10);
    // console.log('usdt data==',this.dataUsdt);
  },
};
</script>

<style scoped>
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

.swiper-slide {
  justify-content: center;
}

.swiper-slide {
  display: flex;
  align-items: center;
}


@media all and (min-width: 320px) and (max-width: 767px) {
  .price-main-box h4 {
        font-size: 14px;
  }
  .price-main-box h4 span {
    font-size: 12px;
} 
.price-main-box h5 {
  font-size: 13px;
}
}
</style>
