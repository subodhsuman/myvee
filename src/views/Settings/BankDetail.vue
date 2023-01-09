<template>
  <SettingsLayout>
    <div class="row">
      <div class="col-md-12">
        <div class="exchange_setting_heading">
          <h3 class="fw-bold">Bank Detail</h3>
        </div>
      </div>
    </div>

    <div class="accordion" id="accordionExample">
      <div v-for="total_account in total_accounts" :key="total_account.id">
        <div class="accordion-item" v-if="total_account.is_verify == 1">
          <h2 class="accordion-header" :id="total_account.id">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#a' + total_account.id"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <label
                class="form-check-label label_fw w-100 form-check_cus"
                for="flexRadioDefault1"
              >
                {{ total_account.alias }}/&nbsp;&nbsp;Bank
                Account:&nbsp;&nbsp;&nbsp;{{ total_account.account_number }}
                <br /><span class="badge bg-success fw-400">Verified</span>
              </label>
            </button>
          </h2>
          <div
            :id="'a' + total_account.id"
            class="accordion-collapse collapse"
            :aria-labelledby="total_account.id"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p style="font-weight: 600; font-size: 18px">
                Your bank account details for IMPS payments
              </p>
              <span style="float: right"
                ><button
                  class="btn btn-danger"
                  v-on:click="delete_account(total_account.id)"
                >
                  Remove
                </button></span
              >
              <div class="row">
                <div class="col-md-4">Bank Account</div>
                <div class="col-md-4">IFSC Code</div>
                <div class="col-md-4">Account Type</div>
                <div class="col-md-4">
                  {{ total_account.account_number }}
                </div>
                <div class="col-md-4">
                  {{ total_account.ifsc_code }}
                </div>
                <div class="col-md-4">
                  {{ total_account.account_type }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item" v-if="total_account.is_verify == 0">
          <h2 class="accordion-header" :id="total_account.id">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#a' + total_account.id"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <label
                class="form-check-label label_fw w-100 form-check_cus"
                for="flexRadioDefault2"
              >
                {{ total_account.alias }}/&nbsp;&nbsp;Bank
                Account:&nbsp;&nbsp;&nbsp;{{ total_account.account_number }}
                <br />
                <span class="badge bg-danger fw-400">Pending</span>
              </label>
            </button>
          </h2>
          <div
            :id="'a' + total_account.id"
            class="accordion-collapse collapse"
            :aria-labelledby="total_account.id"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <span style="font-weight: 600; font-size: 18px"
                >Your bank account details for IMPS payments</span
              >
              <span style="float: right"
                ><button
                  class="btn btn-sm btn-danger"
                  v-on:click="delete_account(total_account.id)"
                >
                  Remove
                </button></span
              >
              <div class="row">
                <div class="col-md-4">Bank Account</div>
                <div class="col-md-4">IFSC Code</div>
                <div class="col-md-4">Account Type</div>
                <div class="col-md-4">
                  {{ total_account.account_number }}
                </div>
                <div class="col-md-4">
                  {{ total_account.ifsc_code }}
                </div>
                <div class="col-md-4">
                  {{ total_account.account_type }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="col-md-6 mt-5 mb-4">
      <button class="btn btn-dark col-8 col-md-8 shadow-none" @click="func">
        Add New
      </button>
    </div>
    <!-- Heading -->

    <div class="row mt-2" :class="create_new ? 'show ' : 'hide'">
      <div class="col-md-12">
        <form
          @submit.prevent="handleSubmit"
          class="row align-items-center justify-content-center"
        >
          <div class="col-md-4">
            <label for="alias" class="form-label label_fw">Alias:</label>
          </div>
          <div class="col-md-8 mb-3">
            <input
              v-model.trim="formdata.alias"
              type="text"
              class="form-control input_style_cus shadow-none"
              :class="{ 'is-invalid': isSubmitted && $v.formdata.alias.$error }"
              id="alias"
              autocomplete="off"
              placeholder="Enter Alias"
            />
            <div
              v-if="isSubmitted && !$v.formdata.alias.required"
              class="invalid-feedback"
            >
              Alias is required
            </div>
          </div>
          <!-- Alias -->
          <div class="col-md-4">
            <label for="account_number" class="form-label label_fw"
              >Account Number:</label
            >
          </div>
          <div class="col-md-8 mb-3">
            <input
              type="Password"
              v-model.trim="formdata.account_number"
              class="form-control input_style_cus shadow-none"
              :class="{
                'is-invalid': isSubmitted && $v.formdata.account_number.$error,
              }"
              id="account_number"
              autocomplete="off"
              placeholder="Enter Account Number"
            />
            <div
              v-if="isSubmitted && !$v.formdata.account_number.required"
              class="invalid-feedback"
            >
              Account number is required
            </div>
          </div>
          <!-- Account Number  -->
          <div class="col-md-4">
            <label for="inputAccount1" class="form-label label_fw"
              >Re-Enter Account Number:</label
            >
          </div>
          <div class="col-md-8 mb-3">
            <input
              v-model.trim="formdata.confirm_account_number"
              type="text"
              class="form-control input_style_cus shadow-none"
              :class="{
                'is-invalid':
                  isSubmitted && $v.formdata.confirm_account_number.$error,
              }"
              id="inputAccount1"
              autocomplete="off"
              placeholder="Re-Enter Account Number"
            />

            <div
              v-if="!$v.formdata.confirm_account_number.sameAsAccountNumber"
              class="invalid-feedback"
            >
              Does not match with entered account number
            </div>
            <div
              v-if="isSubmitted && !$v.formdata.confirm_account_number.required"
              class="invalid-feedback"
            >
              Confirm account number is required
            </div>
          </div>
          <!-- Re Enter Account Number  -->
          <div class="col-md-4">
            <label for="ifsc_code" class="form-label label_fw"
              >IFSC Code:</label
            >
          </div>
          <div class="col-md-8 mb-3">
            <input
              v-model.trim="formdata.ifsc_code"
              type="text"
              class="form-control input_style_cus shadow-none"
              :class="{
                'is-invalid': isSubmitted && $v.formdata.ifsc_code.$error,
              }"
              id="ifsc_code"
              autocomplete="off"
              placeholder="Enter IFSC Code"
            />
            <div
              v-if="isSubmitted && !$v.formdata.ifsc_code.required"
              class="invalid-feedback"
            >
              IFSC code is required
            </div>
          </div>
          <!-- IFSC Code  -->
          <div class="col-md-4">
            <label for="account_type" class="form-label label_fw"
              >Account Type:</label
            >
          </div>
          <div class="col-md-8 mb-3">
            <select
              v-model.trim="formdata.account_type"
              id="account_type"
              class="form-select input_style_cus shadow-none"
              :class="{
                'is-invalid': isSubmitted && $v.formdata.account_type.$error,
              }"
            >
              <option selected>Choose...</option>
              <option value="saving">Saving Account</option>
              <option value="current">Current Account</option>
            </select>
            <div
              v-if="isSubmitted && !$v.formdata.account_type.required"
              class="invalid-feedback"
            >
              Account type is required
            </div>
          </div>
          <!--Account Type-->
          <div v-if="!loading" class="col-md-6 mt-5 mb-4 text-center">
            <button
              type="submit"
              class="btn btn-dark col-8 col-md-8 shadow-none"
            >
              Save
            </button>
          </div>
          <div v-if="loading" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <!--save button-->
        </form>
      </div>
    </div>
    <!-- Content  -->
  </SettingsLayout>
