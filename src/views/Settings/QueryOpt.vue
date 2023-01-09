<template>
<div>
    <section class="query_form">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-7 ms-5 mb-3">
                    <router-link to="/settings/support" class="text-dark fs-4 ">
              <i class="fad fa-reply-all" style="color:var(--white)"></i>
              </router-link>
                </div>
                <div class="col-md-6 bg-light shadow-lg rounded p-5 middle-box">
                    <form class="row" @submit.prevent="submit">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Title</label>
                            <input type="text" class="form-control" placeholder="Enter the title" v-model.trim="v$.form.title.$model" />
                            <div v-if="submitted && v$.form.title.$error" class="error">
                                {{ v$.form.title.$errors[0]?.$message }}
                            </div>
                            <!-- <div class="error" v-if="submitted && !v$.form.title">
                                Title is required
                            </div> -->
                        </div>
                        <!--title-->

                        <div class="col-md-12 mb-3">
                            <label for="validationCustom04" class="form-label">Choose Category</label>
                            <select class="form-select" id="validationCustom04" v-model="form.category_id">
                               <!-- <option selected value="">Choose</option> -->
                                <option v-for="(data, index) in ticketlist" :key="index" :value="data.id">
                                    {{ data.name }}
                                </option>
                            </select>
                        </div>
                        <!-- Select  -->

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" placeholder="Enter the name" v-model.trim="v$.form.author_name.$model"  />
                            <div v-if="submitted && v$.form.author_name.$error" class="error">
                                {{ v$.form.author_name.$errors[0]?.$message }}
                            </div>
                            <!-- <div class="error" v-if="submitted && !v$.form.author_name.required">
                                Name is required
                            </div> -->
                        </div>
                        <!-- Name  -->
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Email</label>
                            <input type="text" class="form-control" placeholder="Enter Email" v-model.trim="v$.form.author_email.$model" />
                            <div v-if="submitted && v$.form.author_email.$error" class="error">
                                {{ v$.form.author_email.$errors[0]?.$message }}
                            </div>
                            <!-- <div class="error" v-if="submitted && !v$.form.author_email.required">
                                Email is required
                            </div>
                            <div class="error" v-if="submitted && !v$.form.author_email.email">
                                This must be an email
                            </div> -->
                        </div>
                        <!-- Email  -->
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Query</label>
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" rows="5" v-model.trim="v$.form.content.$model"></textarea>
                            <div v-if="submitted && v$.form.content.$error" class="error">
                                {{ v$.form.content.$errors[0]?.$message }}
                            </div>
                            <!-- <div class="error" v-if="submitted && !v$.form.content.required">
                                Query is required
                            </div> -->
                        </div>

                        <div class="col-md-12 mb-5" >
                            <label class="form-label">Image</label>
                            <!-- <label for="inputDoc1" class="form-label label_fw">Upload Document</label>         -->
                            <img :src="pan_card" id="img_url" @click="check('image_type', 'img_url')" class="filter_img img-thumbnail" alt="img" style="cursor: pointer" />
        
                            <input type="file" id="image_type" v-on:change="first($event, 'image')"  accept="image/*"   hidden  />
                            <!-- <div v-if="selected == true && submitted && this. image == null" class="error">
                                Image is required
                            </div> -->
                            
                        </div>
                        <!-- Query  -->
                        <div class="col-md-12 text-center">
                            <div v-if="loading" class="col-6 btn btn-dark shadow-none text-capitalize ">
                              <div class="spinner-border" role="status">
                                  <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                            
                            <button v-else type="submit" class="col-6 btn btn-dark shadow-none text-capitalize ">
                                Submit
                            </button>
                            
                        </div>
                       
                      
                        <!-- Query  -->
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<style scoped>
.middle-box {
    background-color: var(--nav-active) !important;
    color: var(--white);
}

.query_form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    background-color: #111111;
}
.filter_img {
    width: 120px;
    height: 120px;
    display: block;
}
</style>

<script>
import img from "@/assets/img-preview.png";
import ApiClass from "@/api/api";
import {
    useVuelidate
} from "@vuelidate/core";
import {
    email,
    required,
    helpers,
    // minLength,
    // minLength,
    // maxLength
} from "@vuelidate/validators";

export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data: () => ({
        first_image:"",
        pan_card: img,
        selected: true,
        loading: false,
        ticketlist: [],
        form: {
            title: "",
            category_id: "",
            author_name: "",
            author_email: "",
            content: "",
            created_by:"user",
        },
        submitted: false,
    }),
    validations: {
        form: {
            title: {
                required:  helpers.withMessage("Title  is required", required),
            },
            author_name: {
                required
            },
            author_email: {
                required,
                email
            },
            content: {
                required: helpers.withMessage("Query  is required", required),
            },
        },
    },
    async mounted() {
        var store = localStorage.user;
        var storeData = JSON.parse(store);
        this.form.author_email = storeData.email
        this.form.author_name = storeData.name;
        this.get_ticket();
    },
    methods: {        
        
        async get_ticket() {
           let response = await ApiClass.getRequest("ticket_type/get", true);
            if(response?.data) {
              if(response?.data.status_code == "1") {
                this.ticketlist = response.data.data;
                this.form.category_id = response.data.data[0] ?.id;
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

        check_data() {
            let first = document.getElementById("img_url");
            first.setAttribute("src", this.pan_card);
            this.first_image= "";            
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
            let result = await this.v$.$validate();
            if (!result) return;
            
            this.loading = true;
            var all_data = new FormData();
            all_data.append("title", this.form.title);
            all_data.append("category_id", this.form.category_id);
            all_data.append("author_name", this.form.author_name);
            all_data.append("author_email", this.form.author_email);
            all_data.append("content", this.form.content);
             all_data.append("created_by", this.form.created_by);
              if(this.first_image)
            {
                all_data.append("image", this.first_image) ;
            }
           
            var headers = {
                    "Content-Type": "multipart/form-data",
            };
            let response = await ApiClass.postRequest("ticket/create", true, all_data, headers);
            if(response?.data) {
        
              this.loading = false;
              if (response.data.status_code == 1) {
                  this.success(response.data.message);
                  this.form = [];
                  return this.$router.push("ticketlist");
              } else {
                  return this.failed(response.data.message);
              }
            }
        },
    },
};
</script>
