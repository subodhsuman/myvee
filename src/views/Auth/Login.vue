<template>
    <section class="login-page">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <!-- img  -->
                <div class="col-lg-6 d-none d-lg-block" v-if="!noImage">
                    <div class="login-img">
                     
                        <object type="image/svg+xml" :data="login_svg">
                            <img :src="login_svg" class="img-fluid" alt="img">
                        </object>
                    </div>
                </div>

                <!-- form  -->
                <div class="col-sm-10 col-md-8 col-lg-5 offset-lg-1">
                    <div class="form-box">
                        <h3 class="m-0 mb-3">Sign In to <span>Myvee</span></h3>
                        <p class="m-0 mb-3">Fill the details asked below:</p>
                        <form action="" class="row" @submit.prevent="submitForm()">
                            <!-- Email  -->
                            <div class="col-12 mb-3">
                                <div :class="{'form-group--error': v$.form.email.$error }">
                                    <label or="exampleInputEmail1" class="form-label">Email</label>
                                    <input id="exampleInputEmail1" autocomplete="off" type="email"
                                        class="form-control shadow-none" placeholder="Enter email-id"
                                        v-model.trim="v$.form.email.$model">
                                    <!-- error msg  -->
                                     <div v-if="submitted && v$.form.email.$error" class="error-msg">
                                            {{ v$.form.email.$errors[0]?.$message }}
                                    </div>
                                    <!-- <div class="error" v-if="submitted && !$v.form.email.required">
                                        Email is required
                                    </div>
                                    <div class="error" v-if="submitted && !$v.form.email.email">
                                        This must be an email
                                    </div> -->
                                </div>
                            </div>
                            <!-- Password  -->
                            <div class="col-12 position-relative mb-1">
                                <div :class="{ 'form-group--error': v$.form.password.$error }">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <div class="input-group">
                                        <input id="exampleInputPassword1" autocomplete="off"
                                            :type="hidden ? 'password' : 'text' "
                                            class="form-control shadow-none border-end-0" placeholder="Password"
                                            v-model.trim="v$.form.password.$model" />
                                        <span class="input-group-text" id="basic-addon1">
                                            <!-- hide-show icon  -->
                                            <div class="hide_show">
                                                <button type="button" class="btn p-0 shadow-none"><span
                                                        @click="hidden = !hidden"
                                                        v-html="hidden ? show_password : hide_password"></span></button>
                                            </div>
                                        </span>
                                    </div>
                                    <!-- error msg  -->
                                    <div v-if="submitted && v$.form.password.$error" class="error-msg">
                                            {{ v$.form.password.$errors[0]?.$message }}
                                    </div>
                                    <!-- <div class="error" v-if="submitted && !$v.form.password.required">
                                        Password is required
                                    </div> -->
                                </div>
                            </div>
                            <!-- Forgot Password  -->
                            <div class="col-12 mb-4 text-end">
                                <router-link to="/forgetpassword" class="fw-bold">Forgot Password?</router-link>
                            </div>
                            <!-- recaptcha box  -->
                            <div class="col-12 mb-4">
                                <div class="recaptcha-box mb-3">
                                    <vue-recaptcha ref="recaptcha" @verify="markRecaptchaAsVerified"
                                        @expired="loginForm.recaptchaVerified = false" :sitekey="captcha_site_key">
                                    </vue-recaptcha>
                                    <!-- error msg  -->
                                    <div class="error-msg" v-if="!loginForm.recaptchaVerified && submitted">
                                        Please verify captcha
                                    </div>
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
                                <button v-else type="submit" class="btn btn-bitqix shadow-none w-100">Sign In</button>
                            </div>
                            <!-- Don't have account  -->
                            <div class="col-12 mb-2 text-center">
                                <p class="m-0">If you don't have an account,</p>
                                <p class="m-0">You can <router-link to="/signup" class="fw-bold">Sign Up</router-link>
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
    helpers,

} from "@vuelidate/validators";
// import {
//     required,
//     email
// } from "vuelidate/lib/validators";
import {
    VueRecaptcha
} from "vue-recaptcha";
export default {
    name: "Login",
    components: {
        VueRecaptcha
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            login_svg: require('@/assets/auth_img/login-img.svg'),
            loading: false,
            hidden: true,
            show: false,
            show_password: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill:#747474;"><path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>',
            hide_password: "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' style='fill:#747474;'><path d='M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z'></path></svg>",
            submitted: false,
            form: {
                email: "",
                password: "",
                captcha_response: "",
            },
            loginForm: {
                recaptchaVerified: false,
            },
            captcha_site_key: ApiClass.CAPTCHA_SITE_KEY,
            noImage:false,
        };

    },
    mounted() { 
        this.noImage = (this.$route.params.noImg) ? (this.$route.params.noImg): false;
    },
    validations: {
        form: {
            email: {
                required:   helpers.withMessage("Email is required", required),
                email:      helpers.withMessage("This must be an email", email),
            },
            password: {
                required:   helpers.withMessage("Password is required", required),
                // valid: function (value) {
                //   const containsUppercase = /[A-Z]/.test(value);
                //   const containsLowercase = /[a-z]/.test(value);
                //   const containsSpecial = /[#?!@$%^&*-]/.test(value);
                //   return containsUppercase && containsLowercase && containsSpecial;
                // },
                // minLength: minLength(8),
            },
        },
    },
    methods: {
        async submitForm() {
            this.submitted = true;
            const rval = await this.v$.$validate();
            if (!this.loginForm.recaptchaVerified || !rval) {
                return;
            }
            this.submitted = false;
            this.loading = true;
            var result = await ApiClass.postRequest("login", false, this.form);

            if (result.data.status_code == 1) {
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });

                this.form.email = this.form.password = this.form.captcha_response = "";
                if (result?.data?.data?.token && !result?.data?.data?.google_auth) {
                    localStorage.setItem("token", result?.data?.data?.token);
                    localStorage.setItem("user", JSON.stringify(result?.data?.data?.user));
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // for slow down
                    this.loading = false;
                    this.$store.commit("SET_USER",result.data.data.user);
                    this.$store.commit("SET_GOOGLE_AUTH",result?.data?.data?.google_auth);
                    return (window.location.href =
                        window.location.origin + "/exchange/BTCUSDT/");
                } 
                
                else if(result?.data?.data?.google_auth){                    
                    // localStorage.setItem("token", result?.data?.data?.token);
                    // localStorage.setItem("user", JSON.stringify(result?.data?.data?.user));
                    this.loading = false;
                    this.$store.commit("SET_USER",result?.data?.data);
                    this.$store.commit("SET_GOOGLE_AUTH",result?.data?.data?.google_auth);
                    console.log( window.location.origin);
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // for slow down
                    this.$router.push("verify");
                    // return (window.location.href =
                    //     window.location.origin + "/verify");
                }   

                else {
                     this.$store.commit("SET_USER",result?.data?.data);
                     return  this.$router.push("verify");




                    // return this.$router.push({
                    //     name: "Verify",
                    //     params: {
                    //         data: result.data.data,
                        
                    //     },
                    // });
                }

                

            }
            
            else {
                this.loading = false;
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.$refs.recaptcha.reset();
                this.loginForm.recaptchaVerified = null
                this.form.captcha_response = "";
            }
        },
        markRecaptchaAsVerified(response) {
            this.loginForm.recaptchaVerified = true;
            this.form.captcha_response = response;
        },
    },
}
</script>

<style scoped>
section.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-block: 25px;
    background-color: var(--black);
}

section.login-page::before {
    position: absolute;
    content: '';
    top: -150px;
    right: -180px;
    background-image: url(../../assets/auth_img/upper.png);
    width: 691px;
    height: 519px;
    z-index: -1;
}

section.login-page::after {
    position: absolute;
    content: '';
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

@media all and (min-width:320px) and (max-width:767px) {
    .form-box {
        padding: 20px;
        border-radius: 25px;
    }

}


</style>
