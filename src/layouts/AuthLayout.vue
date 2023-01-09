<template>
  <div>
    <section class="layout-main-sec py-5 py-md-0">
      <div class="container">
        <div class="row align-items-center main_row">
          <div class="col-xl-6 col-lg-9 col-md-12 col-12 login-lay-box mx-auto">
            <slot></slot>
          </div>
          <!-- <div class="col-xl-6 col-lg-6 col-12 slider-main-box">
      
          <VueSlickCarousel v-bind="settings">
            <div>
              <img src="@/assets/auth_img/2.png" class="my" alt="..." />
            </div>
            <div>
              <img src="@/assets/auth_img/1.png" class="my" alt="..." />
            </div>
            <div>
              <img src="@/assets/auth_img/3.png" class="my" alt="..." />
            </div>
          </VueSlickCarousel>
        </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    // import VueSlickCarousel from "vue-slick-carousel";
    // import "vue-slick-carousel/dist/vue-slick-carousel.css";
    export default {
        name: "AuthLayout",
        components: {
            // VueSlickCarousel,
        },

        data() {
            return {
                settings: [{
                    dots: false,
                    arrows: false,
                    edgeFriction: 0.35,
                    fade: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }, ],
            };
        },
    };
</script>
<style scoped>
    button span {
        opacity: 0;
    }
    
    .auth_data {
        background-color: var(--white);
        padding: 25px 25px;
        box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
        border-radius: 5px;
    }
    
    .layout-main-sec {
        overflow-x: hidden;
        background-color: var(--section-bg);
        padding: 80px 0 !important;
    }
    
    .slick-slide img {
        display: initial !important;
    }
    
    @media all and (min-width: 768px) and (max-width: 991px) {
        .slider-main-box {
            display: none;
        }
        .main_row {
            margin: 20px 0px;
        }
        .login-lay-box {
            margin: 0 auto;
        }
    }
    
    @media all and (min-width: 320px) and (max-width: 767px) {
        .main_row {
            height: auto;
        }
        .slider-main-box {
            display: none;
        }
        .auth_data {
            padding: 10px 10px;
        }
    }
</style>