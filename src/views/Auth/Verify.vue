<template>
    <AuthLayout>
        <div class="row">
            <div class="auth_data" id="verification" v-if="otpValue">
                <div class="form-box" v-if="t2fa==2">
                    <h3 class="m-0 mb-3 heading_box">
                        {{ otpValue.otp_type == "withdraw" ? this.capitalizeFirstLetter(otpValue.otp_type) : '' }} {{
                        this.capitalizeFirstLetter(otpValue.send_type) }} Verification
                    </h3>
                    <p class="fw-bold heading_box">
                        Verify Your {{ this.capitalizeFirstLetter(otpValue.send_type) }}
                    </p>
                </div>
                <!-- verification form-->
                <div class="pb-3 form-box">
                    <form @submit.prevent="validateOtp()">
                       <div v-if="t2fa==2 && gogleAuth ==1">
                            <label for="exampleInputtext" class="form-label mt-3 mb-0" style="color:var(--black)">
                                {{ this.capitalizeFirstLetter(otpValue.send_type) }} OTP<span>*</span>
                                <br />
                            </label>
                            <div class="d-md-flex align-items-center justify-content-between">
                                <input type="text" placeholder="Enter  OTP " class="form-control py-3 w-100 mx-auto"
                                    id="exampleInputtext" aria-describedby="emailHelp" v-model="form.otp"
                                    onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == 1)))"
                                    onpaste="return false;" autocomplete="off" />
                            </div>

                                 <div v-if="v$.form.otp.$error" class="error-msg">
                                           <span class="text-danger">{{ v$.form.otp.$errors[0]?.$message }}</span>  
                                    </div>

                             <p id="timer-color" :style="{ color: timerClr }">{{ timeLeft }}</p>

                             <label for="exampleInputtext" class="form-label mt-3 mb-0" style="color:var(--black)">
                                    Google Authentication  TOTP<span>*</span>
                                <br />
                            </label>

                            <div class="d-md-flex align-items-center justify-content-between mb-2">
                                <input type="text" placeholder="Enter google Auth OTP " v-model="form.totp" class="form-control py-3 w-100 mx-auto"
                                    id="exampleInputtext" aria-describedby="emailHelp"
                                    onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == 1)))"
                                    onpaste="return false;" autocomplete="off" />
                            </div>
                            
                             <div v-if="v$.form.totp.$error" class="error-msg">
                                    <span class="text-danger">{{ v$.form.totp.$errors[0]?.$message}}</span>  
                              </div>
                        
                           
                               
                        </div>
                       <!--Google Authentication  -->

                      <div v-if="t2fa==0 && gogleAuth ==1">
                            <label for="exampleInputtext" class="form-label mt-3 mb-0" style="color:var(--black)">
                                    Google Authentication  TOTP<span>*</span>
                                <br />
                            </label>

                            <div class="d-md-flex align-items-center justify-content-between mb-2">
                                <input type="text" placeholder="Enter google Auth OTP " v-model="form.totp" class="form-control py-3 w-100 mx-auto"
                                    id="exampleInputtext" aria-describedby="emailHelp"
                                    onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == 1)))"
                                    onpaste="return false;" autocomplete="off" />
                            </div>
                              <div v-if="v$.form.totp.$error" class="error-msg">
                                    <span class="text-danger">{{ v$.form.totp.$errors[0]?.$message}}</span>  
                              </div>
                            
                      </div>
                      
                      <div v-if="t2fa==2 && gogleAuth ==0">
                           <label for="exampleInputtext" class="form-label mt-3 mb-0" style="color:var(--black)">
                                {{ this.capitalizeFirstLetter(otpValue.send_type) }} OTP<span></span>
                                <br />
                            </label>
                            <div class="d-md-flex align-items-center justify-content-between">
                                <input type="text" placeholder="Enter  OTP " class="form-control py-3 w-100 mx-auto"
                                    id="exampleInputtext" aria-describedby="emailHelp" v-model="form.otp"
                                    onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == 1)))"
                                    onpaste="return false;" autocomplete="off" />
                            </div>
                              <div v-if="v$.form.otp.$error" class="error-msg">
                                    <span class="text-danger">{{ v$.form.otp.$errors[0]?.$message}}</span>  
                              </div>
                             <p id="timer-color" :style="{ color: timerClr }">{{ timeLeft }}</p>

                               

                      </div>

                        <div class="loader-btn-otp text-center mt-2 mb-2" v-if="!disabled">

                            <button v-if="resendLoading" type="button" class="btn btn-bitqix shadow-none w-100" disabled>
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>

                            <button type="button" class="btn btn-bitqix shadow-none w-100" @click.prevent="resendOtp(otpValue)"
                                 v-else>
                                Resend  OTP 
                            </button>

                        </div>

                        <div class="verify-buttons" v-else>
                            <button v-if="loading" type="button" class="btn btn-bitqix shadow-none w-100">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>

                            <button v-else type="submit" class="btn btn-bitqix shadow-none w-100">
                                Verify OTP
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import ApiClass from "../../api/api";
import { useVuelidate } from '@vuelidate/core'
import { helpers,maxLength,requiredIf } from '@vuelidate/validators';

