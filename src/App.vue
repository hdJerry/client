<template>
  <div id="app">
    <Profile v-if="isAuthenticated"></Profile>

    <router-view v-if="!isAuthenticated"></router-view>
  </div>
</template>


<script>

import {EventBus} from './eventbus';
import Profile from '@/views/Profile.vue'

export default{
  components:{
    Profile
  },
  data(){
    return{
      isAuthenticated : false
    }
  },
  created(){
   EventBus.$on('login',this.login)
   EventBus.$on('logout',this.logout)
 },
  methods:{

    login(data){
      this.isAuthenticated = true;

      // console.log(data);
      localStorage.setItem("user",JSON.stringify(data));

      setTimeout(() => {

            window.location.reload()
         }, 100);

    },
    logout(){

      this.isAuthenticated = false;

      // console.log(data);
      localStorage.removeItem("user");

        this.$router.push('/')
    }

  },
  mounted(){



    let user  = JSON.parse(localStorage.getItem('user'));

    if(!!user){
      this.isAuthenticated = true;
      // this.isLogged = true;
    }


    window.onpopstate = event => {
      if (
        window.localStorage.getItem("user") !== null &&
        this.$route.path == "/"
      ) {
        this.$router.push("/profile"); // redirect to home, for example
      }
    };
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
