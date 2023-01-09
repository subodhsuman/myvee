<template>
<div>
   <swiper class="swiper" :options="swiperOption">
           <swiper-slide v-for="(image,index) in images" :key="index"><img :src="image" class="img-fluid rounded" alt="img" style=" width:416px; height:353.2px;"></swiper-slide>
    </swiper>
</div>
</template>

<script>

export default {
    name: 'HomeView',
    props:{
     images:Array
    },
    data() {
        return {
        swiperOption: {
        slidesPerView: 1,
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
            slidesPerView: 1,
            spaceBetween: 10,
          },

          767: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },

        }

    },
}
</script>
