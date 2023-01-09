<template>
<div>
    <section class="ticket_info">
      
        <div class="container">
            <div class="row justify-content-center">
                  <div class="col-md-8 mb-3">
                    <router-link to="/ticketlist" class="text-dark fs-4 ">
                    <i class="fad fa-reply-all" style="color:var(--white)"></i>
                    </router-link>
                </div>
                <div class="col-md-8">
                    <div class="row shadow-lg bg-light p-5 rounded middle-box">
                        <div class="col-md-12">
                            <h4 class="fw-bold m-0 mb-3">Ticket Info</h4>
                        </div>
                        <!-- Name  -->
                        <div class="col-md-12">
                            <label class="fw-bold">Name:
                                <span class="fw-normal text-capitalize">{{
                    upperData?.author_name
                  }}</span></label>
                        </div> 
                        <!-- Name  -->
                        <div class="col-md-12 mb-3">
                            <label class="fw-bold">Status
                                <span :style="changeclr(upperData?.status)" class="px-2 py-1 rounded w-100 text-center">{{ upperData?.status }}</span></label>
                        </div>
                        <!-- Status  -->
                        <div class="col-md-12 mb-3">
                            <label class="fw-bold">Comments</label>
                            <div class="previous_data border">
                                <div v-if="commentData.length == 0">
                                    <div class="d-flex justify-content-center" v-if="loading">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center" v-else>
                                        No Comment Available
                                    </div>
                                </div>



                                <div v-else class="previous_chat_data border mb-2" v-for="(data, index) in commentData" :key="index">
                                   
                                    <div class="user_date_comment_box d-flex justify-content-between align-items-center">
                                         <div class="user_img d-flex  align-items-center">
                                     <div>   <i class="fas fa-user-tie fs-1 me-2"></i> </div> <span class="fw-bold" >{{ data.user.name }}</span>
                                      </div>
                                        <div class="user_date_box ">
                                           
                                            <!-- <span class="fw-bold" ></span> -->
                                            <span class="float-right">
                                                {{new Date(data.created_at).toLocaleDateString("en-US", options)}}
                                            </span>
                                        </div>
                                    
                                    </div>
                                        <div class="user_name_comment d-flex align-items-center justify-content-between">
                                           <div > <p class="m-0" style="word-break:break-all">{{ data.comment }}</p></div>
                                              <span class="fw-bold mb-2 mb-lg-0" v-if="data.image" style="cursor:pointer"><img @click="largeImg = data.image" :src="data.image" style= "height:40px;width:40px" data-bs-toggle="modal" data-bs-target="#imageModel"></span>
                                           <div v-else class="mb-2 mb-lg-0"><svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px"  style="fill:var(--white)" viewBox="0 0 512 512">
                                            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z"/></svg>
                                            </div>
                                        </div>
                                </div>
                                <!-- 1  -->
                            </div>
                        </div>
                        <!-- Previous Data  -->
                        <form @submit.prevent="submit" v-if="statusChk != 'close'">
                            <div class="col-md-12 mb-3">
                                <label class="fw-bold">Comment</label>
                                <textarea class="form-control shadow-none text-c" placeholder="Leave a comment here" style="height: 100px" v-model.trim="$v.form.comment.$model"></textarea>
                                <div class="error" v-if="submitted && !$v.form.comment.required">
                                    Comment is required
                                </div>
                            </div>
                            <div class="col-md-12 mb-5" >
                                <label class="fw-bold">Image</label><br>
                            <!-- <label for="inputDoc1" class="form-label label_fw">Upload Document</label>         -->
                            <img :src="pan_card" id="img_url" @click="check('image_type', 'img_url')" class="filter_img img-thumbnail" alt="img" style="cursor: pointer" />
        
                            <input type="file" id="image_type" v-on:change="first($event, 'image')"  accept="image/*"   hidden  />
                            <!-- <div v-if="selected == true && submitted && this. image == null" class="error">
                                Image is required
                            </div> -->
                            
                        </div>
                            <!-- Input field  -->
                            <div class="col-md-12 text-center">
                                <div v-if="loading1" class="btn btn-dark shadow-none text-capitalize col-5 col-md-4 col-lg-3 col-xl-2">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <button v-else type="submit" class="btn btn-dark shadow-none text-capitalize col-5 col-md-4 col-lg-3 col-xl-2">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <!-- Button  -->
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

