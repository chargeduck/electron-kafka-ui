
import { app, BrowserWindow } from 'electron'
import path from 'path'

// 定义全局变量，获取窗口实例
let win ;

/**
 * 创建一个窗口
 */
const createWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            devTools: true,
            // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)

}

app.whenReady().then(() => {
    createWindow() // 创建窗口
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
