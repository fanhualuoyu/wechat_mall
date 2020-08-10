import {getSetting,chooseAddress,openSetting, showModel, showToast} from '../../utils/asyncWx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    //获取到缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[];
    //全选
    this.setData({
      address
    })
    this.setCart(cart)
  },

  //1.点击获取收货地址
  handleChooseAddress(){
    //1.获取权限状态
    // wx.getSetting({
    //   success: (result)=>{
    //     //获取权限状态
    //      const scopeAddress = result.authSetting["scope.address"];
    //      if(scopeAddress===true||scopeAddress===undefined) {
    //        wx.chooseAddress({
    //          success: (result1)=>{
               
    //          }
    //        });
    //      } else {
    //        //用户以前拒绝过授予权限
    //        wx.openSetting({
    //          success: (result2)=>{
    //            //调用收货地址接口
    //           wx.chooseAddress({
    //             success: (result3)=>{
                  
    //             }
    //           });
    //          }
    //        });
    //      }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });

    try {
      getSetting()
      .then((result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined) {
          chooseAddress()
            .then((result) => {
              result.all = result.provinceName+result.cityName+result.countyName+result.detailInfo;
              wx.setStorageSync("address",result);
            })
        }else {
          //诱导打开授权页面
          openSetting()
            .then((result) => {
              chooseAddress()
                .then((result) => {
                  result.all = result.provinceName+result.cityName+result.countyName+result.detailInfo;
                  wx.setStorageSync("address",result);
                })
            })
        }
      })
    } catch (error) {
      console.log(error);
    }
  },

  //2.商品选中
  handleItemChange(e) {
    //获取要修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取到所有商品信息
    let {cart} = this.data;
    //获取到被修改的商品对象的索引
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //修改选中的状态
    cart[index].checked = !cart[index].checked
    //重新设置购物车参数
    this.setCart(cart)
  },

  //设置购物车状态
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked) {
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else {
        allChecked = false
      }
    })
    allChecked = cart.length!=0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart)
  },

  //全选功能
  handleItemAllChange() {
    let {cart,allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked=allChecked)
    this.setCart(cart);
  },

  //商品数量的增减
  handleItemNumEdit(e) {
    const {operation,id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if(cart[index].num === 1 && operation === -1){
      showModel({content:"你是否要删除？"})
        .then(res => {
          if(res.confirm) {
            cart.splice(index,1)
            this.setCart(cart)
          }
        })
    }else{
      cart[index].num += operation
      this.setCart(cart);
    }
  },

  //商品的结算
  handlePay() {
    const {address,totalNum} = this.data
    if(!address.userName) {
      //有收货地址
      showToast({title:'您还没有选择收货地址'});
      return;
    }
    if(totalNum === 0){
      showToast({title:'您还没有选购商品'})
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',      
    });
  }

})