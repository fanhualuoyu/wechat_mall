import {getSetting,chooseAddress,openSetting, showModel, showToast,login,requestPayment} from '../../utils/asyncWx.js'
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    order_number: '',
    pay: {}
  },

  onShow() {
    //获取到缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart")||[];
    //过滤后的购物车数组
    cart = cart.filter(v=>v.checked)
    this.setData({address});

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice += v.num*v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },

  //支付功能
  handleOrderPay() {
    //判断有没有token
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
    }else {
      console.log('已经存在token了');
    }
    //创建订单
    const header = {Authorization:token};
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderParams={order_price,consignee_addr,cart,goods}
    //准备发送请求，创建订单 获取订单编号
    request({url:'/my/orders/create',method:"POST",data:orderParams,header}).then(res => {      
      const {order_number} = res
      this.setData({order_number})
    })
    //发起预支付的接口
    requestPayment({url:'/my/orders/req_unifiedorder',method:"POST",header,data:{order_number}}).then(res => {
      const {pay} = res
      this.setData({
        pay
      })
    })
  }
})