export default {
    name: "verify",
    components: {
        AuthLayout, 
    },
 setup () {
    return { v$: useVuelidate() }
  },
    data() {
        return {
            type: "password",
            name: "Login",
            gogleAuth:'',
            timerClr: "green",
            submitted: false,
            timeLeft: "",
            otpValue: "",
            resendLoading: false,
            loading: false,
            x: "",
            disabled: true,
             t2fa:'',
            form: {
                otp: "",
                totp:""
            },
        };
    },
    // validations: {
    //     form: {
    //         otp: {
    //             required,
    //             maxLength: maxLength(6),
    //         },
    //         totp:{
    //             required,
    //             maxLength: maxLength(6), 
    //         }

    //     },
    // },
    mounted() {
        if (!this.$store.getters.getUser) {
            return this.$router.push("/login");
        }
      this.otpValue = this.$store.getters.getUser;
      this.t2fa=this.$store.getters.getUser?.["2fa"];

     console.log(this.t2fa,"sss");

      console.log(this.otpValue,"pagal addmi");
       this.gogleAuth=this.$store.getters.getUser?.google_auth
    //   console.log(gg,"kkk");
    //   console.log( this.otpValue,">>>>>>>>>>>>");
    //     // this.otpValue = this.$route.params.data;
    //     // otp_type: "withdraw"
        this.timer(this.otpValue.expired_at);

    //   this.gogleAuth=this.$store.getters.getGogleAuth;
    //   console.log(this.gogleAuth,"fff>>>>>")
    },
    /*   watch: {

      timeLeft: function(){
         console.log(this.x);
        /* if(this.x < 120){
          //this.timerClr = 'red';
        } 
      }
    }, */
    methods: {
        async validateOtp() {
            const result1 = await this.v$.form.$validate()
            if (!result1) {
                return
            }

            console.log("sbm");
            // if (this.$v.form.$invalid) {
            //     return;
            // }

            this.loading = true;
            let form_data = {
                totp: this.form.totp,
                email: this.otpValue.email
            }
            let form_data1 = {
                totp: this.form.totp,
                otp: this.form.otp,
                email: this.otpValue.email,

            }
            let form_data2 = {
                email: this.otpValue.email,
                otp: this.form.otp,
            }
            let body = "";
            if(this.t2fa==0) {
                body = form_data;
            } else if(this.t2fa==2){
                 body =  form_data1
            } else {
                body = form_data2
            }

            
            let url ="";
            if(this.otpValue.otp_type == "withdraw") {
                url = "block/validateotpWith"
            } else if (this.t2fa==0 && this.gogleAuth ==1) {
                 url = "verify_auth"
            } else {
                 url = "validateotp"

            }
            // let url = this.otpValue.otp_type == "withdraw" ? "block/validateotpWith" : "validateotp";
            let bool = this.otpValue.otp_type == "withdraw" ? true : false;

            var result = await ApiClass.postRequest(url, bool, body);

            if (result.data.status_code == 1) {
                this.loading = false;
                if (this.x) {
                    this.form.otp = "";
                    this.form.totp="";
                    this.v$.$reset();
                    clearInterval(this.x);
                    this.timeLeft = "";
                }
                this.success(result.data.message,)
                // this.$swal({
                //     toast: true,
                //     position: "top-end",
                //     icon: "success",
                //     title: result.data.message,
                //     showConfirmButton: false,
                //     timer: 3000,
                // });
                if (this.otpValue.otp_type == "withdraw") { 
                    return this.$router.push("/portfolio");
                }
              
                localStorage.setItem("token", result.data.data.token);             
                localStorage.setItem("user", JSON.stringify(result.data.data.user));
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return this.$router.push("/exchange/BTCUSDT");
               
            } else {
                this.loading = false;
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
                if (this.otpValue.otp_type == "withdraw") {
                    return this.$router.push("/exchange/BTCUSDT");
                }
            }
        },
        async resendOtp(userData) {
            console.log("f");
            this.resendLoading = true;
            this.disabled = true;
            this.timerClr = "green";
            var param = {
                type: userData.otp_type,
                email: userData.email
            };

            
            let url = this.otpValue.otp_type == "withdraw" ? "block/resendOtpWith" : "resendotp";
            let bool = this.otpValue.otp_type == "withdraw" ? true : false;

            var result = await ApiClass.postRequest(url, bool, param);
            if (result.data.status_code == 1) {
                this.resendLoading = false;
                this.otpValue = result.data.data;
                this.timer(this.otpValue.expired_at); // count down timer for enter the otp...........
                // this.$swal({
                //     toast: true,
                //     position: "top-end",
                //     icon: "success",
                //     title: result.data.message,
                //     showConfirmButton: false,
                //     timer: 3000,
                // });
                this.success(result?.data?.message)
            }
        },
        timer(countBackTime) {
            this.disabled = true;
            var countDownDate = new Date(countBackTime).getTime();

            if (this.x) {
                // clear the interval if user again click on the sign in button.............
                clearInterval(this.x);
                this.timeLeft = "";
            }

            this.x = setInterval(() => {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                this.timeLeft =
                    "You can resend OTP in (" + minutes + "m" + ":" + seconds + "s) ";

                if (minutes * 60 < 100) {
                    this.timerClr = "red";
                }
                //console.log(distance)

                if (distance < 0) {
                    // clear the interval if the otp is expired..........
                    clearInterval(this.x);
                    this.disabled = false;
                    this.timeLeft = "Otp is expired click the resend to get again";
                }
            }, 1000);
        },
    },
validations () {
    return {
       form:{
          otp: {
               required:helpers.withMessage(" OTP is required",requiredIf(function () { 
                console.log('in funccccc===',this.gogleAuth);
                return this.t2fa==2  })) ,
               maxLength:helpers.withMessage("  OTP  must be less than 6 characters",maxLength(6))
           },
            totp: {
            //    required:helpers.withMessage(" TOTP is required",requiredIf(()=> {return this.gogleAuth})),
               required:helpers.withMessage(" TOTP is required",  requiredIf(function () { 
                console.log('in funccccc===',this.gogleAuth);
                return this.gogleAuth })),             
               maxLength:helpers.withMessage("TOTP  must be less than 6 characters",maxLength(6))
            //    required: requiredIf( ... )
           },
          
          

       }
     
    }
  }
};
</script>