</template>



<script>
import ApiClass from "@/api/api";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import { required, sameAs } from "vuelidate/lib/validators";
export default {
  name: "BankDetail",
  components: {
    SettingsLayout,
  },
  data() {
    return {
      activeItem: null,
      create_new: false,
      total_accounts: null,
      isSubmitted: false,
      loading: false,
      formdata: {
        alias: null,
        account_number: null,
        confirm_account_number: null,
        ifsc_code: null,
        account_type: null,
      },
    };
  },
  mounted() {
    this.getData();
  },
  validations: {
    formdata: {
      alias: {
        required,
      },
      account_number: {
        required,
      },
      confirm_account_number: {
        required,
        sameAsAccountNumber: sameAs("account_number"),
      },
      ifsc_code: {
        required,
      },
      account_type: {
        required,
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      this.isSubmitted = true;
      if (!this.$v.$invalid) {
        this.loading = true;
        ApiClass.postRequest("userbanks/create", true, this.formdata).then(
          (res) => {
            if (res.data.status_code == 1) {
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
              this.isSubmitted = false;
              this.getData();
              this.reset_form();
              this.loading = false;
              this.create_new = false;
            } else {
              this.loading = false;
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }
        );
      }
    },
    func() {
      this.create_new = !this.create_new;
    },
    async getData() {
      await ApiClass.getRequest("userbanks/get", true).then((res) => {
        if (res.data.status_code == 1) {
          this.total_accounts = res.data.data;
        }
      });
    },

    reset_form() {
      this.formdata.alias = "";
      this.formdata.account_number = "";
      this.formdata.confirm_account_number = "";
      this.formdata.account_type = "";
      this.formdata.ifsc_code = "";
    },
    delete_account(id) {
      ApiClass.deleteRequest("userbanks/delete/" + id, true).then((res) => {
        if (res.data.status_code == 1) {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 3000,
          });
          this.getData();
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    },
  },
};
</script>


<style scoped>
.label_fw {
  font-weight: 500;
}

.exchange_setting_heading{
  color: var(--white);
}
.input_style_cus:focus {
  box-shadow: 0;
  border-color: rgb(170, 170, 170);
}

.label_fw {
  font-weight: 500;
}
.fw-400 {
  font-weight: 400;
}
label.form-check_cus,
input.form-check_cus {
  cursor: pointer;
}
.show {
  display: block;
}
.hide {
  display: none;
}
.invalid-feedback {
  font-weight: 500;
  font-size: 11px;
}
.add_btn {
  text-align: center;
  padding-right: 100px;
  padding-left: 100px;
}
</style>