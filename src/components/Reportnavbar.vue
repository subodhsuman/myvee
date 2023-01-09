<template>
  <div>
    <!-- Report navbar Area -->
    <div class="report_navbar p-1 bg-black">
      <ul class="list-group ">
        <li class="list-group-item">
          <router-link to="/reports/trading">
            <i class="far fa-copy"></i> Trading Report
          </router-link>
        </li>

        <li class="list-group-item">
          <router-link to="/reports/walletreport">
            <i class="far fa-copy"></i> Wallet Report
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Report navbar Area end-->
  </div>
</template>

<script>
export default {
  name: "Reportnavbar",
};
</script>

<style scoped>
.report_navbar {
  border-radius: 10px;
  margin-left: 10px;
}
ul.list-group li {
  background: #000;
  color: #fff;
  padding: 14px 10px;
}
ul.list-group li a {
  padding-left: 10px;
  font-size: 18px;
  transition: 0.5s;
  color: #fff;
  display: block;
  text-decoration: none;
}
ul.list-group li:hover a {
  color: rgb(175, 172, 172);
  transition: 0.5s;
}
ul.list-group li i {
  padding-right: 5px;
}

a.router-link-exact-active.router-link-active {
  transition: 0.5s all ease;
  padding: 14px 10px;
  display: block;
  background-color: #ffffff3d;
  border-radius: 10px;
}
</style>
