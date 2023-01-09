<template>
<section class="login-page">
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <!-- img  -->
            <div class="col-lg-6 d-none d-lg-block">
                <div class="login-img">
                    <object type="image/svg+xml" :data="signup_svg">
                        <img :src="signup_svg" class="img-fluid" alt="img" />
                    </object>
                </div>
            </div>

            <!-- form  -->
            <div class="col-sm-10 col-md-8 col-lg-5 offset-lg-1">
                <div class="form-box">
                    <h3 class="m-0 mb-3">Sign Up to <span>Myvee</span></h3>
                    <p class="m-0 mb-3">Fill the details asked below:</p>
                    <form action="" class="row" @submit.prevent="submitForm()">

                        <!-- Username  -->
                        <div class="col-12 mb-3">                       
                            <label for="exampleInputtext" class="form-label">Username</label>
                            <input type="text" class="form-control shadow-none" autocomplete="off" placeholder="Name"  id="exampleInputtext" aria-describedby="userHelp" v-model.trim="v$.form.name.$model" onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)  || event.charCode == 32" onpaste="return false;"  />
                              <div v-if="submitted && v$.form.name.$error" class="error-msg">
                                {{ v$.form.name.$errors[0]?.$message }}
                            </div>                          
                        </div>

                        <!-- Email  -->
                        <div class="col-12 mb-3">                           
                            <label class="form-label" for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control shadow-none" placeholder="Enter email-id" id="exampleInputEmail1" aria-describedby="emailHelp" v-model.trim="v$.form.email.$model" autocomplete="off" />
                              <div v-if="submitted && v$.form.email.$error" class="error-msg">
                                {{ v$.form.email.$errors[0]?.$message }}
                            </div>                       
                        </div>

                        <!-- Password  -->
                        <div class="col-12 position-relative mb-3">                           
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <div class="input-group">
                                <input :type="hidden ? 'password' : 'text'" class="form-control shadow-none border-end-0" placeholder="Password" autocomplete="off" id="exampleInputPassword1" v-model.trim="v$.form.password.$model" />
                                <span class="input-group-text" id="basic-addon1">
                                    <!-- hide-show icon  -->
                                    <div class="hide_show">
                                        <button type="button" class="btn p-0 shadow-none">
                                            <span @click="hidden = !hidden" v-html="hidden ? show_password : hide_password"></span>
                                        </button>
                                    </div>
                                </span>
                            </div>
                            <!-- error msg  -->
                            <div v-if="submitted && v$.form.password.$error" class="error-msg">
                                {{ v$.form.password.$errors[0]?.$message }}
                            </div> 
                        </div>

                        <!-- Confirm Password  -->
                        <div class="col-12 position-relative mb-3">                           
                            <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                            <div class="input-group">
                                <input :type="hidden1 ? 'password' : 'text'" class="form-control shadow-none border-end-0" placeholder="Confirm Password" autocomplete="off" id="exampleInputPassword2" v-model.trim="v$.form.confirm_password.$model" />
                                <span class="input-group-text" id="basic-addon1">
                                    <!-- hide-show icon  -->
                                    <div class="hide_show">
                                        <button type="button" class="btn p-0 shadow-none">
                                            <span @click="hidden1 = !hidden1" v-html="hidden1 ? show_password : hide_password"></span>
                                        </button>
                                    </div>
                                </span>
                            </div>
                              <div v-if="submitted && v$.form.confirm_password.$error" class="error-msg">
                                {{ v$.form.confirm_password.$errors[0]?.$message }}
                            </div>                               
                        </div>

                        <!-- Refferal  -->
                        <div class="col-12 mb-3">                          
                          <label for="referral" class="form-label">Refferal</label>
                          <input type="text" class="form-control shadow-none" placeholder="Code" id="referral" v-model.trim="v$.form.referral.$model" autocomplete="off" />
                          <!-- error msg  -->
                          <div v-if="submitted && v$.form.referral.$error" class="error-msg">
                              {{ v$.form.referral.$errors[0]?.$message }}
                          </div>
                        </div>
                        
                        <!-- Checkbox -->
                        <div class="col-md-12 mb-3">
                            <div class="d-flex gap-1">
                              <div>
                                  <input class="shadow-none" type="checkbox" v-model.trim="v$.form.terms.$model" />
                              </div>
                              <div>
                                  <router-link :to="{ name: 'Support', params: { slug: 'terms_and_condition' } }" class="form-check-label fw-normal">
                                      I agree to terms & conditions.
                                  </router-link>
                              </div>
                            </div>
                            <div v-if="submitted && v$.form.terms.$error" class="error-msg">
                                    {{ v$.form.terms.$errors[0]?.$message }}
                            </div>                           
                        </div>

                        <!-- Button  -->
                        <div class="col-12 mb-3">
                            <!-- loader  -->
                            <button v-if="loading" type="button" class="btn btn-bitqix shadow-none w-100">
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                            <!-- sign-btn  -->
                            <button v-else type="submit" class="btn btn-bitqix shadow-none w-100">
                                Sign Up
                            </button>
                        </div>
                        <!-- have account  -->
                        <div class="col-12 mb-2 text-center">
                            <p class="m-0">Already have an account,</p>
                            <p class="m-0">
                                You can
                              <router-link to="/login" class="fw-bold">Sign In</router-link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import ApiClass from "../../api/api";
