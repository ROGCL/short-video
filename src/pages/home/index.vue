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
        <div class="small-point" v-show="worksPointShow">1</div>
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
        <img src="@/assets/img/index-img/19.png" alt="" class="image-public keywordsImage" />
      </div>
      <!-- 输入框 -->
      <div class="textarea">
        <textarea id="textarea" cols="30" rows="7" placeholder="输入关于画面的关键词，用逗号隔开" v-model="promptValue"></textarea>
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
        <div class="proportion-s" v-for="(el, index) in ratio" :key="el.id" @click="changeratio(index, 'ratioIndex')">
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
      <div class="title-public">
        <img src="@/assets/img/index-img/25.png" alt="" class="image-public" />
      </div>
      <div class="path-road">
        <div class="normal width-public" v-for="item in drawChanels" :key="item.id"
          :class="{ borderpubs: drawActiveId === item.id }" @click="drawChanelChoose(item)">
          <img :src="item.img" alt="" />
          <h5 class="h5-pub" v-if="item.id == 1" style="color:#fff">普通</h5>
          <h5 class="h5-pub vipActive" v-else>VIP加速</h5>
          <h6 class="h6-pub" v-if="item.id == 1">预计排队99999人</h6>
          <h6 class="h6-pub" v-else>{{ item.h6 }}</h6>
          <!-- 超快压层 -->
          <div class="fast-pannel" v-show="item.id == 2"></div>
        </div>
      </div>
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
      <van-popup v-model="show" position="bottom" :style="{ height: '50%', background: '#000' }">
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
              <!-- 描述文字--尚未解决颜色图层问题rgba(0,0,0,.5) -->
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

      <!-- 非vip弹窗 -->
      <van-popup v-model="noneVipShow" round :close-on-click-overlay="false">
       <div class="none-vip">
        <div class="none-vip-inner">
          <h5>提交成功</h5>
        <h6 id="success">当前预计排队3028846人，请耐心等待！</h6>
        </div>
        <div class="none-vip-bottom-btn">
          <div class="inner-btn-box" v-for="item in noneVip" :key="item.id" :class="{btnInnerAvtive:btnInnerAvtive == item.id}" @click="choosePath(item)">{{item.text}}</div>
        </div>
       </div>
      </van-popup>

     <!-- 没有vip，同时已有一个任务正在排队弹窗 -->
      <van-popup v-model="noneVipShowTips" round :close-on-click-overlay="false">
        <div class="popup-noneVip">
          <div class="pop-title-noneVip">
            已有一个任务正在排队
          </div>
          <h6 id="group">当前预计排队248078人</h6>
          <div class="ajc-noneVip">
            <div class="my-know" v-for="item in noneVipTips" :key="item.id" :class="{vipActiveMore:vipActiveMore==item.id}" @click="selectChoose(item)"> 
              {{item.text}}
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
      drawActiveId: 0,   // 选择绘画通道的方式
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
      promptIndex: 0, // 关键词默认选择第一个
      promptValue: '',  // 关键词的value
      promptActiveList: [], // 当前引擎选择的关键词
      // userinfo: {}, // 用户信息
      combos: [], // 支付套餐信息
      combosActive: 0,  // 选择的套餐
      tabActiveIndex: 0,  // 选择的tab
      needBuyFlag: false, // 是否需要购买
      vipActive:2,   //选择通道VIP样式
      noneVipShow:false, //非vip提交成功的弹窗
      btnInnerAvtive:2,  //非vip提交成功的弹窗的vip加速动态样式
      init_image_ratio: '', // 图片比例
      ratioAuto: false, // 是否自动选中比例
      buy_count:"", //是否是vip（是否有购买次数）字段
      worksPointShow:false,  //任务提交成功后，作品栏的小圆点
      noneVipShowTips:false,   //普通用户多次提交，弹窗字段
      vipActiveMore:2, //非vip连续点击提交的提醒高亮字段
      popuppricechooseDescribe:0, //购买弹窗描述文字的颜色的索引
      time:30, //时间倒计时秒数,用于非vip用户在未到时间内再次提交使用,
      lineUp:248078 //排队人数,做递减
    };
  },

  watch: {
    // 设置不同引擎的关键词
    tabActiveIndex: {
      handler: function (index) {
        
        this.promptActiveList = this.promptList[this.tabs[index].value]
        this.initForm()
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
            // 自动初始化图片比列
            this.initAutoRatio(val.imageUrl)
          }, 200);
          this.setreDrawInfo({})

        }
      }, deep: true,
      immediate: true
    },
    // 监听是否有图片
    init_image(val) {
      if (val) {
        this.ratioAuto = true
      } else {
        this.ratioAuto = false
      }
    }

  },
  computed: {
    ...mapState(['reDrawInfo', 'userinfo'])
  },

  mounted() {
    if (this.$route.query.debug == 1) {
      new vconsole()
    }
    new vconsole()
    console.log('更新9')
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
    this.countDown()  //非vip用户在此倒计时内在提交弹窗
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setreDrawInfo']),
    /**
     * 暴露给APP的方法
     * 1.刷新页面的时候重新去获取APP的用户信息
     */

    // 重置表单
    initForm() {
      this.promptIndex = 0
      this.promptValue = this.promptActiveList[this.promptIndex].content
      // 漫画没有艺术家和风格
      this.artistIndex = -1
      this.styleIndex = -1
      // 写意没有其他设置
      this.setupSetIndex = -1
      this.expandSetIndex = -1
      this.ratioIndex = -1
      this.init_image = ''
      this.guideValue = 75
      this.drawActiveId = 0
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
          // this.userinfo = JSON.parse(userinfo)
          this.setUserInfo(JSON.parse(userinfo))
          this.buy_count = this.userinfo.buy_count
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
      console.log(this.combos,'套餐')
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
    async onPhotoSelectComplete(res) {
      this.init_image = decodeURIComponent(res)
      console.log('上传图片成功回调', res);
      this.initAutoRatio(this.init_image)
    },

    // 自动初始化比列
    async initAutoRatio(imageUrl) {
      const bl = await this.getImgSize(imageUrl)
      if (bl.width && bl.height) {
        this.init_image_ratio = bl.width / bl.height
        const arr = ['1', '0.75', '1.33', '0.56', '1.78']
        // 查找最近的宽高比
        const goal = this.init_image_ratio
        const closest = arr.reduce((prev, curr) => {
          return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });
        const idx = this.ratio.findIndex(el => el.ratioval == closest)
        if (idx > -1) {
          this.ratioIndex = idx
        }
      }
    },


    // 获取图片尺寸
    getImgSize(url) {
      return new Promise((resolve, reject) => {
        let imgObj = new Image()
        imgObj.src = url
        try {
          imgObj.onload = () => {
            resolve({
              width: imgObj.width,
              height: imgObj.height
            })
          }
        } catch (error) {
          reject('错误')
        }

      })
    },

    /**
 * 点击开始绘画
 * buy_count 为0 就需要拉起支付
 */
    async startDraw() {
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
      //判断两个必要条件，选择关键词和通道，通道好做后面的请求
      if (this.promptValue == '') {
        return sendMessage('openToast', '请填写关键词')
      }
      if(this.drawActiveId == 0){
        return sendMessage('openToast','请选择通道')
      }

      //这里是不走请求的
       //这里的判断为当用户购买次数为0时，同时选择的时vip通道(直接拉起支付)
      if (this.userinfo.buy_count == 0 && this.drawActiveId == 2) {
        return this.show = true
        //当次数为0，且选择普通通道时(假执行一次，且直接返回出去不执行接口逻辑，存储提交的数据)
      }else if(this.userinfo.buy_count == 0 && this.drawActiveId == 1){
        sessionStorage.setItem('SubmitMessage',JSON.stringify(params))
        if(sessionStorage.getItem('SubmitMessage',JSON.stringify(params))){
          this.noneVipShowTips = true
        } else{
          setTimeout(()=>{
          this.shadow = true
          this.noneVipShow = true
          this.worksPointShow = true
          this.initForm()  //提交成功之后清空数据
          return
        },2000)
        } 

        }     

      this.shadow = true
      this.loading = true
      

        const [err, res] = await this.$http.post('/api/v6.Aipainting/putTask', params)

      //重置表单
      this.initForm()
      setTimeout(() => {
        if (err) {
          // 次数不足 需要购买（次数不足且选的是vip通道时）
          if (err.code == '6010' && this.drawActiveId == 2) {
            this.show = true // 拉起支付
          } else if (err.code == '6011') {
            // 当前已经有绘画任务 提示弹窗
            this.showTips = true
          }
          // 关闭加载层
          this.shadow = false
          return
        }
        // 请求成功
        this.worksPointShow = true
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
        this.promptIndex = 0
        this.promptValue = this.promptActiveList[this.promptIndex].content
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
    //切换选择的通道
    drawChanelChoose(item) {
      this.drawActiveId = item.id;
      //赋默认值
      // this.drawActive = item.id
      console.log(this.drawActive,'vip')
    },

    // 比列切换
    changeratio(index) {
      if (this.ratioAuto) {
        return sendMessage('openToast', '为保证图片质量，上传参考图后比例不允许修改')
      }
      this.ratioIndex = index
    },

    // drawChanelClick(id) {
    //   this.drawActiveId = id;
    // },
    //提交成功的选择通道
    choosePath(item){
      if(item.id == 2){
        this.show = true
        this.noneVipShow = false
      }else{
        this.noneVipShow = false
        this.$router.push('/works')
      }
    },
    //非vip连续提交的判断
    selectChoose(item){
      if(item.id == 1){
        this.noneVipShowTips = false
      }else{
        this.show = true
        if(this.buy_count == 0){
          this.noneVipShowTips = true
        }else{
          item[2].text = '点击加速'
        }
      }
    },
    countDown(){
    //   let group = document.getElementById('group')
    //   let time = 248078
    //   let countDown = setInterval(()=>{
    //     group.innerHTML = `当前预计排队${time}人`
    //     time--
        
    //     if(time==20000){
    //       clearInterval(countDown)
    //     }
    //     // console.log(time)
    //   },2000)
    //  let success = document.getElementById('success')
    //  let finnal = 3028846
    //   let countDownTime = setInterval(()=>{
    //     success.innerHTML = `当前预计排队${finnal}人，请耐心等待！`
    //     finnal--
        
    //     if(time==20000){
    //       clearInterval(countDownTime)
    //     }
    //     // console.log(time)
    //   },2000)
    }
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
.keywordsImage{
  width: 2.24rem;
}
.cutting {
  /* position: sticky; */
  top: 0;
  width: 9.68rem;
  height: 1.1733rem;
  margin-left: 0.16rem;
border-bottom: 2px solid rgba(255,255,255,0.12) ;
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
  /* height: 1.8933rem; */
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
  padding: .16rem .4267rem;
  margin-right: 0.2133rem;
  /* background: #31373e; */
  background: rgba(49, 55, 62, 0.5);
  border-radius: 0.16rem;
  /* line-height: 0.6667rem; */
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
  margin-right: .3733rem;
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
  border-radius: .0533rem;
  /* padding: .1067rem; */
}

.gaofanactive {
  /* width: 1.9467rem;
  height: 2.6667rem; */
  padding: 0.1067rem;
  /* border: 0.0267rem solid rgba(51, 225, 215, 1); */
  border: 0.0267rem solid #66C3FF;
  border-radius: .1067rem;
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
  margin-right: .3467rem;
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
  border-radius: .0533rem;
}

.fullimg {
  width: 1.44rem;
  height: 1.44rem;
}

.activeimg {
  padding: 0.1067rem;
  border: 0.0267rem solid #66C3FF;
  border-radius: .08rem;
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
  /* border: 1px dashed #7D808D; */
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
  border-radius:.08rem;
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
  height: .7733rem;
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
  background: rgba(49,55,62,0.5);
  border-radius: 0.2133rem;
}
.fast-pannel{
  width: 1.0133rem;
  height: .48rem;
  background-image: url('@/assets/img/index-img/3.png');
  background-size: 100% 100%;
  transform: translateY(-1.92rem);
}
.vipActive{
color: #66C3FF;
}
.success-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  /* color: #fff; */
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
  border-radius: .08rem;
  /* color: #66C3FF */
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
  margin-right: -0.04rem;
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
  font-weight: 600;
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
  left: -0.0267rem;
  top: -0.0133rem;
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
/* .popuppricechooseDescribe{
  color: rgba(0,0,0,0.5) !important;
} */
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
  margin-top: .4rem;
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
  position: relative;
  font-size: .3733rem;
  /* border-image: linear-gradient(135deg,
      rgba(80, 108, 255, 1),
      rgba(102, 195, 255, 1),
      rgba(51, 225, 215, 1)) 6 6; */
  background: linear-gradient(90deg, #506cff 0%, #66c3ff 53%, #33e1d7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.small-point{
  position: absolute;
  left: 9.3067rem;
  top: .16rem;
  width: .4267rem;
  height: .4267rem;
  background: #FF4848;
  border-radius: .4267rem;
  color: #fff;
  font-size: .2667rem;
  text-align: center;
  line-height: .4267rem;
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
.none-vip{
  width: 6.6933rem;
  height: 4.96rem;
  background: #fff;
}
.none-vip-inner{
  width: 100%;
  height: 2.5867rem;
  background-image: url('@/assets/img/making-img/3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.none-vip-inner h5{
  text-align: center;
  font-size: .5333rem;
  padding-top: .7467rem;
}
.none-vip-inner h6{
  text-align: center;
  padding-top: .16rem;
  margin-left: .64rem;
  margin-right: .64rem;
  font-size: .3733rem;
  color: #7D808D;
}
.none-vip-bottom-btn{
  display: flex;
  justify-content: space-between;
  width: 5.28rem;
  height: 1.0667rem;
  margin-left: .72rem;
  margin-top: .64rem;
}
.inner-btn-box{
  width: 2.4267rem;
  height: 100%;
  background: rgba(49,55,62,0.1);
  font-size: .3733rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.0667rem;
  border-radius: .2133rem;
}
.btnInnerAvtive{
  color: #fff;
  background: linear-gradient(160deg, #FFA985 0%, #FF4370 100%);
}
.popup-noneVip{
  width: 6.6933rem;
  height: 4.96rem;
  border-radius: .2133rem;
  background-image: url(@/assets/img/5.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.pop-title-noneVip{
  font-size: .5333rem;
  color: #000000;
  font-weight: bold;
  padding-top: .7467rem;
  text-align: center;
}
.popup-noneVip h6{
  font-size: .3733rem;
  color: #7D808D;
  font-weight: normal;
  text-align: center;
  margin-top: .16rem;
  margin-bottom: 1.2267rem;
}
.ajc-noneVip{
  display: flex;
  justify-content: space-between;
  width: 5.28rem;
  height: 1.0667rem;
  margin: 0 auto;
}
.my-know{
  width: 2.4267rem;
  height: 1.0667rem;
  border-radius: .2133rem;
  background: rgba(49,55,62,0.1);
  font-size: .3733rem;
  text-align: center;
  line-height: 1.0667rem;
  font-weight: 600;
}
.vipActiveMore{
  color: #fff;
  background: linear-gradient(160deg, #FFA985 0%, #FF4370 100%);
}
</style>

