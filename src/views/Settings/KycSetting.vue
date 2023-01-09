<template>
<SettingsLayout>
    <div class="row" v-if="current_status == 'new' || current_status == 'rejected'">
        <div class="col-md-12">
            <div class="exchange_setting_heading">
                <h3 class="fw-500">KYC Detail</h3>
            </div>
            <!-- show rejected messages -->
            <div class="alert-text fw-bold" v-if="current_status == 'rejected'">
                <div class="
              kycalert
              alert alert-danger alert-dismissible
              mb-0
              text-start px-3 py-5
            " role="alert">
                    <div>
                        {{ getMessage }}
                        <span v-if="selfie_remark != '' || id_remark != ''" >due to following reasons:<br /></span><div v-if="selfie_remark != ''">Selfie remark:- <span style="font-size:15px;font-weight:500">{{ selfie_remark }} </span></div>
                        <div v-if="id_remark != ''" class="text-capitalize" style="text-align:justify; word-break:break-all">Identity Card remark:- <span style="font-size:15px;font-weight:500">{{ id_remark }}</span></div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Heading  -->
        <div class="col-md-12">
            <form @submit.prevent="handleSubmit" class="row g-3 justify-content-center">
                <h5 class="fw-500 m-0 mt-4" style="color: var(--white)">
                    Basic Detail:
                </h5>

                <!-- First name  -->
                <div class="col-md-6">
                    <label for="first_name" class="form-label label_fw">First Name</label>
                    <input autocomplete="off" type="text" v-model="formdata.first_name" class="form-control input_style_cus shadow-none" id="first_name" v-on:keypress="isLetter($event)" placeholder="Enter First Name" />
                    <div v-if="isSubmitted && v$.formdata.first_name.$error" class="error">
                        {{ v$.formdata.first_name.$errors[0]?.$message }}
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="middle_name" class="form-label label_fw">Middle Name</label>
                    <input type="text" autocomplete="off" v-model="formdata.middle_name" class="form-control input_style_cus shadow-none" id="middle_name" v-on:keypress="isLetter($event)" placeholder="Enter Middle Name" />
                </div>
                <!-- Middle name  -->
                <div class="col-md-6">
                    <label for="last_name" class="form-label label_fw">Last Name</label>
                    <input type="text" autocomplete="off" v-model="formdata.last_name" class="form-control input_style_cus shadow-none" id="last_name" v-on:keypress="isLetter($event)" placeholder="Enter Last Name" />
                    <!-- <div v-if="isSubmitted && v$.formdata.last_name.$error" class="error">
                        {{ v$.formdata.last_name.$errors[0]?.$message }}
                    </div> -->

                    <!-- <div v-if="isSubmitted && !$v.formdata.last_name.required" class="invalid-feedback">
                        Last name is required
                    </div> -->
                </div>
                <!-- last name  maxDate="new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]"
                 :disabled-date ="()=>{ return new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]}"

                    :show-current="new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]"

                    :open-date="new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]"
                    :maximum-view="new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]"-->
                <div class="col-md-6">
                    <label for="dob" class="form-label label_fw">Date of Birth</label>
                    <input type="date" v-model="formdata.dob" right class="form-control input_style_cus shadow-none" id="dob" name="trip-start" :max="new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]" />
                    <!-- <date-picker v-model="formdata.dob" valueType="format" 
                    :disabled-date="(date) => date >= new Date(new Date().setFullYear(new Date().getFullYear() - 15))"
                      class="form-control input_style_cus shadow-none" id="dob"></date-picker> -->
                    <div v-if="isSubmitted && v$.formdata.dob.$error" class="error">
                        {{ v$.formdata.dob.$errors[0]?.$message }}
                    </div>
                    <!-- <div v-if="isSubmitted && !$v.formdata.dob.required" class="invalid-feedback">
                        Date of birth is required
                    </div> -->
                </div>
                <!-- date of birth  -->
                <div class="col-12">
                    <label for="address" class="form-label label_fw">Address</label>
                    <textarea v-model="formdata.address" class="form-control input_style_cus shadow-none" placeholder="Enter Address" rows="4" cols="50"></textarea>

                    <div v-if="isSubmitted && v$.formdata.address.$error" class="error">
                        {{ v$.formdata.address.$errors[0]?.$message }}
                    </div>

                    <!-- <div v-if="isSubmitted && !$v.formdata.address.required" class="invalid-feedback">
                        Address is required
                    </div> -->
                </div>
                <!-- Address  -->
                <hr class="mt-5 hr_style" />

                 <div class="col-md-6">
                    <label for="document_type_qw" class="form-label label_fw">Nationality</label>
                    <select v-model="formdata.country" @click="setCountry(formdata.country)" @change="formdata.state = ''"  id="document_type_qw" name="document_type_qw" class="form-select input_style_cus">
                     <option value="">Choose...</option>
                    <option v-for="(country, index) in countries" :key="index" :value="country?.country">{{country?.country}}</option>
                    </select>
                    <div v-if="isSubmitted && v$.formdata.country.$error" class="error">
                        {{ v$.formdata.country.$errors[0]?.$message }}
                    </div>
                </div>
                 <div class="col-md-6">
                    <label for="document_type_qw" class="form-label label_fw">State</label>
                    <select v-model="formdata.state" id="document_type_qw" name="document_type_qw" class="form-select input_style_cus">
                     <option value="">Choose...</option>
                    <option v-for="(state, index) in state_list?.states" :key="index" :value="state">{{state}}</option>
                    </select>
                    <div v-if="isSubmitted && v$.formdata.state.$error" class="error">
                        {{ v$.formdata.state.$errors[0]?.$message }}
                    </div>
                </div>
                <!----------------------------Basic Detail---------------------------------->
                <!-- <h5 class="fw-500 m-0 mt-4" style="color: var(--white)">
                    Nationality: &nbsp;

                    <label class="form-check-label label_fw w-70 form-check_cus me-1" for="flexRadioDefault1">
                        Indian
                    </label>
                    <input style="
                cursor: pointer;
                background-color: var(--social-link);
                border: 0;
              " v-model="selected" :value="true" v-on:click="resetForm()" @change="check_data()" class="form-check-input form-check_cus me-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-on:change="btn_show = true" />

                    <label class="form-check-label label_fw w-70 form-check_cus me-1" for="flexRadioDefault1">
                        Foreigner
                    </label>

                    <input style="
                cursor: pointer;
                background-color: var(--social-link);
                border: 0;
              " v-model="selected" :value="false" v-on:click="resetForm()" @change="check_data()" class="form-check-input form-check_cus" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-on:change="btn_show = true" />
                </h5> -->
                <h5 class="fw-500 m-0 mt-4" style="color: var(--white)">
                    Identity Verification: &nbsp;
                </h5>
                <!-- heading  -->
                <div class="col-md-6">
                    <label for="document_type_qw" class="form-label label_fw">National Identity Type</label>
                    <select v-model="formdata.document_type" id="document_type_qw" name="document_type_qw" class="form-select input_style_cus" autofocus="autofocus">
                        <option value="" >Choose...</option>
                        <!-- <option value="aadhaar" v-if="selected == true">
                            Aadhaar Card
                        </option>
                        <option value="driving" v-if="selected == true">
                            Driving License
                        </option>
                        <option value="voter" v-if="selected == true">Voter Card</option> -->
                        <option value="passport">
                            Passport
                        </option>
                        <option value="other">
                            Other National Id
                        </option>
                    </select>

                    <div v-if="isSubmitted && v$.formdata.document_type.$error" class="error">
                        {{ v$.formdata.document_type.$errors[0]?.$message }}
                    </div>
                </div>

                <div class="col-md-6" >
                    <label for="document_number" class="form-label label_fw text-capitalize" >{{(formdata.document_type)}}<label v-if="formdata.document_type == 'other'">&nbsp;national</label> Number</label>
                    <input type="text" autocomplete="off" v-model="formdata.document_number" class="form-control input_style_cus shadow-none" id="document_number" v-on:keypress="count($event, formdata?.document_number?.length)" @keydown="
                            formdata.document_type && formdata.document_type == 'aadhaar'  ? onlyNumbers() : ''" :placeholder="`Enter ${formdata.document_type} number`" />
                    <div v-if="isSubmitted && v$.formdata.document_number.$error" class="error">
                        {{ v$.formdata.document_number.$errors[0]?.$message }}
                    </div>
                    <!-- <div v-if="erradhar && formdata.document_type && formdata.document_type == 'aadhaar' " class="error">
                    </div> -->
                    <!-- <div v-if="formdata.document_type && formdata.document_type == 'aadhaar' && formdata.document_type.length != 12" class="error">
                        Document number should be of 12 digits                    </div> -->
                    <!-- <div v-if="isSubmitted && !$v.formdata.document_number.required" class="invalid-feedback">
                        Document number is required
                    </div> -->
                </div>
                <!-- Document Number  -->
                <div class="col-md-6 col-6">
                    <label for="inputDoc1" class="form-label label_fw">Upload National Identity Front </label>
                    <img :src="pan_card1" id="img_url1" @click="check('document_type_pan1', 'img_url1')" class="filter_img img-thumbnail" alt="img" style="cursor: pointer" />

                    <input type="file" id="document_type_pan1" v-on:change="first($event, 'first_image')" accept="image/*" hidden />

                    <div v-if="isSubmitted && this.first_image == null" class="error">
                        Image is required
                    </div>
                    
                </div>
                <!-- Front Image-->
                <div class="col-md-6 col-6">
                    <label for="inputName2" class="form-label label_fw"> Upload National Identity Back</label>
                    <img :src="pan_card2" id="img_url2" @click="check('document_type_pan2', 'img_url2')" class="filter_img img-thumbnail" alt="img" style="cursor: pointer" />

                    <input type="file" v-on:change="first($event, 'second_image')" id="document_type_pan2" accept="image/*" hidden />

                    <!-- <div v-if="isSubmitted && this.second_image == null && selected" class="error">
                        Image is required
                    </div> -->
                </div>
                <!-- Back Image-->
                <hr class="mt-5 hr_style" />
                <!----------------------------Identity Verification---------------------------------->
                <!-- <h5 class="fw-500 m-0 mt-4" style="color: var(--white)" v-if="selected == true">
                    PAN Card Verification:
                </h5> -->
                <!-- heading  -->
                <!-- <div class="col-md-6" v-if="selected == true"> -->
                    <!-- <div class="col-md-6" v-if="selected == true"> -->
                    <!-- <label for="document_type_p" class="form-label label_fw">Document Type</label>
                    <select v-model="formdata.document_type_p" id="document_type_p" class="form-select input_style_cus shadow-none shadow-none" autofocus="autofocus">
                        <option value="" disabled>Choose...</option>
                        <option selected value="pan_card">PAN Card</option>
                    </select>

                    <div v-if="isSubmitted && v$.formdata.document_type_p.$error" class="error">
                        {{ v$.formdata.document_type_p.$errors[0]?.$message }}
                    </div> -->
                    <!-- <div v-if="selected == 'true' && isSubmitted && !$v.formdata.document_type_p.requiredIf && selected == 'true'" class="invalid-feedback">
                        Document is required
                    </div> -->
                <!-- </div> -->
                <!-- Document Type  -->
                <!-- <div class="col-md-6" v-if="selected == true"> -->
                    <!-- <div class="col-md-6" v-if="selected == true"> -->
                    <!-- <label for="document_number2" class="form-label label_fw">Document Number</label>
                    <input autocomplete="off" v-model="formdata.document_number2" type="text" class="form-control input_style_cus shadow-none" id="document_number2" placeholder="Enter Document Number" />

                    <div v-if="isSubmitted && v$.formdata.document_number2.$error" class="error">
                        {{ v$.formdata.document_number2.$errors[0]?.$message }}
                    </div> -->

                    <!-- <div v-if="isSubmitted && !$v.formdata.document_number2.requiredIf" class="invalid-feedback">
                        Document number is required
                    </div> -->
                <!-- </div> -->
                <!-- Document Number  -->
                 <h5 class="fw-500 m-0 mt-4" style="color: var(--white)">
                    Selfie Verification: &nbsp;
                </h5>
                <div class="col-md-12" v-if="selected == true">
                    <label for="inputDoc1" class="form-label label_fw">Upload Selfie</label>

                    <img :src="pan_card" id="img_url" @click="check('document_type_pan', 'img_url')" class="filter_img img-thumbnail" alt="img" style="cursor: pointer" />

                    <input type="file" id="document_type_pan" v-on:change="first($event, 'third_image')" accept="image/*" hidden />
                    <div v-if="selected == true && isSubmitted && this.third_image == null" class="error">
                        Image is required
                    </div>
                </div>
                <!-- Front Image-->
                <!----------------------------PAN Card Verification---------------------------------->
                <div class="col-md-6 mt-5 mb-4 text-center">
                    <div v-if="loading" class="btn btn-dark col-8 col-md-8 shadow-none">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <button v-else type="submit" class="btn btn-dark col-8 col-md-8 shadow-none">
                        Save
                    </button>
                </div>
                <!--button-->
            </form>
        </div>
    </div>

    <div class="row" v-else>
        <div class="col-md-12">
            <div class="pending_kyc d-flex justify-content-center align-items-center" v-if="!kyc_form">
                <span v-if="current_status == 'completed'" v-html="tick"
                 class="p-0">
                <!-- v-html="tick" -->
                </span>
                <span v-if="current_status == 'completed'" style="color: var(--green); font-size: 30px">{{ getMessage }}</span>
                <span style="color: var(--red); font-size: 25px" v-else>{{
            getMessage
          }}</span>
                <div class="loader" v-if="pageLoader">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Content  -->
