<template>
  <div class="coming-bg">
    <section class="coming-main-sec">
      <div class="container">
        <div class="row">
          <div class="col-xl-11 col-lg-6 col-md-6 mx-auto">
            <div class="coming-image">
              <img
                src="../assets/comming-soon/comming.gif"
                alt=""
                class="img-fluid"
              />
            </div>
            <!--coming-image-->
          </div>
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
  </div>
</template>

<script>
export default {
  name: "Coming",
};
</script>



<style scoped>
.coming-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}
</style>