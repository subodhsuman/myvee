<template>
    <div class="empty-upper-box" >
        <div class="empty-box" style="text-align: center">
            <p><b>No {{ orderType }} Orders!</b></p>
            <p>Let's Order some Crypto !</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderEmptyBox",
        props: [ 'orderType' ]
    };
</script>

<style scoped>

.empty-upper-box {
    /* box-shadow: rgb(0 0 0 / 7%) 0px 1px 4px;
    background-color: #fff; */
    min-height: 326px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-box p {
    margin-bottom: 0;
    text-transform: capitalize;
    font-family: "Poppins";
    font-size: 12px;
    color: var(--black);
    font-weight: 400;
  }


</style>