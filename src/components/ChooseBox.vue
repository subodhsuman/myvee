<template>
  <div>
    <div class="choose-main-box">
      <div class="choose-icon">
        <img :src="Choose.choose_icon" alt="" class="img-fluid" />
      </div>
      <!--choose-icon-->

      <div class="choose-info">
        <h2>{{ Choose.choose_head }}</h2>
        <p>
          {{ Choose.choose_info }}
        </p>
      </div>
      <!--choose-info-->
    </div>
    <!--choose-main-box-->
  </div>
</template>

<script>
export default {
  name: "ChooseBox",
  props: {
    Choose: Object,
  },
};
</script>

<style scoped>
.choose-main-box {
  padding: 10px 10px;
  background-color: #fff;
  /* box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px; */
  box-shadow: rgb(17 17 26 / 5%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  border-radius: 2px;
  transition: all 0.3s ease;
  margin-bottom: 25px;
}

.choose-main-box:hover {
  transition: all 0.3s ease;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
  /* transform: translate(0, -5px); */
}

.choose-icon {
  margin-bottom: 15px;
}

.choose-info {
  min-height: 275px;
}

.choose-info h2 {
  font-size: 19px;
  line-height: 34px;
  text-transform: capitalize;
  font-family: "Poppins";
  font-weight: 500;
  color: #000;
}

.choose-info p {
  text-align: justify;
  line-height: 27px;
  margin-bottom: 0;
  font-size: 14px;
}

@media all and (min-width: 1200px) and (max-width: 1399px) {
  .choose-info h2 {
    font-size: 16px;
    line-height: 29px;
  }
  .choose-info p {
    font-size: 13px;
  }
}
</style>