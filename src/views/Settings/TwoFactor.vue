<template>
<SettingsLayout>
    <!-- Heading  -->

    <div class="row mt-2">
        <div class="col-md-12">
            
            <ul class="list-group">
                <li class="list-group-item py-3" style="background-color:var(--nav-active);">
                    <div class="
                form-check
                d-flex
                justify-content-between
                align-items-center
                ps-0
              ">
                        <label class="form-check-label label_fw w-100 form-check_cus" for="flexRadioDefault1">
                            Email Verification
                            <br /><span class="badge bg-success fw-400">
                                Most Recommended</span>
                        </label>

                        <input v-model="selected" value="2" style="cursor:pointer;background-color: var(--social-link);border:0;" class="form-check-input form-check_cus" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-on:change="btn_show = true" />
                    </div>
                </li>
                <!-- <li class="list-group-item py-3">
            <div
              class="
                form-check
                d-flex
                justify-content-between
                align-items-center
                ps-0
              "
            >
              <label
                class="form-check-label label_fw w-100 form-check_cus"
                for="flexRadioDefault2"
              >
                Mobile/SMS Verification
                <br /><span class="badge bg-success fw-400">Recommended</span>
              </label>

              <input
                v-model="selected"
                value="1"
                class="form-check-input form-check_cus"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                v-on:change="btn_show = true"
              />
            </div>
          </li> -->
                <li class="list-group-item py-3" style="background-color:var(--nav-active);">
                    <div class="
                form-check
                d-flex
                justify-content-between
                align-items-center
                ps-0
              ">
                        <label class="form-check-label label_fw w-100 form-check_cus" for="flexRadioDefault3">
                            None<br />
                            <span class="badge bg-danger fw-400">Not Recommended</span>
                        </label>

                        <input v-model="selected" value="0" style="cursor:pointer;background-color: var(--social-link);border:0;" class="form-check-input form-check_cus" type="radio" name="flexRadioDefault" id="flexRadioDefault3" v-on:change="btn_show = true" />
                    </div>
                </li>
                <li class="list-group-item py-3" style="background-color:var(--nav-active);">
                    <div class="f form-check
                d-flex
                justify-content-between
                align-items-center
                ps-0">
                                    <label class="form-check-label label_fw w-50 form-check_cus" for="flexRadioDefault2">
                                     Google Authentication<br />
                                        <span class="badge bg-success fw-400"> Recommended </span>
                                    </label>
                                    <div class="d-flex gap-2 w-50 align-items-center justify-content-end">
                                        <input type="checkbox"  v-model="googleauth" class="form-check-input" name="flexRadioDefault3" id="googleauthcheck" 
                                         @change="update_show=true,btn_show =true"
                                         v-if="showgauth"
                                        >
                                        <button v-else type="button" 
                                        class="btn btn-dark shadow-none" data-bs-toggle="modal" data-bs-target="#google-Modal" @click="getsecret()"> Set Auth </button>
                                    </div>

                                    <!--GOOGLE varification trigger Button -->
                                    <!-- <div>
                                        <button type="button" 
                                        class="btn btn-dark col-8 col-md-8 shadow-none" data-bs-toggle="modal" data-bs-target="#google-Modal" @click="getsecret()"> Set Auth </button>
                                    </div> -->
                                </div>
                </li>

            </ul>
            <br />     
            <!-- ===========GOOGLE varification Modal =========== -->

            <!-- Modal -->
           

              <!-- <div class="col-md-12 col-lg-6 col-xl-6" style="color:white">
                            <div class="mb-5">
                                <label class="mb-2"> Google Authentication </label>
                                <div class="factor_box google_box form-check factor_input  d-flex justify-content-between align-items-center p-4  mb-3">
                                    <label class="form-check-label  w-75" for="flexRadioDefault2">
                                        <span class="badge bg-google  mt-1 px-1 py-2"> Recommended </span>
                                    </label>
                                    <div v-if="showgauth">
                                        <input type="checkbox"  v-model="googleauth" class="form-check-input" name="flexRadioDefault3" id="googleauthcheck" 
                                         @change="update_show=true,btn_show =true"
                                        >
                                    </div>

                                    <div v-else>
                                        <button type="button" 
                                        class="btn btn-dark col-8 col-md-8 shadow-none" data-bs-toggle="modal" data-bs-target="#google-Modal" @click="getsecret()"> Set Auth </button>
                                    </div>
                                </div>
                            </div>
                </div> -->
                 <!-- ===========GOOGLE varification Modal =========== -->
                 
         <div class="col-md-12 col-lg-6 col-xl-6">
             <div class="varification-modal modal fade" id="google-Modal" tabindex="-1" aria-labelledby="google-ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header  p-lg-4 p-3 justify-content-between">
                            <div class="setup_box">
                            <h3 class="modal-title mb-2" id="google-ModalLabel">Setup:</h3>
                           <p class="mb-1">To receive verification codes via a phone app, you must first install a code-generating app such as Authy or Google Authenticator on your phone. </p>
                           <p class="mb-2">Once you have done this, you will need to scan the QR code below into the app and enter the generated code below to confirm.</p>
                           </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" id="gauthmodal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-lg-4 p-3"> 
                          <form class="row" @submit.prevent="verifyGauth()">
                            <div class="col-md-12 col-lg-3 col-xl-3">
                                <div class="moddal_qr_img text-center text-lg-start">
                                    <img :src="qrcode" alt="Qrcode" class="imf-fluid mb-3 mb-lg-0 ">
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-9 col-xl-9 align-self-center">
                              <div class="ps-2">
                                <p>Alternatively, you may enter the secret into the app directly<br>Verification code: <span>{{code}} </span></p>

                                <div class="enter-num mb-4 ms-2 ms-xl-0">
                                    <label for="basic-url" class="form-label mb-1">Verification code</label>
                                    <input type="text" class="form-control" v-model="gogleauth"  placeholder="Enter Verification code" aria-label="Enter Verification code" aria-describedby="basic-addon1">

                                     <div v-if="v$.gogleauth.$error" class="error-msg">
                                            {{ v$.gogleauth.$errors[0]?.$message }}
                                    </div>
                                </div>
    
                              </div>

                            </div>    
                             <div class="col-md-12 col-lg-12 col-xl-12 text-center">
                              <div class="mt-3">
                                  <button v-if="set_loader" class="btn_next" type="button" disabled >
                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>

                                <button v-else type="submit" class="btn_next" >Confirm</button>
                              </div>
                             </div>                                         
                          </form>
                          </div>
                        
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> -->
                    </div>
                   </div>
               </div>
                 
                </div>

                    
            <div class="col-md-6 mt-5 mb-4 offset-md-4">
                <button v-if="btn_show" v-on:click="change_setting" class="btn btn-dark col-8 col-md-8 shadow-none">
                    Update
                </button>
                <div class="btn btn-dark mx-auto" style="min-width: 340px; text-align: center; margin: 0 auto" v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Content  -->
