<template>
  <div>
    <div class="main-link-box">
      <div class="icon-box">
        <em :class="Social.icon_name"></em>
      </div>

      <div class="icon-text-box">
        <h6>{{Social.link_name}}</h6>
      </div>
    </div>
    <!--main-link-box-->
  </div>
</template>



<script>
export default {
    name:'SocialLinks',
    props: {
        Social:Object
    }
}
</script>


<style scoped>
.main-link-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 8px 0;
        border: 1px solid #dfe2e7;
        border-radius: 4px;
        padding: 15px 24px;
        cursor: pointer;
        transition: all 0.5s ease;
        background-color: #fff;
    }
    
    .main-link-box:hover {
           transform: translateY(-3px);
        transition: all 0.5s ease;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
    
    .icon-box {
        height: 50px;
        width: 50px;
        background-color: #0066edba;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 35px;
    }
    
    .icon-box .fab {
        color: #fff;
    }
    
    .icon-text-box {
        padding-left: 23px;
    }
    
    .icon-text-box h6 {
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
</style>