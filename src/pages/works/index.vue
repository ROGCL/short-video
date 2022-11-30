<template>
  <div class="wrapper-box">
    <div class="nav-title ajc">作品</div>
    <div class="wrapper">
      <!-- 正在进行中 -->
      <div class="current ac" v-if="taskConduct > 0">
        <div class="ac">
          <img src="@/assets/img/1.png" class="loading-png" alt="" />
          <span @click="onRefresh">绘画正在进行中，请下拉刷新查看</span>
        </div>
        <img
          src="@/assets/img/4.png"
          class="png4"
          alt=""
          @click="show = true"
        />
      </div>

      <!-- 错误处理 -->
      <div class="error current ac" v-else-if="taskConduct == -1">
        <div class="ac">
          <img src="@/assets/img/3.png" class="err-png" alt="" />
          <div @click="back">
            处理失败，点击<span class="resubmit">重新提交</span>
          </div>
        </div>
      </div>

      <!-- 非vip排队中的提醒 -->
      <div class="notVip current" v-else-if="this.info !== null">
        <h4 id="peopleCount">248078人在您前面</h4>
        <div class="turnBuy" @click="turnCombos">VIP免排队</div>
        <div class="delBtn" @click="show = true"></div>
      </div>
      <!-- <template v-if="list.length > 0"> -->
      <!-- 瀑布流 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="list.length > 0 ? '没有更多了' : ''"
            @load="loadmore"
            :immediate-check="false"
          >
            <div class="content" v-if="list.length>0">
              <div
                class="img-container"
                @click="go(item)"
                v-for="(item, index) in list"
                :key="index"
              >
                <img
                  class="img-style"
                  :src="item.imageUrl ? item.imageUrl : imgerr"
                  alt="1"
                />
                <div
                  class="save ajc"
                  v-if="item.imageUrl"
                  @click.stop="save(item.imageUrl)"
                >
                  保存
                </div>
                <img
                  src="@/assets/img/new.png"
                  class="newimg"
                  alt=""
                  v-show="index == 0"
                />
              </div>
            </div>
  
            <div class="no-data" v-else>
              <img src="@/assets/img/2.png" class="no-data-img" alt="" />
              <div class="text">还没有作品哦</div>
              <div class="btn" @click="back">去制作</div>
            </div>
          </van-list>
        </van-pull-refresh>
    </div>

    <!-- 取消弹窗 -->
    <van-popup v-model="show" round :close-on-click-overlay="false">
      <div class="popup">
        <div class="pop-title">是否取消绘制？</div>
        <div class="ajc">
          <div class="pop-btn ajc" @click="show = false">继续等待</div>
          <div class="pop-btn pop-btn2 ajc" @click="cancel">取消绘制</div>
        </div>
      </div>
    </van-popup>

    <van-popup
      v-model="shadow"
      position="bottom"
      :style="{ height: '50%', background: '#000' }"
    >
      <!-- 头部压层 -->
      <div class="popup-header">
        <span @click="shadow = false"></span>
        <h4>AI绘画会员包</h4>
      </div>
      <!-- 下方版心 -->
      <div class="bottom-container">
        <!-- 价格目录 -->
        <div class="popup-price-outside-box">
          <div
            class="popup-price"
            v-for="(item, index) in combos"
            :key="item.id"
            :class="{ popuppricechoosepublic: combosActive === index }"
            @click="combosActiveClick(item, index)"
          >
            <h6 class="tuijian" v-show="index == 0">推荐购</h6>
            <!-- 制作次数 -->
            <h3>{{ item.title }}</h3>
            <h4>
              ￥<span>{{ item.price }}</span>
            </h4>
            <!-- 描述文字--尚未解决颜色图层问题rgba(0,0,0,.5) -->
            <h5>{{ item.hint1 }}</h5>
          </div>
        </div>
        <!-- 支付方式 -->
        <div class="paypal-outside" v-show="device.system == 'android'">
          <div
            class="paypal"
            v-for="items in payType"
            :key="items.id"
            @click="paychange(items.id, 'payTypeActived')"
          >
            <img :src="items.icon" alt="" class="zfb" />
            <span>{{ items.name }}</span>
            <img
              :src="
                require(`@/assets/img/popup/${
                  payTypeActived == items.id ? 4 : 3
                }.png`)
              "
              alt=""
              class="true"
            />
          </div>
        </div>
        <!-- 立即购买按钮 -->
        <div class="buy" @click="buy">立即购买</div>
        <!-- 文字框 -->
        <!-- <div class="notice" v-show="device.system == 'android'">已阅读并同意<a>《会员服务协议》</a>
          </div> -->
      </div>
    </van-popup>

    <!-- 购买成功之后的弹出层 -->
    <van-popup v-model="buySuccess" round :close-on-click-overlay="false">
      <div class="buySuccess">
        <div class="buySuccess-top">
          <h4>购买成功</h4>
          <h5>已享免排队特权</h5>
        </div>
        <div class="buySuccess-bottom" @click="turnSpeedUp">立即加速</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { sendMessage, device } from "@/util/initChat";
