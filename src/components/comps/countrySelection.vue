<template>
    <div class="countrySelectionContainer">
         <md-field >
          <label for="country">Country Filter</label>
          <md-select @md-selected="countrySelected"  v-model="country" name="country" id="country" md-dense>
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
</template>

<script>
export default{
  data:function(){
    return {
      country:""
    }
  },methods:{
    countrySelected(e){
      this.$emit("loadCountryEvents",e);
    }
  }
}
</script>

<style scoped>
.all{
    background:white;
    font-family: 'Roboto', sans-serif;

}
.countrySelectionContainer{
     width: 100%;
     padding:10px;
     font-family: 'Roboto', sans-serif;

}
</style>