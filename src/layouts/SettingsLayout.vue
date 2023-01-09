<template>
  <div>
    <div class="bg-exchange">
      <div class="container py-3">
        <div class="row">
          <div class="col-lg-3 ">
            <Setting v-if="!$store.state.isMob" />
            <div class="back_to_setting_page">
              <router-link to="/settings" class="text-dark fs-4">
              <i class="fad fa-reply-all" style="color:var(--white)"></i>
              </router-link>
            </div>
          </div>

          <div class="col-lg-9 card card_cus p-3 py-zero-md">
            
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Setting from "@/components/Setting.vue";
export default {
  name: "SettingsLayout",
  components: {
    Setting,
  },
};
</script>

<style scoped>
.card_cus{
  background-color: #111111;
}
@media all and (min-width:992px) {
  .back_to_setting_page {
    display: none;
  }
}

@media all and (max-width:991px){
  .card_cus{
    border: none;
    
  }
  .py-zero-md{
    padding-top:0 !important ;
    padding-bottom:0 !important ;
  }
}
</style>
