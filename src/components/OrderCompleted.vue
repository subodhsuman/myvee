<template>
  <div>
    <div class="order-complete-box" v-if="loggedIn">
      <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-new" type="button"
            role="tab" aria-controls="home" aria-selected="true" @click="openComplete = 'open'">
            Open
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-new" type="button"
            role="tab" aria-controls="profile" aria-selected="false" @click="openComplete = 'complete'">
            My Orders
          </button>
        </li>
      </ul>

      <div class="order_heading_box">
        <p>pair</p>
        <p>qty</p>
        <!-- <p>price</p>
        <p>total</p> -->
      </div>
      <!-- {{openComplete}} {{openComplete}} {{openComplete}} {{openComplete}} -->
      <!-- <div class="empty-upper-box" v-if="orderRemainingData.length == 0 || orderCompletedData.length == 0">
        <div v-if="orderRemainingData.length == 0 && openComplete == 'open'" class="empty-box">
          <p>no open orders!</p>
        </div>
        <div v-if="orderCompletedData.length == 0 && openComplete == 'complete'" class="empty-box">
          <p>no completed orders!</p>
        </div>
      </div> -->

      <div class="tab-content" id="myTabContent">
        <!-- Remaining Tab Start -->

        <div class="tab-pane show active" id="home-new" role="tabpanel" aria-labelledby="home-tab">
          <!-- For Loop Of Order Remaining -->

          <OrderEmptyBox v-if="orderRemainingData.length == 0 && openComplete == 'open'" orderType="Open" />

          <div v-else v-for="(data2, index) in orderRemainingData" :key="index" class="open_order_currency"
            :class="data2.order_type == 'sell' ? 'currency-seller ' : ''">
            <div class="open_order_inner_box">
              <p class="pair">
                {{ data2.currency }}
                <span>/{{ data2.with_currency }}</span>
                <span class="qty-span">Qty</span>
              </p>

              <p class="price">
                {{ data2.at_price }}
                <span class="prc-qty">{{ data2.quantity }}</span>

                <span>{{ data2.total }}</span>
              </p>
              <!-- <p>44.94</p> -->
            </div>
            <!--open_order_inner_box-->
            <figcaption class="edit-btn">
              <div class="order-complete-btn">
                <!-- <em class="fas fa-pencil-alt"></em> -->
                <h3 data-bs-toggle="modal" @click="orderdetails = data2" data-bs-target="#editmodal">
                  Edit
                </h3>
              </div>
              <!--order-complete-btn-->

              <div class="order-cancelled-btn">
                <!-- <em class="fas fa-times"></em> -->
                <h3 data-bs-toggle="modal" @click="orderdetails = data2" data-bs-target="#cancelmodal">
                  Cancel
                  <!-- Button trigger modal -->
                  <!-- <button
                    type="button"
                    class="btn btn-primary"

                  >
                    Launch demo modal
                  </button> -->
                </h3>
              </div>
              <!--order-complete-btn-->
            </figcaption>
            <!--overlay-hover-->

            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="{
                backgroundColor:
                  data2.order_type == 'sell' ? 'var(--red) ' : 'var(--green)',
                width: myStyle(data2) + '%',
              }" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                {{ parseInt(myStyle(data2)) }}%
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <div class="load-more-btn" v-if="this.current_page_r < this.last_page_r">
            <button class="btn btn-secondary btn-sm" v-on:click="loadMore('remaining')">
              load more..
            </button>
          </div>
        </div>

        <!-- Completed Tab Start -->
        <div class="tab-pane" id="profile-new" role="tabpanel" aria-labelledby="profile-tab">
          <!-- For Loop Of Order Completed -->

          <OrderEmptyBox v-if="orderCompletedData.length == 0 && openComplete == 'complete'" orderType="Completed" />

          <div v-else v-for="(data, index) in orderCompletedData" :key="index" class="open_order_currency"
            :class="data.order_type == 'sell' ? 'currency-seller ' : ''">
            <div class="open_order_inner_box">
              <p class="pair">
                {{ data.currency }}
                <span>/{{ data.with_currency }} </span>
                <span class="qty-span">Qty</span>
              </p>
              <p class="price">
                {{ data.at_price }}
                <span class="prc-qty">{{ data.quantity }}</span>
                <span>{{ data.total }}</span>
              </p>

            </div>
            <!--open_order_inner_box-->
            <figcaption class="overlay-hover complete-date">
              <div class="order-complete-date">
                <span>{{ moment(data.created_at).format("YYYY-MM-DD") }}</span>
              </div>
              <!--order-complete-date-->
            </figcaption>

            <div class="status-text">
              <p style="color: #000000">Status</p>
              <!-- <span class="complete-text" :style="`color:${data.current_status != 'completed' ? 'white' : 'white'}`"></span> -->
              <span class="badge status-text" :style="`background-color:${
                data.current_status != 'completed'
                  ? 'var(--red)'
                  : 'var(--green)'
              }`">{{ data.current_status }}</span>
            </div>
            <!--status-text-->

            <div class="action">
              <p>Action</p>
              <span data-bs-toggle="modal" data-bs-target="#detailModal" @click="tradeDataGet(data.id)"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  style="fill: var(--test);transform: ;msFilter:;">
                  <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z">
                  </path>
                  <path
                    d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z">
                  </path>
                </svg></span>
            </div>

            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="{
                backgroundColor:
                  data.order_type == 'sell' ? 'var(--red) ' : 'var(--green)',
  width: data.current_status != 'completed' ? parseInt(myStyle(data)) + '%' : '100%',
              }" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                {{ data.current_status != 'completed' ? parseInt(myStyle(data)) : '100' }} %


              </div>
            </div>

          </div>

          <!-- Load More Button -->
          <div class="load-more-btn" v-if="this.current_page < this.last_page">
            <button class="btn btn-secondary btn-sm" v-on:click="loadMore('completed')">
              load more..
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="login_box" v-else>
      <div class="login_inner_box">
        <div class="login-btn">
          <router-link class="nav-link" to="/login">
            <button type="button" class="btn btn-primary login-btn">
              Login
            </button>
          </router-link>
        </div>
        <!--login-btn-->

        <span>or</span>

        <div class="signin-btn">
          <router-link class="nav-link" to="/signup">
            <button type="button" class="btn btn-primary sign-btn">
              Sign Up
            </button>
          </router-link>
        </div>
        <!--login-btn-->
      </div>
      <!--login_inner_box-->
    </div>

    <div class="modal-box">
      <Cancelmodal :orderDetail="orderdetails" />
      <EditModal :orderDetail="orderdetails" />
    </div>
    <!--modal-box-->
    <div class="modal order_modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class=" modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-black" id="detailModalLabel">Order Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0" v-if="detailData">
            <div class="row   px-4 py-3 mb-3" :class="detailData.order_type == 'buy' ? 'light_green' :'light_red'">
              <div class="col-6">
                <div class="fw-bold text-black">{{ detailData.currency }} / {{detailData.with_currency}}
                </div>
              </div>
              <div class="col-6">
                <div class="text-end text-capitalize fw-bold"
                  :class="detailData.order_type == 'buy' ? 'text-success' :'text-danger'">{{ detailData.order_type }}
                </div>
              </div>
            </div>

            <div class="row px-4 mb-2">
              <div class="col-6">
                <div class="head">Type</div>
              </div>
              <div class="col">
                <div class="text-end head_content">{{ detailData.type }}</div>
              </div>
            </div>
            <div class="row  px-4  mb-2">
              <div class="col-6">
                <div class="head">Created At </div>
              </div>
              <div class="col">
                <div class="text-end  head_content">
                  {{ moment(detailData.created_at).format("YYYY-MM-DD") }}</div>
              </div>
            </div>
            <div class="row px-4 mb-2">
              <div class="col-6">
                <div class="head">Amount</div>
              </div>
              <div class="col">
                <div class="text-end  head_content">{{ detailData.quantity }} {{ detailData.currency }}</div>
              </div>
            </div>
            <div class="row px-4 mb-2">
              <div class="col-6">
                <div class="head">Price</div>
              </div>
              <div class="col">
                <div class="text-end  head_content">$ {{ detailData.at_price }}</div>
              </div>
            </div>
            <div class="row px-4 mb-2">
              <div class="col-6">
                <div class="head">Total</div>
              </div>
              <div class="col">
                <div class="text-end  head_content">$ {{ detailData.total }}</div>
              </div>
            </div>
            <!-- <div v-if="detailData.current_status != 'canceled'"> -->
            <hr />
            <div class="row  px-4  mb-2 fw-bold">
              Trade Details
            </div>
            <div class="row  px-4  mb-2 tab_head">
              <div class="col-3 heading_table  text-start">Date/Time</div>
              <div class="col-3 heading_table  text-center">Filled</div>
              <div class="col-3  heading_table  text-center">Price</div>
              <div class="col-3  heading_table  text-center">Commission</div>

            </div>
            <div v-if="tradeData.length == 0">
              <div class="col-12">
                <p class="text-center head_content"> No Data Found</p>
              </div>
            </div>
            <div class="row  px-4 details_box  mb-2" v-for="(data,index) in tradeData" :key="index" v-else>
              <div class="col-3  text-start ">
                <p class="mb-1"> {{ moment(data.created_at).format("DD-MMM, h:mm:ss") }}</p>
              </div>
              <div class="col-3 text-center">
                <p class="mb-1"> {{ data.quantity }} {{ data.currency }} </p>
              </div>
              <div class="col-3 text-center">
                <p class="mb-1"> {{ data.at_price }}</p>
              </div>
              <div class="col-3 text-center">
                <p class="mb-1"> {{ data.commission }}</p>
              </div>
            </div>
          </div>
          <div v-else class="loading_box text-center p-5">
            <div class="spinner-border text-dark " role="status">
              <span class="visually-hidden text-center">Loading...</span>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ApiClass from "../api/api";
import Cancelmodal from "@/components/modal/Cancelmodal.vue";
import EditModal from "@/components/modal/EditModal.vue";
import OrderEmptyBox from "@/components/OrderEmptyBox.vue";
export default {
  name: "OrderCompleted",
  components: {
    Cancelmodal,
    EditModal,
    OrderEmptyBox,
  },
  data() {
    return {
      openComplete: "open",
      orderdetails: null,
      last_page: null,
      last_page_r: null,
      current_page: 1,
      current_page_r: 1,
      orderCompletedData: [],
      orderRemainingData: [],
      loggedIn: false,
      pusher: null,
      connection: "",
      detailData: null,
      tradeData:[]
    };
  },
  mounted() {
    var userinfo = localStorage.getItem("user");

    if (userinfo) {
      var $this = this;
      var x = JSON.parse(userinfo);

      this.connection = new WebSocket(ApiClass.nodeWebsocket);
      this.connection.onopen = function () {
        console.log(
          "ORDERS Successfully connected to the echo websocket server..."
        );
      };
      var ccStreamer = this.connection;
      this.connection.onopen = function onStreamOpen() {
        var request = {
          method: "ORDER",
          params: [x.referral_code],
        };
        ccStreamer.send(JSON.stringify(request));
      };

      this.connection.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        if (msg.update) {
          $this.$store.commit("buySellFund", msg.update);
          $this.orderCompletedData = [];
          $this.orderRemainingData = [];
          $this.openOrders();
          $this.completeOrders();
        }
      };

      this.connection.onclose = function () {
        console.log(
          "Successfully disconnected to the echo websocket server..."
        );
      };
    }
  },
  created() {

    if (localStorage.getItem("token")) {
      this.loggedIn = true;
      this.openOrders();
      this.completeOrders();
    }
  },

  methods: {
    async tradeDataGet(id = null) {
      this.detailData = [];
      let response = await ApiClass.getNodeRequest("orders/getOrderDetail?id=" + id, true);
   
        if (response.data.status_code == 1) {
          this.detailData = response.data.data.order_data;
          this.tradeData = response.data.data.data;

        }   
    },   
    myStyle(order) {
      if (order.pending_qty == 0) return 0;
      return ((order.quantity - order.pending_qty) * 100) / order.quantity;
    },
    async completeOrders() {
      var url =
        "orders/get?type=completed&page=" + this.current_page + "&per_page=25";
      await ApiClass.getNodeRequest(url, true).then((response) => {
        if (response.data.status_code == 1) {
          this.current_page = response.data.data.current_page;
          this.last_page = response.data.data.last_page;
          this.orderCompletedData =
            this.orderCompletedData.length == 0
              ? response.data.data.data
              : [...this.orderCompletedData, ...response.data.data.data];
        }
      });
    },
    async openOrders() {
      var url =
        "orders/get?type=remaining&page=" +
        this.current_page_r +
        "&per_page=25";
      await ApiClass.getNodeRequest(url, true).then((response) => {
        if (response.data.status_code == 1) {
          this.current_page_r = response.data.data.current_page;
          this.last_page_r = response.data.data.last_page;
          this.orderRemainingData =
            this.orderRemainingData.length <= 25
              ? response.data.data.data
              : [...this.orderRemainingData, ...response.data.data.data];
        }
      });
    },
    loadMore(record) {
      if (record == "completed") {
        this.current_page = this.current_page + 1;
        this.completeOrders();
      } else {
        this.current_page_r = this.current_page_r + 1;
        this.openOrders();
      }
    },
  },
};
</script>

<style scoped>

.light_green{
  background-color: #e7faf0;      
  font-weight: 500;       
}
.light_red
{
  background-color: #FFE9E3;
}
.details_box p{
  font-size:14px;
}
.details_box  {
  border-bottom: 1px solid #8080802e;
}
.modal-header h5{
  font-size:17px;
  font-weight: 700;

}
.heading_table{
font-weight: 500;
}





.order-complete-box {
  overflow: hidden;
  box-shadow: var(--box-shadow);
  background-color: var(--white);
  height: auto;
}

.order-complete-box div#myTabContent {
  height: 370px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.nav-tabs {
  background: var(--nav-bg);
  border-bottom: none;
}

.nav-tabs .nav-link {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--black);
  min-height: 40px;
  border: none;
  border-radius: 0;
}

.nav-tabs .nav-link:focus-visible {
  outline: none;
}

.nav-tabs .nav-link.active {
  color: var(--nav-active);
  background-color: var(--white);
  border-top: 3px solid var(--black);
}

.order_heading_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  margin-top: 5px;
  border-bottom: 1px dotted #989898;
}

.order_heading_box p {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  color: var(--black);
  margin-bottom: 0;
}

.open_order_currency {
  position: relative;
  transition: all 0.5s ease;
  z-index: 1;
  min-height: 62px;
  height: auto;
  border-bottom: 1px solid #e3e3e3;
}

.open_order_currency::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e7faf0;
  z-index: -1;
}

.open_order_inner_box {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  position: relative;
  z-index: 1;
  padding-bottom: 0;
}

.open_order_inner_box p {
  margin-bottom: 0;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: #000;
}

.open_order_inner_box p.pair span {
  color: #92989b;
  font-size: 10px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

.open_order_inner_box p.qty span {
  display: block;
  font-weight: 500;
}

figcaption.overlay-hover {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 132px;
  padding: 0 10px;
  height: 100%;
  transition: all 0.5s ease;
  margin-right: auto;
  z-index: 1;
  padding-right: 5px;
  position: absolute;
  bottom: 46px;
}

.order-complete-btn h3 {
  color: var(--green);
  cursor: pointer;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

.order-cancelled-btn h3 {
  color: var(--red);
  cursor: pointer;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

.open_order_currency.currency-seller {
  position: relative;
}

.open_order_currency.currency-seller::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 233 227);
  z-index: -1;
}

.date-box {
  margin-left: auto;
}

.date-box span {
  font-size: 13px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  color: #000;
}

.login_box {
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  border: 1px solid #ccc;
  height: 456px;
  background-color: rgba(255, 255, 255, 0.7);
  position: relative;
}

.login_inner_box {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9;
  padding: 16px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

button.btn.btn-primary.login-btn {
  border-radius: 4px;
  position: relative;
  box-shadow: rgb(0 0 0 / 24%) 0px -1px 0px 0px inset;
  cursor: pointer;
  outline: 0px;
  width: 192px;
  height: 44px;
  margin: 0px 0px 8px;
  background: rgb(2 2 2);
  color: rgb(255, 255, 255);
  border: 0px;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
}

button.btn.btn-primary.sign-btn {
  border-radius: 4px;
  position: relative;
  box-shadow: none;
  cursor: pointer;
  outline: 0px;
  width: 192px;
  height: 44px;
  margin: 8px 0px 0px;
  background: transparent;
  color: rgb(2 2 2);
  border: 1px solid;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
}

.login_inner_box span {
  display: block;
  color: rgb(28, 27, 33);
  font-size: 10px;
  line-height: 1.2;
  text-transform: uppercase;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

.open_order_inner_box p.price {
  text-align: right;
}

.open_order_inner_box p.price span {
  display: block;
  text-align: right;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}

.open_order_inner_box p.pair span.qty-span {
  display: block;
  margin-bottom: 0;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  margin-top: 4px;
  color: #000;
}

span.prc-qty {
  border-bottom: 2px solid #ccc;
}
/* .order-complete-date {
  margin-top: 9px;
} */
figcaption.overlay-hover.complete-date span {
  margin-bottom: 0;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  margin-top: 4px;
  color: #000;
}

/* / width / */
.order-complete-box div#myTabContent::-webkit-scrollbar {
  width: 2px;
}

/* / Track / */
.order-complete-box div#myTabContent::-webkit-scrollbar-track {
  background: #fff;
}

/* / Handle / */
.order-complete-box div#myTabContent::-webkit-scrollbar-thumb {
  background: #000;
}

.load-more-btn {
  text-align: center;
}

.load-more-btn button.btn.btn-secondary {
  background-color: transparent;
  color: #0b6ee3;
  border: none;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
}

.load-more-btn button.btn.btn-secondary:focus {
  box-shadow: none;
}

.progress {
  margin: 3px 5px;
  margin-bottom: 5px;
  height: 10px;
}

.progress-bar {
  font-size: 9px;
  line-height: 0;
}

figcaption.overlay-hover.complete-date {
  width: 100%;
  max-width: 132px;
  padding: 0 10px;
  height: auto;
  transition: all 0.5s ease;
  margin-right: auto;
  z-index: 1;
  padding-right: 5px;
  position: absolute;
      bottom: 65px;
}

.status-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.status-text p {
  margin-bottom: 0;
  margin-left: 10px;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  margin-top: 4px;
  color: var(--black);
}

.status-text span.status-text {
  color: white;
  /* background-color: var(--green)  ; */
  margin-right: 5px;
  padding: 0.15em 0.2em;
  font-size: 9px;
  text-transform: capitalize;
  margin-bottom: 0;
}

.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;
  padding-top: 0;
}

.action p {
  margin: 0;
  color: var(--test);
  display: block;
  margin-bottom: 0;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
}

figcaption.edit-btn {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 8px;
  padding-left: 12px;
  margin-top: 5px;
}
.head{
font-weight: 600;
  color: var( --chart-tab-btn);
}
.head_content{
  font-weight: 600;
  color: var(--ticker-sub);

}

.heading_table {
   color: var( --chart-tab-btn);
}
.tab_head{
    padding: 10px;
    background: #adb5bd1c;
}
.loading_box  {
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.details_box p{
      white-space: nowrap;
}


/* order modal css */
.order_modal .modal-content{
  background: var(--exchange-bg);
}
.order_modal .modal-header h5{
  color:var(--black) !important;
}
.order_modal .btn-close{
  background: var(--cross-white) center/2em auto no-repeat;
  opacity: 1;
}
/* .head{
    font-weight: 600;
    color: var( --chart-tab-btn);
} */
@media all and (min-width: 1400px) and (max-width: 1499px) {
  .order-complete-box div#myTabContent {
    height: 378px;
  }

  button.btn.btn-primary.sign-btn {
    width: 170px;
  }

  button.btn.btn-primary.login-btn {
    width: 170px;
  }
}

@media all and (min-width: 1200px) and (max-width: 1399px) {
  figcaption.overlay-hover {
    max-width: 100px;
  }

  .order-complete-box div#myTabContent {
    height: 378px;
  }

  button.btn.btn-primary.sign-btn {
    width: 170px;
  }

  button.btn.btn-primary.login-btn {
    width: 170px;
  }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
  .order-complete-box div#myTabContent {
    height: 327px;
  }

  figcaption.overlay-hover {
    max-width: 100px;
  }

  .login_box {
    height: 401px;
  }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .order-complete-box div#myTabContent {
    height: 327px;
  }

  figcaption.overlay-hover {
    max-width: 100px;
  }

  .login_box {
    height: 401px;
  }
}
</style>
