import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

// console.log(apiUrl);
// console.log(process.env.NODE_ENV);


function buildurl( path ) {
    return `${ apiUrl }${ path } `
}
export default {

  authenticate(credentials,path){

    let url = buildurl( path );

        return axios.post( url, credentials, {
            useCredentails: true
        }).then(res => res.data)

  },
  signupUser(credentials,path){

    let url = buildurl( path );


    // console.log(url);

        return axios.post( url, credentials, {
            useCredentails: true
        }).then(res => res.data)
  },
  updateProfile(credentials,token,path){

    let url = buildurl( path );


    // console.log(url);

        return axios.post( url, credentials,{
            useCredentails: true
        }).then(res => res.data)
  },
  editUser(credentials,path){

    let url = buildurl( path );


    // console.log(url);

        return axios.post( url, credentials,{
            useCredentails: true
        }).then(res => res.data)
  }
}