<script>
import img from "@/assets/img-preview.png";
import ApiClass from "@/api/api";
import {
    required
} from "vuelidate/lib/validators";
export default {
    name: "TicketInfo",
    data: () => ({
        largeImg:"",
        first_image :"",
        pan_card: img,
        loading1: false,
        commentData: [],
        upperData: [],
        form: {
            ticket_id: "",
            comment: "",
        },
        submitted: false,
        statusChk: "",
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
    validations: {
        form: {
            comment: {
                required,
            },
        },
    },
    mounted() {
        this.apiGet();
    },
    methods: {
        async apiGet() {
            this.loading = true;
            this.form.ticket_id = this.$route.params.id;
            let response = await ApiClass.getRequest("ticket/get/" + this.form.ticket_id, true);
            if(response?.data) {
              if(response?.data.status_code == 1) {
                console.log("asdfgh");
                this.upperData = response?.data.data;
                this.commentData = response?.data.data.comments;
                this.statusChk = response?.data.data.status;
                this.loading = false;
              }
            }
        },
         first(event, var_name) {
            const files = event.target.files;
            if (files.length == 0 && var_name == "image" )  {
               let first= (document.getElementById("img_url"));
               first.setAttribute("src", this.pan_card);
            }
            if (var_name == "image" ) {
                this.first_image = files[0];
            } 
        },
        check(id, img) {
            document.getElementById(id).click();
            var x = document.getElementById(id);
            x.onchange = () => {
                var a = document.getElementById(id);
                const [file] = a.files;
                if (file) {
                    var b = document.getElementById(img);
                    b.src = URL.createObjectURL(file);
                }
            };
        },
        async submit() {
            this.submitted = true;
            if (this.$v.form.$invalid) {
                return;
            }
            this.loading1 = true;
            var new_data = new FormData();
            new_data.append("ticket_id", this.form.ticket_id) ;
            new_data.append("comment", this.form.comment) ;

            if(this.first_image)
            {
                new_data.append("image", this.first_image) ;
            }
            var headers = {
                    "Content-Type": "multipart/form-data",
            };
            let response = await ApiClass.postRequest("ticket_comment/create", true,new_data,headers )
            if(this.submitted ===true){
            let first = document.getElementById("img_url");
            first.setAttribute("src", this.pan_card);
            this.first_image= ""; 
            }
            if (response ?.data) {
                this.loading1 = false;
                this.submitted = false;
                if (response.data.status_code == 1) {
                    this.success(response.data.message);
                    this.form.comment = "";                    
                    this.apiGet();
                } else {
                    this.failed(response.data.message);
                }
            }
        },

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
    },


};
</script>

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
.text-c {
    background-color: var(--border-color);
    color: var(--white);
    border-color: var(--white);
}

section.ticket_info {
    padding: 50px 0;
    background-color: #111111;

}

.middle-box {
    background-color: var(--nav-active) !important;
    color: var(--white);
}

.previous_data {
    padding: 10px 10px;
    border-radius: 5px;
    max-height: 250px;
    overflow-y: scroll;
}

.previous_chat_data {
    padding: 10px 10px;
    border-radius: 5px;
}

.user_date_comment_box {
    width: 100%;
}
.filter_img {
    width: 120px;
    height: 120px;
    display: block;
}
@media all and (min-width: 768px) and (max-width:991px) {
        .user_name_comment{
            flex-direction: column-reverse;
    align-items: unset !important;
    margin-top: 15px;
    }
    .middle-box {
    font-size: 14px;
}
}
@media all and (min-width: 320px) and (max-width: 767px) {
    .user_name_comment{
            flex-direction: column-reverse;
    align-items: unset !important;
    margin-top: 15px;
    }
    .middle-box {
    font-size: 14px;
}
.user_date_comment_box {
    flex-direction: column;
    align-items:start !important

}
}
</style>