</SettingsLayout>
</template>

<script>
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import { helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import ApiClass from "@/api/api";
export default {
    name: "TwoFactor",
    data() {
        return {
            selected: [],
            btn_show: false,
            loading: false,
            qrcode: "https://chart.googleapis.com/chart?cht=qr&chl=otpauth://totp/Myvee(${this.email})?secret=test%22&chs=160x160&chld=L|0",
            code:"",
            email:"",
            gogleauth:"",
            showgauth: false,
            set_loader:false,
            googleauth:false,
            update_show:false,
        
           

        };
    },
      setup() {
        return {
            v$:useVuelidate(),
        };
    },
    components: {
        SettingsLayout,
    },
    mounted() {
        this.get_setting();
        console.log(this.v$,"v");
         this.email=this.$store.getters.getUser.email;
          console.log(this.email,"email is here");
          this.code= this.$store.getters.scrtkey;
          this.showgauth=this.$store.getters.getGauth;
          console.log(this.showgauth,"mmmmmmmmmm");

    },
      validations(){
        return{
            gogleauth: {
                required: helpers.withMessage("GooleAuth is required", required),   
        }
        }
    },
    methods: {
        async get_setting() {
            await ApiClass.getRequest("2fa/get", true).then((res) => {
                if (res.data.status_code == 1) {
                    this.selected = res.data.data._2fa;
                    this.googleauth = (parseFloat(res.data.data.google_auth)) ? true : false;
                    this.showgauth = res?.data.data.gauth_setup;
                    console.log({hihi:this.showgauth});
                    console.console.log(this.showgauth,"f");
                }

            });
        },
        async change_setting() {
            this.btn_show = false;
            this.loading = true;
            await ApiClass.postRequest("2fa/update", true, {
                two_factor: this.selected,googleauth : this.googleauth == true ? 1 : 0
            }).then((res) => {
                if (res.data.status_code == 1) {
                    this.$swal({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    this.get_setting();
                      this.update_show = false
                }
                this.loading = false;

            });
        },

        async verifyGauth(){
            const result = await this.v$.$validate()
            if (!result) {
                return
            }
              this.set_loader=true;
              let response = await ApiClass.postRequest('gauth/authorise', true,{totp:this.gogleauth});   
              console.log(response,"vl");
                    if(response?.data.status_code==1){
                    this.set_loader = false;
                    
                    this.gogleauth="";
                    this.$store.commit("SET_GAUTH",1)
                    this.$store.commit('SET_SECRET',null);
                    document.getElementById("gauthmodal").click();
                    this.success(response.data.message);
                    this.showgauth =1;
                    this.get_setting()
               
            }else{
                this.set_loader = false;
                this.gogleauth="";
                this.failed(response.data.message)
            }
            this.set_loader = false;


           },

       async getsecret() {
            let response = await ApiClass.updateFormRequest('gauth/gen_secret',true)
            console.log(response,"fff");
            if(response.data.status_code==1){
                this.code = response.data.data
                this.qrcode = this.generateQRCode(this.code);
                this.$store.commit('SET_SECRET',this.code);
            }else{
                this.failed(response.data.message)
                this.qrcode =this.generateQRCode(this.code)
                this.$store.commit('SET_SECRET',this.code);
            }
        },
        generateQRCode(address) {
            return (
                `https://chart.googleapis.com/chart?cht=qr&chl=otpauth://totp/Myvee(${this.email})?secret=` +
                address +"&chs=160x160&chld=L|0"
            );
        },
            
   

        
    },
};
</script>

<style scoped>
.exchange_setting_heading {
    color: var(--white);
}

.label_fw {
    font-weight: 500;
    color: var(--white);
}

.fw-400 {
    font-weight: 400;
}

label.form-check_cus,
input.form-check_cus {
    cursor: pointer;
}
</style>
