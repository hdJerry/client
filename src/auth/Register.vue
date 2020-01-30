
<template>

<div class="container" id="reg">
  <div class="col-lg-5 col-md-8 col-sm-12 form-div">

    <h2>Get Started</h2>
         <h4>It's free to signup and only takes a minute.</h4>
         <div v-if="error.length > 0" class="alert alert-danger mg-b-0" role="alert">
           <button
             type="button"
             class="close"
             @click.prevent="clearError"
             data-dismiss="alert"
             aria-label="Close"
           >
             <span aria-hidden="true">×</span>
           </button>
           <strong>Oh snap!</strong>
           {{error}}.
         </div>
         <div v-if="success.length > 0" class="alert alert-success mg-b-0" role="alert">
           <button
             type="button"
             class="close"
             @click.prevent="clearSuccess"
             data-dismiss="alert"
             aria-label="Close"
           >
             <span aria-hidden="true">×</span>
           </button>
           <strong>Well Done!</strong>
           {{success}}.
         </div>

  <form action @submit.prevent="signup">
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Enter your email"
            >
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" class="form-control" placeholder="+2347030995296" v-model="phone">
          </div>

          <div class="form-group">
            <label>DOB</label>
            <input type="date" name="dob" class="form-control" placeholder="Date of birth" v-model="dob">

          </div>

          <div class="form-group">
            <label>Address</label>
            <input type="text" name="address" class="form-control" placeholder="Home Address" v-model="address">

          </div>
          <div class="form-group">
            <label>Profile Pictures</label>

            <input type="file" name="photo" class="form-control" placeholder="profile picture" @change="previewPhoto" accept="image/*">

            <!-- <img :src="photo" class="image"> -->

          </div>

          <hr>
          <h4>Security Questions</h4>

          <div class="form-group">

          <label>Favourite Color</label>

          <input type="text" name="color" class="form-control" placeholder="Favourite Color" v-model="colors">

          </div>

          <div class="form-group">

          <label>Pet name</label>

          <input type="text" name="pet" class="form-control" placeholder="Pet name" v-model="pet">

          </div>

          <div class="form-group">

          <label>Best movie</label>

          <input type="text" name="movie" class="form-control" placeholder="Best Movie" v-model="movie">

          </div>

          <hr>

          <!-- form-group -->
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Enter your password"
            >
          </div>
          <!-- form-group -->
          <button class="btn btn-primary btn-block" :disabled="!email || !password || !base64 || !colors || !pet || !movie || !phone || !address || !dob" v-if="!registering">Create Account</button>
          <button class="btn btn-primary btn-block" disabled v-else>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
          <div class="row row-xs">
            <!-- <div class="col-sm-6"><button class="btn btn-block"><i class="fab fa-facebook-f"></i> Signup with Facebook</button></div>
            <div class="col-sm-6 mg-t-10 mg-sm-t-0"><button class="btn btn-primary btn-block"><i class="fab fa-twitter"></i> Signup with Twitter</button></div>-->
          </div>
          <!-- row -->
        </form>
      </div>
      <p style="margin-top : -30px;">
        Already have an account?
        <router-link to="/login">Sign In</router-link>
      </p>
</div>

</template>

<script>

let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import api from '../api';
import {EventBus} from '../eventbus';

export default {
  data(){
    return{
      registering : false,
      email: "",
      dob : "",
      phone: "",
      password : "",
      address : "",
      photo : "",
      colors : "",
      movie : "",
      pet : "",
      error: "",
      success : "",
      base64 : ""

    };
  },
  methods : {
    async previewPhoto(event){
      // let file = event.target.files;
      var _this = this;

      let photo = "";

      var file = document
        .querySelector('input[type=file]')
        .files[0];
      var reader = new FileReader();
      reader.onload = async (e)=> {
        // _this.photo = e.target.result;

        await _this.generateBase64(e.target.result)

      };
      reader.onerror = async function(error) {
        _this.error = error;
        // alert(error);
      };
      reader.readAsDataURL(file);
    },
    generateBase64(data) {
      let _this = this;

      this.base64 = data;

    },
    clearSuccess() {
      this.success = "";
    },
    clearError() {
      this.error = "";
    },
    signup() {
      // console.log("------------------------------------------Here");

      this.registering = true;

      if (
        this.email != "" &&
        this.password != "" &&
        this.base64 != "" &&
        this.colors != "" &&
        this.address != "" &&
        this.movie != "" &&
        this.phone != "" &&
        this.pet != '' &&
        this.dob != ''
      ) {
        if (re.test(this.email)) {
          // this.generateBase64();
          // console.log(this.photo);
          // console.log(this.base64);
          api
            .signupUser({
              email: this.email,
              dob: this.dob,
              password: this.password,
              address: this.address,
              photo: this.base64,
              phone : this.phone,
              secret : {
                movie : this.movie,
                pet : this.pet,
                color : this.colors
            },
            },'signup')
            .then(data => {
            //
            if(data.status == 2 || data.status == 0){
                this.error = data.message
            }else{
              this.success = data.message
              this.email = "" ;
              this.password = "";
              this.base64 = "";
              this.colors = "";
              this.address = "";
              this.movie = "";
              this.phone = "";
              this.pet = '';
              this.dob = '';


                // EventBus.$emit("login", data);
            }
              // outputMessage(data.status,data.message);
              this.registering = false;
            })
            .catch(err => {
              this.error = "There was an issue logging in";
              this.registering = false;
            });

        } else {
          this.error = "Invalid Email Address";
          this.registering = false;
        }
      } else {
        this.error = "Please fill in all fields and submit again";
        this.registering = false;
      }
    }
  }
}

</script>


<style scoped>
.form-div{
  margin: 50px auto;
  /* height: 300px; */
  box-shadow: 0 0 2px 2px rgba(28, 39, 60, 0.03);
  padding: 20px;
  text-align: left;
}

label{
}
</style>
