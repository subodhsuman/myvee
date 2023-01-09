<template>
  <div>
    <!---settings Page-->
    <div class="container mt-3">
      <div class="row justify-content-center">
        <div class="col-md-6">
        <Setting />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Setting from "@/components/Setting.vue";
export default {
  name: "Settings",
components:{
  Setting
},
  data: () => ({}),
};
</script>



