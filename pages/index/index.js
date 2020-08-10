import {request} from "../../request/index.js"

Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //楼层数组
    floorList: []
  },
  //页面开始加载时就出发
  onLoad: function(options){
    //1.发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList : result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList(){
    const config = {
      url:'/home/swiperdata'
    }
    request(config).then(result => {
      this.setData({
        swiperList : result.data.message
      })
    })
  },
  //获取分类导航数据
  getCateList(){
    const config = {
      url:'/home/catitems'
    }
    request(config).then(result => {
      this.setData({
        catesList : result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    const config = {
      url:'/home/floordata'
    }
    request(config).then(result => {
      this.setData({
        floorList : result.data.message
      })
    })
  }
});