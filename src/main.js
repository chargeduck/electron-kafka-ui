import { createApp} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
//引用ElementPlus样式
import 'element-plus/dist/index.css'
import i18n from "@/utils/i18n.js";
// import {Buffer} from "buffer";
//
// if (typeof window.Buffer === "undefined") { // 判断当前环境是否有Buffer对象
//     window.Buffer = Buffer.buffer; // Buffer对象不存在则创建导入的buffer
// }

import App from './App.vue'

const app = createApp(App);
//全局导入饿了么图标
app.use(ElementPlus)
    .use(i18n)
    .mount('#app')
