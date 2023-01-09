<template>
  <div>
    <section class="read_blog">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-8 col-md-8">
            <div class="row inner-row">
              <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
                <div class="crypto_investment">
                  <img
                    :src="blog_data.image"
                    class="img-fluid"
                    alt="img"
                    style="width: 840px; height: 473px"
                  />
                </div>
                <!--crypto_investment-->
              </div>
              <!--col-xl-12 col-lg-12 col-md-12-->

              <div class="col-xl-12 col-lg-12 col-md-12">
                <div
                  class="investment_content beginner-guide"
                  style="word-break: break-word"
                >
                  <label class="mb-2">{{
                    new Date(blog_data.publish_at).toLocaleString(
                      "en-US",
                      options
                    )
                  }}</label>
                  <h3 class="mb-0">{{ blog_data.name }}</h3>
                  <p v-html="blog_data.description"></p>
                </div>
              </div>
            </div>
            <!--row inner-row-->
          </div>
          <!--col-xl-8 col-lg-8 col-md-8-->

          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="row inner-row">
              <div class="col-xl-12 col-lg-12 col-md-12 form-column mb-3">
                <div class="subscribe_form p-3">
                  <div class="subscribe_koinbazaar mt-2 mb-5">
                    <h3 class="mb-0">Subscribe Bitqix Newsletter</h3>
                  </div>
                  <div class="koinbazaar_form">
                    <form @submit.prevent="subscribe">
                      <div class="email-input mb-3">
                        <input
                          type="email"
                          class="form-control shadow-none"
                          placeholder="Your Email *"
                          v-model="email"
                          required
                        />
                      </div>
                      <div class="email-input mb-4">
                        <input
                          type="text"
                          class="form-control shadow-none"
                          placeholder="Your Name *"
                          v-model="name"
                          required
                        />
                      </div>
                      <div class="subscribe-btn d-grid">
                        <button type="submit" class="btn btn-primary sub-btn">
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!--col-xl-12 col-lg-12 col-md-12 form-column-->

              <div class="col-xl-12 col-lg-12 col-md-12 recent_blog_column mb-3">
                <div class="recent_blogs">
                  <div class="recent-blog-next">
                    <div class="subscribe_koinbazaar p-3">
                      <h3 class="mb-0">Recent Blogs</h3>
                    </div>
                    <div class="subscribe-list">
                      <ul class="p-0">
                        <li v-for="(blog, index) in recent_blogs" :key="index">
                          <router-link
                            :to="'/readmore?blog=' + blog.id"
                            class="text-decoration-none text-capitalize"
                            ><span
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                style="fill: var(--fav-color)"
                              >
                                <path
                                  d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
                                ></path></svg></span
                            >{{ blog.name }}</router-link
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!--col-xl-12 col-lg-12 col-md-12 recent_blog_column-->

              <div class="col-xl-12 col-lg-12 col-md-12 blog_categories mb-3">
                <div class="recent-blog-next" id="categories">
                  <div class="subscribe_koinbazaar p-3">
                    <h3 class="mb-0">Categories</h3>
                  </div>
                  <div class="subscribe-list">
                    <ul class="p-0">
                      <li v-for="(category, index) in categories" :key="index">
                        <router-link
                          to="/blog"
                          class="text-decoration-none text-capitalize"
                          ><span
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              style="fill: var(--fav-color)"
                            >
                              <path
                                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
                              ></path></svg
                          ></span>
                          {{ category.name }}</router-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!--col-xl-12 col-lg-12 col-md-12 blog_categories-->


              <div class="col-xl-12 col-lg-12 col-md-12 subscribe_blog sticky-top">
                           <div class="buy-cryptocurrency">
                             <div class="subscribe_koinbazaar p-3">
                                    <h3 class="m-0">Categories</h3>
                                </div>
                                <div class="buy-list">
                                    <ul class="p-0">
                                      <li class="" v-for="(buy,index) in BuyData" :key="index"><router-link to="/about" class="text-decoration-none">  
                                        <div class="bitcoin-list d-flex justify-content-between">
                                            <div class="buy-bitcoin d-flex gap-3 align-items-center">
                                                <img :src="require(`@/assets/images/readmore/${buy.image}`)" alt="img" class="img-fluid">
                                                <h5 class="m-0" style="color:var(--white)">{{buy.bitcoin}}</h5>
                                            </div>
                                            <div class="bitcoin-arrow">
                                                 <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" style="fill: var(--fav-color);"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></span>       
                                            </div>
                                        </div></router-link>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                </div><!--col-xl-12 col-lg-12 col-md-12 subscribe_blog-->
              
            </div>
            <!--row inner-row-->
          </div>
          <!--col-xl-4 col-lg-4 col-md-4-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--read_blog-->
  </div>
</template>

<script>

