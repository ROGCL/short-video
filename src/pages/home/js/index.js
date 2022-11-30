import promptList from './code.json'
export default {
    data() {
        return {
            // 智能拓展
            expandSetList: [{
                    id: 1,
                    text: "色彩狂化",

                },
                {
                    id: 2,
                    text: "面部强化"
                },
            ],
            // 步数设置
            setupSetList: [{
                    id: 1,
                    text: "常规",

                },
                {
                    id: 2,
                    text: "加长"
                },
            ],
            //艺术家
            artistList: [{
                    id: 1,
                    text: "夏加尔",
                    img: require("@/assets/img/artist/4.png"),
                    value: "by MarcelChagall"
                },
                {
                    id: 2,
                    text: "村上隆",
                    img: require("@/assets/img/artist/9.png"),
                     "value": "by MurakamiTakashi",
                },
                {
                    id: 3,
                    text: "穆夏",
                    img: require("@/assets/img/artist/6.png"),
                     "value": "by AlphonseMucha",
                },
                {
                    id: 4,
                    text: "毕加索",
                    img: require("@/assets/img/artist/2.png"),
                     "value": "by PabloPicasso",
                },
                {
                    id: 5,
                    text: "梵高",
                    img: require("@/assets/img/artist/7.png"),
                    "value": "by VincentvanGogh",
                },
                {
                    id: 6,
                    text: "莫奈",
                    img: require("@/assets/img/artist/1.png"),
                      "value": "by ClaudeMonet",
                },
                {
                    id: 7,
                    text: "保罗塞尚",
                    img: require("@/assets/img/artist/5.png"),
                    "value": "by PaulCezanne",
                },
                {
                    id: 8,
                    text: "托马斯科尔",
                    img: require("@/assets/img/artist/8.png"),
                    "value": "by ThomasCole",
                },
                {
                    id: 9,
                    text: "莫比乌斯",
                    img: require("@/assets/img/artist/3.png"),
                     "value": "by Moebius",
                }
            ],
            // 选择vip还是普通
            drawChanels: [{
                    id: 1,
                    img: require("@/assets/img/index-img/2.png"),
                    h5: "普通",
                },
                {
                    id: 2,
                    img: require("@/assets/img/index-img/1.png"),
                    h5: "VIP加速",
                    h6: "优先使用服务器制作",
                },
            ],
            //支付方式
            payType: [{
                    name: "支付宝",
                    id: 1,
                    icon: require("@/assets/img/popup/8.png"),
                },
                {
                    name: "微信",
                    id: 2,
                    icon: require("@/assets/img/popup/6.png"),
                },
            ],
            //tab栏
            tabs: [{
                    id: 2,
                    content: "漫画",
                    value: 'acgn_diffusion'
                }, {
                    id: 1,
                    content: "通用",
                    value: 'stable_diffusion'
                },
                // {
                //     id: 3,
                //     content: "写意",
                //     value: 'disco_diffusion'
                // },
            ],
            //风格选择
            styleList: [{
                    poster: require('@/assets/img/style/style1.png'),
                    text: "油画",
                    value: "very detailed oil painting, oil on canvas",
                    id: 1
                },
                {
                    poster: require('@/assets/img/style/style3.png'),
                    text: "虚幻引擎",
                    value: "unreal engine render, 8k",
                    id: 2
                },
                {
                    poster: require('@/assets/img/style/style4.png'),
                    text: "铅笔素描",
                    value: "milt kahl pencil sketch",
                    id: 3
                },
                {
                    poster: require('@/assets/img/style/style5.png'),
                    text: "水彩绘画",
                    value: "in watercolor gouache detailed paintings, insanely detail",
                    id: 4
                },
                {
                    poster: require('@/assets/img/style/style7.png'),
                    text: "纸浆科幻",
                    value: "style of 1950s pulp sci-fi cover",
                    id: 5
                },
                {
                    poster: require('@/assets/img/style/style17.png'),
                    text: "新海诚",
                    value: "by makoto shinkai",
                    id: 6
                },
                {
                    poster: require('@/assets/img/style/style18.png'),
                    text: "倪传婧",
                    value: "by victo ngai",
                    id: 7
                },
                {
                    poster: require('@/assets/img/style/style19.png'),
                    text: "像素画",
                    value: "64-bit pixel art",
                    id: 8
                },
                {
                    poster: require('@/assets/img/style/style20.png'),
                    text: "中国画",
                    value: "chinese ink-wash painting style",
                    id: 9
                },
                {
                    poster: require('@/assets/img/style/style21.png'),
                    text: "赛博朋克",
                    value: "hyper realistic cyberpunk style",
                    id: 10
                },
            ],
            //比例
            ratio: [{
                    id: '2',
                    img: require("@/assets/img/index-img/10.png"),
                    content: "1:1",
                    ratioval: '1'
                },
                {
                    id: '1',
                    img: require("@/assets/img/index-img/11.png"),
                    content: "3:4",
                    ratioval: '0.75'
                },
                {
                    id: '0',
                    img: require("@/assets/img/index-img/8.png"),
                    content: "4:3",
                    ratioval: '1.33'
                },
                {
                    id: '4',
                    img: require("@/assets/img/index-img/13.png"),
                    content: "9:16",
                    ratioval: '0.56'
                },
                {
                    id: '3',
                    img: require("@/assets/img/index-img/8.png"),
                    content: "16:9",
                    ratioval: '1.78'
                },
            ],
            //非vip提交成功字段
            noneVip:[{
                id:1,
                text:'知道了'
            },{
                id:2,
                text:'VIP加速'
            }],
            noneVips:[{
                id:1,
                text:'知道了'
            },{
                id:2,
                text:'点击加速'
            }],
            noneVipTips:[{
                id:1,
                text:'取消任务'
            }],
            promptList: promptList,
        }
    }
}