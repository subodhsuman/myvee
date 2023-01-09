<template>
  <div>
    <div class="get-main-box">
      <div class="get-icon">
        <img loading="lazy" :src="Get.get_image" alt="" class="img-fluid" />
      </div>
      <!--get-icon-->

      <div class="get-icon-info">
        <h6>{{ Get.get_title }}</h6>
        <p>
          {{ Get.get_description }}
        </p>
      </div>
      <!--get-icon-info-->
    </div>
    <!--get-main-box-->
  </div>
</template>


<script>
export default {
  name: "GetInTouch",
  props: {
    Get: Object,
  },
};
</script>


<style scoped>
.get-main-box {
  border-radius: 8px;
  -webkit-box-align: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 4%) 0px 2px 45px 0px;
  padding: 16px 16px;
  background: #000000;
  background: linear-gradient(to right, #434343, #212121);
  overflow: hidden;
  position: relative;
}

.get-main-box::before {
  content: "";
  background: #000000;
  position: absolute;
  width: 120%;
  height: 90%;
  border-radius: 100px;
  opacity: 0.25;
  transform: skewY(15deg);
  top: -50%;
  right: -20%;
  z-index: 0;
  background-position: left bottom;
}

.get-icon {
  position: relative;
  text-align: center;
  margin-bottom: 60px;
}

.get-icon-info h6 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 0;
  padding-bottom: 15px;
}

.get-icon-info p {
  text-align: center;
  line-height: 29px;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 0;
}

@media all and (min-width: 1200px) and (max-width: 1399px) {
  .get-icon-info p {
    line-height: 22px;
    font-size: 14px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .get-main-box {
    margin-bottom: 25px;
  }
}
</style>