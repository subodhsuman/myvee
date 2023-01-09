<template>
  <div>
    <section class="maintain-sec">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="info"></div>
            <div class="maintain-image text-center">
              <img
                src="../assets/home_images/undrmainten.png"
                alt=""
                class="img-fluid"
              />
            </div>
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--maintain-sec-->
  </div>
</template>


<script>
export default {
  name: "Maintenance",
};
</script>

<style scoped>
.maintain-sec {
  padding: 80px 0;
}

.maintain-image img {
  max-width: 750px;
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .maintain-image img {
    max-width: 550px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .maintain-image img {
    max-width: 300px;
  }
}
</style>
