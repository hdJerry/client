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
                <router-link to="/register" class="btn btn-outline-success nav-item nav-link mr-10" v-if="!isLogged">Sign up</router-link>
                <router-link to="/login" class="btn btn-outline-success nav-item nav-link" v-if="!isLogged">Login</router-link>
                <router-link to="/profile" class="btn btn-outline-success nav-item nav-link" v-if="isLogged">Profile</router-link>
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
        <p><a href="#" class="btn btn-primary btn-large">Learn more »</a></p>
      </div>
    </div>
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


<style>
.bgimage {
width:100%;
height:500px;
background: url('http://getwallpapers.com/wallpaper/full/9/7/7/1009479-popular-cool-background-for-computer-1920x1080-for-windows.jpg ');
background-repeat: no-repeat;
background-position: center;
background-size:cover;
/* background-attachment: fixed; */
}
.bgimage h5 {
color:white;
text-shadow:2px 2px #333;
}
.nav-link{
  margin : 5px;
}

.hero-text{
  margin: 50px auto;

}
.hero-text p{
  color: #fff;
}

.hero-text p:nth-child(1){
  font-size: 3.0rem;
}
</style>
