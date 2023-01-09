<template>
<SettingsLayout>
    <div class="row">
        <div class="col-md-12">
            <div class="exchange_setting_heading">
                <h3 class="fw-bold">Profile Detail</h3>
            </div>
            <!--heading-->
        </div>
    </div>
    <div class="row mt-2 d-flex list-group-item ps-0 m-0">
      <div class="col-md-6">
      <form >
        
            <div class="name_setting_box mb-3">
                <p class="m-1">Name:</p>
                <!-- <p class="m-0" style="color: var(--upper-border);">{{ this.userData.name }}</p> -->
                <div class="input-group">
                    <input v-model="name" type="text" class="form-control" required="" :readonly="!edit">
                </div>
                <div class="error" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="error">{{ error.$message }}</div>
                </div>
            </div>
            <!--Name-->
            <div class="name_setting_box mb-3">
                <p class="m-1">Mobile No. :</p> 
                <div class="mb-1">
                    <div class="input-group mobile_no" >
                        <span class="input-group-text" aria-describedby="basic-addon1">
                            <div class="dropdown" >
                                <button v-if="!edit" style="pointer-events: none;" class="btn shadow-none bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span  >
                                      {{this.country_code}}
                                    </span>
                                </button>
                                <button v-else class="btn  dropdown-toggle shadow-none bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span >
                                        <img :src="'https://flagpedia.net/data/flags/normal/' + country.code.toLowerCase() +'.png'" alt="" class="img-fluid" style="width: 14px" height="14px" />{{ country.number }}
                                    </span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li v-for="(country, index) in ACountries" :key="index" @click="countryChange(country)">
                                        <a class="dropdown-item" href="javascript:void(0)">
                                            <span>
                                                <img :src="'https://flagpedia.net/data/flags/normal/' + country.code.toLowerCase() + '.png'" alt="" class="img-fluid" style="width: 14px" height="14px" />{{ country.number }}
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div> 
                        </span>
                        <input v-model="v$.mobile.$model" type="text" onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') != -1)))"
                         class="form-control"  required="" :readonly="!edit">
                    </div>
                </div>
                <div class="error" v-for="error of v$.mobile.$errors" :key="error.$uid">
                    <div class="error">{{ error.$message }}</div>
                </div>
                <div class="error" v-for="error of v$.country.number.$errors" :key="error.$uid">
                    <div class="error">{{ error.$message }}</div>
                </div>
                <!-- <p class="m-0" style="color: var(--upper-border);">{{ this.userData.mobile }}</p> -->
            </div>
            <!--Mobile-->
            <div class="name_setting_box mb-3">
                <p class="m-1">Email Id:</p>
                <div class="input-group">
                    <input v-model="email" type="text" class="form-control" required="" readonly>
                </div>
                <!-- <p class="m-0" style="color: var(--upper-border);">{{ this.userData.email }}</p> -->
            </div>

            <!--Email-->
            <div class="name_setting_box mb-3">
                <p class="m-1">Status:</p>
                <div class="input-group">
                    <input v-model="status" type="text" class="form-control" required="" readonly>
                </div>
                <!-- <p class="m-0" style="color: var(--upper-border);">{{ this.status }}</p> -->
            </div>
            <!--Status-->
        
        <div class="edit-btn my-3" v-if="!edit">
            <button class=" btn btn-dark px-5" @click="edit=!edit" type="button">Edit</button>
        </div>
        <div class="submit-btn d-sm-flex d-block gap-3 my-3" v-else>
            <button class=" btn btn-dark px-5 me-3 mb-3 mb-lg-0" type="button" v-on:click="update_form()" v-if="!loading">Submit</button>
            <button class=" btn btn-dark px-5 me-3 mb-3 mb-lg-0" type="button" v-else>
                <div class="spinner-border " role="status">
                    <span class="visually-hidden"></span>
                </div>
            </button>
            <button class="btn btn-dark px-5 mb-3 mb-lg-0" type="button" @click="edit=false" v-on:click="getUserInfo()">Cancel</button>
        </div>
      </form>
      </div>
       
        <div class="col-md-6 text-md-end" >
            <label for="inputDoc1" class="form-label label_fw" style="color: var(--white)">Upload Profile
            </label>
            <img :src="this.userData?.profile_image ? this.userData?.profile_image : img" id="img_url" @click="check('profile_image', 'img_url')" class="filter_img img-thumbnail ms-md-auto" style="cursor: pointer" alt="img" />
            <input type="file" id="profile_image" v-on:change="first($event, 'image')" accept="image/*" hidden />
            <div v-if="isSubmitted && this.image == null" class="error">
                Image is required
            </div>
            <div class="edit-btn my-3" v-if="this.userData?.profile_image">
                <button class=" btn btn-dark  text-center" @click="removeP()" type="button">Remove</button>
            </div>
        </div>
    </div>
    <!-- Content  -->
</SettingsLayout>
</template>

<script>
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import ApiClass from "@/api/api";
import CountryCode from "../../assets/jsonfiles/CountryCode.json";

