import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    //取消按钮是否显示
    isFocus: false,
    inpuValue: ''
  },

  TimeId:-1,
  //输入框的值改变了就会触发的事件
  handleInput(e) {
    const {value} = e.detail
    if(!value.trim()){
      this.setData({
        isFocus:false,
        goods:[]
      })
      return
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(()=>{
      request({url:"/goods/qsearch",data:{query:value}}).then(res=>{
        this.setData({
          goods: res.data.message
        })
      })
    },1000)    
  },
  //点击取消按钮
  handleCancel() {
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
    })
  }
})