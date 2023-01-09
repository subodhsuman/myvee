<template>
  <div>
    <section class="blog_koinbazzar">
      <Heading title="Blogs" />
      <div class="container">
        <div class="row">
          <div class="col-md-12">

            <div class="loader-image d-flex justify-content-center" v-if="loading">
              <!-- <img src="@/assets/images/readmore/Spin-Preloader-1.gif" class="img-fluid" alt="loader" > -->
              <div class="spinner-border" style="width: 4rem; height: 4rem ; color:var(--dark-bg);" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="blog_tabs" v-else>
              <ul class="nav nav-pills nav-fill d-flex justify-content-center mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation" v-for="(category, index) in categories" :key="index">
                  <button class="nav-link" :class="active_tab == category.id ? 'active' : ' '" id="pills-home-tab"
                    data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab"
                    aria-controls="pills-home" aria-selected="true" @click="active_tab = category.id">
                    {{ category.name }}</button>
                </li>
              </ul>
              <div class="tab-content mt-5" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <BlogGridComponent :blog="active_tab" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import BlogGridComponent from './BlogGridComponent.vue';
import ApiClass from '../../api/api';
import Heading from "@/components/Home_New/Heading.vue";
export default {
  name: "AboutView",
  components: {
    BlogGridComponent,
    Heading
  },
  data() {
    return {
      loading: true,
      categories: [],
      active_tab: null,
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      let response = await ApiClass.getNodeRequest('category/get');
      if (response.data.status_code == 1) {
        this.categories = response.data.data.data;
        console.log(this.categories, "john");
        this.active_tab = this.categories[0]?.id;
        this.loading = false;
      }
    }
  },
}
</script>
<style scoped>
/* *******************blog-content******************* */
ul#pills-tab {
  gap: 20px;
}

.nav-pills .nav-link {
  font-weight: 500;
  color: var(--black);
  font-size: 15px;
  text-transform: uppercase;
  background-color: var(--white);
  box-shadow: var(--box-shadow);
}

.nav-pills .nav-link.active {
  background-color: var(--dark-bg);
  color: var(--white);
  box-shadow: var(--box-shadow);
}
</style>

