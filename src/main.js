import { createApp} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
//引用ElementPlus样式
import 'element-plus/dist/index.css'
import i18n from "@/utils/i18n.js";
import store from './store';

import App from './App.vue'

const app = createApp(App);
//全局导入饿了么图标
app.use(ElementPlus)
    .use(i18n)
    .use(store)
    .mount('#app')
