import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 0,
        value: "销量",
        isActive: false
      },
      {
        id: 0,
        value: "价格",
        isActive: false
      },
    ],
    goodsList: []
  },

  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodList();    
  },



  //获取商品列表的数据
  getGoodList(){
    request({url:"/goods/search",data:this.QueryParams})
      .then(res=>{
        const total = res.data.message.total
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
          goodsList : [...this.data.goodsList,...res.data.message.goods]
        })
        //关闭下拉刷新的效果
        wx.stopPullDownRefresh();
      })
  },

  //点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index ? v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },

  //上拉加载更多
  onReachBottom() {
    //判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages) {
      wx.showToast({
        title: '已经到底了'
      });
    }else {
      this.QueryParams.pagenum++;
      this.getGoodList();
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    });
    this.QueryParams.pagenum = 1;
    this.getGoodList();
  }

})