import {} from "dom7";
import ApiClass from "../../api/api";
export default {
  name: "ReadMoreView",

  data() {
    return {
      email: "",
      name: "",
      blog_id: null,
      blog_data: {},
      recent_blogs: [],
      categories: [],
      images: [],
      options: {
        // weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
        // second: "numeric",
      },
      BuyData: [
        {
          image: "bitcoin.png",
          bitcoin: "Buy Bitcoin",
        },
        // {
        // image:'eth.png',
        // bitcoin:'Buy Ethereum',
        // },
        {
          image: "eth.png",
          bitcoin: "Buy Ethereum",
        },
        {
          image: "litecoin.png",
          bitcoin: "Buy Litecoin",
        },
        {
          image: "riple.png",
          bitcoin: "Buy Ripple",
        },
        {
          image: "shiva.png",
          bitcoin: "Buy Shiba Inu Coin",
        },
        {
          image: "usdt.png",
          bitcoin: "Buy USDT",
        },
        {
          image: "dodge.png",
          bitcoin: "Buy Dodgecoin",
        },
      ],
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.path == "/readmore") {
        this.readMore();
        console.log({ to, from });
      }
    },
  },
  mounted() {
    if (this.$route.query) {
      this.blog_id = this.$route.query.blog;
      this.readMore();
      this.recentBlogs();
    }
  },
  methods: {
    async subscribe() {
      var form = {
        email: this.email,
        name: this.name,
      };
      let res = await ApiClass.postRequest("newsletter", false, form);
      if (res.data.status_code == 1) {
        this.email = this.name = "";
        return this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      this.$swal({
        toast: true,
        position: "top-end",
        icon: "error",
        title: res.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
    },
    async readMore() {
      this.blog_id = this.$route.query?.blog;
      let response = await ApiClass.getNodeRequest(
        "blog/get?id=" + this.blog_id
      );
      if (response.data.status_code == 1) {
        this.blog_data = response.data.data;
      }
    },
    async recentBlogs() {
      let response = await ApiClass.getNodeRequest("blog/get?per_page=5");
      console.log({ response });
      if (response.data.status_code == 1) {
        this.recent_blogs = response.data.data.data;
        this.images = this.recent_blogs.map((blog) => {
          return blog.image;
        });
      }
      let categories = await ApiClass.getNodeRequest("category/get?per_page=5");
      console.log({ categories });
      if (categories.data.status_code == 1) {
        this.categories = categories.data.data.data;
      }
    },
  },
};
</script>

<style scoped>
.blog_head h2 {
  color: var(--kb-blue);
  font-weight: 700;
  border-bottom: 1px solid var(--kb-border);
}

/* .investment_content {

        overflow-wrap: anywhere;
} */

.beginner-guide label {
  font-size: 16px;
  color: var(--dark-bg);
  font-weight: 600;
}

.beginner-guide h3 {
  color: var(--black);
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 500;
  padding-bottom: 10px;
}

.beginner-guide p {
  font-size: 15px;
  color: var(--kb-black);
}

.beginner-content h6 {
  font-size: 15px;
  font-weight: 700;
}

.beginner-content p {
  font-size: 15px;
  color: var(--kb-black);
}

/*******************subscribe_form*******************/
.subscribe_form {
  box-shadow: var(--box-shadow);
  background-color: var(--dark-bg);
  border-radius: 7px;
}

.subscribe-btn .sub-btn {
  background: var(--signup-btn);
  border-color: var(--signup-btn);
  min-width: 150px;
  font-size: 16px;
  font-weight: 500;
  font-family: "Poppins";
  color: var(--white);
  min-height: 45px;
  border-radius: 6px;
}

.subscribe-btn .sub-btn:focus {
  box-shadow: none;
}

.subscribe_koinbazaar h3 {
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: var(--white);
}

.koinbazaar_form .form-control {
  font-size: 14px;
  background-color: var(--nav-bg) !important;
  min-height: 43px;
  color: var(--black);
  font-weight: 400;
  border-color: var(--nav-bg);
}

/*****************recent-blog-next*********************/
.recent-blog-next {
  box-shadow: var(--box-shadow);
  background-color: var(--dark-bg);
  border-radius: 7px;
}

.subscribe-list ul {
  margin: 0;
}

.subscribe-list ul li {
  list-style: none;
  padding: 10px 0px;
  font-weight: 600;
  font-size: 14px;
}
.subscribe-list ul li a {
  color: var(--white);
}

.subscribe-list ul li:nth-child(5) {
  border-bottom: none;
}


/************buy-list***************/
.buy-cryptocurrency {
    box-shadow: var(--box-shadow);
  background-color: var(--dark-bg);
  border-radius: 7px;
}

.buy-list {
    padding: 0 8px;
}
.buy-list ul li {
  list-style: none;
  padding: 12px 0px;
}
.buy-list ul li a {
  color: var(--kb-black);
}

/*********************meadia********************************************/
@media all and (min-width: 320px) and (max-width: 767px) {
  .investment_content {
    top: -18px;
  }
}
</style>
