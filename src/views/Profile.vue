<template lang="html">


          <div class="profile">
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <div class="container">
                <router-link to="/profile" class="navbar-brand">Profile</router-link>
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">

            <div class="dropdown navbar-nav ml-auto" style="margin-top:5px;">
                <button class="btn btn-text-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Menu
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <router-link to="/profile/edit" class="dropdown-item" >Edit Profile</router-link>
                  <a class="dropdown-item logout" @click.prevent="logout">Logout</a>
                  <!-- <button class="dropdown-item" type="button">Action</button>
                  <button class="dropdown-item" type="button">Another action</button>
                  <button class="dropdown-item" type="button">Something else here</button> -->
                </div>
              </div>

              <!-- <div class="navbar-nav ml-auto">
                <router-link to="/profile/edit" class="btn btn-outline-success nav-item nav-link mr-10" >Edit Profile</router-link>
                <a class="btn btn-outline-success nav-item nav-link mr-10" @click="logout">Logout</a>
              </div> -->
            </div>
          </div>
         </nav>


       <router-view/>

  </div>

</template>

<script>

import {EventBus} from '../eventbus';


export default {

  data(){
    return{
      datas: {}
    }
  },
  mounted(){
    let user  = JSON.parse(localStorage.getItem('user'));

    if(!!user){
      this.datas = user
      // this.$router.push('/profile/info');
    }

  },
  methods:{
    logout(){
      EventBus.$emit('logout')
    }
  }
}
</script>

<style lang="css" scoped>


.profile{

}

.profile-div{
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 50px auto;
}

.img-div{
  width : 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto;

}

.img-div img{
  width: 100%;
  border-radius: 50%;
}


.details{
  font-size: 1rem;
  font-weight: normal;
  padding: 10px;
  box-shadow: 0 0 2px 2px rgba(28, 39, 60, 0.03);
  margin: 10px auto;
}

.details p{
  transform: translateY(10px);
}

.details:hover{
  color : #fff;
  background: #222831;
  transform: scale(1.05);
}
.logout, .logout:hover{
  background: #f00;
  color:#fff;
  cursor: pointer;
}
</style>
