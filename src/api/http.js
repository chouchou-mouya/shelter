//封裝axios跟api接口設定
import axios from "axios";
import base from "./base";
import store from "@/store";
import router from "@/router";
// import PopupText from "@/utils/popupText";


const service = axios.create(base.config)


//beforeRouter
router.beforeEach((to, from, next) => {
	if (to.matched.length == 0) {
		next({
			path: "/error"
		});
	} else {
		next();
	}
});


//request攔截器
service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

//response攔截器
let count_401 = 0
service.interceptors.response.use(
	res => {
		//loading
		count_401 = 0
		return res;
	},
	error => {
		if (axios.isCancel(error)) {
			// 取消，說明原因
			console.warn(error)
			console.table([error.message.split('---')[0]], 'cancel')
		}
		else if (error.response) {
			switch (error.response.status) {
				case 404:
					console.log("404,找不到頁面");
					break;
				case 500:
					console.log("500,伺服器出錯");
					break;
				case 503:
					console.log("503,服務失效");
					break;
				case 401:
					break;
				default:
					console.log(`錯誤代碼:${error.response.status}`);
			}
		}

		return Promise.reject(error);
	}
);

export default service;
