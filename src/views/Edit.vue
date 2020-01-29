<template lang="html">

  <div class="container">

    <div class="edit-div col-lg-5 col-md-8 col-sm-12 ">


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

      <form action @submit.prevent="edit">
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
              <!-- form-group -->
              <button class="btn btn-primary btn-block" :disabled="!email  || !colors || !pet || !movie || !phone || !address || !dob" v-if="!updating">Update</button>
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

  </div>


</template>

<script>

 import api from '../api';

 let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default {

  data(){
    return {
      updating : false,
      dob: "",
      email: "",
      phone: "",
      password : "",
      address : "",
      colors : "",
      movie : "",
      pet : "",
      error: "",
      success : "",
      datas : {}
    }
  },
  mounted(){
    let user  = JSON.parse(localStorage.getItem('user'));

    if(!!user){
      this.datas = user

      this.email = user.email;
      this.dob = user.dob;
      this.colors = user.secret.color;
      this.address = user.address || "No Address";
      this.movie = user.secret.movie || "";
      this.phone = user.phone|| "";
      this.pet = user.secret.pet || 'No pet';

    }

  },
  methods:{
    edit(){
      this.updating = true;

      if (
        this.email != "" &&
        this.colors != "" &&
        this.address != "" &&
        this.movie != "" &&
        this.phone != "" &&
        this.pet != '' &&
        this.dob != ''
      ) {
        if (re.test(this.email)) {

          let user  = JSON.parse(localStorage.getItem('user'));

          api
            .editUser({
              email: this.email,
              address: this.address,
              dob : this.dob,
              phone : this.phone,
              secret : {
                movie : this.movie,
              pet : this.pet,
              color : this.colors
            },
            token : user.token
          },'edit')
            .then(data => {
            //
            if(data.status == 2 || data.status == 0){
                this.error = data.message
            }else{
              this.success = data.message

              let value = user;

              let newinfo = Object.assign(value,data.data);

              localStorage.setItem('user',JSON.stringify(newinfo))


                // EventBus.$emit("login", data);
            }
              // outputMessage(data.status,data.message);

              this.updating = false;

            })
            .catch(err => {
              this.error = "There was an issue logging in";
              this.updating = false
            });

        } else {
          this.error = "Invalid Email Address";
          this.updating = false;
        }
      } else {
        this.error = "Please fill in all fields and submit again";
        this.updating = false;
      }

    },
    clearSuccess() {
      this.success = "";
    },
    clearError() {
      this.error = "";
    },
  }
}
</script>

<style lang="css" scoped>

.edit-div{
  margin: 50px auto;
  /* height: 300px; */
  box-shadow: 0 0 2px 2px rgba(28, 39, 60, 0.03);
  padding: 20px;
  text-align: left;
}
</style>
