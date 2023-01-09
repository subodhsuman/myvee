<template>
  <div>
    <section class="portfolio-transaction">
      <div class="container">
        <Heading title="Withdraw Transactions" />
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    style="fill: var(--white); transform: ; msfilter: ">
                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
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
                      <th>{{ trans.amount }}</th>
                      <th>{{ trans.status }}</th>
                      <th>{{ trans.hash }}</th>
                      <th>{{ trans.add }}</th>

                      <th>{{ trans.created_at }}</th>
                    </tr>
                  </thead>

                  <tbody v-if="TransactionList.length != 0">
                    <tr v-for="(translist, index) in TransactionList" :key="index">
                      <td>{{ translist.currency }}</td>

                      <td>{{ translist.amount }}</td>
                      <td class="text-capitalize">{{ translist.status }}</td>
                      <td><a
                          :href="(translist.chain_type == 'TRX' ? trx : (translist.chain_type == 'BSC' ? bsc : eth)) + blockHash(translist.transfer_detail)">{{
                          blockHash(translist.transfer_detail) }}</a></td>
                      <td> <a
                          :href="(translist.chain_type == 'TRX' ? trxAdd : (translist.chain_type == 'BSC' ? bscAdd : ethAdd)) + translist.to_address">{{
                          translist.to_address }}</a> </td>

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

                    <tr v-if="loader">
                      <td colspan="6">
                        <div class="spinner-border text-dark" role="status">
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
  name: "WithdrawHistory",
  components: {
    Heading,
  },
  data() {
    return {
      trx: "https://tronscan.org/#/transaction/",
      eth: "https://etherscan.io/tx/",
      bsc: "https://bscscan.com/tx/",
      trxAdd: "https://tronscan.org/#/address/",
      ethAdd: "https://etherscan.io/token/",
      bscAdd: "https://bscscan.com/address/",
      loader:true,
      TransactionData: [
        {
          symbol: "Symbol",
          amount: "Amount",
          status: "Status",
          hash: "Block Hash",
          add:"Address",
          created_at: "Created at",
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
    };
  },
  async mounted() {
    var response = await ApiClass.getRequest("wallet-trans/get", true);
    if (response.data.status_code == 1) {
      console.log(response);
      this.TransactionList = response.data.data;
      this.loader = false;
    }
  },
  methods: { 
    blockHash(data=null)
    { 
      return data.transactionHash ? data.transactionHash :  data.txid;
    }
  }
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
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: var(--white);
  text-align: center;
  border: 1px solid #ccc;
  white-space: nowrap;
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