import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    orders: []
  },

  onShow(options){//options只存在于onLoad中
    //判断有没有token
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    //获取页面栈内容
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1]
    const {type} = currentPage.options
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },

  //获取订单列表
  getOrders(type){
    request({url:'/my/orders/all',data:{type}}).then(res => {
      this.setData({
        orders: res.orders.map(v=>({...v,create_time_cn:(new DataCue(v.create_time*1000).toLocaleString())}))
      })
    })
  },

  //点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail
    this.changeTitleByIndex(index)
    //重新发送请求
    this.getOrders(index+1)
  },

  changeTitleByIndex(index) {
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index ? v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }
})