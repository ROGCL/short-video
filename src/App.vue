<template>
  <div>
    <keep-alive :include="[include,'works']">
      <router-view  />
    </keep-alive>
    <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      include: []
    };
  },
  watch:{
    $route(to,from){
      if (from.name == 'home') {
        this.include = []
      }else if(to.name == 'detail'){
        this.include = ['works']
      }
    }
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  /* user-select:none; */
}

body {
  width: 100%;
  background: #000;
}

.ajc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ac {
  display: flex;
  align-items: center;
}
</style>