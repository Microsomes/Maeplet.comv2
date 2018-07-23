<template>
<div>
     <div @click="newsItemClicked" class="side--content--news--item">
                 <div class="side--content--news--item--metric">
                    <div>
                        <img width="50px" height="100px" :src="icon"/>
                    </div>
                    <div class="hoursAgo">
                        <div>{{timeAgo}}</div>
                        <div class="addedBy">{{data.addedBy}}</div>
                    </div>
                    <div class="source">
                        <div>
                            <i class="material-icons">link</i>
                        </div>
                        <div><a target="_blank" :href="data.source">source</a></div>
                    </div>
                </div>
                <div class="side--content--news--item--content">
                     <div v-html="data.eventContent"></div>
                </div>
                <div class="side--content--news--item--comments">
                     <div class="commentsicon"><a>Comments</a></div>
                </div>
            </div>
</div>



</template>


<script>
import moment from 'moment';
export default{
    data:function(){
        return {

        }
    },props:["data"],
    computed:{
        timeAgo(){
            return moment(this.data.timestamp).fromNow()
        },
        icon(){
           if(this.data.iconType=="news"){
               return "https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2Fnews_1.png?alt=media&token=b177aafb-f62e-4bb3-b631-a038fd3e2fc6";
           }else{

               return "https://firebasestorage.googleapis.com/v0/b/social-station-69cfc.appspot.com/o/web%2FGG_1.png?alt=media&token=2ce6f774-4188-4a5a-bb49-f4d874b0f885";

           }
        }
    },methods:{
        newsItemClicked(e){
            console.log(e);
            var latitude= parseFloat(this.data.lat);
            var longitude= parseFloat(this.data.lng);
            var event= this.data;
            var centre={
                latitude:latitude,
                longitude:longitude,
                event
            }
            this.$emit("centreMap",centre);
        }
    }
}
</script>



<style scoped>
.addedBy{
    text-transform: capitalize;
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
        margin-top: 20px;
    border-bottom: 1px solid white;
 }
.side--content--news--item:hover{
    cursor:pointer;
}

.side--content--news--item:hover {
 }
</style>