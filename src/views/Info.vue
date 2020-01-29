<template lang="html">


  <div class="container profile">

    <div class="profile-div col-lg-6 col-md-8 col-sm-12">
      <div class="img-div">
        <img :src="'/uploads/'+ datas.photo" alt="Something is here" class="rounded-circle">
        <div class="overlay" v-if="uploading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </div>

      </div>

      <div class="upload-div">
        <button  class="btn btn-text upload-btn">
          Change Profile

        </button>
        <input type="file" name="photo" id="picture" @change="upload" :disabled="uploading">

      </div>

      <div class="col-12 details">
        <p>{{ datas.email }}</p>
      </div>

      <div class="col-12 details">
      <p>  {{ datas.phone }}</p>
      </div>

      <div class="col-12 details">
        <p v-if="datas.address">{{ datas.address }}</p>
        <p v-else>{{"No Address Found"}}</p>
      </div>

    </div>

  </div>

</template>

<script>
import api from '../api';

export default {

  data(){
    return{
      datas: {},
      base64 : "",
      uploading: false
    }
  },
  mounted(){
    let user  = JSON.parse(localStorage.getItem('user'));

    if(!!user){
      this.datas = user

    }

  },
  methods:{
    upload(){

      let _this = this;

      _this.uploading = true;

      let user = JSON.parse(localStorage.getItem("user"));



      var file = document
        .querySelector('#picture')
        .files[0];
      var reader = new FileReader();
      reader.onload = async (e)=> {
        // _this.photo = e.target.result;

        await _this.generateBase64(e.target.result)

        api
        .updateProfile({
          photo : this.base64,
          token : this.datas.token
        },this.datas.token,'photo')
        .then((data)=>{

          // console.log(data);

          if(data.status === 1){

            _this.datas.photo = data.data

            user.photo = data.data;

            localStorage.setItem('user',JSON.stringify(user));



          }else{
            console.log(data);
          }

          document
            .querySelector('#picture').value = ""

          _this.uploading = false;
        })
        .catch((e)=>{
          console.log(e);
        })

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

  }
}
</script>

<style lang="css" scoped>


.profile{

}

.overlay{

  width : 150px;
  height: 150px;
  border-radius: 50%;
  background: #ccc;
  opacity: 0.5;
  z-index: 2;
  transform: translateY(-160px);
  margin: 10px auto;

}

.overlay span{
  margin: 65px auto;
}

.profile-div{
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 50px auto;
}

.img-div{
  width : 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px auto;
  /* text-align: center; */
  border: 1px solid #ccc;
}

.img-div img{
  /* width: 100%; */
  width : 150px;
  height: 150px;
  border-radius: 100%;
  padding: 5px;
  margin-left: -1px;
  margin-top: -1px;
}

.upload-div {
  position: relative;
  overflow: hidden;
  display: inline-block;
  transform: translateY(-20px);
}

.upload-btn {
  /* border: 2px solid gray; */
  color: gray;
  /* background-color: white;
  padding: 8px 20px;
  border-radius: 8px; */
  font-size: 10px;
  font-weight: bold;
}

.upload-div input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
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

</style>
