import _ from "axios";
import { Toast } from 'vant';
import 'vant/lib/toast/style';
const axios = _.create({
    baseURL: 'http://video.chucitech.cn/123',
    // process.env.NODE_ENV === "development"
    //   ? "http://cat.fwyouni.com/api"
    //   : process.env.REACT_APP_PROXY,
    headers: {
        "Content-Type": "application/json",
    },
});

// 发送拦截器
axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => [error.toString()]
);

// 接收拦截器
axios.interceptors.response.use(
    (res) => {
        const {
            status,
            data: { status: code, msg = "请求出错了，请稍后再试", result },
        } = res;

        if (status !== 200) {
            Toast(`连接失败 code:${status}`);
            return [`连接失败 code:${status}`];
        }

        if (code != 1) {
            if (code != '6010' && code != '6011') {
                Toast(msg);
            }
            return [{ code: code }];
        }

        return [null, result];
    },
    (error) => {
        const { response } = error;

        if (!response) {
            Toast("未连接到服务器");
            return ["未连接到服务器"];
        }

        if (response && response.status) {
            Toast("请求错误");

            // 还是需要返回错误原信息,因为接口需要传递发送信息与接口的信息
            return ["请求错误"];
        }
    }
);

export default axios;