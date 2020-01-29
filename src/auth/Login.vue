
<template>

  <div class="" id="login">
    <div class="container">

      <div class="col-lg-5 col-md-8 col-sm-12 form-div">

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

        <form @submit.prevent="login">
            <br>
            <h3>Login</h3>
            <br>
            <div class="form-group">
              <label class="label" for="email">Email</label>
              <input type="text" v-model="email" class="form-control" id="email" placeholder="Enter your email" value="demo@themepixels.me">
            </div><!-- form-group -->

            <div class="form-group">
              <label class="label" for="password">Password</label>
              <input type="password" v-model="password" id="password" class="form-control" placeholder="Enter your password" value="thisisademo">
            </div><!-- form-group -->

            <button class="btn btn-primary btn-block" :disabled="!email || !password" v-if="!isAuthencating">Sign In</button>
            <button class="btn btn-primary btn-block" :disabled="email || password" v-else>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Authenticating
              </button>
          </form>

      </div>


    </div>
  </div>
</template>



<script>

import api from '../api';
import {EventBus} from '../eventbus';

export default {
  data(){
    return{
      email : "",
      password : "",
      isAuthencating : false,
      error : "",
      success : ""
    };
  },
  methods:{
    clearSuccess() {
      this.success = "";
    },
    clearError() {
      this.error = "";
    },
    login(){
      this.isAuthencating = true;

            api.authenticate({
                email:this.email,
                password:this.password
            },'login').then((data)=>{

              // console.log(data);

                if(data.status == 2 || data.status == 0){
                  this.error = data.message
                  this.isAuthencating = false;
                 // outputMessage(data.status,data.message);
               }else{
                 this.success = data.message

                EventBus.$emit('login',data.data)
               }


            }).catch(err=>{
             //  console.log(err);

                // this.error = 'There was an issue logging in';
                 this.isAuthencating = false;
                 // this.unavailable = false;
            })
    }
  }
}

</script>


<style scoped>

.form-div{
  margin: 50px auto;
  height: 300px;
  box-shadow: 0 0 2px 2px rgba(28, 39, 60, 0.03);
  text-align: left;
}

.form-div .label{
  /* text-align: right; */

  font-size: 15px;

}

.label{
}

</style>
