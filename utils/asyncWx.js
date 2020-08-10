//Promise形式的getSetting
export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }    
    });
  })
}

//Promise形式的chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }    
    });
  })
}

//Promise形式的openSetting
export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }    
    });
  })
}

//弹出提示框
export const showModel = ({content}) => {
  return new Promise((reslove,reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

//提示信息
export const showToast = ({title}) => {
  return new Promise((resolve,reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: true,
      success: (result)=>{
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

//微信登录
export const login = () => {
  return new Promise((resolve,reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

//请求支付
export const requestPayment = (pay) => {
  return new Promise((reslove,reject) => {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: (result)=>{
        reslove(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}