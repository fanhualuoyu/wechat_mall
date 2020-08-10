// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    imgs: [],
    textVal: ""
  },
  UploadImags: [],
  //点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index ? v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  //选择图片
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          //图片数组进行拼接
          imgs:[...this.data.imgs,...result.tempFilePaths]
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //移除图片
  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset
    let imgs = this.data.imgs
    imgs.splice(index,1)
    this.setData({
      imgs
    })
  },
  //文本框中的内容
  handleTextInput(e){
    this.setData({
      textVal: e.detail.value
    })
  },
  //提交图片
  handleSubmit(){
    const {textVal,imgs} = this.data
    if(!textVal.trim()) {
      //不合法
      wx.showToast({
        title: '输入不合法',
        duration: 1500,
        mask: true
      });
      return
    }

    wx.showLoading({
      title: "上传中...",
      mask: true
    });

    //判断有没有要上传的图片数组
    if(imgs.length!=0){
      imgs.forEach((v,i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: "file",
          success: (result)=>{
            let url = JSON.parse(result.data);
            this.UploadImags.push(url)
            
            if(i===imgs.length-1){
              wx.hideLoading();
              console.log("模拟提交了图片和文本内容");
              this.setData({
                textVal: "",
                imgs: []
              })
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      console.log("只提交文本");
    }
    
  }
})