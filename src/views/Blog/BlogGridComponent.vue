<template>
  <div>
    <div class="crypto_content">
      <div class="col-12 text-center" v-if="blogData.length == 0">
        <div class="crypto_card1 d-flex align-items-center justify-content-center" id="crypto-info-text">
          <div class="text-center p-3">
            <h4>No Blogs Available</h4>
          </div>
        </div>
      </div>
      <div class="row align-items-center" v-else>
        <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="(data, index) in blogData" :key="index">
          <div class="crypto_page">
            <div class="crypto-img text-center">
              <img :src="data.image" alt="img" class="img-fluid" />
            </div>

            <div class="image-info">
              <div class="cards-image">
                <div class="crypto_card text-center p-3">
                  <h4 class="m-0 text-center text-capitalize">
                    {{ data.name }}
                  </h4>

                </div>
              </div>

              <div class="read-more-btn">
                <ul class="btnlist">
                  <li>
                    <button type="button" class="btn btn-primary" id="read-btn">
                      <router-link :to="'/readmore?blog=' + data.id" class="text-decoration-none text-white">Read More
                      </router-link>
                    </button>
                  </li>

                  <li>
                    <p class="m-0">
                      <span class="me-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="
                            fill: var(--dark-bg);
                            transform: ;
                            msfilter: ;
                                vertical-align: sub;
                          ">
                          <path
                            d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z">
                          </path>
                        </svg></span>{{
                            new Date(data.publish_at).toLocaleString(
                              "en-us",
                              Date_options
                            )
                        }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="pagination_box d-flex justify-content-center align-items-center pt-5 my-5"
            style="color: var(--black); text-align: center;">
            <pagination v-model="page" :records="recordData" :per-page="perPageData" @paginate="getBlogs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClass from "../../api/api";


export default {
  name: "BlogGridComponent",

  props: {
    blog: Number,
  },
  data() {
    return {
      Date_options: {
        // weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
        // second: "numeric",
      },
      blogData: [],
      page: 1,
      recordData: 0,
      perPageData: 6,
      options: {
        edgeNavigation: false,
        chunksNavigation: false,
        chunk: 3,
        texts: false,
        format: false,
      },
    };
  },
  watch: {
    blog: function () {
      this.getBlogs();
    },
  },
  methods: {
    async getBlogs() {
      var response = await ApiClass.getNodeRequest(
        "blog/get?cid=" +
        this.blog +
        "&page=" +
        this.page +
        "&per_page=" +
        this.perPageData
      );
      if (response.data.status_code == 1) {
        this.blogData = response.data.data.data;
        this.recordData = response.data.data.total;
      }
    },
  },
};
</script>

<style scoped>
.crypto_page {
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  border-radius: 0 0 5px 5px;
}

.crypto-img img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}


.crypto_card {
  min-height: 115px;
}

.crypto_card h4 {
  font-size: 18px;
  line-height: 26px;
  font-weight: 500;
  color: var(--black);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 15px;
}

.read-more-btn #read-btn {
  background-color: var(--dark-bg);
  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  border-color: var(--dark-bg);
}

.read-more-btn #read-btn:focus {
  box-shadow: none;
}

ul.btnlist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}


#crypto-info-text {
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.read-more-btn {
  border-top: 1px solid var(--upper-border);
  padding: 10px 10px;
}
</style>
