<template>
  <div>
    <section class="query_form">
      <div class="container">
        <Heading title="Withdraw List" />
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 mb-5">
            <div class="backbutton">
              <router-link to="/request/token_table">
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
                    v-for="list in withdrawlist"
                    :key="list.id"
                  >
                    <td>{{ list.symbol }}</td>
                    <td>{{ list.token.token_address }}</td>
                    <td>{{ list.amount }}</td>
                    <td>
                      <span v-if="list.is_transaction" class="green">
                        Completed
                      </span>
                      <span v-else class="red"> - </span>
                    </td>
                    <td>{{ new Date(list.created_at).toLocaleString() }}</td>
                    <td>
                      <span v-show="list.status == 'approved'" class="green">
                        Approved
                      </span>
                      <span v-show="list.status == 'pending'" class="orange">
                        Pending
                      </span>
                      <span v-show="list.status == 'cancel'" class="red">
                        Canceled
                      </span>
                    </td>
                  </tr>

                  <tr v-else-if="withdrawlist.length == 0">
                    <td colspan="7">
                      <span class="d-flex justify-content-center">
                        No Data Available
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
  </div>
</template>

<script>
import ApiClass from "@/api/api";
import Heading from "@/components/Home_New/Heading.vue";
export default {
  name: "WithdrawTable",
  components: {
    Heading,
  },
  data() {
    return {
      table_headings: [
        "Symbol",
        "Token Address",
        "Amount",
        "Transation",
        "Date",
        "Status",
      ],
      withdrawlist: [],
      loading: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      await ApiClass.getRequest("withdraw_request/get", true).then(
        (response) => {
          if (response.data.status_code == 1) {
            this.withdrawlist = response.data.data;
            console.log("list==", this.withdrawlist);
          }
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.query_form {
  padding: 80px 0;
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
  /* text-transform: capitalize; */
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
  color: var(--white);
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

span.red {
  color: var(--red);
  font-weight: bold;
}
span.green {
  color: var(--green);
  font-weight: bold;
}
span.orange {
  color: #ff7a0d;
  font-weight: bold;
}
</style>
