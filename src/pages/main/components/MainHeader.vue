<template>
  <div class="header">
    <div class="left"><p class="title">{{title}}</p></div>
    <div class="center"><p class="login-label">{{username}}</p></div>
    <div class="right"><button @click="logout()" class="exit-btn">выход</button></div>
  </div>
</template>

<script>
import {LoginService} from "@/services/LoginService";

export default {
  name: "MainHeader",
  data(){
    return{
      title: "Transport Company Application",
      username: ""
    }
  },
  mounted: function () {
    this.username = this.getUsername();
  },
  methods:{
    getUsername(){
      let user = JSON.parse(localStorage.getItem("user"));
      return user.username;
    },
    logout(){
      LoginService.logout();
      this.$router.push({path: '/login', replace: true});
    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  height: 60px;
  width: auto;
  background-color: white;
  margin: 0px;
  padding-top: 18px;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-width: 1px;
}

.title{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 25px;
  font-weight: bolder;
  margin-left: 5%;
  margin-top: 0;
}

.exit-btn{
  right: 10px;
  width: auto;
  height: auto;
}

.login-label{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  margin-top: 0;
  width: auto;
  height: auto;
}

.center, .right, .left {
  height: 100%;
}

.center{
  width: 20%;
  text-align: right;
}

.left{
  width: 70%;
}

.right{
  width: 10%;
  text-align: center;
}

</style>