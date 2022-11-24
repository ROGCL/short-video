<template>
  <div>
    <!-- 头部背景 -->
    <!-- <div class="header-banner">
    </div> -->
    <div class="top-wrapper">
      <div class="top-nav">
        <div></div>
        <div class="nav-title">AI绘画</div>
        <div class="nav-title2" @click="goworks('/works')">作品</div>
      </div>
      <div class="cutting ajc">
        <!-- 通用,漫画,写意切换栏 -->
        <div class="toggle">
          <h4 v-for="(item, index) in tabs" :key="item.id" :class="{ underline: tabActiveIndex === index }"
            @click="tabchange(index, 'tabActiveIndex')">
            {{ item.content }}
          </h4>
        </div>
      </div>
    </div>

    <!-- 版心 -->
    <div class="container">
      <!-- 关键词 -->
      <div class="title-public">
        <img src="@/assets/img/index-img/19.png" alt="" class="image-public" />
      </div>
      <!-- 输入框 -->
      <div class="textarea">
        <textarea id="textarea" cols="30" rows="10" placeholder="输入关于画面的关键词，用逗号隔开" v-model="promptValue"></textarea>
      </div>
      <!-- 条件选择框 -->
      <div class="select">
        <!-- 内部图标框 -->
        <div class="select-content" v-for="(item, index) in promptActiveList" :key="item.id"
          :class="{ borderpub: promptIndex == index }" @click="promptChange(index)">
          {{ item.text }}
        </div>
      </div>
      <!-- 艺术家标签 -->
      <div v-show="tabActiveIndex != 0">
        <div class="title-public">
          <img src="@/assets/img/index-img/20.png" alt="" class="image-public" />
        </div>
        <div class="fangao">
          <div class="small-img" v-for="(item, index) in artistList" :key="item.id"
            @click="change(index, 'artistIndex')">
            <div class="img-box" :class="{ gaofanactive: artistIndex === index }">
              <img :src="item.img" alt="" class="gaofan" />
            </div>
            <div v-if="artistIndex == index" class="select-wrapper">
              <img src="@/assets/img/index-img/26.png" class="control-img" />
            </div>
            <div class="font-public" v-else>{{ item.text }}</div>
          </div>
        </div>
      </div>
      <!-- 风格选择 -->
      <div v-show="tabActiveIndex != 0">
        <div class="title-public">
          <img src="@/assets/img/index-img/21.png" alt="" class="image-public" />
        </div>
        <!-- 画风选择 -->
        <div class="painting">
          <div class="pain" v-for="(item, index) in styleList" :key="item.id" @click="change(index, 'styleIndex')">
            <div class="pain-img-box">
              <img :src="item.poster" class="pain-img" alt="" :class="{ activeimg: styleIndex === index }" />
            </div>
            <div v-if="styleIndex == index" class="select-wrapper">
              <img src="@/assets/img/index-img/26.png" class="control-img" />
            </div>
            <div class="font-public" v-else>{{ item.text }}</div>
          </div>
        </div>
      </div>

      <!-- 参考图 -->
      <div class="title-public">
        <img src="@/assets/img/index-img/22.png" alt="" class="image-public special" />
      </div>
      <!-- 参考图片 -->
      <div class="reference-img ajc">
        <div class="upload-wrapper" @click="uploadImg" v-if="!init_image">
          <img src="@/assets/img/index-img/27.png" alt="" class="img27">
          <div class="upload-text">
            上传参考图
          </div>
        </div>
        <div v-else class="success-img-box">
          <img :src="init_image" alt="" class="success-img">
          <div class="reupload ajc" @click="uploadImg">重新上传</div>
        </div>
      </div>

      <!-- 效果图比例 -->
      <div class="title-public">
        <img src="@/assets/img/index-img/23.png" alt="" class="image-public" />
      </div>
      <!-- 比例 -->
      <div class="proportion">
        <div class="proportion-s" v-for="(el, index) in ratio" :key="el.id" @click="change(index, 'ratioIndex')">
          <div class="proportion-s-box">
            <img :src="el.img" alt="" :class="{ borderpubs: ratioIndex === index }" class="img1"
              style="display:block" />
          </div>

          <div v-if="ratioIndex === index" class="select-wrapper">
            <img src="@/assets/img/index-img/26.png" class="control-img" />
          </div>
          <div class="font-public" v-else>{{ el.content }}</div>
        </div>
      </div>

      <!-- 其他参数 -->
      <div v-show="tabActiveIndex != 2">
        <div class="title-public">
          <img src="@/assets/img/index-img/24.png" alt="" class="image-public" />
        </div>
        <!-- 参数配置项 -->
        <div class="props">
          <div class="height1 height-public">
            <h5 class="h5-public">引导力度</h5>
            <van-slider v-model="guideValue" :min="0" :max="100" bar-height="4px" inactive-color="#31373E"
              button-size="16px" class="slider" />
            <span>{{ this.guideValue }}</span>
          </div>

          <div class="slider-bottom-small-box">
            <h5>智能扩展</h5>
            <div class="set-wrapper">
              <div class="btn-font-public btn10 ajc" v-for="(item, index) in expandSetList"
                :class="{ borderpubs: expandSetIndex === index }" :key="item.id"
                @click="change(index, 'expandSetIndex')">
                {{
                    item.text
                }}</div>
            </div>
          </div>
          <div class="slider-bottom-small-footer-box">
            <h5>步数设置</h5>
            <div class="set-wrapper">
              <div class="btn-font-publics ajc" :class="{ borderpubs: setupSetIndex === index }"
                v-for="(item, index) in setupSetList" :key="item.id" @click="change(index, 'setupSetIndex')">{{
                    item.text
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 选择通道 -->
      <!-- <div class="title-public">
        <img src="@/assets/img/index-img/25.png" alt="" class="image-public" />
      </div>
      <div class="path-road">
        <div class="normal width-public" v-for="item in drawChanels" :key="item.id"
          :class="{ borderpubs: drawActiveId === item.id }" @click="drawChanelClick(item.id)">
          <img :src="item.img" alt="" />
          <h5 class="h5-pub">{{ item.h5 }}</h5>
          <h6 class="h6-pub" v-if="item.id == 1">预计排队99999人</h6>
          <h6 class="h6-pub" v-else>{{ item.h6 }}</h6>
        </div>
      </div> -->
      <!-- 开始绘画按钮 -->
      <!-- <router-link to="/making">
        <div class="begin-btn">开始绘画</div>
      </router-link> -->
      <div :class="!hideshow ? 'none' : 'block'">
        <div class="begin-zw"></div>
        <div class="begin-wrapper">
          <div class="begin-btn" @click="startDraw">开始绘画</div>
        </div>
      </div>


    </div>
    <!-- 弹出层，当没有次数时弹出,有次数直接打开编辑页面 -->
    <div>
      <van-popup v-model="show" position="bottom" :style="{ height: '55%', background: '#000' }">
        <!-- 头部压层 -->
        <div class="popup-header">
          <span @click="show = false"></span>
          <h4>AI绘画会员包</h4>
        </div>
        <!-- 下方版心 -->
        <div class="bottom-container">
          <!-- 价格目录 -->
          <div class="popup-price-outside-box">
            <div class="popup-price" v-for="(item, index) in combos" :key="item.id"
              :class="{ popuppricechoosepublic: combosActive === index }" @click="combosActiveClick(item, index)">
              <h6 class="tuijian" v-show="index == 0">推荐购</h6>
              <!-- 制作次数 -->
              <h3>{{ item.title }}</h3>
              <h4>￥<span>{{ item.price }}</span></h4>
              <!-- 描述文字 -->
              <h5>{{ item.hint1 }}</h5>
            </div>
          </div>
          <!-- 支付方式 -->
          <div class="paypal-outside" v-show="device.system == 'android'">
            <div class="paypal" v-for="items in payType" :key="items.id" @click="paychange(items.id, 'payTypeActived')">
              <img :src="items.icon" alt="" class="zfb">
              <span>{{ items.name }}</span>
              <img :src="require(`@/assets/img/popup/${payTypeActived == items.id ? 4 : 3}.png`)" alt="" class="true">
            </div>
          </div>
          <!-- 立即购买按钮 -->
          <div class="buy" @click="buy">立即购买
          </div>
          <!-- 文字框 -->
          <!-- <div class="notice" v-show="device.system == 'android'">已阅读并同意<a>《会员服务协议》</a>
          </div> -->
        </div>
      </van-popup>

      <van-popup v-model="shadow" class="shadow" :close-on-click-overlay="false">
        <div class="loading-wrapper" v-show="loading">
          <img src="@/assets/img/popup/12.png" alt="" class="wait wait2" />
          <h5>任务提交中</h5>
          <h6>马上就好</h6>
        </div>

        <div class="loading-wrapper" v-show="!loading">
          <h4>提交成功</h4>
          <h3>稍后在“作品”中查看结果</h3>
          <div class="know-btn ajc" @click="know">我知道了</div>
        </div>
      </van-popup>


      <!-- 已经有一个任务再制作中提示 -->
      <van-popup v-model="showTips" round :close-on-click-overlay="false">
        <div class="popup">
          <div class="pop-title">
            1个作品正在绘制
          </div>
          <div class="ajc">
            <div class="pop-btn pop-btn2 ajc" @click="showTips = false">
              我知道了
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
// 引入封装的js和APP交互的方法
import { sendMessage, device } from '@/util/initChat'
// 混入js
import myMin from './js/index.js'
// 使用vuex
import { mapMutations, mapState } from "vuex";
import vconsole from 'vconsole'

export default {
  mixins: [myMin],
  data() {
    return {
      showTips: false, // 正在有绘画进行时提示弹窗
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hideshow: true,  //显示或者隐藏footer
      device: device,
      artistIndex: -1, // 艺术家选择
      drawActiveId: 1,   // 选择绘画通道的方式
      expandSetIndex: -1, // 智能拓展
      setupSetIndex: -1,  // 步数设置
      guideValue: 75,  // 引导力度
      loading: false,  // 是否提交成功
      shadow: false,  // 提交弹窗开关
      show: false,  // 会员支付包弹窗
      payTypeActived: 1,  // 支付方式
      styleIndex: -1, // 风格选择
      ratioIndex: -1,  // 比例选择
      init_image: "",  // 参考图
      promptIndex: -1, // 关键词默认选择第一个
      promptValue: '',  // 关键词的value
      promptActiveList: [], // 当前引擎选择的关键词
      // userinfo: {}, // 用户信息
      combos: [], // 支付套餐信息
      combosActive: 0,  // 选择的套餐
      tabActiveIndex: 0,  // 选择的tab
      needBuyFlag: false, // 是否需要购买
    };
  },

  watch: {
    // 设置不同引擎的关键词
    tabActiveIndex: {
      handler: function (index) {
        this.initForm()
        this.promptActiveList = this.promptList[this.tabs[index].value]

      }, immediate: true,
      deep: true
    },
    // 监听屏幕高度的变化 主要是监听软键盘是否弹起
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hideshow = false
      } else {
        this.hideshow = true
      }
    },
    // 监听store里面重新绘画的数据
    reDrawInfo: {
      handler: function (val) {
        if (Object.keys(val).length > 0) {
          const idx = this.tabs.findIndex(el => el.value == val.Engine)
          const idx2 = this.promptActiveList.findIndex(el => el.value == val.TextPrompt)
          this.tabActiveIndex = idx > -1 ? idx : 0
          setTimeout(() => {
            this.promptIndex = idx2 > -1 ? idx2 : 0
            this.promptValue = val.TextPrompt
            this.init_image = val.imageUrl
          }, 200);
          this.setreDrawInfo({})

        }
      }, deep: true,
      immediate: true
    }

  },
  computed: {
    ...mapState(['reDrawInfo', 'userinfo'])
  },

  mounted() {
    if (this.$route.query.debug == 1) {
      new vconsole()
    }
    console.log('更新7')
    // 暴露方法给APP
    window.onPageResume = this.onPageResume   // 刷新
    window.getAppParams = this.getAppParams  // 获取用户信息
    window.onPaySuccess = this.onPaySuccess  // 支付成功
    window.onPhotoSelectComplete = this.onPhotoSelectComplete  // 上传图片完成
    // 获取APP参数
    this.getUserinfo()
    // 获取套餐信息
    this.getCombsInfo()

    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })()
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setreDrawInfo']),
    /**
     * 暴露给APP的方法
     * 1.刷新页面的时候重新去获取APP的用户信息
     */

    // 重置表单
    initForm() {
      this.promptIndex = -1
      this.promptValue = ''
      // 漫画没有艺术家和风格
      this.artistIndex = -1
      this.styleIndex = -1
      // 写意没有其他设置
      this.setupSetIndex = -1
      this.expandSetIndex = -1
      this.ratioIndex = -1
      this.init_image = ''
      this.guideValue = 75
    },
    onPageResume() {
      this.getUserinfo()
    },

    // iOS 注入用户信息
    getAppParams(res) {
      console.log('设备信息', device.system);
      if (device.system == 'ios') {
        console.log('获取getAppParams数据', res);
        if (res && JSON.parse(res).userInfo) {
          let temp = JSON.parse(res).userInfo
          if (Object.keys(temp).length > 0) {
            // this.userinfo = temp
            this.setUserInfo(temp)
            this.needBuyFlag = false
            console.log('获取用户数据成功ios', this.userinfo);
          } else {
            sendMessage('jumpClientFunction', { linkType: 3000 })
          }
        } else {
          sendMessage('jumpClientFunction', { linkType: 3000 })
        }
      }
    },

    // 原生app支付成功
    onPaySuccess(res) {
      this.getUserinfo()
    },
    /**
     * 获取用户信息，如果没有用户信息表示没有登录；需要跳转登录
     */
    getUserinfo() {
      if (device.system == 'android') {
        let userinfo = sendMessage('getUserInfo')
        if (userinfo) {
          this.needBuyFlag = false
          // this.userinfo = JSON.parse(userinfo)
          this.setUserInfo(JSON.parse(userinfo))
          console.log('获取用户数据成功', this.userinfo);
        } else {
          sendMessage('jumpClientFunction', { linkType: 3000 })
        }
      }
    },

    // 获取套餐信息
    async getCombsInfo() {
      const [err, res] = await this.$http.post(`api/v6.Aipainting/combos`, {
        platform: device.system,
        uuid: this.userinfo.uuid
      })
      if (err) return
      this.combos = res.combos
      // 设置默认选择的支付套餐
      this.comboActive = res.combos[0]

    },

    // 点击支付获取支付信息
    async buy() {
      // 安卓走接口
      this.show = false
      if (device.system == 'android') {
        let params = {
          pay_type: this.payTypeActived == 1 ? 'ali' : "wx",
          combo_id: this.comboActive.id,
          platform: device.system,
          uuid: this.userinfo.uuid
        }
        // let params = { "pay_type": "ali", "combo_id": 65, "platform": "android", "uuid": "6226b6b2596751335d449522" }
        const [err, res] = await this.$http.post('api/v6.Aipainting/order', params)
        console.log('支付参数 ', res);
        if (err) return
        let payFun = this.payTypeActived == 1 ? 'openAliPay' : 'openWxPay'
        let payData = this.payTypeActived == 1 ? res.pay_url : res.pay_data
        sendMessage(payFun, payData)
      } else if (device.system == 'ios') {
        //ios走本地方法
        sendMessage('openInternalPurchase', this.comboActive)
      }
    },
    // 跳转
    go(path) {
      this.$router.push(path)
    },
    // 去作品
    goworks(path) {
      this.$route.meta.keepAlive = false
      this.go(path)
    },
    // 点击弹窗 我知道了
    know() {
      this.go('/works')
      this.shadow = false
    },
    // 点击上传图片
    uploadImg() {
      sendMessage('openPhotoSelect', { selectType: 1, showGif: false })
    },

    // 上传图片完成
    onPhotoSelectComplete(res) {
      this.init_image = decodeURIComponent(res)
      console.log('上传图片成功回调', res);
    },

    /**
 * 点击开始绘画
 * buy_count 为0 就需要拉起支付
 */
    async startDraw() {

      if (this.promptValue == '') {
        return sendMessage('openToast', '请填写关键词')
      }

      if (this.userinfo.buy_count == 0 || this.needBuyFlag) {
        return this.show = true
      }

      this.shadow = true
      this.loading = true
      let { styleList, styleIndex, ratio, ratioIndex, tabs, tabActiveIndex, init_image, userinfo, promptValue, guideValue, expandSetIndex, artistIndex, artistList } = this
      let params = {
        prompt: promptValue,  //关键词
        style: styleIndex > -1 ? styleList[styleIndex].value : '',  // 风格
        styleText: styleIndex > -1 ? styleList[styleIndex].text : '',  // 风格中文
        ratio: ratioIndex > -1 ? ratio[ratioIndex].id : '',  // 比例
        engine: tabActiveIndex > -1 ? tabs[tabActiveIndex].value : '',   // 引擎
        artist: artistIndex > -1 ? artistList[artistIndex].value : '', // 艺术家
        init_image: init_image, // 参考图
        uuid: userinfo.uuid,
        platform: device.system,
        guidence_scale: guideValue / 10,
        is_last_layer_skip: expandSetIndex == 0 ? true : false,
        enable_face_enhance: expandSetIndex == 1 ? true : false
      }
      const [err, res] = await this.$http.post('/api/v6.Aipainting/putTask', params)
      this.initForm()
      setTimeout(() => {
        if (err) {
          // 次数不足 需要购买
          if (err.code == '6010') {
            this.needBuyFlag = true
          } else if (err.code == '6011') {
            this.showTips = true
          }
          this.shadow = false
          return
        }
        this.loading = false
      }, 2000);

    },

    // 选择套餐
    combosActiveClick(item, index) {
      this.combosActive = index
      this.comboActive = item
    },

    // 关键词切换
    promptChange(index) {
      if (this.promptIndex == index) {
        this.promptValue = ''
        this.promptIndex = -1
      } else {
        this.promptValue = this.promptActiveList[index].content
        this.promptIndex = index;
      }
    },

    // 通用切换方法
    change(val, field) {
      if (this[field] == val) {
        // 取消选择
        this[field] = -1
      } else {
        this[field] = val
      }
    },

    // tab切换
    tabchange(index) {
      this.tabActiveIndex = index
    },

    // 切换支付方式
    paychange(val) {
      this.payTypeActived = val
    },

    drawChanelClick(id) {
      this.drawActiveId = id;
    },
  },
};
</script>

