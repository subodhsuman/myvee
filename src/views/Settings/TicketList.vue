<template>
<div>
    <section class="query_form">
        <div class="container">
            <div class="row">
                  <div class="col-md-7 mb-3">
                    <router-link to="/settings/support" class="text-dark fs-4 ">
              <i class="fad fa-reply-all" style="color:var(--white)"></i>
              </router-link>
                </div>
                <div class="col-md-12 bg-light shadow-lg rounded p-5 middle-box">
                    <h4 class="fw-bold m-0 mb-3">Ticket List</h4>
                    <!-- heading  -->
                    <div class="table-responsive">
                        <table class="table align-middle text-nowrap"  style="cursor: pointer">
                            <thead class="text-white">
                                <tr>
                                    <th class="text-capitalize" v-for="(data, index) in table_headings" :key="index">
                                        {{ data }}
                                    </th>
                                </tr>
                            </thead>
                            <!-- thead  -->

                            <tbody>
                                <tr v-if="ticketlist.length == 0">
                                    <td colspan="9">
                                        <div class="d-flex justify-content-center" v-if="loading">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <span v-else class="d-flex justify-content-center text-light">
                                            No Ticket Available
                                        </span>
                                    </td>
                                </tr>

                                <tr class="text-white" v-else v-for="(list, index) in ticketlist" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ list.category.name }}</td>
                                    <td class="text-truncate" style="max-width: 135px">
                                        {{ list.title }}
                                    </td>
                                    <td>{{ list.author_name }}</td>
                                    <td>{{ list.author_email }}</td>
                                    <td>{{ new Date(list.created_at).toLocaleDateString("en-US", options)}}
                                    </td>
                                    <td v-if="list.image"><img @click="largeImg = list.image" :src="list.image" style="height:50px;width:50px" data-bs-toggle="modal" data-bs-target="#imageModel"></td>
                                    <td v-else>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="50px" width="50px"  style="fill:var(--white)" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z"/></svg>
                                    </td>
                                    <td>
                                        <span :style="changeclr(list.status)" class="px-2 py-1 rounded w-100 d-block text-center">{{ list.status }}</span>
                                    </td>
                                    <td>
                                        <router-link :to="`/ticketinfo/${list.id}`" class="btn btn-outline-dark border-0 shadow-none"><i class="fas fa-eye"></i></router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div class="pagination_box">
                            <pagination
                                v-model="page"
                                :records="recordData"
                                :per-page="per_page"
                                :optionT="optionT"
                                @paginate="get_ticket_list"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade text-center" id="imageModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center position-relative border-bottom-0" style="background-color:var(--nav-active);">
                    <h5 class="modal-title" id="exampleModalLabel">Image</h5>
                    <button type="button" class="btn_cancel border-0 shadow-none" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" style="fill:var(--white)" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                    </button>
                </div>
            <div class="modal-body p-0 text-center">

                <img :src="largeImg" alt="" class="" width="100%" height="400px">
                
            </div>
            </div>
        </div>
        </div>
</div>

</template>

<style scoped>
.btn_cancel{
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: transparent;
}
.modal-header h5{
    color: var(--white);
}
.pagination_box {
    padding: 0 19px;
    display: flex;
    justify-content: end;
  }
.query_form {
    padding: 50px 0;
    background-color: #111111;

}
.middle-box {
    background-color: var(--nav-active) !important;
    color: var(--white);
}
</style>

<script>
import ApiClass from "@/api/api";
import Pagination from "vue-pagination-2";
export default {
    components: {
    // SettingsLayout,
    Pagination
  },
    setup() {},
    data: () => ({
        largeImg:"",
        page: 1,
        recordData: 0,
        per_page: 10,
        optionT: {
            edgeNavigation:false,
            chunksNavigation:false,
            chunk:4,
            texts :false,
            format:false
        },
        table_headings: [
            "s no.",
            "ticket type",
            "title",
            "name",
            "email",
            "Ticket Generated",
            "image",
            "status",
            "action",
        ],
        ticketlist: [],
        loading: false,
        options: {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        },
    }),
    async mounted() {
        this.loading = true;
        this.get_ticket_list(); 
        // this.callback(this.page);       
    },
   
    methods: {
        changeclr(status) {
            if (status == "open") {
                return {
                    color: "#256029",
                    backgroundColor: "#c8e6c9",
                };
            } else if (status == "close") {
                return {
                    color: "#c63737",
                    backgroundColor: "#ffcdd2",
                };
            } else {
                return {
                    color: "#805b36",
                    backgroundColor: "#ffd8b2",
                };
            }
        },
      

        async get_ticket_list() {
            let response = await ApiClass.getRequest("ticket/get?page=" + this.page + "&per_page=" + this.per_page, true);
          if(response?.data) {
            if(response?.data.status_code == 1) {
                this.ticketlist = response.data.data.data;
                this.recordData = parseInt(response.data.data.total);
                this.per_page = parseInt(response.data.data.per_page);
           
            this.loading = false;
            }
          }
        }
    },
};
</script>
