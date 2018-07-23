<template>
<div class="formC">

  
<div class="textContent">
    <textarea v-model="description" placeholder="description the event"></textarea>
</div>
<div style="text-align:center;margin-top:10px;">Markdown supported</div>
<div class="source">
    <textarea v-model="source" placeholder="source to validate event"></textarea>
</div>

<div class="countrySelection">
      <md-field >
          <label for="country">Country</label>
          <md-select  v-model="country" name="country" id="country" md-dense>
            <md-option class="all" value="United Kingdom">United Kingdom</md-option>
            <md-option class="all" value="Syria">Syria</md-option>
            <md-option class="all"  value="Ukraine">Ukraine</md-option>
            <md-option class="all" value="Mideast">Mideast</md-option>
            <md-option class="all" value="Europe">Europe</md-option>
            <md-option class="all" value="America">America</md-option>
            <md-option class="all" value="Asia">Asia</md-option>
             <md-option class="all" value="Africa">Africa</md-option>
           </md-select>
        </md-field>
</div>


<div class="countrySelection">
      <md-field >
          <label for="country">Pick a Tag</label>
          <md-select  v-model="tag" name="country" id="country" md-dense>
            <md-option v-for="n in tagList" :key="n.title" class="all" :value="n.value">{{n.tag}}</md-option>
           
           </md-select>
        </md-field>
</div>

<div class="source">
    <label>Click on the map where you want the pointer to be</label>
    <textarea v-model="latLng" placeholder="lat and lng" disabled></textarea>
</div>

<div class="postImage">
    Upload a Thumbnail:
   <input type="file"/>
</div>

<div class="addButton">
         <md-button @click="addPost" style="background:#FF5252;color:white;" class="md-accent">Add</md-button>
         <md-button @click="clearFields" style="background:#FF5252;color:white;" class="md-accent">Clear</md-button>
</div>
 

<em v-if="feedback">{{feedback}}</em>

</div>
</template>

<script>
const axios= require("axios");

var markdown = require( "markdown" ).markdown;


export default{
    data:function(){
        return {
            feedback:null,
            showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
            tagList:[
                {
                    tag:"News",
                    value:"news",
                },
                {
                    tag:"Gossip",
                    value:"gossip"
                }
            ],
            tag:"",
            country:"",
            latLng:"",
            description:"",
            source:""

        }
    },methods:{
        setLatLng(data){
            this.latLng=data;
        },
        clearFields(){
            //method clears all fields
            this.source="";
            this.description="";
            this.source="";
            this.country="";
            this.tag="";
            this.latLng="";
        },
        addPost(){
         
            var home=this;
            //check if we have a jwt token
            var token= localStorage.getItem("token3");
            console.log(token);
            if(token!=null){
                var instance = axios.create({
                baseURL: 'http://192.168.42.161:5000/maeplet/',
                 headers: {'Authorization': 'Bearer '+token}
                });
                let latlng=home.latLng.split(",");
                if(latlng.length>=2){

                }else{
                    this.feedback="lat and lng not set. Click on the map to fill";
                    return;
                }
                let llat=latlng[0];
                let llng=latlng[1];

                var textDescriptionMarkdown= markdown.toHTML( this.description );

                instance.post("/addEvent",{
                    
                        "eventText":textDescriptionMarkdown,
                        "lat":llat,
                        "lng":llng,
                        "iconType":this.tag,
                        "source":this.source,
                        "country":this.country,
                        "tag":this.tag

                }).then(function (res){
                    console.log(res);
                    home.feedback="Added";
                }).catch(function err(){
                    home.feedback="token invalid please sign in again";
                     setTimeout(()=>{
                         home.$router.replace("/login")
                     },1000)
                })


            }else{
                this.$router.push("/login");
            }
        }
    },created(){
         var token= localStorage.getItem("token3");
            if(token!=null){

                

                

            }else{
                alert("please login first");
                this.$router.push("/login");
            }
    }
}
</script>

<style scoped>
.postImage{
    background:#EBEBE4;
    border-radius: 20px;
     margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
}
.addButton{
     
     margin-top: 5px;
     text-align: center;
     justify-content: center;
     display: flex;
}
.all{
    background:white;
}
.countrySelection{
       height: 40px;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 20px;
}
.source{
     height: 40px;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 20px;
}
.source textarea{
      width: 100%;
    height: 100%;
    border-radius: 5px;
    border:none;
    outline:none;
    padding: 10px;
}
.textContent textarea{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border:none;
    outline:none;
    padding: 10px;
 }
.textContent{
    height: 100px;
    margin-left: 40px;
    margin-right: 40px;

}
.formC{
     height: 100%;
    padding: 20px;
 }



</style>