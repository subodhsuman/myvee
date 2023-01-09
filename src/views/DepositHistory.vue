<template>
  <div>
    <section class="portfolio-transaction">
      <div class="container">
        <Heading title="Deposit Transactions" />
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
            <div class="backbutton">
              <div class="col-md-6 ms-2 mb-2">
                    <router-link to="/portfolio" class="text-dark fs-4 ">
                      <i class="fad fa-reply-all" style="color:var(--white)"></i>
                    </router-link>
                </div>
              <!-- <router-link to="/portfolio">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style="fill: var(--white); transform: ; msfilter: "
                  >
                    <path
                      d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"
                    ></path>
                  </svg>

                  Back
                </span>
              </router-link> -->
            </div>
            <!--backbutton-->
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="transaction-table">
              <div class="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr v-for="(trans, index) in TransactionData" :key="index">
                      <th>{{ trans.symbol }}</th>
                      <th>{{ trans.type }}</th>
                      <th>{{ trans.amount }}</th>
                      <th>{{ trans.wallet_address }}</th>
                      <th>{{ trans.status }}</th>
                      <th>{{ trans.created_at }}</th>
                    </tr>
                  </thead>

                  <tbody v-if="TransactionList.length != 0">
                    <tr
                      v-for="(translist, index) in TransactionList"
                      :key="index"
                    >
                      <td>{{ translist.symbol }}</td>
                      <td>{{ translist.token_type }}</td>
                      <td>{{ translist.amount }}</td>
                      <td>{{ translist.user_wallet_address }}</td>
                      <td>{{ translist.status }}</td>

                      <td>
                        {{
                          new Date(translist.created_at).toLocaleDateString(
                            "en-US",
                            options
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-if="loading">
                      <td colspan="6">
                        <div
                          class="spinner-border text-dark"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="6">No Data Found</td>
                    </tr>
                  </tbody>
                </table>
                <!--table table-borderless-->
              </div>
              <!--table-responsive-->
            </div>
            <!--transaction-table-->
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </section>
    <!--portfolio-transaction-->
  </div>
</template>

<script>
import ApiClass from "@/api/api";
import Heading from "@/components/Home_New/Heading.vue";
export default {
  name: "DepositHistory",
  components: {
    Heading,
  },
  data() {
    return {
      TransactionData: [
        {
          symbol: "Symbol",
          type: "Type",
          amount: "Amount",
          wallet_address: "Wallet Address",
          created_at: "Created at",
          status: "Status",
        },
      ],

      TransactionList: [],
      options: {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    var user_data = JSON.parse(localStorage.getItem("user"));
    var response = await ApiClass.getRequest(
      "deposit/get/" + user_data.id,
      true
    );

    if (response.data.status_code == 1) {
      this.loading = false;
      console.log(response);
      this.TransactionList = response.data.data;
    }
  },
};
</script>

<style scoped>
section.portfolio-transaction {
  padding: 80px 0;
  background-color: #111111;
}

.table {
  border: 1px solid #ccc;
}

table.table thead tr th {
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: var(--white);
  text-align: center;
  border: 1px solid #ccc;
}

table.table tbody {
  border-top: 1px solid #ccc;
}

table.table tbody tr td {
  font-size: 13px;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: var(--white);
  text-align: center;
  border: 1px solid #ccc;
}

.backbutton a {
  text-decoration: none;
}

.backbutton a span {
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
}
</style>