import { mapState, mapMutations } from "vuex";
import myMin from "@/pages/home/js/index";
export default {
  name: "works",
  mixins: [myMin],
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
      info: {},
      combos: [],
      payTypeActived: 1, // 支付方式
      combosActive: 0, // 选择的套餐
      shadow: false, //购买弹窗
      device: device, //设备型号字段
      lineUp: true, //vip免排队展示
      speedUp: false, //购买vip之后的展示
      buySuccess: false, //购买成功之后的弹窗
    };
  },
  mounted() {
    this.getList();
    // 获取套餐信息
    this.getCombsInfo();
    window.onPageResume = this.onPageResume; // 刷新
    window.getAppParams = this.getAppParams; // IOS获取用户信息
    window.onPaySuccess = this.onPaySuccess; // 支付成功
    // console.log(device.system,'设备')
    this.countDowm();
    this.info = localStorage.getItem("SubmitMessage");
    console.log(this.userinfo.buy_count, "用户信息");
  },
  destroyed(){
    console.log('页面被摧毁了')
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    //安卓购买成功的回传
    onPageResume() {
      this.getUserinfo();
      if (this.userinfo.buy_count != "0") {
              this.lineUp = false;
              this.shadow = false;
              this.buySuccess = true;
            } else {
              this.lineUp = true;
            }
      console.log(this.userinfo, "购买次数");
    },

    // iOS 注入用户信息
    getAppParams(res) {
      console.log("设备信息", device.system);
      if (device.system == "ios") {
        console.log("获取getAppParams数据", res);
        if (res && JSON.parse(res).userInfo) {
          let temp = JSON.parse(res).userInfo;
          if (Object.keys(temp).length > 0) {
            this.setUserInfo(temp);
            console.log("获取用户数据成功ios", this.userinfo);

          } else {
            sendMessage("jumpClientFunction", { linkType: 3000 });
          }
        } else {
          sendMessage("jumpClientFunction", { linkType: 3000 });
        }
      }
    },

    // 原生app支付成功ios
    onPaySuccess(res) {
      this.getUserinfo();
      if (this.userinfo.buy_count != "0") {
              this.lineUp = false;
              this.shadow = false;
              this.buySuccess = true;
            } else {
              this.lineUp = true;
            }
    },
    /**
     * 获取用户信息，如果没有用户信息表示没有登录；需要跳转登录
     */
    getUserinfo() {
      if (device.system == "android") {
        let userinfo = sendMessage("getUserInfo");
        if (userinfo) {
          // this.userinfo = JSON.parse(userinfo)
          this.setUserInfo(JSON.parse(userinfo));
          console.log("获取用户数据成功", this.userinfo);

          // if (userinfo.buy_count != '0') {
          //   this.lineUp = false;
          //   this.shadow = false;
          //   this.buySuccess = true;
          // } else {
          //   this.lineUp = true;
          // }
        } else {
          sendMessage("jumpClientFunction", { linkType: 3000 });
        }
      }
    },
    back() {
      // const backLength = window.history.length - 1
      window.history.back();
    },
    save(url) {
      sendMessage("savePicture", url);
    },
    loadmore() {
      this.page += 1;
      this.getList();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.refreshing = true
      this.page = 1;
      // 重新加载数据
      this.getList();
    },
    //获取作品列表数据
    async getList() {
      // console.log(this.info,'info')
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      const [err, res] = await this.$http.post("api/v6.Aipainting/showTask", {
        uuid: this.userinfo.uuid,
        platform: device.system,
        page: this.page,
        pageSize: this.pageSize,
      });
      this.loading = false;
      this.refreshing = false;
      if (err) return;
      this.taskConduct = res.taskConduct;
      console.log(this.taskConduct, "状态为");
      if (this.page == 1) {
        this.list = res.list;
      } else {
        this.list = this.list.concat(res.list);
      }
      // 没有数据了
      if (res.list.length == 0) {
        this.finished = true;
      }
    },
    go(item) {
      if (item.imageUrl) {
        this.$route.meta.keepAlive = true;
        this.$router.push(`/works/detail?id=${item.id}`);
      }
    },
    async cancel() {
      if (this.info !== null) {
        this.show = false;
        localStorage.removeItem("SubmitMessage");
        console.log(this.info, "移出保存");
        this.info = null;
        return;
      }
      this.show = false;
      const [err, res] = await this.$http.post("api/v6.Aipainting/cancel", {
        uuid: this.userinfo.uuid,
        platform: device.system,
      });
      if (err) return;
      this.page = 1;
      this.getList();
    },
    turnCombos() {
      this.shadow = true;
    },
    // 获取套餐信息
    async getCombsInfo() {
      const [err, res] = await this.$http.post(`api/v6.Aipainting/combos`, {
        platform: device.system,
        uuid: this.userinfo.uuid,
      });
      if (err) return;
      this.combos = res.combos;
      // 设置默认选择的支付套餐
      this.comboActive = res.combos[0];
      console.log(this.combos, "套餐");
    },

    // 点击支付获取支付信息
    async buy() {
      // 安卓走接口
      this.show = false;
      if (device.system == "android") {
        let params = {
          pay_type: this.payTypeActived == 1 ? "ali" : "wx",
          combo_id: this.comboActive.id,
          platform: device.system,
          uuid: this.userinfo.uuid,
        };
        // let params = { "pay_type": "ali", "combo_id": 65, "platform": "android", "uuid": "6226b6b2596751335d449522" }
        const [err, res] = await this.$http.post(
          "api/v6.Aipainting/order",
          params
        );
        if (err) return;
        let payFun = this.payTypeActived == 1 ? "openAliPay" : "openWxPay";
        let payData = this.payTypeActived == 1 ? res.pay_url : res.pay_data;
        sendMessage(payFun, payData);
      } else if (device.system == "ios") {
        //ios走本地方法
        sendMessage("openInternalPurchase", this.comboActive);
      }
    },
    // 选择套餐
    combosActiveClick(item, index) {
      this.combosActive = index;
      this.comboActive = item;
    },

    // 切换支付方式
    paychange(val) {
      this.payTypeActived = val;
    },
    //当有次数之后,点击加速按钮发起请求
    async turnSpeedUp() {
      let storage = JSON.parse(this.info);
      //发起请求
     const [res,err] = await this.$http
        .post("/api/v6.Aipainting/putTask", {
          ...storage,
          uuid: this.userinfo.uuid,
          platform: device.system,
        })
        setTimeout(()=>{
          if(err){
          if(err.code == "6010"){
            this.shadow = true
            return
          }
          //成功重新获取表单
          this.getList();
          //移除存储的数据
          localStorage.removeItem("SubmitMessage");
          //关闭弹窗
          this.buySuccess = false
        }
        },1000)
        // .then((res) => {
        //   //当不是返回的错误码时，再次发起获取结果的请求
        //   if (res.status == 1) {
        //     this.getList();
        //     localStorage.removeItem("SubmitMessage");
        //     this.buySuccess = false; //提交成功之后关闭加速弹窗
        //   }
        //   console.log(res, "是否提交成功");
        // })
    },
    //人数倒计时
    countDowm() {
      if (this.info !== null) {
        let p = document.getElementById("peopleCount");
        let people = 248078;
        let count = setInterval(() => {
          people--;
          p.innerHTML = `${people}人在您前面`;
        }, 2000);
        if (people == 20000 || this.info == null) {
          clearInterval(count);
        }
      }
    },
  },
};
</script>