</SettingsLayout>
</template>

<script>
// import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import ApiClass from "@/api/api";

import {
    useVuelidate
} from "@vuelidate/core";
import {
    required,
    helpers,
    // requiredIf,
    minLength,
    // minLength,
    // maxLength
} from "@vuelidate/validators";

// import {
//     required,
// } from "vuelidate/lib/validators";
import Contrty_details from "../../assets/jsonfiles/SettingCountyr.json";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import img from "@/assets/img-preview.png";
import img1 from "@/assets/img-preview.png";
import img2 from "@/assets/img-preview.png";
export default {
    name: "KycSetting",
    components: {
        SettingsLayout,
        // DatePick,
        // DatePicker,
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            countries: Contrty_details?.countries,
            err: false,
            erradhar: "",
            loading: false,
            kyc_status: "",
            tick: '<svg xmlns="http://www.w3.org/2000/svg" class="align-middle" width="40" height="40" viewBox="0 0 24 24" style="fill: var(--green);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>',
            first_image: null,
            second_image: null,
            third_image: null,
            // datepickoptions: {
            //     maxDate: function(){ return new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0] } // max date value
            // },
            formdata: {
                first_name: null,
                middle_name: null,
                last_name: null,
                dob: null,
                country:"",
                state:"",
                address: null,
                document_type: "",
                document_number: null,
                document_type_p: "",
                document_number2: null,
            },
            pan_card: img,
            pan_card1: img1,
            pan_card2: img2,
            isSubmitted: false,
            date: new Date(),
            user: {},
            selected: true,
            pageLoader: true,
            kyc_form: false,
            selfie_remark: "",
            id_remark: "",
            state_list:[],
            current_status: "default",
            response_message: {
                default: "",
                new: "",
                pending: "Your KYC has been submitted successfully and Pending For Approval.",
                completed: "Your KYC has been verified successfully.",
                rejected: "Your KYC is Rejected",
            },
            document_number: "",
        };
    },
    validations() {
        return {
            formdata: {
                first_name: {
                    required: helpers.withMessage("First name is required", required),
                    minLength: helpers.withMessage("First name should be atleast 3 character long", minLength(3)),
                },
                address: {
                    required: helpers.withMessage("Address is required", required),
                },
                dob: {
                    required: helpers.withMessage("Date of birth is required", required),
                },
                country: {
                    required: helpers.withMessage("Nationality is required", required),
                },
                state: {
                    required: helpers.withMessage("State is required", required),
                },
                document_type: {
                    required: helpers.withMessage("Identity type is required", required ),
                },
                document_number: {
                    required: helpers.withMessage("Identity number is required",required ),
                    // maxLength: helpers.withMessage("  Document number minimum 12 digit",function () { return (this.formdata.document_type != 'aadhaar') ? maxLength(16): null}),
                    // minLength: helpers.withMessage("  Document number minimum 12 digit", function () {  return (this.formdata.document_type !='aadhaar') ? minLength(12) : null }),
                    //     maxLength: helpers.withMessage("  Document number minimum 12 digit", function () {
                    //    return (this.formdata.document_type  == 'aadhaar') ? maxLength(12) : false })
                },
                // document_type_p: {
                //     required: helpers.withMessage(
                //         "  Document is required",
                //         requiredIf(function () {
                //             return this.selected == true;
                //         })
                //     ),
                // },
                // document_number2: {
                //     required: helpers.withMessage(
                //         "Document number is required",
                //         requiredIf(function () {
                //             return this.selected == true;
                //         })
                //     ),
                //     regex: helpers.withMessage(
                //         "Pancard id is not valid",
                //         helpers.regex(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/)
                //     ),
                // },
            },
        };
    },
    mounted() {
        this.getUserInfo();
    },
    computed: {
        getMessage() {
            return this.response_message[this.current_status];
        },
    },
    methods: {
        setCountry(data) {
            console.log(data);
             if (data == undefined) {
                return;
            }

            return this.state_list = this.countries?.find((v) => (v.country == data))

        },
        check_data() {
            let first = document.getElementById("img_url1");
            first.setAttribute("src", this.pan_card1);
            this.first_image= null;
            let sec = document.getElementById("img_url2");
             this.second_image= null;
            sec.setAttribute("src", this.pan_card2);
            this.erradhar = '';
            this.formdata.document_type='';
            this.third_image= null;
            
        },
        count(event, number) {
            if (number > 19) {
                event.preventDefault();
            }
            if (this.formdata.document_type == "aadhaar") {
                let res =
                    event.charCode != 8 &&
                    event.charCode >= 48 &&
                    event.charCode <= 57 &&
                    event.charCode != 46 &&
                    event.target.value.length <= 11;

                return res ? "" : event.preventDefault();
            }
        },
       
        resetForm() {
            this.isSubmitted=false;
            this.first_image = null;
            this.second_image = null;
            this.third_image = null;
            this.formdata.first_name =
            this.formdata.middle_name =
            this.formdata.last_name =
            this.formdata.date_birth =
            this.formdata.country =
            this.formdata.state =
            this.formdata.address =
            this.formdata.document_type =
            this.formdata.document_number =
            this.formdata.document_number2 =
            "";
            this.v$.$reset(); // reset validation
        },
        async getUserInfo() {
            let response = await ApiClass.getNodeRequest("user-kyc/get", true);

            this.pageLoader = false; // stop page loader
            let result = response.data.data;
            this.kyc_status = result.user_kyc_status;
            this.$store.commit("SET_KYC_STATUS", result.user_kyc_status);
            this.current_status = this.kyc_status;
            this.kyc_form = false; // default close

            // If Kyc Status Is New
            if (this.kyc_status == "new") {
                this.kyc_form = true;
            }

            if (this.kyc_status == "rejected") {
                this.kyc_form = true;
                // this.response_message[kyc_status] = this.response_message[kyc_status].concat(' Due To ' + result.user_kyc_status_message);
                this.id_remark = result.identity_remark;
                this.selfie_remark = result.selfie_remark;
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
        async handleSubmit() {
            this.isSubmitted = true;
            if (this.v$.$touch()) return;

            // console.log(this.v$.$invalid, this.$v.formdata.document_number);

           
            if (
                !this.v$.$invalid && this.formdata.document_type == "passport" ? (!this.submitted ) :
                (this.third_image != null && !this.submitted )
            ) {
                var all_data = new FormData();
                // if (this.selected == true) {
                //     all_data.append("pan_card_path", this.third_image);
                // }
                all_data.append("identity_type", this.formdata.document_type);
                all_data.append("identity_number", this.formdata.document_number);
                // all_data.append("pan_card_number", this.formdata.document_number2);
                all_data.append("identity_front_path", this.first_image);
                all_data.append("identity_back_path", this.second_image ?? [])
                all_data.append("selfie_path", this.third_image)
                all_data.append("first_name", this.formdata.first_name);
                all_data.append("middle_name", this.formdata.middle_name);
                all_data.append("last_name", this.formdata.last_name);
                all_data.append("date_birth", this.formdata.dob);
                all_data.append("address", this.formdata.address);
                all_data.append("country",this.formdata.country);
                all_data.append("state",this.formdata.state);
                var headers = {
                    "Content-Type": "multipart/form-data",
                };
                this.loading = true;
                let res = await ApiClass.postRequest(
                    "userkyc/create",
                    true,
                    all_data,
                    headers
                );
                if (res === undefined) {
                    this.loading = false;
                return this.failed("404 NOT FOUND");
              }
                if (res ?.data) {
                    this.loading = false;
                    if (res.data.status_code == 1) {
                        this.success(res.data.message);
                        this.getUserInfo();
                        this.resetForm();
                    } else {
                        this.failed(res.data.message);
                    }
                }
              
            }
        },
        first(event, var_name) {
            const files = event.target.files;
            // console.log(var_name == "first_image")
            if (files.length == 0 && var_name == "first_image" )  {
               let first= (document.getElementById("img_url1"));
               first.setAttribute("src", this.pan_card);
            }else if(files.length == 0 && var_name == "second_image" ){
                let first= (document.getElementById("img_url2"));
                first.setAttribute("src", this.pan_card);
            }else if(files.length == 0 && var_name == "third_image" ){
                let first= (document.getElementById("img_url"));
                first.setAttribute("src", this.pan_card);

            }

            if (var_name == "first_image" ) {
                this.first_image = files[0];
            } else if (var_name == "second_image") {
                this.second_image = files[0];
            } else if (var_name == "third_image") {
                this.third_image = files[0];
            }
        },
        checkColor(status) {
            if (status == "pending") {
                return {
                    backgroundColor: "#fffd29",
                    color: "#000",
                };
            }
            return {
                backgroundColor: "#008000",
                color: "#fff",
            };
        },
        isLetter(e) {
            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[A-Za-z]+$/.test(char)) return true;
            // Match with regex
            else e.preventDefault(); // If not match, don't add to input text
        },

        onlyNumbers() {
            const key = event.key;

            if (this.formdata.document_type == "aadhaar") {
                this.document_number = event.key ? event.key : "";
                var charCode = event.which ? event.which : event.keyCode;
                if (
                    (charCode >= 48 && charCode <= 57) ||
                    (charCode >= 96 && charCode <= 105) ||
                    charCode == 8 ||
                    charCode == 9
                ) {
                    if (
                        // this.document_number &&
                        this.formdata.document_number ?.length != 12
                    ) {
                        this.erradhar = "Aadhaar card should be contain 12 digits.";
                        // event.preventDefault();
                        return false;
                    } else {
                        this.erradhar = "";
                        return true;
                    }
                    // if (this.formdata.document_number.length > 12 && this.formdata.document_number.length < 16) {
                    //     // if (key === "Backspace" || key === "Delete") {
                    //         this.erradhar = "Aadhaar card should be contain 12 digits.";
                    //         event.preventDefault();
                    //         return false;
                    //     // }
                    //     // this.erradhar = "Aadhar card should contain 12 digits.";
                    // }  else {
                    //     this.erradhar = "";
                    //     return true;
                    // }
                } else {
                    event.preventDefault();
                }
            } else if (this.formdata.document_type == "") {
                this.document_number = "";
                if (key) {
                    this.err = "Please select document type first.";
                }
                event.preventDefault();
            }
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

.fw-500 {
    font-weight: 600;
}

textarea {
    resize: none;
}

.input_style_cus:focus {
    box-shadow: 0;
    border-color: rgb(170, 170, 170);
}

/* width */
::-webkit-scrollbar {
    width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: var(--white);
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: var(--black);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
        background: var(--black);

}

.filter_img {
    width: 120px;
    height: 120px;
    display: block;
    margin-top: 10px;
}

.hr_style {
    color: #cfcfcf !important;
    opacity: 1 !important;
}

/* .error {
    font-weight: 500;
    font-size: 11px;
    color: #dc3545;
} */

.mx-datepicker {
    border-style: none;
    padding-top: 0px;
    padding-left: 0px;
    width: 480px;
}

.invalid-feedback {
    font-weight: 500;
    font-size: 11px;
}

.mx-datepicker {
    width: 100%;
    padding: 0;
}

.pending_kyc {
    min-height: 480px;
}

.pending_kyc span {
    display: inline-block;
    /* padding: 25px 30px; */

    font-size: 18px;
    font-weight: 500;
}

/* .kycalert {
    padding: 0.4rem 1rem;
} */

.loader .spinner-border {
    border-color: var(--signup-btn);
    border-right-color: transparent;
    width: 2rem !important;
    height: 2rem !important;
}

.kycalert .btn-close {
    padding: 0.7rem 1rem;
}
</style>
