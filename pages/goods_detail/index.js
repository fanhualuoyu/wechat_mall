import {request} from "../../request/index.js"
import {showToast} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: [],
    isCollect: false
  },
  //商品对象
  GoodsInof: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1]
    let options = currentPage.options
    
    const {goods_id} = options
    this.getGoodsDetail(goods_id);
    
  },

  //获取商品详细信息
  getGoodsDetail(goods_id) {
    request({url:'/goods/detail',data:{goods_id}})
      .then(res => {
        const goodsObj = res.data.message;
        this.GoodsInof = goodsObj;
        //获取商品缓存中的商品收藏的数组
        let collect = wx.getStorageSync("collect")||[]
        //判断商品是否收藏
        let isCollect = collect.some(v => v.goods_id===this.GoodsInof.goods_id)
        this.setData({
          goodsObj:{
            goods_name:goodsObj.goods_name,
            goods_price:goodsObj.goods_price,
            //iphone手机不识别webp图片格式
            //最好找到后台，让他进行修改
            goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics:goodsObj.pics
          },
          isCollect
        })
      })
  },

  //点击轮播图放大预览
  handlPreviewImage(e) {
    const urls = this.GoodsInof.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url
    wx.previewImage({ 
      current,
      urls
    });
  },

  //添加到购物车
  handleCartAdd() {
    //1.获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    //2.判断商品是否在数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInof.goods_id)
    if(index===-1) {
      //不存在
      this.GoodsInof.num=1;
      this.GoodsInof.checked=true;
      cart.push(this.GoodsInof);
    }else {
      //已经存在
      cart[index].num++;
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },

  //点击收藏
  handleCollect() {
    let isCollect = false
    //获取缓存中的商品收藏
    let collect = wx.getStorageSync("collect")||[];
    //判断该山滚是否收藏
    let index = collect.findIndex(v => v.goods_id===this.GoodsInof.goods_id)
    //当index!=-1表示已经收藏过了
    if(index!=-1) {
      collect.splice(index,1)
      isCollect = false
      showToast({title:"取消成功"})
    }else {
      collect.push(this.GoodsInof)
      isCollect = true
      showToast({title:"收藏成功"})
    }
    //数组存入到缓存中
    wx.setStorageSync("collect",collect)
    //修改data中的属性 isCollect
    this.setData({
      isCollect
    })
  }
})