<style scoped>
.heaing_box{
    font-size: 20px;
    color: var(--black);
}
.auth_data h5 {
    color: #a3a3a3;
    font-size: 16px;
    text-align: center;
    position: relative;
    margin-top: 30px;
}

.auth_data h5::before {
    content: "";
    position: absolute;
    left: 12%;
    top: 0;
    margin: auto 0px;
    background: #bbb7b7;
    width: 120px;
    height: 1px;
    bottom: 0;
}

.auth_data h5::after {
    content: "";
    position: absolute;
    right: 12%;
    top: 0;
    margin: auto 0px;
    background: #bbb7b7;
    width: 120px;
    height: 1px;
    bottom: 0;
}

label {
    font-weight: 600;
    font-size: 16px;
}

.btn-dark:focus {
    background: #000;
    color: #fff;
    border-color: #000;
    box-shadow: none;
}

.auth_data h6 {
    margin-top: 15px;
    font-size: 16px;
}

.form-control:focus {
    border-color: #ccc !important;
    box-shadow: 0px 0px 4px #f1f1f1 !important;
}

.forget_link a {
    float: right;
    margin: 5px 0px;
    font-size: 16px;
    color: #0d6efd;
    font-weight: 600;
    text-decoration: none;
}

.w-73 {
    width: 73%;
}

.top-50 {
    top: 32% !important;
}

.start-100 {
    left: 92% !important;
}

.eye_icn {
    cursor: pointer;
}

div#verification {
    max-width: 590px;
    margin: 0 auto;
}

.input-group .input-group-text {
    background-color: transparent;
    border-left: 0;
    border-color: #b9c4cb;
    border-width: 2px;
    border-radius: 0 10px 10px 0;
}

.form-box h3 {
    font-weight: 700;
    word-spacing: 3px;
    color: var(--black);
}

.form-box label {
    font-weight: 600;
    color: var(--white);
}

.form-box .form-control {
    padding-block: 12px;
    border-radius: 10px;
    border-color: #b9c4cb;
    border-width: 2px;
    color: #909090;
}

.btn-bitqix {
    background-color: #e5a65c !important;
    border-radius: 10px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    padding-block: 10px;
}

.btn-bitqix:hover {
    background-color: #ebb474 !important;
}

@media only screen and (max-width: 767px) {
    .start-100 {
        left: 86% !important;
    }

    .w-73 {
        width: 100%;
    }

    .otp_btn {
        width: 100% !important;
        margin-top: 10px;
    }
}

@media only screen and (max-width: 1780px) {

    .auth_data h5::before,
    .auth_data h5::after {
        display: none;
    }

    .otp_btn {
        padding: 15px 0px !important;
    }
}

#timer-color {
    font-size: 13px;
    font-weight: 600;
    margin-top: 2px;
    margin-left: 10px;
}
</style>