<style scoped>
.wrapper /deep/ .van-list{
  min-height: 80vh;
}
.wrapper {
  padding: 0.2667rem 0.4267rem;
  box-sizing: border-box;
}

.current {
  width: 9.12rem;
  height: 1.28rem;
  background: linear-gradient(135deg, #506cff 0%, #66c3ff 51%, #33e1d7 100%);
  border-radius: 0.32rem;
  color: #fff;
  font-size: 0.4267rem;
  margin-bottom: 0.2667rem;
  padding: 0 0.2933rem;
  box-sizing: border-box;
  justify-content: space-between;
}
.notVip {
  background: linear-gradient(160deg, #fffef4 0%, #ffd4da 100%);
}
.notVip h4 {
  margin-left: 0.5333rem;
  line-height: 1.28rem;
  font-size: 0.4267rem;
  color: #000;
}
.turnBuy {
  width: 1.8667rem;
  height: 0.7733rem;
  background: linear-gradient(160deg, #ffa985 0%, #ff4370 100%);
  border-radius: 0.2133rem;
  margin-left: 6.0267rem;
  margin-top: -1rem;
  text-align: center;
  line-height: 0.7733rem;
  font-size: 0.32rem;
  font-weight: 600;
  color: #fff;
}
.delBtn {
  margin-left: 8rem;
  margin-top: -0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("@/assets/img/4.png");
  background-size: 100% 100%;
}
.png4 {
  width: 0.8rem;
  height: 0.8rem;
}

.error {
  background: #ff5353;
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
  color: #fff;
  z-index: 9999;
  margin-bottom: 0.2667rem;
  height: 1.1733rem;
  font-size: 0.5333rem;
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
  column-gap: 0.2667rem;
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
  padding-right: 0.0667rem;
}

.img-container:nth-child(2n) {
  /* padding-left: .0667rem; */
  padding-right: 0.1333rem;
  /* margin-left: -12px; */
}

.img-container .img-style {
  width: 100%;
  border: 1px solid #000;
  border-radius: 0.32rem;
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
  height: 0.6667rem;
  background: #000000;
  border-radius: 0.4rem;
  color: #ffffff;
  font-size: 0.32rem;
  position: absolute;
  bottom: 0.4667rem;
  right: 0.2667rem;
}

.newimg {
  width: 1.0667rem;
  height: 0.5333rem;
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
  width: 1.28rem;
  height: 1.28rem;
  margin-bottom: 0.16rem;
}

.text {
  color: #656f7c;
  font-size: 0.32rem;
  margin-bottom: 0.5333rem;
}

.btn {
  width: 2.9867rem;
  height: 1.0667rem;
  background: linear-gradient(135deg, #506cff 0%, #66c3ff 51%, #33e1d7 100%);
  border-radius: 0.2133rem;
  margin: 0 auto;
  color: #ffffff;
  font-size: 0.4267rem;
  text-align: center;
  line-height: 1.0667rem;
}

.popup {
  width: 6.6933rem;
  height: 3.7867rem;
  border-radius: 0.2133rem;
  background-image: url(@/assets/img/5.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.pop-title {
  font-size: 0.4267rem;
  color: #000000;
  font-weight: 600;
  padding-top: 0.7467rem;
  text-align: center;
  margin-bottom: 0.8533rem;
}

.pop-btn {
  width: 2.6933rem;
  height: 1.0667rem;
  background: rgba(49, 55, 62, 0.1);
  border-radius: 0.2133rem;
  color: #000;
  font-weight: bold;
  font-size: 0.4267rem;
}

.pop-btn2 {
  background: linear-gradient(135deg, #506cff 0%, #66c3ff 51%, #33e1d7 100%);
  color: #fff;
  margin-left: 0.3467rem;
}
.popup-header {
  position: relative;
  width: 100%;
  height: 3.8667rem;
  background-image: url("@/assets/img/popup/2.png");
  z-index: -1;
}

.popup-header span {
  position: absolute;
  left: 0.4267rem;
  top: 0.1867rem;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("@/assets/img/popup/5.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.popup-header h4 {
  line-height: 1.2933rem;
  text-align: center;
  font-size: 0.5333rem;
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
.popup-price {
  position: relative;
  width: 2.9067rem;
  height: 3.4933rem;
  margin-right: -0.04rem;
  margin-top: -1.8933rem;
  background: #31373e;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.32rem;
  z-index: 9999;
  color: #fff;
}

.popup-price h3 {
  text-align: center;
  font-weight: normal;
  font-size: 0.3733rem;
  padding-top: 0.7467rem;
  /* color: #fff; */
}

.popup-price h4 {
  padding-top: 0.2133rem;
  font-weight: normal;
  text-align: center;
  /* color: #fff; */
  font-size: 0.32rem;
}

.popup-price h4 span {
  font-weight: 600;
  font-size: 0.6933rem;
}

.popup-price h5 {
  padding-top: 0.16rem;
  font-weight: normal;
  font-size: 0.32rem;
  text-align: center;
  /* color: #fff; */
}

/* 第一幅图的推荐购 */
.tuijian {
  position: absolute;
  left: -0.0267rem;
  top: -0.0133rem;
  width: 1.4933rem;
  height: 0.64rem;
  background: #ff5353;
  border-top-left-radius: 0.32rem;
  border-bottom-right-radius: 0.32rem;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.64rem;
  color: #fff;
  font-weight: normal;
}

/* 支付选择项动态样式 */
.popuppricechoosepublic {
  background: linear-gradient(135deg, #a4b2ff 0%, #a9ddff 51%, #99fff9 100%);
  color: #000 !important;
}
.buy {
  margin-top: 0.5333rem;
  height: 1.28rem;
  border-radius: 0.32rem;
  background: linear-gradient(135deg, #506cff 0%, #66c3ff 51%, #33e1d7 100%);
  text-align: center;
  line-height: 1.28rem;
  color: #fff;
  font-size: 0.4267rem;
  font-weight: 600;
}
.paypal-outside {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}

.paypal {
  position: relative;
  margin-top: 0.4rem;
  width: 2.32rem;
  height: 0.5333rem;
}

.zfb {
  position: absolute;
  top: 0.2667rem;
  /* margin-left: .64rem; */
  width: 0.5333rem;
  height: 0.5333rem;
  background-repeat: no-repeat;
  background-size: contain;
}

.paypal span {
  display: block;
  position: absolute;
  top: 0.3333rem;
  padding-left: 0.6667rem;
  white-space: nowrap;
  width: 0.96rem;
  height: 0.4533rem;
  font-size: 0.32rem;
  color: #fff;
  margin-left: 0.1067rem;
}

.true {
  position: absolute;
  left: 2.5333rem;
  top: 0.3067rem;
  width: 0.4267rem;
  height: 0.4267rem;
  /* margin-left: 1.3333rem;
  margin-top: -.1067rem; */
}
.buySuccess {
  z-index: 9999;
  width: 6.6933rem;
  height: 4.96rem;
  border-radius: 0.4267rem;
  background: #fff;
}
.buySuccess-top {
  width: 100%;
  height: 2.5867rem;
  background-image: url("@/assets/img/making-img/3.png");
  background-size: 100% 100%;
}
.buySuccess-top h4 {
  font-size: 0.5333rem;
  text-align: center;
  padding-top: 0.96rem;
}
.buySuccess-top h5 {
  text-align: center;
  font-size: 0.3733rem;
  font-weight: normal;
  padding-top: 0.16rem;
  color: #7d808d;
}
.buySuccess-bottom {
  width: 2.96rem;
  height: 1.0667rem;
  border-radius: 0.2133rem;
  background: linear-gradient(135deg, #506cff 0%, #66c3ff 51%, #33e1d7 100%);
  margin: 0.7733rem auto 0.5333rem;
  text-align: center;
  line-height: 1.0667rem;
  color: #fff;
  font-size: 0.3733rem;
  font-weight: 600;
}
</style>