import useVuelidate from '@vuelidate/core'
import {
    helpers,
    minLength,
    maxLength,
    required,
    requiredIf
} from '@vuelidate/validators'
import img from "@/assets/img-preview.png";
export default {
    name: "Profile",
    components: {
        SettingsLayout,
    },
     setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            img:img,
            name:"",
            mobile:"",
            email:"",            
            userData: {},
            status: null,
            image: null,
            isSubmitted: false,
            images: null,
            edit: false,
            loading:false,
            country_code:"",
            country: {
                name: "India",
                number: "+91",
                code: "IN",
                flag: "🇮🇳",
            },
            ACountries: CountryCode.sort(
                (a, b) =>
                parseFloat(a.number.substring(1)) - parseFloat(b.number.substring(1))
            ),

        };
    },
    mounted() {
        this.getUserInfo();
        
    },
     validations() {
        return {
            name: {
                required: helpers.withMessage("Name is required", required),
                minLength: helpers.withMessage("Name should be minimum 3 character long ", minLength(3)),
                maxLength: helpers.withMessage("Name must not be greater than 20 character long ", maxLength(20))
            },
            mobile: {
                // required: helpers.withMessage("Mobile is required", required),                
                minLength: helpers.withMessage("Mobile number must be 10 character ", minLength(10)),
                maxLength: helpers.withMessage((this.country.number == "+91") ? "Mobile number must be 10 character " :"Mobile number must be 12 character ", (this.country.number == "+91") ? maxLength(10) : maxLength(12) )
            },
            country:{
                number: {
                    required: helpers.withMessage("Country Code is required", requiredIf((this.mobile).length >= 10 && (this.mobile).length <= 12)),

                }
            }

        };
    },
    watch:{        
        "country_code":function(v1){
            this.country.number = v1;
        }
    },
    methods: {
        countryChange(selected_country) {
            this.country = selected_country;
        },
        async removeP(){
            let response = await ApiClass.putNodeRequest('user/remove_profile', true);
            if (response?.data) {
                if (response.data.status_code == 1) {
                    this.success(response.data.message);
                    this.getUserInfo();
                    return;
                } else {
                   return this.failed(response.data.message);
                }
            }  

        },
        async getUserInfo() {
            await ApiClass.getNodeRequest("user/get", true).then((res) => {
                if (res.data.status_code == 1) {
                    this.userData = res.data.data;
                    this.name = res.data.data.name;
                    this.mobile = res.data.data.mobile;
                    this.email = res.data.data.email;
                    this.country_code = this.country.number = res.data.data.country_code;                    
                    this.country.code = res.data.data.country_number;
                    this.status = res.data.data.status == true ? "Active" : "Blocked";
                }
            });
        },
        async check(id, img) {
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
        async update_form() {
           const result = await this.v$.$validate()
            if (!result) {
                return
            }
            let form_data = {
                name:           this.name,
                mobile:         this.mobile,
                email:          this.email,
                country_code:   (this.mobile) ? this.country.number : "",
                country_name:   (this.mobile) ? this.country.name : "",
                country_number: (this.mobile) ? this.country.code : "",
            }
            this.loading = true;
            let response = await ApiClass.postRequest('profile/update', true, form_data);
            if (response?.data) {
               this.loading = false
                if (response.data.status_code == 1) {
                    this.success(response.data.message);
                    this.edit = false;
                    this.getUserInfo();
                    return;
                } else {
                   return this.failed(response.data.message);
                }
            }           
        },
        async first(event, var_name) {
            if (var_name == "image") {
                this.image = event.target.files[0];
                var all_data = new FormData();
                all_data.append("image", this.image);
                var res = await ApiClass.putNodeRequest("user/update_profile",  true,  all_data);
                if (res.data.status_code == 1) {
                    this.success(res.data.message);
                    this.getUserInfo();
                } else {
                    this.failed(res.data.message);
                }
            }
        },
    },
};
</script>

<style scoped>

ul.dropdown-menu.show  {
    /* background-color: var(--upper-border); */
    /* color: var(--white) !important; */
}
ul.dropdown-menu.show :hover {
    /* background-color: var(--black); */
    /* color: var(--white); */

}
.input-group .btn {
    z-index: 1000;
    margin: 0;
    font-size: 1rem;
    color: var(--white);
    text-align: left;
    list-style: none;
    background-color: var(--white);
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0.25rem;
    inset: 0px auto auto 0px;
    
}

/* width */
::-webkit-scrollbar {
    width: 0px;
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
.dropdown-menu {
    scroll-behavior: smooth;
    max-height: 146px;
    overflow-y: auto;

    
}
.mobile_no .input-group-text {
    padding: 0;
    font-size: 12px;
    color: var(--white);
    background-color: transparent !important;
    border: 1px solid var(--black);
    border-radius: 19px;
}
.input-group>.form-control {
  background-color: var(--black);
  color: var(--upper-border);
  border:0;
}
/* .input-group>.form-control:hover{
  border:0;
} */
/* .submit-btn button.setting_btn {
    padding: 4px 60px;
} */
.img-thumbnail {
  padding: 0;
}
.name_setting_box p:nth-child(1) {
    font-weight: 600;
}

.exchange_setting_heading h3 {
    color: var(--white);
}

.name_setting_box {
    color: var(--white);
}

.filter_img {
    width: 160px;
    height: 160px;
    display: block;
    margin-top: 10px;
}
</style>
