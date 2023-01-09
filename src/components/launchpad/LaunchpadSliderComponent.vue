<template>
<div class="participate_box ">
    <TokenLayout>
        <!-- <div class="row">
            <div class="col-md-12 col-lg-12 col-xl-12 "> -->
                <VueSlickCarousel :arrows="true" :dots="false" :autoplay="true"  :controls="true" :speed="500" :slidesToShow="1" :responsive="gallery">
                     <div class="slider_content" v-for="(slide,index) in gallery" :key="index">
                        <img :src="slide"  alt="slider-img" height="450px" >
                    </div>
                    <!-- <div class="slider_content">
                        <img src="../../assets/images/slider/2-min.png" alt="slider-img" height="450px">
                    </div>
                    <div class="slider_content">
                        <img src="../../assets/images/slider/3-min.png" alt="slider-img" height="450px">
                    </div>
                    <div class="slider_content">
                        <img src="../../assets/images/slider/4-min.png" alt="slider-img" height="450px">
                    </div> -->

                </VueSlickCarousel>
              
            <!-- </div>
        </div> -->
    </TokenLayout>
</div>
</template>

<script>
  // import TokenLayout from "@/layouts/TokenLayout.vue"
import VueSlickCarousel from "vue-slick-carousel";
export default {
    name: 'LaunchpadSliderComponent',
     props:{
      gallery:Array
    },
    components: {
        VueSlickCarousel
    },

    data() {
        return {
            

        }
  }
}
</script>

<style scoped>
.slick-slide img{
    object-fit:cover;
    background-position: center;
    width: 100%;
}
</style>
