<template>
  <div class="home">

            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <div class="container">
                <router-link to="/" class="navbar-brand">Jetcake</router-link>
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">

              <div class="navbar-nav ml-auto">
                <router-link to="/register" class="btn btn-text-primary nav-item nav-link mr-10" v-if="!isLogged">Sign up</router-link>
                <router-link to="/login" class="btn btn-text-primary nav-item nav-link" v-if="!isLogged">Login</router-link>
                <router-link to="/profile" class="btn btn-outline-primary nav-item nav-link" v-if="isLogged">Profile</router-link>
              </div>
            </div>
          </div>
         </nav>

    <section class="bgimage">
    <div class="container">
    <div class="row">

      <div class="col-lg-7 col-md-8 col-sm-12 col-xs-8 hero-text">
        <p>This is Jetcake</p>
        <p>Lets us blow your mind.</p>
        <p>
          <router-link to="/register" class="btn btn-primary btn-large" v-if="!isLogged">Sign up</router-link>
        </p>
      </div>
    </div>
    </div>
    </section>

    <section class="container">

      <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12 contents">
        <h3>Something to think about</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </div>

    </section>
  </div>
</template>

<script>
// @ is an alias to /src





export default {
  name: 'home',
  data(){
    return{
      isLogged : false
    }
  },
  created(){
 },
  methods:{


  },
  mounted(){
    let user  = JSON.parse(localStorage.getItem('user'));

    if(!!user){
      this.isLogged = true;
    }

  }
}
</script>


<style scoped>
.bgimage {
width:100%;
height:400px;
background: url('http://getwallpapers.com/wallpaper/full/9/7/7/1009479-popular-cool-background-for-computer-1920x1080-for-windows.jpg ');
background-repeat: no-repeat;
background-position: center;
background-size:cover;
background-attachment: fixed;
}
.navbar-brand{
  font-size: 1.8rem;
}
.bgimage h5 {
color:white;
text-shadow:2px 2px #333;
}
.nav-link{
  margin : 5px;
}
.contents{
  box-sizing: border-box;
  margin: 30px auto;
  padding: 10px;
  font-size: 1.1rem;
  text-align: justify;
  font-weight: lighter;
}

.contents p{
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.hero-text{
  margin: 100px auto;

}
.hero-text p{
  color: #fff;
}

.hero-text p:nth-child(1){
  font-size: 3.0rem;
}
</style>
