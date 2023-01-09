<template>
  <div>
    <section class="report_main">
      <div class="container-fluid p-0">
        <div class="row  ">
          <div class="col-sm-12 col-md-4 col-lg-2 mt-3">
            <!-- Report navbar Area -->
            <Reportnavbar />
          </div>

          <div class="col-sm-12 col-md-8 col-lg-10 card mt-3">
            <!-- Report content Area -->
            <slot></slot>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Reportnavbar from "@/components/Reportnavbar.vue";
export default {
  name: "ReportLayout",
  components: {
    Reportnavbar,
  },
};
</script>
<style scoped></style>
