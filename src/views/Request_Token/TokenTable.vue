<template>
  <div>
    <section class="query_form">
      <div class="container">
        <Heading title="Token List" />
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 mb-5">
            <div class="backbutton">
              <router-link to="/request/token">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
                  >
                    <path
                      d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"
                    ></path>
                  </svg>

                  Back
                </span>
              </router-link>
            </div>
            <!--backbutton-->
          </div>
          <!--col-lg-12 col-md-12-->

          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-hover" style="cursor: pointer">
                <thead>
                  <tr>
                    <th v-for="(data, index) in table_headings" :key="index">
                      {{ data }}
                    </th>
                  </tr>
                </thead>
                <!-- thead  -->

                <tbody>
                  <tr v-if="loading">
                    <td colspan="7">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr
                    v-else-if="!loading"
                    v-for="list in tokenlist"
                    :key="list.id"
                  >
                    <td>
                      <img
                        style="width: 50px; height: 50px"
                        :src="`${list.image}`"
                      />
                    </td>
                    <td>{{ list.token_name }}</td>
                    <td>{{ list.pair_with }}</td>
                    <td>{{ list.token_address }}</td>
                    <td>{{ list.whitepaper_link }}</td>
                    <td>{{ list.status }}</td>
                    <td>
                      <div class="tokens actions-btn">
                        <ul class="actions-btn-list" v-if="list.status == 'approved'">
                          <li>
                            <button
                              type="button"
                              class="btn btn-primary color-red"
                              data-bs-toggle="modal"
                              data-bs-target="#withrawModal"
                              @click="withdraw(list)"
                            >
                              Withdraw
                            </button>

                            <!-- Button trigger modal -->
                          </li>
                          <li>
                            <router-link to="/request/withdraw_table">
                              <button
                                type="button"
                                class="btn btn-primary color-green border-left"
                              >
                                Withdraw List
                              </button>
                            </router-link>

                            <!-- Button trigger modal -->
                          </li>
                        </ul>
                        <ul class="actions-btn-list" v-else>
                          <li> - </li>
                        </ul>
                      </div>
                    </td>
                  </tr>

                  <tr v-else-if="tokenlist.length == 0">
                    <td colspan="7">
                      <span class="d-flex justify-content-center">
                        No Ticket Available
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="modal fade"
      id="withrawModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Withdraw</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="modal-inner">
              <div class="form-box">
                <form @submit.prevent="submitWithdrawal()">
                  <div class="row form-row">
                    <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
                      <div class="input-box">
                        <label class="form-label">Token Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="withdrawModal.token_name"
                          readonly
                          disabled
                        />
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
                      <div class="input-box">
                        <label class="form-label">Symbol</label>
                        <multiselect
                          placeholder="Token Pair"
                          v-model.trim="withdrawModal.pair_with"
                          :options="withdrawModal.split_options"
                          >
                        </multiselect>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
                      <div class="input-box">
                        <label class="form-label">Enter Amount</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Amount"
                          v-model="withdrawModal.amount"
                        />
                        <div
                          class="error"
                          v-if="
                            withrawSubmit && !$v.withdrawModal.amount.required
                          "
                        >
                          Amount is required.
                        </div>
                      </div>
                    </div>
                    <!--col-xl-12 col-lg-12 col-md-12-->

                    <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="button-submit-box">
                        <button
                          v-if="withdraw_loading"
                          type="submit"
                          class="btn btn-primary"
                        >
                          <div
                            class="spinner-border text-light"
                            role="status"
                          ></div>
                        </button>
                        <button v-else class="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                    <!--col-xl-12 col-lg-12 col-md-12-->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import ApiClass from "@/api/api";
import Heading from "@/components/Home_New/Heading.vue";
import { required } from "vuelidate/lib/validators";
import { Modal } from "bootstrap";
import Multiselect from 'vue-multiselect';

export default {
  name: "TokenTable",
  components: {
    Heading,
    Multiselect
  },
  data() {
    return {
      table_headings: [
        "Image",
        "Token Name",
        "Pair With",
        "Token Address",
        "Whitepaper Link",
        "Status",
        "Action",
      ],
      tokenlist: {},
      loading: false,
      
      withdrawModal: {
        token_name: "",
        pair_with: "",
        amount: "",
        token_request_id: "",
        split_options:[]
      },

      withdraw_loading: false,
      withrawSubmit: false,
      theModal: "",
    };
  },
  validations() {
    return {
      withdrawModal: {
        amount: {
          required,
        },
      },
    };
  },
  mounted() {
    this.theModal = new Modal(document.getElementById("withrawModal"));
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      await ApiClass.getRequest("request/token/get", true).then((response) => {
        console.log("response=", response);
        if (response.data.status_code == 1) {
          this.loading = false;
          this.tokenlist = response.data.data;
        }
      });
    },
    withdraw(data) {
      console.log("dataaaaa=", data);
      this.withdrawModal.token_name = data.token_name;
      this.withdrawModal.token_request_id = data.id;
      this.withdrawModal.split_options = data.pair_with.split(',');
      this.withdrawModal.split_options.push('SELF');
    },
    async submitWithdrawal() {
      this.withrawSubmit = true;
      if (this.$v.withdrawModal.$invalid) {
        return;
      }
      this.withrawSubmit = false;
      this.withdraw_loading = true;

      var data = {
        amount: this.withdrawModal.amount,
        token_request_id: this.withdrawModal.token_request_id,
        symbol: this.withdrawModal.token_name + this.withdrawModal.pair_with,
        pair_with: this.withdrawModal.pair_with,
        currency:this.withdrawModal.token_name
      };

      var result = await ApiClass.postRequest(
        "withdraw_request/create",
        true,
        data
      );

      console.log("postwithrawl=", result);
      if (result.data.status_code == 1) {
        this.withdraw_loading = false;
        //hide model after submit
        this.theModal.hide();
        this.withdrawModal.amount = "";
        this.withdrawModal.token_request_id = "";
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: result.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        this.withdraw_loading = false;
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: result.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.query_form {
  padding: 80px 0;
}

.tokens .actions-btn {
  text-align: center;
}

.tokens ul li {
  list-style: none;
  padding-right: 6px;
}

.tokens ul {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.tokens .btn-primary {
  background-color: transparent;
  border-color: transparent;
}

.tokens .btn-primary:focus {
  box-shadow: none;
}

.tokens .color-red {
  color: #f1432f;
}

.tokens .color-green {
  color: #23ac50;
}

.tokens .border-left {
  border-left: 1px solid #ccc;
}

.tokens .btn {
  padding: 3px 5px;
  border-radius: 0;
}

table.table {
  border: 1px solid #ccc;
}

table.table thead tr th {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #8f8585;
  text-align: center;
  border: none;
}

.table tbody {
  border: 1px solid #ccc;
}

table.table tbody tr td {
  vertical-align: middle;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  color: #000;
  cursor: pointer;
  text-align: center;
  border: none;
}

.backbutton a {
  text-decoration: none;
}

.backbutton a span {
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
}

label.form-label {
  text-transform: capitalize;
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

.from-control {
  color: #000;
  font-size: 16px;
  font-weight: 500;
}

.from-control::placeholder {
  color: #000;
  opacity: 100%;
}

.button-submit-box .btn-primary {
  width: 100%;
  background-color: #1652f0;
  border-color: #1652f0;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  min-height: 45px;
}

.button-submit-box .btn-primary:focus {
  box-shadow: none;
}

h5.modal-title {
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-family: "Poppins";
  font-weight: 500;
  color: #000;
  margin: 0;
}
</style>
