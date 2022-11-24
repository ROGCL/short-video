<template>
  <div>
    <!-- 制作页面 -->
    <!-- 头部 -->
    <div class="header">
      <!-- 返回按钮 -->
      <router-link to="/index">
      <div class="return"></div>
    </router-link>
    </div>
    <!-- 地球背景 -->
    <div class="earth"></div>
    <!-- 文字部分 -->
      <h5>AI绘制中…</h5>
      <h6>前方排队13657人，预计需15分钟</h6>
      <button class="btn1 btn-pub">结束进程</button>
      <button class="btn2 btn-pub">后台制作</button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header{
  position: relative;
  width: 100%;
  height: 3.8667rem;
  background-image: url('@/assets/img/making-img/1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.return{
  position: absolute;
  left: .4267rem;
  top: 1.36rem;
 width: .8rem;
 height: .8rem;
 background-image: url('@/assets/img/making-img/2.png');
 background-repeat: no-repeat;
 background-size: contain;
}
.earth{
  width: 1.92rem;
  height: 1.92rem;
  margin-top: 2.1333rem;
  margin-left: 4.0267rem;
  background: orange;
}
h5{
  font-size: .48rem;
  color: #fff;
  margin-top: .8rem;
  margin-left: 3.8133rem;
}
h6{
  margin-top: .16rem;
  margin-left: 2.2933rem;
  font-weight: normal;
  font-size: .3733rem;
  color: #7D808D;
}
.btn-pub{
  width: 2.9867rem;
  height: 1.0667rem;
  border: none;
  border-radius: .2133rem;
  background: #31373E;
  font-size: .4267rem;
  font-weight: 600;
  color: #fff;
  margin-top: .8rem;
}
.btn1{
  margin-left: 1.76rem;
  margin-right: .5333rem;
}
.btn2{
  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
}
</style>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
body{
  width: 100%;
  height: 100vh;
  background: #000;
}
</style>