<style scoped>
.header-banner {
  width: 100%;
  height: 6.6667rem;
  background-image: url("@/assets/img/index-img/4.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.container {
  width: 9.1467rem;
  height: 100vh;
  margin: 0 auto;
}

.title-public {
  margin-top: 0.5333rem;
  margin-bottom: 0.2667rem;
}

.image-public {
  width: 2.6667rem;
  height: 100%;
}

.cutting {
  /* position: sticky; */
  top: 0;
  width: 9.68rem;
  height: 1.1733rem;
  margin-left: 0.16rem;

  /* margin-top: -1.04rem; */
  /* background-image: url("@/assets/img/index-img/5.png"); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 9999;
}

.cutting2 {
  background-image: url("@/assets/img/index-img/5-1.png");
  background-color: #000;
}

.ajc {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle {
  /* padding-top: 0.6933rem; */
  /* margin-left: 2.2667rem; */
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  width: 5.12rem;
  height: 0.5867rem;
}

.toggle h4 {
  width: 0.8533rem;
  height: 0.8067rem;
  white-space: nowrap;
  font-weight: normal;
  font-size: 0.4267rem;
  color: #c5c8d4;
}

.underline {
  position: relative;
  /* border-image: linear-gradient(135deg,
      rgba(80, 108, 255, 1),
      rgba(102, 195, 255, 1),
      rgba(51, 225, 215, 1)) 6 6; */
  background: linear-gradient(90deg, #506cff 0%, #66c3ff 53%, #33e1d7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.underline::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  width: 60%;
  height: .08rem;
  text-align: center;
  border-radius: .1067rem;
  border-image: linear-gradient(135deg,
      rgba(80, 108, 255, 1),
      rgba(102, 195, 255, 1),
      rgba(51, 225, 215, 1)) 6 6;
  background: linear-gradient(90deg, #506cff 0%, #66c3ff 53%, #33e1d7 100%);
}

#textarea {
  width: 9.1467rem;
  height: 1.8933rem;
  /* margin-top: 0.2667rem; */
  resize: none;
  border: none;
  border-radius: 0.1067rem;
  /* background-image: url("@/assets/img/index-img/16.png"); */
  background-repeat: no-repeat;
  background: rgba(49, 55, 62, 0.5);
  background-size: 100% 100%;
  font-size: 0.32rem;
  color: #7d808d;
  padding: .2667rem;
  box-sizing: border-box;
  margin-bottom: .1367rem;
}

#textarea::placeholder {
  font-size: 0.32rem;
  color: #7d808d;

  padding-left: 0.2667rem;
  padding-top: 0.2667rem;
}

.select {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  z-index: -1;
  display: flex;
}

.select::-webkit-scrollbar {
  display: none;
}

.select-content {
  display: inline-block;
  /* width: 1.8133rem; */
  padding: 0 .2667rem;
  margin-right: 0.2133rem;
  /* background: #31373e; */
  background: rgba(49, 55, 62, 0.5);
  border-radius: 0.16rem;
  line-height: 0.6667rem;
  text-align: center;
  font-size: 0.32rem;
  color: #c5c8d4;
}

.fangao {
  width: 9.1467rem;
  display: flex;
  align-items: center;
  /* height: 3.4933rem; */
  overflow-x: auto;
  white-space: nowrap;
}

.fangao::-webkit-scrollbar {
  display: none;
}

.small-img {
  display: inline-block;
  width: 2.16rem;
  /* height: 3.4933rem; */
  margin-right: 0.32rem;
  text-align: center;
  flex-shrink: 0;
  /** 防止父元素使用了flex子元素宽度被挤压 */
}

.small-img h6 {
  width: 100%;
  height: 0.6133rem;
}

.img-box {
  width: 100%;
  height: 2.88rem;
  margin-bottom: .1067rem;
}

.gaofan {
  width: 100%;
  height: 100%;
  border-radius: .08rem;
  /* padding: .1067rem; */
}

.gaofanactive {
  /* width: 1.9467rem;
  height: 2.6667rem; */
  padding: 0.1067rem;
  /* border: 0.0267rem solid rgba(51, 225, 215, 1); */
  border: 0.0267rem solid #66C3FF;
  border-radius: 0.16rem;
  box-sizing: border-box;
}

.control-img {
  display: block;
  width: 0.64rem;
  height: 0.4533rem;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  /* margin: auto; */
  /* margin: 0 auto; */
}

.font-public {
  font-size: 0.32rem;
  color: #7d808d;
  text-align: center;
}

.painting {
  width: 100%;
  /* height: 2.0533rem; */
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
}

.painting::-webkit-scrollbar {
  display: none;
}

.pain {
  display: inline-block;
  width: 1.44rem;
  /* height: 1.44rem; */
  margin-right: 0.2667rem;
  flex-shrink: 0;
  text-align: center;
  align-self: baseline;
}

.pain-img-box {
  width: 1.44rem;
  height: 1.44rem;
  margin-bottom: .1333rem;
}

.pain-img {
  width: 100%;
  height: 100%;
  border-radius: .08rem;
}

.fullimg {
  width: 1.44rem;
  height: 1.44rem;
}

.activeimg {
  padding: 0.1067rem;
  border: 0.0267rem solid #66C3FF;
  border-radius: .16rem;
  box-sizing: border-box;
}

.reference-img {
  width: 100%;
  border-radius: .1067rem;
  height: 2.6133rem;
  /* background-image: url("@/assets/img/index-img/15.png"); */
  background-repeat: no-repeat;
  background-size: contain;
  /* z-index: -1; */
  /* background: #31373E; */
  background: rgba(49, 55, 62, 0.5);
}

.img27 {
  width: .8533rem;
  height: .8533rem;
  border: 1px dashed #7D808D;
}

.upload-text {
  color: #7D808D;

  font-size: .32rem;
}

.upload-wrapper {
  text-align: center;
}

.special {
  width: 4.6133rem;
}

.proportion {
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
}

.proportion::-webkit-scrollbar {
  display: none;
}

.proportion-s {
  display: inline-block;
  width: 1.28rem;
  /* height: 100%; */
  margin-right: 0.6933rem;
  flex-shrink: 0;
  align-self: flex-start;
}

.proportion-s-box {
  width: 1.28rem;
  height: 1.28rem;
  margin-bottom: .1333rem;
}

.img1 {
  width: 100%;
  height: 100%;
}

.props {
  position: relative;
  width: 100%;
  height: 4.8533rem;
  background: rgba(49, 55, 62, 0.5);
  border-radius: 0.2133rem;
}

.height-public {
  color: #c5c8d4;
}

.h5-public {
  font-size: 0.3733rem;
  font-weight: 400;
  color: #c5c8d4;
}

.height1 h5 {
  position: absolute;
  left: 0.5333rem;
  top: 0.5867rem;
}

.slider {
  position: absolute;
  left: 2.56rem;
  top: 0.8267rem;
  width: 5.12rem;
}

.height1 span {
  position: absolute;
  left: 8.2133rem;
  top: 0.6933rem;
  font-size: 0.32rem;
  color: #7d808d;
}

.btn-font-public {
  width: 2.1333rem;
  height: 0.7733rem;
  background: rgba(49, 55, 62, 0.5);
  border-radius: 0.16rem;
  line-height: 0.7733rem;
  font-size: 0.32rem;
  color: #7d808d;
  text-align: center;
}

.btn-font-publics {
  width: 1.4933rem;
  height: .7733rem;
  background: rgba(49, 55, 62, 0.5);
  border-radius: 0.16rem;
  line-height: 0.7733rem;
  font-size: 0.32rem;
  color: #7d808d;
  text-align: center;
}

.btn-font-publics:nth-child(1),
.btn-font-public:nth-child(1) {
  margin-right: .5333rem
}

.slider-bottom-small-box {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 1.9733rem;
  left: .5333rem;
  width: 8.08rem;
}

.slider-bottom-small-footer-box {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 2.5333rem;
  margin-left: .5333rem;
  margin-right: .5333rem;
  /* left: .5333rem; */

}

.slider-bottom-small-footer-box h5 {
  font-size: .3733rem;
  color: #C5C8D4;
  font-weight: normal;
  margin-top: .1067rem;
}

.slider-bottom-small-box h5 {
  font-size: .3733rem;
  color: #C5C8D4;
  font-weight: normal;
  margin-top: .1067rem;
}

.path-road {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 2.1867rem;
}

.width-public {
  width: 4.4533rem;
  height: 2.1867rem;
  background: #31373e;
  border-radius: 0.2133rem;
}


.success-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.success-img-box {
  width: 100%;
  height: 100%;
  position: relative;
}

.reupload {
  width: 1.6rem;
  height: .6933rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: .16rem;
  position: absolute;
  bottom: .2667rem;
  right: .2667rem;
  color: #FFFFFF;
  font-size: .2667rem;
}

.normal {
  position: relative;
}

.normal img {
  margin-top: 0.6933rem;
  margin-left: 0.2667rem;
  width: 0.8rem;
  height: 0.8rem;
}

.h5-pub {
  position: absolute;
  left: 1.2267rem;
  top: 0.4267rem;
  font-size: 0.4267rem;
  color: #fff;
}

.h6-pub {
  position: absolute;
  left: 1.2267rem;
  top: 1.2267rem;
  font-size: 0.32rem;
  color: #7d808d;
}

.begin-zw {
  height: 2.1333rem;
}

.begin-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 10rem;
  background: #000;
  padding: .2667rem .4267rem;
  box-sizing: border-box;
}

