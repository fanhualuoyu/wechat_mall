import {request} from '../../request/index.js'
import {login} from '../../utils/asyncWx.js'

Page({
  //获取用户信息
  handleGetUserInfo(e) {    
    //获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail;
    //获取code值
    login().then(res=>{
      const {code} = res
    })
    const loginParmas = {encryptedData,rawData,iv,signature,code}
    //发送请求
    request({url:'/users/wxlogin',data:loginParmas,method:"post"}).then(res => {
      const {token} = res
    })
    //把token存入缓存中，同时跳转回上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
  }
})