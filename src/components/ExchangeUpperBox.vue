<template>
  <div>
    <div class="exchange_upper_box">
    
      <div class="exchange_inner_box currency_name_box">
        <h3>
          <span
            @click="changeFavourite()"
            :class="IsStar == true ? 'star-fill' : 'star-blank'"
            ><i :class="IsStar == true ? 'fas fa-star' : 'far fa-star'"></i
          ></span>
          {{$route.params.slug}}
        </h3>
      </div>
      <!--exchange_inner_box-->
 
      <div class="mb-3 mb-sm-0 text-center exchange_inner_box price_inner_box">
        <h3>Price <span>{{slug_info.current_price}}</span></h3>
      </div>
      <!--exchange_inner_box-->

      <div class="mb-3 mb-sm-0 text-center exchange_inner_box price_change_box">
        <h3>24H Change <span :style="{color: slug_info.current_change >= 0 ?'green' :'red'}">{{slug_info.current_change}}%</span></h3>
      </div>
      <!--exchange_inner_box-->

      <div class="mb-3 mb-sm-0 text-center exchange_inner_box price_high_box">
        <h3>High <span style="color: var(--green);">{{slug_info.current_high}}</span></h3>
      </div>
      <!--exchange_inner_box-->

      <div class="mb-3 mb-sm-0 text-center exchange_inner_box price_low_box">
        <h3>Low <span style="color: #ff0000;">{{slug_info.current_low}}</span></h3>
      </div>

      <!--exchange_inner_box-->
    </div>
    <!--exchange_upper_box-->
  </div>
</template>

<script>
import ApiClass from "../api/api";

export default {
  name: "ExchangeUpperBox",
  data(){
    return{
      slug_info:{
        slug:this.$route.params.slug,
        current_price:"--",
        current_change:"--",
        current_high:"--",
        current_low:"--",
        currency: "",
        image: "",
        name: "",
        pair_with: "",
      },
      IsStar: null,
      alreadyFavourite: []
    }
  },
  mounted(){ 
    this.favouriteCryptos();
  },
  methods:{
    favouriteCryptos() { 
      this.alreadyFavourite = this.$store.getters.favouriteCryptos;
      this.IsStar =  (this.alreadyFavourite.find(item=> item ===this.slug_info.slug)) ? true : false;
    },
    changeFavourite(){
      console.log('hihihihihis',this.IsStar);
      var isIndex = this.alreadyFavourite.findIndex(item => item === this.slug_info.slug);
      (isIndex >= 0) ? this.alreadyFavourite.splice(isIndex,1) : this.alreadyFavourite.push(this.slug_info.slug);
      this.$store.commit("SET_FAVOURITE", this.alreadyFavourite);
      this.favouriteCryptos();
      if(this.$store.getters.isLoggedIn){
        (isIndex >= 0) ? this.callApi('DELETE',this.slug_info.slug) :  this.callApi('CREATE',this.slug_info.slug);
      }
    },
    async callApi(method = null,param = null){

        if(method == 'CREATE'){
          var pair_with = param.slice(param.length - 3, param.length);
          var sdt = (pair_with.indexOf('SDT') >= 0) ? true : false;
          pair_with = (sdt) ? 'USDT' : pair_with;
          var currency  = (sdt) ? param.slice(0, param.length - 4) : param.slice(0, param.length - 3);

          await ApiClass.postRequest("favourite/create", true, {"currency":currency,"pair_with":pair_with});
        }

        if(method == 'DELETE'){
          await ApiClass.deleteRequest("favourite/delete/"+param, true);
        }

    }
  },
  watch:{
    "$store.getters.getSlugInfo": function () {
      this.slug_info = this.$store.getters.getSlugInfo;
    },
    "$route.params.slug": function () {
      this.favouriteCryptos();
    }
  }
}
</script>

<style scoped>
.exchange_upper_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border-color);
  background: var(--white);
  padding: 10px 10px;
}

.exchange_inner_box h3 {
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  color: var(--black);
  margin: 0;
font-family: 'Poppins', sans-serif;
}

.currency_name_box h3 {
  text-transform: uppercase;
}

.price_change_box h3 span {
  color: var(--green);
}

.exchange_inner_box.price_inner_box h3 {
  font-size: 14px;
}

.exchange_inner_box.price_inner_box h3 {
  font-size: 14px;
  padding-left: 5px;
}

.exchange_inner_box.price_change_box h3  {
  font-size: 14px;
}

.exchange_inner_box.price_change_box h3 span {
  font-size: 14px;
  padding-left: 5px;
}

.exchange_inner_box.price_high_box h3 {
  font-size: 14px;
}

.exchange_inner_box.price_high_box h3 span {
  font-size: 14px;
  padding-left: 5px;
}

.exchange_inner_box.price_low_box h3 {
  font-size: 14px;
}

.exchange_inner_box.price_low_box h3 span {
  font-size: 14px;
  padding-left: 5px;
}




.exchange_inner_box.currency_name_box h3 span.star-fill {
    margin-right: 10px;
}

.exchange_inner_box.currency_name_box h3 span.star-fill .fas {
    color: var(--fav-color);
    cursor: pointer;
}

.exchange_inner_box.currency_name_box h3 span.star-blank {
  margin-right: 10px;
}

.exchange_inner_box.currency_name_box h3 span.star-blank .far {
    color: var(--fav-color);
    cursor: pointer;
}

@media all and (min-width: 320px) and (max-width: 576px) {
.exchange_upper_box {
    flex-direction: column;
}
}

</style>
