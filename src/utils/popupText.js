import store from "@/store";
import PopupTextComponent from '@/components/element/PopupText'
import PopupCheck from "@/components/element/PopupCheck";
import { createApp } from "vue";
import ElementPlus from 'element-plus'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'element-plus/dist/index.css'
import "@/utils/fontawsome";

function PopupText(type, text) {
  console.log("GET POPUP TEXT")
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode);
  createApp(PopupTextComponent)
    .use(store)
    .use(ElementPlus)
    .mount(mountNode)

  store.commit("popupTextStatus", {
    type: type,
    text: text
  });
  //定時拿掉組件
  const repeatRemove = setInterval(() => {
    console.log("count", store.state.popup.text.length)
    if (store.state.popup.text.length == 0) {
      clearInterval(repeatRemove);
    } else {
      store.commit("removePopupText", {
        index: store.state.popup.text.length - 1,
      });
      return
    }
    document.body.removeChild(mountNode);
  }, 4 * 1000);//4秒
}

let popup_comfire_aciton = {}
const mountNode = document.createElement('div')
let app = null

function PopupComfire(text) {
  store.commit("popupComfireStatus", {
    status: true,
    text: text
  });
  document.body.appendChild(mountNode)
  app = createApp(PopupCheck)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .provide('PopupAction', popupComfireAction)
  app.mount(mountNode)
  //使得該組建呼叫的到這裡的function跟狀態
  const comfirm = new Promise((resolve, reject) => {
    //保存
    popup_comfire_aciton = {
      resolve,
      reject
    };
  });
  return comfirm;
}


function popupComfireAction(type) {
  //真正執行promise的部分
  if (type) {
    popup_comfire_aciton.resolve();
  } else {
    popup_comfire_aciton.reject();
    //清除
  }
  app.unmount(mountNode)
  document.body.removeChild(mountNode)
}






export default {
  PopupText,
  PopupComfire,
}