
<template>
<div class="loginContainer">
    <h2>Login or signup</h2>
    <p>Please Login or Signup to contribute</p>
    <input type="text" v-model="username" placeholder="username"/>
    <input type="text" v-model="password" placeholder="password"/>
    <input @click="login" type="button" placeholder="password" value="Login">
    <input @click="signup" type="button" placeholder="password" value="Signup">
    <br>
    <em v-if="feedback">{{feedback}}</em>
    
</div>
</template>

<script>
const axios= require("axios");
 export default{
    data:function(){
        return {
            username:null,
            password:null,
            feedback:null
        }
    },methods:{
        login(){
            var home=this;
            this.feedback="validating details";
            if(this.username && this.password){
                axios.post('http://192.168.42.161:5000/maeplet/login', {
                username:this.username,
                password:this.password
            })
            .then(function (response) {
                var token= response.data.token;
                console.log(token);
                home.feedback="Success";
                var token= localStorage.setItem("token3",token);
                 //set login token
                 console.log(response);
               // home.$router.replace("/add");
            })
            .catch(function (error) {
                console.log(error);
                home.feedback="Login details incorrect";
            });

            }else{
                this.feedback="please enter all fields";
            }
        },
        signup(){
            var home=this;
            this.feedback="validating details";
            if(this.username && this.password){

                axios.post('http://192.168.42.161:5000/maeplet/signup', {
                username:this.username,
                password:this.password
            })
            .then(function (response) {
                if(response.data.msg=="added"){
                    home.feedback="Signed up please sign in to continue";
                }
            })
            .catch(function (error) {
                console.log(error);
                home.feedback="Username may be taken";
            });

            }else{
                this.feedback="please enter all fields";
            }
        }
    }
}
</script>

<style scoped>
.loginContainer{
    padding: 20px;
    font-family: 'Roboto', sans-serif;

}
</style>