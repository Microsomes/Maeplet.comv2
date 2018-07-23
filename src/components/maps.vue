<template>
<div style="height:100%;" class="mainMapsCon">
    <modal         height="auto"        :scrollable="true"  name="hello-world">
     <div class="modal--display--metric">
        <div class="modal--display--metric--icon">
            <img width="50px" height="100px" :src="icon"/>
        </div>
        <div class="modal--display--metric--hoursago">{{modalTime}}</div>
    </div>
    <div class="modal--display--metric--description">
        <div v-html="modalContent.eventContent"></div>
    </div>
    <div class="modal--display--metric--comments">
       <div class="comments">
    <vue-disqus shortname="maeplet-com" :identifier="'mic'+modalContent.id" url="https://maeplet.com"></vue-disqus>
  </div>
    </div>
 
    
        
    </modal>

    
<div class="mapsCont">

 
    <div class="mapContainer">
 <GmapMap
  :center="center"
   :zoom="8"
  map-type-id="terrain"
  style="width: 100%; height: 100%"
      

>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
       v-scroll-to="'#nw_'+m.id"
    :clickable="true"
    :draggable="true"
   :icon="m.icon"
    
    @click="marketClicked(m)"
  />
</GmapMap> 
    </div>

    <div class="sidebar">
        <div class="country-selection">
           <countrySelection @loadCountryEvents="loadEvents"/>
        </div>
        <div class="sideContent">
            
            <component v-bind:is="tabState.currentComp"></component>

            <newsItem1 v-if="tabState.isMain" :id="'nw_'+n.id"  @centreMap="centreMap" :data="n" v-for="n in events" :key="n.id"/>
            
         </div>
        <div class="sideNav">
            <div @click="changeTag('newsfeed')" v-bind:class="{selected:isFeed}" class="side-nav-item">
                <div class="side-nav-item-icon">
                    <i class="material-icons">chrome_reader_mode</i>
                </div>
                <div class="side-nav-item-text">News Feed</div>   
            </div>
            <div @click="changeTag('keys')" v-bind:class="{selected:isKey}" class="side-nav-item">
                <div class="side-nav-item-icon">
                    <i class="material-icons">vpn_key</i>
                </div>
                <div class="side-nav-item-text">Key</div>   
            </div>
             <div @click="changeTag('about')" v-bind:class="{selected:isAbout}" class="side-nav-item">
                <div class="side-nav-item-icon">
                    <i class="material-icons">info</i>
                </div>
                <div class="side-nav-item-text">About</div>   
            </div>
        </div>
    </div>


</div>


</div>
</template>

<script>

import countrySelection from './../components/comps/countrySelection';

import axios from 'axios';
import moment from 'moment';

import newsItem1 from './../components/comps/newsitem';

import about from './comps/about';
import keys from './comps/keys';