.begin-btn {
  width: 100%;
  height: 1.28rem;
  background: linear-gradient(135deg, #506cff 0%, #66c3ff 51%, #33e1d7 100%);
  border-radius: 0.32rem;
  line-height: 1.28rem;
  text-align: center;
  color: #fff;
  font-size: 0.4267rem;
  font-weight: 600;
}

.active {
  background: linear-gradient(90deg, #506cff 0%, #66c3ff 53%, #33e1d7 100%);
}

/* 边框线公共样式 */
.borderpub {
  /* border-image: linear-gradient(135deg,
      rgba(80, 108, 255, 1),
      rgba(102, 195, 255, 1),
      rgba(51, 225, 215, 1)) 2 2; */
  border: 0.0267rem solid;
  /* clip-path: inset(0 round .1333rem); */
  border-radius: .16rem;
  color: #66C3FF;

}

.borderpubs {
  border: 0.0267rem solid #66C3FF;
  border-radius: .2133rem;
  color: #66C3FF
    /* border-image: linear-gradient(135deg,
      rgba(80, 108, 255, 1),
      rgba(102, 195, 255, 1),
      rgba(51, 225, 215, 1)) 2 2; */
    /* clip-path: inset(0 round .1333rem); */
}

/* 选中时的图标,公共样式 */
.iconchoosed {
  width: 0.64rem;
  height: 0.4533rem;
  margin: 0 auto;
  /* margin: .1733rem auto 0; */
  background-image: url("@/assets/img/index-img/26.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.popup-header {
  position: relative;
  width: 100%;
  height: 3.8667rem;
  background-image: url('@/assets/img/popup/2.png');
  z-index: -1;
}

.popup-header span {
  position: absolute;
  left: .4267rem;
  top: .1867rem;
  width: .8rem;
  height: .8rem;
  background-image: url('@/assets/img/popup/5.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.popup-header h4 {
  line-height: 1.2933rem;
  text-align: center;
  font-size: .5333rem;
  color: #fff;
}

.bottom-container {
  width: 9.1467rem;
  margin: 0 auto;
}

.popup-price-outside-box {
  display: flex;
  justify-content: space-between;
}

.shadow {
  /* position: relative; */
  width: 6.6933rem;
  height: 4.96rem;
  border-radius: 0.4267rem;
  background-image: url("@/assets/img/popup/13.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.del-fn {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  left: 5.5733rem;
  top: 0.32rem;
}

.wait {
  width: 1.0667rem;
  height: 1.0667rem;
  margin-bottom: .3733rem;
}

.wait2 {
  animation: round 2s linear infinite;
}

.loading-wrapper {
  text-align: center;
  margin-top: .8rem;
}

@keyframes round {
  100% {
    transform: rotate(360deg);
  }
}

.shadow h5 {
  margin-bottom: .16rem;
  font-size: 0.5333rem;
}

.shadow h6 {
  color: #7d808d;
  font-size: 0.3733rem;
}

.shadow h4 {
  font-size: 0.5333rem;
  font-weight: bold;
  margin-bottom: .16rem;
}

.shadow h3 {
  color: #7d808d;
  font-size: 0.3733rem;
  margin-bottom: .96rem;
}

.know-btn {
  width: 2.96rem;
  height: 1.0667rem;
  font-size: 0.3733rem;
  font-weight: bold;
  text-decoration: none;
  color: #000000;
  background: rgba(49, 55, 62, 0.1);
  border-radius: .2133rem;
  margin: 0 auto;
}

.popup-price {
  position: relative;
  width: 2.9067rem;
  height: 3.4933rem;
  margin-top: -1.8933rem;
  background: #31373E;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: .32rem;
  z-index: 9999;
  color: #fff;
}

.popup-price h3 {
  text-align: center;
  font-weight: normal;
  font-size: .3733rem;
  padding-top: .7467rem;
  /* color: #fff; */
}

.popup-price h4 {
  padding-top: .2133rem;
  font-weight: normal;
  text-align: center;
  /* color: #fff; */
  font-size: .32rem;
}

.popup-price h4 span {
  font-size: .6933rem;
}

.popup-price h5 {
  padding-top: .16rem;
  font-weight: normal;
  font-size: .32rem;
  text-align: center;
  /* color: #fff; */
}

/* 第一幅图的推荐购 */
.tuijian {
  position: absolute;
  left: 0;
  top: 0;
  width: 1.4933rem;
  height: .64rem;
  background: #FF5353;
  border-top-left-radius: .32rem;
  border-bottom-right-radius: .32rem;
  font-size: .32rem;
  text-align: center;
  line-height: .64rem;
  color: #fff;
  font-weight: normal;
}

/* 支付选择项动态样式 */
.popuppricechoosepublic {
  background: linear-gradient(135deg, #A4B2FF 0%, #A9DDFF 51%, #99FFF9 100%);
  color: #000 !important;
}

.buy {
  margin-top: .5333rem;
  height: 1.28rem;
  border-radius: .32rem;
  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
  text-align: center;
  line-height: 1.28rem;
  color: #fff;
  font-size: .4267rem;
  font-weight: 600;
}

.notice {
  margin-top: .4267rem;
  font-size: .2667rem;
  color: #fff;
}

.notice a {
  color: #66C3FF;
}

.paypal-outside {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}

.paypal {
  position: relative;
  margin-top: 1.0667rem;
  width: 2.32rem;
  height: .5333rem;
}

.zfb {
  position: absolute;
  top: .2667rem;
  /* margin-left: .64rem; */
  width: .5333rem;
  height: .5333rem;
  background-repeat: no-repeat;
  background-size: contain;
}

.paypal span {
  display: block;
  position: absolute;
  top: .3333rem;
  padding-left: .6667rem;
  white-space: nowrap;
  width: .96rem;
  height: .4533rem;
  font-size: .32rem;
  color: #fff;
  margin-left: .1067rem;
}

.true {
  position: absolute;
  left: 2.5333rem;
  top: .3067rem;
  width: .4267rem;
  height: .4267rem;
  /* margin-left: 1.3333rem;
  margin-top: -.1067rem; */
}

.select-wrapper {
  display: flex;
  justify-content: center;
}

.top-wrapper {
  background-image: url("@/assets/img/index-img/5-1.png");
  background-color: #000;
  width: 10rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: sticky;
  top: 0;
  z-index: 99999;
}

.top-nav {
  height: 1.1733rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .2667rem;
  padding: 0 .4267rem;
  box-sizing: border-box;
  position: relative;
}

.nav-title {

  color: #FFF;
  font-size: .5333rem;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nav-title2 {

  font-size: .3733rem;
  /* border-image: linear-gradient(135deg,
      rgba(80, 108, 255, 1),
      rgba(102, 195, 255, 1),
      rgba(51, 225, 215, 1)) 6 6; */
  background: linear-gradient(90deg, #506cff 0%, #66c3ff 53%, #33e1d7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.set-wrapper {
  display: flex;
}

.block {
  display: block;
}

.none {
  display: none;
}

.height-public /deep/ .van-slider__bar {
  background: linear-gradient(135deg, #506CFF 0%, #66C3FF 51%, #33E1D7 100%);
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
  font-size: .5333rem;
  color: #000000;
  font-weight: bold;
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
  /* margin-left: .3467rem; */
}
</style>

