<template>
  <div>
    <div class="nav-title ajc">
      详情
    </div>

    <div class="wrapper">
      <img :src="data.imageUrl" class="img" alt="">
      <!-- //关键词 -->
      <div class="tags">
        {{ data.TextPrompt }}
      </div>

      <div class="desc-item">
        <span class="desc-title">
          引擎：
        </span>
        {{ data.Engine | engineFilter }}
      </div>

      <div class="desc-item" v-if="data.Style">
        <span class="desc-title">
          风格：
        </span>
        {{ data.Style }}
      </div>
      <div class="desc-item">
        <span class="desc-title">
          参考图：
        </span>
        {{ data.InitImagePath ? `有 （相关性${data.InitStrength}%）` : '无' }}
      </div>
      <div class="desc-item">
        <span class="desc-title">
          生成时间：
        </span>
        {{ data.GenerationDate }}
      </div>
      <div class="zw"></div>
      <div class="footer ajc">
        <div class="btn-item ajc" @click="go">
          重新绘制
        </div>
        <div class="btn-item btn-item2 ajc" @click="save">

          保存到相册
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { sendMessage, device } from '@/util/initChat'
import { mapState, mapMutations } from "vuex";
export default {
  name:'detail',
  data() {
    return {
      data: {},
    }
  },
  filters: {
    engineFilter(val) {
      let text = '通用'
      switch (val) {
        case 'stable_diffusion':
          text = '通用'
          break;
        case 'acgn_diffusion':
          text = '漫画'
          break;
        case 'disco_diffusion':
          text = '写意'
          break;
      }
      return text
    },
    InitImagePathFilters(val) {
      let text = '无'
      if (val) {
        text = `有`
      }
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  mounted() {
    window.onSaveComplete = this.onSaveComplete
    this.getData()
    //事件总线接收数据
    this.$bus.$on('init_image',(data)=>{
      console.log(data,'我接受到了图片的数据')
    })
  },
  // beforeDestroy(){
  //   this.$bus.$off('init_image')
  // },
  methods: {
    ...mapMutations(['setreDrawInfo']),
    go() {
      this.setreDrawInfo(this.data)
      const backLength = window.history.length - 1
      window.history.go(-backLength)

    },
    async getData() {
      let id = this.$route.query.id
      const [err, res] = await this.$http.post('api/v6.Aipainting/info', {
        uuid: this.userinfo.uuid,
        platform: device.system,
        id: id
      })
      if (err) return
      this.data = res.content
    },
    onSaveComplete(res) { },
    save() {
      sendMessage('savePicture', this.data.imageUrl)
    }
  }
}
</script>

<style scoped>
.nav-title {
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

.wrapper {
  padding: .2667rem .4267rem;
  box-sizing: border-box;
}

.img {
  width: 9.1467rem;
  /* height: 9.1467rem; */
  border-radius: .32rem;
  margin-bottom: .5333rem;
  object-fit: contain;
}

.tags {
  font-size: .4267rem;
  color: #FFFFFF;
  font-weight: 600;
  margin-bottom: .2667rem;
}

.desc-item {
  font-size: .3733rem;
  color: #FFFFFF;
  margin-bottom: .2667rem;
}

.desc-title {
  color: #808080;
}

.zw {
  height: 1.7333rem;
  background: #000;
  z-index: 999;
}

.footer {
  position: fixed;
  bottom: 0;
  padding-bottom: .4rem;
  left: 50%;
  background: #000;
  transform: translate(-50%);
}

.btn-item {
  width: 4.4267rem;
  height: 1.28rem;
  background: #31373E;
  border-radius: .32rem;
  margin-right: .2933rem;
  color: #FFFFFF;
  font-weight: 600;
  font-size: .4267rem;
}

.btn-item2 {

  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
}
</style>