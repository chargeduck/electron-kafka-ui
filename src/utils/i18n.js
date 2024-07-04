import { createI18n } from "vue-i18n";
// 本地语言包
import enLocale from "@/store/i18n/en.js";
import zhCnLocale from "@/store/i18n/zhCN.js";

const messages = {
    zhCN: {
        ...zhCnLocale,
    },
    en: {
        ...enLocale,
    },
};
// 创建 i18n 实例
const i18n = createI18n({
    legacy: false,
    locale: 'zhCN',
    messages: messages,
    globalInjection: true,
});
// 导出 i18n 实例
export default i18n;
