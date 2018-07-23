<template>
  <div id="app">
     <div class="side">

       <router-link style="text-decoration: none;" to="/">
      <div v-bind:class="{selected:isHome}" class="nav-side-item">
        <div class="nav-side-item-icon">
          <i class="material-icons">home</i>
        </div>
        <div class="nav-side-item-text">
          Home
        </div>
      </div>
      </router-link>
      
       <router-link style="text-decoration: none;" to="/map">
       <div v-bind:class="{selected:isMap}" class="nav-side-item">
        <div class="nav-side-item-icon">
          <i class="material-icons">map</i>
        </div>
        <div class="nav-side-item-text">
          Map
        </div>
      </div>
       </router-link>
      
      <!-- <router-link style="text-decoration: none;" to="/events">
       <div v-bind:class="{selected:isEvents}" class="nav-side-item">
        <div class="nav-side-item-icon">
          <i class="material-icons">event_available</i>
        </div>
        <div class="nav-side-item-text">
          Events
        </div>
      </div>
      </router-link> -->
      
      <router-link style="text-decoration: none;" to="/add">
       <div v-bind:class="{selected:isAdd}" class="nav-side-item">
        <div class="nav-side-item-icon">
          <i class="material-icons">add</i>
        </div>
        <div class="nav-side-item-text">
          Add
        </div>
      </div>
      </router-link>

       <router-link style="text-decoration: none;" to="/support">
       <div v-bind:class="{selected:isSupport}" class="nav-side-item">
        <div class="nav-side-item-icon">
          <i class="material-icons">contact_support</i>
        </div>
        <div class="nav-side-item-text">
          Contact
        </div>
      </div>
       </router-link>
    </div>
    <div class="mainContent">
      <router-view/> 
    </div>
  </div>
</template>

<script>
export default{
  data:function(){
    return {

    }
  },created(){
    console.log("loaded");
    console.log(this.$route.path);
  },computed:{
    isHome(){
      return this.$route.path=="/"
    },
    isMap(){
      return this.$route.path=="/map"
    },
    isEvents(){
      return this.$route.path=="/events"
    },
    isAdd(){
      return this.$route.path=="/add"
    },
    isSupport(){
      return this.$route.path=="/support"
    }
  }
}
</script>

<style>

*{
  transition: all 1s;
}

.selected{
  background:white;
  color:black;
}
.selected i{
  color:black;
}
.selected >div{
  color:black;
}

.nav-side-item-text{
   color:white;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-side-item-icon i{
  font-size: 40px;
}
.nav-side-item-icon{
   color:white;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.nav-side-item{
  display: flex;
  flex-flow: column;
}



.side{
  height: 100%;
  background: #FF5252;
}
#app {
  display: grid;
  grid-template-columns:80px auto;
  height: 100%;
   margin: 0px;
   padding: 0px;
}
</style>