import {
    useVuelidate
} from "@vuelidate/core";
import {
   required,
    email,
    maxLength,
    minLength,
    sameAs,
    helpers,

} from "@vuelidate/validators";
export default {
    name: "SignUp",
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            loading: false,
            hidden: true,
            hidden1: true,
            show: false,
            signup_svg: require("@/assets/auth_img/signup.svg"),
            show_password: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill:#747474;"><path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>',
            hide_password: "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' style='fill:#747474;'><path d='M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z'></path></svg>",
            submitted: false,
            form: {
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                referral: "",
                terms: ""
            },
        };
    },
    validations() {
      return {
        form: {
            name: {
                required:   helpers.withMessage("Name is required", required),
                maxLength:  helpers.withMessage("Name must be less than 20 characters", maxLength(20)),
            },
            email: {
                required:   helpers.withMessage("Email is required", required),
                email:      helpers.withMessage("This must be an email", email),
            },
            password: {
                required:   helpers.withMessage("Password is required", required),
                minLength:  helpers.withMessage("Password must be 8 character", minLength(8)),
                regex:      helpers.withMessage(() => ` Password should contains at least One Uppercase, One Lowercase and One Special Character.`,
                                      (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)),
                
            },
            confirm_password: {
                required:   helpers.withMessage("Confirm Password is required.", required),
                sameAsPassword: helpers.withMessage("Password and Confirm Password is not match.", sameAs(this.form.password))
            },
            referral: {
                minLength:  helpers.withMessage("Referral Code must be 11 character", minLength(11)),
                maxLength:  helpers.withMessage("Referral Code cant be more than 11 character", maxLength(11)),
            },
            terms: {
                sameAs:     helpers.withMessage("Terms and conditions are required", sameAs(true)),
            },
        },

      }
    },
    methods: {
        resetform() {
            this.form = {
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                referral: "",
                terms: ""
            };
        },
        async submitForm() {
            this.submitted = true;
            const rval = await this.v$.$validate();
            if(!rval) return;
            this.submitted = false;
            this.loading = true;
            var result = await ApiClass.postRequest("register", false, this.form);
            if(result?.data) {
              if (result.data.status_code == 1) {
                  this.loading = false;
                  this.success(result.data.message);                
                  this.resetform();
              } else {
                  this.loading = false;
                  this.failed(result.data.message)
              }
            }
        },
    },
    created() {
        this.form.referral = this.$route.query.referral ?
            this.$route.query.referral :
            "";
    },
    mounted() {
        if (this.$route.params.email != null) {
            this.form.email = this.$route.params.email;
        }
    },
};
</script>

<style scoped>
section.login-page {
    min-height: 95vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-block: 25px;
    background-color: var(--black);
}

section.login-page::before {
    position: absolute;
    content: "";
    top: -150px;
    right: -180px;
    background-image: url(../../assets/auth_img/upper.png);
    width: 691px;
    height: 519px;
    z-index: -1;
}

section.login-page::after {
    position: absolute;
    content: "";
    bottom: -110px;
    left: -60px;
    background-image: url(../../assets/auth_img/bottom.png);
    width: 900px;
    height: 677px;
    z-index: -1;
}

.form-box {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 40px;
    border-radius: 25px;
    border: 0.5px solid #e5a65c;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.form-box h3 {
    font-weight: 700;
    word-spacing: 3px;
}

.form-box h3 span {
    color: var(--fav-color);
}

.form-box label {
    font-weight: 600;
}

.form-box input {
    padding-block: 12px;
    border-radius: 10px;
    border-color: #b9c4cb;
    border-width: 2px;
    color: #909090;
    background-color: #fff;
}

.input-group .input-group-text {
    background-color: #fff;
    border-left: 0;
    border-color: #b9c4cb;
    border-width: 2px;
    border-radius: 0 10px 10px 0;
}

.form-box a {
    color: #17394f;
    text-decoration: none;
}

.form-box a:hover {
    text-decoration: underline;
}

.btn-bitqix {
    background-color: var(--fav-color) !important;
    border-radius: 10px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    padding-block: 10px;
}

.btn-bitqix:hover {
    background-color: var(--fav-color) !important;
}

.form-box .form-check-input {
    background-color: #7697ac !important;
    border: 1px solid rgb(118 151 172) !important;
}

@media all and (min-width: 320px) and (max-width: 767px) {
    .form-box {
        padding: 20px;
        border-radius: 25px;
    }
}
</style>
