<template>
  <div class="wrapper-box">
    <div class="nav-title ajc">
      作品
    </div>
    <div class="wrapper">
      <!-- 正在进行中 -->
      <div class="current ac" v-if="taskConduct > 0">
        <div class="ac">
          <img src="@/assets/img/1.png" class="loading-png" alt="">
          <span>绘画正在进行中，请下拉刷新查看</span>
        </div>
        <img src="@/assets/img/4.png" class="png4" alt="" @click="show = true">
      </div>

      <!-- 错误处理 -->
      <div class="error current ac" v-else-if="taskConduct == -1">
        <div class="ac">
          <img src="@/assets/img/3.png" class="err-png" alt="">
          <div @click="back"> 处理失败，点击<span class="resubmit">重新提交</span></div>
        </div>
      </div>

      <!-- 瀑布流 -->
      <template v-if="list.length > 0">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadmore"
            :immediate-check="false">
            <div class="content">
              <div class="img-container" @click="go(item)" v-for="(item, index) in list" :key="index">
                <img class="img-style" :src="item.imageUrl ? item.imageUrl : imgerr" alt="1" />
                <div class="save ajc" v-if="item.imageUrl" @click.stop="save(item.imageUrl)">
                  保存
                </div>
                <img src="@/assets/img/new.png" class="newimg" alt="" v-show="index == 0">
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </template>

      <template v-else>
        <div class="no-data ">
          <img src="@/assets/img/2.png" class="no-data-img" alt="">
          <div class="text">
            还没有作品哦
          </div>
          <div class="btn" @click="back">
            去制作
          </div>
        </div>
      </template>
    </div>

    <!-- 取消弹窗 -->
    <van-popup v-model="show" round :close-on-click-overlay="false">
      <div class="popup">
        <div class="pop-title">
          是否取消绘制？
        </div>
        <div class="ajc">
          <div class="pop-btn ajc" @click="show = false">
            继续等待
          </div>
          <div class="pop-btn pop-btn2 ajc" @click="cancel">
            取消绘制
          </div>
        </div>
      </div>
    </van-popup>


  </div>
</template>

<script>
import { sendMessage, device } from '@/util/initChat'
import { mapState } from "vuex";
export default {
  name:"works",
  data() {
    return {
      show: false,
      imgerr: require("@/assets/img/img-err.png"),
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      pageSize: 50,
      list: [],
      taskConduct: 0,
    }
  },
  mounted() {
    this.getList()
    console.log('%cindex.vue line:95 1', 'color: #007acc;', 1);
  },
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    back() {
      // const backLength = window.history.length - 1
      window.history.back()
    },
    save(url) {
      sendMessage('savePicture', url)
    },
    loadmore() {
      this.page += 1
      this.getList()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.page = 1
      // this.list = []
      this.taskConduct = 0
      // 重新加载数据
      this.getList();
    },
    async getList() {
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      const [err, res] = await this.$http.post('api/v6.Aipainting/showTask', {
        uuid: this.userinfo.uuid,
        platform: device.system,
        page: this.page,
        pageSize: this.pageSize
      })
      this.loading = false
      this.refreshing = false;
      if (err) return
      this.taskConduct = res.taskConduct
      if (this.page == 1) {
        this.list = res.list
      } else {
        this.list = this.list.concat(res.list)
      }
      // 没有数据了
      if (res.list.length == 0) {
        this.finished = true
      }
    },
    go(item) {
      if (item.imageUrl) {
        this.$route.meta.keepAlive = true
        this.$router.push(`/works/detail?id=${item.id}`)
      }
    },
    async cancel() {
      this.show = false
      const [err, res] = await this.$http.post('api/v6.Aipainting/cancel', {
        uuid: this.userinfo.uuid,
        platform: device.system,

      })
      if (err) return
      this.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: .2667rem .4267rem;
  box-sizing: border-box;
}

.current {
  width: 9.12rem;
  height: 1.28rem;
  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
  border-radius: .32rem;
  color: #FFF;
  font-size: .4267rem;
  margin-bottom: .2667rem;
  padding: 0 .2933rem;
  box-sizing: border-box;
  justify-content: space-between;

}

.png4 {
  width: .8rem;
  height: .8rem;
}

.error {
  background: #FF5353;
  font-weight: 600;
}

.resubmit {
  text-decoration: underline;
}

.err-png {
  width: 1.0667rem;
  height: 1.0667rem;
}

.nav-title {
  /* background-image: url("@/assets/img/index-img/5-1.png"); */
  background-color: #000;
  position: sticky;
  top: 0;
  color: #FFF;
  z-index: 9999;
  margin-bottom: .2667rem;
  height: 1.1733rem;
  font-size: .5333rem;
  font-weight: 600;
}



.loading-png {
  width: 1.0667rem;
  height: 1.0667rem;
  animation: round 2s linear infinite;
}

@keyframes round {
  100% {
    transform: rotate(360deg);
  }
}

.content {
  column-count: 2;
  column-gap: .2667rem;
  position: relative;
}

.img-container {
  position: relative;
  break-inside: avoid;
  width: 4.3933rem;
  position: relative;
}


.img-container:nth-child(2n+1) {
  /* padding-left: .1333rem; */
  padding-right: .0667rem;
}

.img-container:nth-child(2n) {
  /* padding-left: .0667rem; */
  padding-right: .1333rem;
  /* margin-left: -12px; */
}

.img-container .img-style {
  width: 100%;
  border: 1px solid #000;
  border-radius: .32rem;
  object-fit: contain;
}

/* .img-container:nth-child(2n+1) {
  order: 1;
}

.img-container:nth-child(2n) {
  order: 2;
} */

.save {
  width: 1.1733rem;
  height: .6667rem;
  background: #000000;
  border-radius: .4rem;
  color: #FFFFFF;
  font-size: .32rem;
  position: absolute;
  bottom: .4667rem;
  right: .2667rem;
}

.newimg {
  width: 1.0667rem;
  height: .5333rem;
  position: absolute;
  top: 0;
  left: 0;
}

.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  /* width: 30px;
  height: 30px; */
  /* background: red; */
  text-align: center;
  transform: translate(-50%, -50%);
}

.no-data-img {
  width: 96rpx;
  height: 96rpx;
  margin-bottom: .16rem;
}

.text {
  color: #656F7C;
  font-size: .32rem;
  margin-bottom: .5333rem;
}

.btn {
  width: 2.9867rem;
  height: 1.0667rem;
  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
  border-radius: .2133rem;
  margin: 0 auto;
  color: #FFFFFF;
  font-size: .4267rem;
  text-align: center;
  line-height: 1.0667rem;
}

.popup {
  width: 6.6933rem;
  height: 3.7867rem;
  border-radius: .2133rem;
  background-image: url(@/assets/img/5.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.pop-title {
  font-size: .4267rem;
  color: #000000;
  font-weight: 600;
  padding-top: .7467rem;
  text-align: center;
  margin-bottom: .8533rem;
}

.pop-btn {
  width: 2.6933rem;
  height: 1.0667rem;
  background: rgba(49, 55, 62, 0.1);
  border-radius: .2133rem;
  color: #000;
  font-weight: bold;
  font-size: .4267rem;
}

.pop-btn2 {
  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
  color: #FFF;
  margin-left: .3467rem;
}
</style>