<template>
<div class="addContainer">
    
    <div class="mapArea">
        <div class="jumpTo">
            <div class="selection">
            <md-field >
          <label for="country">Country Filter</label>
          <md-select @md-selected="co" v-model="country" name="country" id="country" md-dense>
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

        </div>
         <GmapMap
  :center="center"
  :zoom="7"
  map-type-id="terrain"
  style="width: 100%; height: 100%"
    @click="geocoder">

    <GmapMarker
      :position="location"
    :clickable="true"
   />

>
 
</GmapMap> 
    </div>

<div class="addArea">
    <div class="header--add">
        <h2>Add Event</h2>
    </div>
    <div>
        <addForm ref="addForm"/>

    </div>
 </div>


</div>
</template>

<style scoped>
.header--add{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
 }
 .header--add h2{
         font-family: 'Roboto', sans-serif;
         color:grey;
         font-weight: bold;
 }
.addArea{
    display: grid;
    grid-template-rows: 100px auto;
}
 
.content_text{
    height: 150px;
}
.content_text textarea{
    width: 100%;
    height: 100%;
    resize: none;
    border:none;
    outline: none;
    border-radius: 10px;
}
.jumpTo{
    display: flex;
    align-items: center;
    justify-content: center;
}
.selection{
    width: 50%;
}
.all{
    background:white;
    text-align: center;
}


.mapArea{
    display: grid;
    grid-template-rows: 100px auto;
}

.addContainer{
     height:100%;
    display: grid;
    grid-template-columns: auto 400px;
}
.addPanel{
 }
</style>

<script>

import addForm from './../pages/addForm';

export default{
    data:function(){
        return{
            location:"",
            coords:[
                {
                    country:"United Kingdom",
                    lat:55.3781,
                    lng:-3.4360
                },
                {
                    country:"Syria",
                    lat:34.8021,
                    lng:38.9968
                },
                {
                    country:"Ukraine",
                    lat:48.3794,
                    lng:31.1656
                },
                {
                    country:"Mideast",
                    lat:29.2985,
                    lng:42.5510
                },
                {
                    country:"Europe",
                    lat:54.5260,
                    lng:15.2551
                },
                {
                    country:"America",
                    lat:37.0902,
                    lng:-95.7129
                },
                {
                    country:"Asia",
                    lat:34.0479,
                    lng:100.6197
                },
                {
                    country:"World",
                    lat:"World",
                    lng:"World"
                },
                {
                    country:"Africa",
                    lat:-8.7832,
                    lng:34.5085
                },
                {
                    country:"USA",
                    lat:"USA",
                    lng:"USA"
                }
            ],
            country:'',
            center:{lat:55.3781, lng:-3.4360}
        }
    },methods:{
        geocoder(e){
             var coord = e.latLng;
             var lat= coord.lat();
             var lng= coord.lng();
             this.$refs.addForm.setLatLng(lat+","+lng);
            this.location={lat:lat,lng:lng};

        },
        co(evt){
            var countrySelected= evt;
            var res= this.coords.filter(e=>{
                if(e.country==evt){
                    return e;
                }
            })
            if(res.length>=1){
               
               this.center={
                   lat:res[0].lat,
                    lng:res[0].lng
               };
            }
        }
    },components:{
        addForm
    }
}
</script>