export default{
    data:function(){
        return{
            tabState:{
                isMain:true,
                currentComp:""
            },
            modalContent:{
                
            },
            showDialog:false,
            events:[
            
            ],
            center:{lat:55.3781, lng:-3.4360},
            markers:[
                 
            ],
            current:'newsfeed'
        }
    },
    mounted(){
        
    },methods:{
        centreMap(data){
            this.center={lat:data.latitude,lng:data.longitude};
            this.$modal.show('hello-world');
            this.modalContent= data.event;

        },
        marketClicked(evt){
            //opens modal when market is clicked
            //alert(evt);
            console.log(evt);
                this.$modal.show('hello-world');
                this.modalContent=evt.data["data"];

        },
        addMarker(data){
            const marker= {
                lat:data.lat,
                lng:data.lng
            }
            var icon= "https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2Fnews_1.png?alt=media&token=b177aafb-f62e-4bb3-b631-a038fd3e2fc6";

           if(data.data.iconType=="news"){
               icon= "https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2Fnews_1.png?alt=media&token=b177aafb-f62e-4bb3-b631-a038fd3e2fc6";
           }else if(data.data.iconType=="gossip"){

               icon="https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2FGG_1.png?alt=media&token=2ce6f774-4188-4a5a-bb49-f4d874b0f885";

           }

            this.markers.push({
                position:marker,
                id:data.id,
                icon: icon,
                data:data
            })
        },
        loadEvents(country){
             var coords=[
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
            ]

             var countrySelected= country;
            var res= coords.filter(e=>{
                if(e.country==countrySelected){
                    return e;
                }
            })
            if(res.length>=1){
               
               this.center={
                   lat:res[0].lat,
                    lng:res[0].lng
               };
            }
            var home=this;
            home.events=[];
            axios.get("http://localhost:5000/maeplet/events/"+country).then(function (response){
                home.events=response.data.events;

                home.events.forEach(e=>{
                    var latitude= parseFloat(e.lat);
                    var longitude= parseFloat(e.lng);
                    console.log(e.lat);
                    home.addMarker({
                    lat:latitude,
                    lng:longitude,
                    id:e.id,
                    data:e
                });
                })

            })
        },
        changeTag(tag){
            switch(tag){
                case "newsfeed":
                this.tabState.isMain=true;
                this.tabState.currentComp="";
                break;
                case "keys":
                this.tabState.isMain=false;
                this.tabState.currentComp="keys";
                break;
                case "about":
                this.tabState.isMain=false;
                this.tabState.currentComp="about";
                break;
            }
            this.current=tag;
        },
        openNews(e){
             var coord = e.latLng;
             var lat= coord.lat();
             var lng= coord.lng();
             this.markers.push({
                 position:{
                        lat:lat, lng:lng
                }
             })
  
         }
    }
    ,computed:{
        modalTime(){
            return moment(this.modalContent.timestamp).fromNow()
        },
        isFeed(){
            return this.current=="newsfeed"
        },
        isKey(){
            return this.current=="keys" 
        },
        isAbout(){
            return this.current=="about"  
        },
        icon(){
            var iconType= this.modalContent.iconType;
             if(iconType=="news"){
               return "https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2Fnews_1.png?alt=media&token=b177aafb-f62e-4bb3-b631-a038fd3e2fc6";
           }else{

               return "https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2FGG_1.png?alt=media&token=2ce6f774-4188-4a5a-bb49-f4d874b0f885";

           }
        }

    },components:{
        countrySelection,
        newsItem1,
        about,
        keys
    }
}
</script>

<style scoped>

.modal--display--metric--comments{
    padding: 5px;
}
.modal--display--metric--description{
     min-height: 100px;
    padding: 10px;
     font-size: 20px;
  }
  .modal--display--metric--hoursago{
      color:grey;
      margin-left: 10px;
  }
 .modal--display--metric{
     display: flex;
     align-items: center;
     padding: 20px;
 }
 
 
.sideContent{
    overflow-y: scroll;
    height: 520px;
}
.side--content--news--item--comments{
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
     width: 100%;
         padding: 10px;

    left: 0px;
}
.side--content--news--item--content{
     margin-top: 5px;
}
.source{
     display: flex;
    justify-content: flex-end;
    padding-right: 40px;
}
.side--content--news--item--metric{
    display: grid;
    grid-template-columns: 50px 100px auto;
 }
.hoursAgo{
     color:grey;
    padding: 5px;
}
.side--content--news--item{
     min-height: 200px;
    padding: 10px;
        font-family: 'Roboto', sans-serif;
        position: relative;

}
.country-selection{
    display: flex;
    align-items: center;
    justify-content:center;
    background:white;
 }

.selected{
    background: #FF5252;
 }
.selected i{
    color:white;
}
.selected .side-nav-item-icon i{
    color:white;
}
.selected .side-nav-item-text{
    color:white;
}


.side-nav-item-icon i{
    font-size: 40px;
    color:#FF5252;
}
.side-nav-item-icon{
     height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.side-nav-item-text{
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color:black;

}
.side-nav-item:hover{
    cursor: pointer;
}
.side-nav-item{
     width: 100px;
    height: 100%;
 }
.sideNav{
    background:white;
    background: linear-gradient(white,#E5E5E5);
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3% ;
}
.sidebar{
    background:#F8F6EF;
    display: grid;
    grid-template-rows: 70px  auto 70px;
}
.mapsCont{
     height: 100%;
    display: grid;
    grid-template-columns:auto 350px;
}
</style>