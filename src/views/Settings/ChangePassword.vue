<template>
<SettingsLayout>
    <div class="row heading-row mb-3">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="exchange_setting_heading">
                <h3 class="fw-bold">Change Password</h3>
            </div>
        </div>
    </div>
    <form class="row change_password" @submit.prevent="Change_pass">
        <!-- OLD PASSWORD -->
        <div class="col-md-7 col-sm-8 mb-3">
            <div class="form-group position-relative">
                <label class="form-check-label label_fw form-check_cus">Old Password</label><br />
                <div>
                    <input class="form-control shadow-none" autocomplete="off" placeholder="Enter the Old Password" v-model="v$.old_password.$model" :type="this.type3" />
                    <div class="show-hide_password">
                        <span class="eye_i">
                            <i v-if="type3 == 'password'" class="fas fa-eye-slash" @click="type3 = 'text'"></i>
                            <i v-else class="fas fa-eye" @click="type3 = 'password'"></i>
                        </span>
                    </div>
                </div>

                <div v-if="submitted &&  v$.old_password.$error" class="error">
                    {{ v$.old_password.$errors[0]?.$message }}
                </div>
            </div>
        </div>

        <!-- NEW PASSWORD -->
        <div class="col-md-7 col-sm-8 mb-3">
            <div class="form-group position-relative">
                <label class="form-check-label label_fw form-check_cus">New Password</label><br />
                <div>
                    <input class="form-control shadow-none" autocomplete="off" placeholder="Enter the New Password" v-model="v$.new_password.$model" :type="this.type" />
                    <div class="show-hide_password">
                        <span class="eye_icon">
                            <i v-if="type == 'password'" class="fas fa-eye-slash" @click="type = 'text'"></i>
                            <i v-else class="fas fa-eye" @click="type = 'password'"></i>
                        </span>
                    </div>
                </div>
                <div v-if="submitted &&  v$.new_password.$error" class="error">
                    {{ v$.new_password.$errors[0]?.$message }}
                </div>
            </div>
        </div>

        <!-- CONFIRM PASSWORD -->
        <div class="col-md-7 col-sm-8 mb-3">
            <div class="form-group position-relative">
                <label class="form-check-label label_fw form-check_cus">Confirm New Password</label><br />
                <div>
                    <input class="form-control shadow-none" autocomplete="off" placeholder="Re-Enter the Password" v-model="v$.confirm_password.$model" :type="this.type2" />

                    <div class="show-hide_password">
                        <span class="eye_icn">
                            <i v-if="type2 == 'password'" class="fas fa-eye-slash" @click="type2 = 'text'"></i>
                            <i v-else class="fas fa-eye" @click="type2 = 'password'"></i>
                        </span>
                    </div>
                </div>

                <div v-if="submitted && v$.confirm_password.$error" class="error">
                    {{ v$.confirm_password.$errors[0]?.$message }}
                </div>
            </div>
        </div>

        <div class="col-md-7 col-sm-8 d-flex justify-content-center" >
            <div v-if="loading" class="btn btn-dark px-5">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else >
                <button class=" btn btn-dark px-5" type="submit">submit</button>
            </div>
        </div>
    </form>
</SettingsLayout>
</template>

<script>
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import ApiClass from "@/api/api.js";
import {
    useVuelidate
} from '@vuelidate/core'
import {
    minLength,
    sameAs,
    required,
    helpers,
} from '@vuelidate/validators'
export default {
    name: "Change-Password",
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
            type: "password",
            type2: "password",
            type3: "password",
            submitted: false,
            loading: false,
            old_password: "",
            new_password: "",
            confirm_password: "",

        };
    },
    validations() {
        return {
            old_password: {
                required: helpers.withMessage("Old Password is required.", required),
            },
            new_password: {
                required: helpers.withMessage("New Password is required.", required),
                minLength: helpers.withMessage("New Password must be 8 character", minLength(8)),
                regex: helpers.withMessage(() => `Password must contain at least one uppercase, one lowercase letter and one special character`,
                        (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)),
            },
            confirm_password: {
                required: helpers.withMessage("Confirm New Password is required.", required),
                sameAs: helpers.withMessage("New Password and Confirm New Password does not matched.", sameAs(this.new_password)),
            }
        }
    },
    methods: {
        async Change_pass() {
            this.submitted = true;
            const rval = await this.v$.$validate();
            if(!rval) return;
            this.submitted = false;
            this.loading = true;
            let form_data = {
                old_password: this.old_password,
                new_password: this.new_password,
                confirm_password: this.confirm_password
            }
            let result = await ApiClass.postRequest("user/change_password", true, form_data);
            if(result?.data) {
                this.loading = false;
                if (result.data.status_code == 1) {
                    this.submitted = false;
                    this.old_password = this.new_password = this.confirm_password = "";
                    await this.v$.$reset();
                    this.success(result.data.message);
                    // this.$router.push("login");
                    location.replace("/login");
                } else {
                    this.submitted = false;
                    this.failed(result.data.message);
                }
            }
        },
    },
};
</script>

<style scoped>
.exchange_setting_heading {
    color: var(--white);
}

.name_setting_box p:nth-child(1) {
    font-weight: 600;
}

.form-box {
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 75px 75px;
}

.label_fw {
    font-weight: 500;
    color: var(--white);
}

.input_style_cus:focus {
    box-shadow: 0;
    border-color: rgb(170, 170, 170);
}

.fw-400 {
    font-weight: 400;
}

label.form-check_cus,
input.form-check_cus {
    cursor: pointer;
}

.change_password .form-control:focus {
    border: 1px solid rgba(143, 143, 143, 0.8) !important;
}

.show-hide_password {
    position: absolute;
    right: 10px;
    top: 32px;
}
</style>
