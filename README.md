## 一、wechat的模板语法

### 1.数据绑定

> 1. text标签相当于以前的web中的span标签，行内元素 不会换行
> 2. view标签相当于以前的web中的div标签，块状元素 会换行
> 3. checkbox标签相当于以前的复选框

```html
<text>1</text>
<view>2</view>

<!-- 1.字符串 -->
<view>{{message}}</view>

<!-- 2.数字类型 -->
<view>{{number}}</view>

<!-- 3.boolean类型 -->
<view>{{isGirl}}</view>

<!-- 4.对象类型 -->
<view>{{person.age}}</view>

<!-- 5.在标签的属性中使用 -->
<view data-num="{{num}}">自定义属性</view>

<!-- 6.使用bool类型充当属性checked -->
<view>
  <checkbox checked="{{isChecked}}"></checkbox>
</view>
```

### 2.运算

```html
<!-- 
  7 运算 => 表达式
    1 可以在花括号中 加入 表达式 --  “语句”
    2 表达式
      指的是一些简单 运算 数字运算 字符串 拼接  逻辑运算。。
      1 数字的加减。。
      2 字符串拼接
      3 三元表达式 
    3 语句
      1 复杂的代码段
        1 if else
        2 switch
        3 do while 。。。。
        4 for 。。。
 -->
<view>{{1+1}}</view>

<view>{{'1'+'1'}}</view>

<view>{{ 11%2===0 ? '偶数' : '奇数' }}</view>
```

### 3.列表渲染

> * 列表循环

> 1. wx:for="{{数组或者对象}}" wx:for-item="循环项的名称" wx:for-index="循环项的索引"
>
> 2. wx:key="唯一的值" 用来提高列表渲染的性能
>
>    1. wx:key 绑定一个普通的字符串的时候 那么这个字符串名称 肯定是 循环数组 中的 对象的 唯一属性
>
>    2. wx:key ="*this" 就表示 你的数组 是一个普通的数组 *this 表示是 循环项 
>
>       ​    [1,2,3,44,5]
>
>       ​    ["1","222","adfdf"]
>
> 3. 当出现 数组的嵌套循环的时候 尤其要注意 以下绑定的名称 不要重名
>
>    ​    wx:for-item="item" wx:for-index="index"
>
> 4. 默认情况下 我们 不写
>
>    ​    wx:for-item="item" wx:for-index="index"
>
>    ​    小程序也会把 循环项的名称 和 索引的名称 item 和 index 
>
>    ​    只有一层循环的话 （wx:for-item="item" wx:for-index="index"） 可以省略

> * 对象循环

> 1. wx:for="{{对象}}" wx:for-item="对象的值" wx:for-index="对象的属性"
>
> 2. 循环对象的时候 最好把 item和index的名称都修改一下
>
>       wx:for-item="value" wx:for-index="key"

```html
 <view>
   <view 
  wx:for="{{list}}"
  wx:for-item="item"
  wx:for-index="index"
  wx:key="id"
   >
     索引：{{index}}
     --
     值:{{item.name}}
   </view>
 </view>

 <view>
   <view>对象循环</view>
   <view 
  wx:for="{{person}}"
  wx:for-item="value"  
  wx:for-index="key"
  wx:key="age"
  >
     属性:{{key}}
     --
     值:{{value}}
   </view>
 </view>
```



### 4.block

>* 占位符的标签
>* 写代码的时候 可以看到这标签存在
>* 页面渲染 小程序会把它移除掉

```html
  <view>
    <block 
   wx:for="{{list}}"
   wx:for-item="item"
   wx:for-index="index"
   wx:key="id"
   class="my_list"
    >
      索引：{{index}}
      --
      值:{{item.name}}
    </block>
  </view>
```

### 5.条件渲染

> 1. wx:if="{{true/false}}"
>
>    ​    1 if , else , if else
>
>    ​    wx:if
>
>    ​    wx:elif
>
>    ​    wx:else 
>
> 2. hidden 
>
>    1. 在标签上直接加入属性 hidden 
>
>    2. hidden="{{true}}"
>
> 3. 什么场景下用哪个
>
>    1. 当标签不是频繁的切换显示 优先使用 wx:if
>
>       直接把标签从 页面结构给移除掉 
>
>    2. 当标签频繁的切换显示的时候 优先使用 hidden
>
>       通过添加样式的方式来切换显示 hidden 属性 不要和 样式 display一起使用

```html
   <view>
     <view>条件渲染</view>
     <view wx:if="{{true}}">显示</view>
     <view wx:if="{{false}}">隐藏</view>

     <view wx:if="{{flase}}">1</view>
     <view wx:elif="{{flase}}">2 </view>
     <view wx:else> 3 </view>

     <view>---------------</view>
     <view hidden >hidden1</view>
     <view hidden="{{false}}" >hidden2</view>

     <view>-----000-------</view>
     <view wx:if="{{false}}">wx:if</view>
     <view hidden  style="display: flex;" >hidden</view>
   </view>
```

### 6.事件绑定

```html
<!-- 
  1 需要给input标签绑定 input事件 
    绑定关键字 bindinput
  2 如何获取 输入框的值 
    通过事件源对象来获取  
    e.detail.value 
  3 把输入框的值 赋值到 data当中
    不能直接 
      1 this.data.num=e.detail.value 
      2 this.num=e.detail.value 
    正确的写法
      this.setData({
        num:e.detail.value 
      })
  4 需要加入一个点击事件 
      1 bindtap
      2 无法在小程序当中的 事件中 直接传参 
      3 通过自定义属性的方式来传递参数
      4 事件源中获取 自定义属性
 -->
<input type="text" bindinput="handleInput" />
<button bindtap="handletap" data-operation="{{1}}" >+</button>
<button bindtap="handletap" data-operation="{{-1}}">-</button>
<view>  
  {{num}}
</view>
```

```js
Page({
  data: {
    num: 0
  },
  // 输入框的input事件的执行逻辑
  handleInput(e) {
    // console.log(e.detail.value );
    this.setData({
      num: e.detail.value
    })
  },
  // 加 减 按钮的事件
  handletap(e) {
    // console.log(e);
    // 1 获取自定义属性 operation
    const operation = e.currentTarget.dataset.operation;
    this.setData({
      num: this.data.num + operation
    })
  }
})
```

## 二、wechat样式

### 1. rpx

```css

/* 
1 小程序中 不需要主动来引入样式文件 
2 需要把页面中某些元素的单位 由 px 改成 rpx
  1 设计稿 750x
    750 px = 750 rpx 
    1 px = 1 rpx
  2 把屏幕宽度 改成 375px
    375 px = 750 rpx
    1 px = 2rpx
    1rpx = 0.5px
3 存在一个设计稿 宽度 414 或者 未知 page 
  1 设计稿 page 存在一个元素 宽度 100px
  2 拿以上的需求 去实现 不同宽度的页面适配 

  page px = 750 rpx
  1 px = 750 rpx / page
  100 px = 750 rpx * 100 / page 
  假设  page =  375px
4 利用 一个属性 calc属性  css 和 wxss 都支持 一个属性
  1 750 和 rpx 中间不要留空格
  2 运算符的两边也不要留空格
 */

 view{
   /* width: 200rpx; */
   height: 200rpx;
   font-size: 40rpx;
   background-color: aqua;
  /* 以下代码写法是错误  */
  /*  width:750 rpx * 100 / 375 ;  */
  width:calc(750rpx * 100 / 375);
 }
```

### 2.引入样式文件

```js
/* 
1 引入的 代码 是通过 @import 来引入
2 路径 只能写相对路径
 */
 @import "../../styles/common.wxss";
```

### 3.引入less文件

```less
/*
	1.现在插件easy less插件
	2.在设置中添加：
		"less.compile": {
        "outExt": ".wxss"
    }
	3.使用
*/

/* 1 定义less变量 */
@color:yellow;
text{
  /* 2 使用变量 */
  color:@color;
}

view{
  .vie1{
    text{
      color: red;
    }
  }
}

/* 导入 */
@import "../../styles/reset.less";
view{
  color: @themeColor;
}
.main{
  /* 
  1 less中 支持 两种注释  多行  单行
  2 wxss 不能写 单行注释 因为 写了 和没写是一样！！！
   */
  /* font-size: 200px; */
  // font-size: 400px;
}
```

## 三、常用组件

### 1.text

```html
<!-- 
  1 长按文字复制 selectable
  2 对文本内容 进行 解码
 -->
<text selectable decode>
  text &nbsp; 123 &lt;
</text>
```

### 2.view

```html
<!--相当于div-->
```

### 3.image

```html
<!-- 
  image 图片标签
  1 src 指定要加载的图片的路径
    图片存在默认的宽度和高度 320 * 240      原图大小是 200 * 100
  2 mode 决定 图片内容 如何 和 图片标签 宽高 做适配
    1 scaleToFill 默认值 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 
    2 aspectFit 保持宽高比 确保图片的长边 显示出来   页面轮播图 常用
    3 aspectFill 保持纵横比缩放图片，只保证图片的 短 边能完全显示出来。  少用
    4 widthFix 以前web的图片的 宽度指定了之后 高度 会自己按比例来调整   常用  
    5 bottom。。 类似以前的backgroud-position 
  3 小程序当中的图片 直接就支持 懒加载  lazy-load
    1 lazy-load 会自己判断 当 图片 出现在 视口  上下 三屏的高度 之内的时候  自己开始加载图片 
 -->
 <image mode="bottom" lazy-load src="https://tva2.sinaimg.cn/large/007DFXDhgy1g51jlzfb4lj305k02s0sp.jpg" />
```

```css
image{
  box-sizing: border-box;
  border: 1px solid red;

  width: 300px;
  height: 200px;
}
```

### 4.swiper

```html
<!-- 
  1 轮播图外层容器 swiper
  2 每一个轮播项 swiper-item
  3 swiper标签 存在默认样式
    1 width 100%
    2 height 150px    image 存在默认宽度和高度 320 * 240 
    3 swiper 高度 无法实现由内容撑开 
  4 先找出来 原图的宽度和高度 等比例 给swiper 定 宽度和高度
    原图的宽度和高度  1125 * 352 px
    swiper 宽度 / swiper  高度 =  原图的宽度  /  原图的高度
    swiper  高度  =  swiper 宽度 *  原图的高度 / 原图的宽度
    height: 100vw * 352 /  1125
  5 autoplay 自动轮播
  6 interval 修改轮播时间
  7 circular 衔接轮播
  8 indicator-dots 显示 指示器 分页器 索引器 
  9 indicator-color 指示器的未选择的颜色 
  10 indicator-active-color 选中的时候的指示器的颜色 
 -->
<swiper autoplay interval="1000" circular indicator-dots indicator-color="#0094ff" indicator-active-color="#ff0094">
    <swiper-item> <image mode="widthFix" src="//gw.alicdn.com/imgextra/i1/44/O1CN013zKZP11CCByG5bAeF_!!44-0-lubanu.jpg" /> </swiper-item>
    <swiper-item> <image mode="widthFix" src="//aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg" /> </swiper-item>
    <swiper-item> <image mode="widthFix" src="//gw.alicdn.com/imgextra/i2/37/O1CN01syHZxs1C8zCFJj97b_!!37-0-lubanu.jpg" /> </swiper-item>
</swiper>

```

```css
/* pages/demo10/demo10.wxss */
swiper {
  width: 100%;
  /* height: calc(100vw * 352 /  1125); */
  height: 31.28vw;
}
image {
  width: 100%;
}
```

### 5.navigator

```html
<!-- 
  导航组件 navigator
  0 块级元素 默认会换行  可以直接加宽度和高度 
  1 url 要跳转的页面路径  绝对路径 相对路径
  2 target 要跳转到当前的小程序 还是其他的小程序的页面
    self 默认值 自己 小程序的页面 
    miniProgram 其他的小程序的页面
  3 open-type 跳转的方式
    1 navigate 默认值 	保留当前页面，跳转到应用内的某个页面，但是不能跳到 tabbar 页面
    2 redirect	关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到 tabbar 页面。
    3 switchTab	跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    4 reLaunch	关闭所有页面，打开到应用内的某个页面
 -->

 <navigator url="/pages/demo10/demo10"> 轮播图页面 </navigator>
 <navigator url="/pages/index/index"> 直接跳转到 tabbar页面 </navigator>
 <navigator open-type="redirect" url="/pages/demo10/demo10">  轮播图页面 redirect </navigator>
 <navigator open-type="switchTab" url="/pages/index/index">  switchTab直接跳转到 tabbar页面 </navigator>
 <navigator open-type="reLaunch" url="/pages/index/index">  reLaunch 可以随便跳 </navigator> 

```

### 6.rich-text

```html
<!-- 
  rich-text 富文本标签
  1 nodes属性来实现
    1 接收标签字符串 
    2 接收对象数组 
 -->
 <rich-text nodes="{{html}}"></rich-text>
```

```js
// pages/demo12/demo12.js
Page({
  data: {
    // 1 标签字符串 最常用的
    // html:'<div class="tpl-wrapper" data-tpl-id="m_h_v31icon_1" style="margin-top: -10px;"><div view-name="DFrameLayout" style="display: flex; overflow: hidden; height: 160px; width: 375px; place-self: flex-start; position: relative;"><div view-name="DView" style="display: flex; overflow: hidden; background-color: rgb(255, 255, 255); margin-top: 9px; height: 100%; width: 100%; top: 0px; left: 0px; position: absolute;"></div><div view-name="HImageView" style="display: flex; overflow: hidden; height: 100%; width: 100%; position: absolute;"><div style="width: 100%; height: 100%; background-image: url(&quot;https://gw.alicdn.com/tps/TB155AUPpXXXXajXVXXXXXXXXXX-1125-480.png_.webp&quot;); background-repeat: no-repeat; background-position: center center; background-size: contain;"></div></div><div view-name="DLinearLayout" aria-label="天猫" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 10px; margin-top: 13px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">天猫</div></div><div view-name="DLinearLayout" aria-label="聚划算" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 83.5px; margin-top: 13px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://img.alicdn.com/tfs/TB10UHQaNjaK1RjSZKzXXXVwXXa-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">聚划算</div></div><div view-name="DLinearLayout" aria-label="天猫国际" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 157px; margin-top: 13px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB11rTqtj7nBKNjSZLeXXbxCFXa-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">天猫国际</div></div><div view-name="DLinearLayout" aria-label="外卖" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 230.5px; margin-top: 13px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tps/TB1eXc7PFXXXXb4XpXXXXXXXXXX-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">外卖</div></div><div view-name="DLinearLayout" aria-label="天猫超市" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 304px; margin-top: 13px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB1IKqDtpooBKNjSZFPXXXa2XXa-183-144.png_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">天猫超市</div></div><div view-name="DLinearLayout" aria-label="充值中心" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 10px; margin-top: 84px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB1o0FLtyMnBKNjSZFoXXbOSFXa-183-144.png_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">充值中心</div></div><div view-name="DLinearLayout" aria-label="飞猪旅行" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 83.5px; margin-top: 84px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB15nKhtpkoBKNjSZFEXXbrEVXa-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">飞猪旅行</div></div><div view-name="DLinearLayout" aria-label="领金币" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 157px; margin-top: 84px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB1BqystrZnBKNjSZFrXXaRLFXa-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">领金币</div></div><div view-name="DLinearLayout" aria-label="拍卖" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 230.5px; margin-top: 84px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB1CMf4tlnTBKNjSZPfXXbf1XXa-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">拍卖</div></div><div view-name="DLinearLayout" aria-label="分类" style="display: flex; overflow: hidden; width: 61px; height: 67px; margin-left: 304px; margin-top: 84px; -webkit-box-orient: vertical; flex-direction: column; top: 0px; left: 0px; position: absolute;"><div view-name="HGifView" style="display: flex; overflow: hidden; width: 61px; height: 48px;"><div style="width: 100%; height: 100%; background-repeat: no-repeat; background-position: center center; background-size: contain; background-image: url(&quot;https://gw.alicdn.com/tfs/TB18P98tyQnBKNjSZFmXXcApVXa-183-144.png?getAvatar=1_.webp&quot;);"></div></div><div view-name="DTextView" style="display: inline-block; overflow: hidden; font-size: 11px; height: auto; margin-top: 5px; text-align: center; color: rgb(102, 102, 102); width: 61px; text-overflow: ellipsis; white-space: nowrap; line-height: 14px;">分类</div></div></div></div>'
    // 2 对象数组
    html:[
      {
        // 1 div标签 name属性来指定
        name:"div",
        // 2 标签上有哪些属性
        attrs:{
          // 标签上的属性 class  style
          class:"my_div",
          style:"color:red;"
        },
        // 3 子节点 children 要接收的数据类型和 nodes第二种渲染方式的数据类型一致 
        children:[
          {
            name:"p",
            attrs:{},
            // 放文本
            children:[
              {
                type:"text",
                text:"hello"
              }
            ]
          }
        ]
      }
    ]
  }
})
```

### 7.button

#### 7.1 标签作用：

```html
<!-- 
  button 标签
  1 外观的属性
    1 size 控制按钮的大小
      1 default 默认大小
      2 mini 小尺寸
    2 type 用来控制按钮的颜色
      1 default 灰色
      2 primary 绿色
      3 warn 红色
    3 plain  按钮是否镂空，背景色透明
    4 loading 文字前显示正在等待图标
 -->
 <button>默认按钮</button>
 <button size="mini">  mini 默认按钮</button>
 <button type="primary"> primary 按钮</button> 
 <button type="warn"> warn 按钮</button> 
 <button type="warn" plain> plain 按钮</button> 
 <button type="primary" loading> loading 按钮</button> 
```

#### 7.2开发能力

```html
 <!-- 

  button 开发能力
  open-type：
  1 contact 直接打开  客服对话功能  需要在微信小程序的后台配置   只能够通过真机调试来打开 
  2 share 转发当前的小程序 到微信朋友中   不能把小程序 分享到 朋友圈 
  3 getPhoneNumber 获取当前用户的手机号码信息 结合一个事件来使用  不是企业的小程序账号 没有权限来获取用户的手机号码 
    1 绑定一个事件 bindgetphonenumber 
    2 在事件的回调函数中  通过参数来获取信息 
    3 获取到的信息  已经加密过了 
      需要用户自己待见小程序的后台服务器，在后台服务器中进行解析 手机号码，返回到小程序中 就可以看到信息了
  4 getUserInfo 获取当前用户的个人信息
    1 使用方法 类似 获取用户的手机号码
    2 可以直接获取 不存在加密的字段 
  5 launchApp 在小程序当中 直接打开 app
    1 需要现在 app中 通过app的某个链接 打开 小程序
    2 在小程序 中 再通过 这个功能 重新打开 app
    3 找到 京东的app 和 京东的小程序  
  6 openSetting 打开小程序内置的 授权页面
    1 授权页面中 只会出现 用户曾经点击过的 权限 
  7 feedback 打开 小程序内置的 意见反馈页面 
    1 只能够通过真机调试来打开 

  -->
<button open-type="contact">contact</button>
<button open-type="share">share</button>
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">getPhoneNumber</button>
<button open-type="getUserInfo" bindgetuserinfo="getUserInfo">getUserInfo</button>
<button open-type="launchApp">launchApp</button>
<button open-type="openSetting">openSetting</button>
<button open-type="feedback">feedback</button>
```

### 8.icon

```html
<!-- 
  小程序中的字体图标
  1 type 图标的类型
    success|success_no_circle|info|warn|waiting|cancel|download|search|clear
  2 size 大小 
  3 color 图标的颜色
 -->
<icon  type="cancel" size="60" color="#0094ff"> </icon>
```

### 9.radio

```html
<!-- 
  radio 单选框
  1 radio标签 必须要和 父元素 radio-group来使用
  2 value 选中的单选框的值 
  3 需要给 radio-group 绑定 change事件 
  4 需要在页面中显示 选中的值
 -->
 <radio-group bindchange="handleChange">
   <radio color="red" value="male">男</radio>
   <radio color="red" value="female" >女</radio>
 </radio-group>

 <view>您选中的是:{{gender}}</view>
```

```js
Page({
  data: {
    gender: ""
  },
  handleChange(e){
    // 1 获取单选框中的值
    let gender=e.detail.value;
    // 2 把值 赋值给 data中的数据
    this.setData({
      // gender:gender
      gender
    })
  }
})
```

### 10.checkbox

```html
<view>
  <checkbox-group bindchange="handleItemChange">
    <checkbox value="{{item.value}}" wx:for="{{list}}" wx:key="id">
      {{item.name}}
    </checkbox>

  </checkbox-group>
  <view>
    选中的水果:{{checkedList}}
  </view>
</view>
```

```js
// pages/demo16/demo16.js
Page({
  data: {
    list:[
      {
        id:0,
        name:"🍎",
        value:"apple"
      },
      {
        id:1,
        name:"🍇",
        value:"grape"
      },
      {
        id:2,
        name:"🍌",
        value:"bananer"
      }
    ],
    checkedList:[]
  },
  // 复选框的选中事件
  handleItemChange(e){
    // 1 获取被选中的复选框的值
    const checkedList=e.detail.value;
    // 2 进行赋值
    this.setData({
      checkedList
    })
  }
})
```

## 四、自定义组件

### 1.使用组件过程

> * 导入组件：在.json文件中加入
>
> ```text
> {
>   "usingComponents": {
>     "Tabs":"../../components/Tabs/Tabs" 	//标签名：组件的路径
>   }
> }
> ```
>
> * 使用组件：
>
> ```html
> <!-- 
>   1 父组件(页面) 向子组件 传递数据 通过 标签属性的方式来传递
>     1 在子组件上进行接收
>     2 把这个数据当成是data中的数据直接用即可
>   2 子向父传递数据 通过事件的方式传递
>     1 在子组件的标签上加入一个 自定义事件
>   
>  -->
> <Tabs tabs="{{tabs}}" binditemChange="handleItemChange" >
> 
> <block wx:if="{{tabs[0].isActive}}">0 </block>
> <block wx:elif="{{tabs[1].isActive}}">1 </block>
> <block wx:elif="{{tabs[2].isActive}}">2 </block>
> <block wx:else>3</block>
>  
> </Tabs>
> ```

### 2.父组件向子组件传递信息

#### 2.1父传递

```html
<!-- 
  1 父组件(页面) 向子组件 传递数据 通过 标签属性的方式来传递
    1 在子组件上进行接收
    2 把这个数据当成是data中的数据直接用即可
  2 子向父传递数据 通过事件的方式传递
    1 在子组件的标签上加入一个 自定义事件
 -->
<Tabs tabs="{{tabs}}" binditemChange="handleItemChange" >

<block wx:if="{{tabs[0].isActive}}">0 </block>
<block wx:elif="{{tabs[1].isActive}}">1 </block>
<block wx:elif="{{tabs[2].isActive}}">2 </block>
<block wx:else>3</block>
 
</Tabs>
```

#### 2.2 子接收

```js
  properties: {
    // 要接收的数据的名称
    // aaa:{
    //   // type  要接收的数据的类型 
    //   type:String,
    //   // value  默认值
    //   value:""
    // }
    tabs:{
      type:Array,
      value:[]
    }
  }
```

#### 2.3子传递

```js
点击事件触发的时候 
触发父组件中的自定义事件 同时传递数据给  父组件  
this.triggerEvent("父组件自定义事件的名称",要传递的参数)
  */

//  2 获取索引
const {index}=e.currentTarget.dataset;
// 5 触发父组件中的自定义事件 同时传递数据给  
this.triggerEvent("itemChange",{index});
```

#### 2.4父接收

```js
	<Taps binditemChange="handleItemChange" ></Taps>  

// 自定义事件 用来接收子组件传递的数据的
  handleItemChange(e) {
    // 接收传递过来的参数
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
```

### 3.slot标签

```html
  <view class="tabs_content">
    <!-- 
      slot 标签 其实就是一个占位符 插槽
      等到 父组件调用 子组件的时候 再传递 标签过来 最终 这些被传递的标签
      就会替换 slot 插槽的位置 
     -->
    <slot></slot>
  </view>
```

## 五、小程序生命周期

### 1.应用生命周期

```js
//app.js
App({
  //  1 应用第一次启动的就会触发的事件  
  onLaunch() {
    //  在应用第一次启动的时候 获取用户的个人信息 
    // console.log("onLaunch");
    // aabbcc

    // js的方式来跳转 不能触发 onPageNotFound
    // wx.navigateTo({
    //   url: '/11/22/33'
    // });
      
  },

  // 2 应用 被用户看到 
  onShow(){
    // 对应用的数据或者页面效果 重置 
    // console.log("onShow");
  },
  // 3 应用 被隐藏了 
  onHide(){
    // 暂停或者清除定时器 
    // console.log("Hide");
  },
  // 4 应用的代码发生了报错的时候 就会触发
  onError(err){
    // 在应用发生代码报错的时候，收集用户的错误信息，通过异步请求 将错误的信息发送后台去
    // console.log("onError");
    // console.log(err);
  },
  // 5 页面找不到就会触发 
  //  应用第一次启动的时候，如果找不到第一个入口页面 才会触发
  onPageNotFound(){
    // 如果页面不存在了 通过js的方式来重新跳转页面 重新跳到第二个首页
    // 不能跳到tabbar页面  导航组件类似  
    wx.navigateTo({
      url: '/pages/demo09/demo09' 
    });  
      
    // console.log("onPageNotFound");
  }
})
```

### 2.页面生命周期

```js
// pages/demo18/demo18.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    // onLoad发送异步请求来初始化页面数据 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    console.log("onReady");
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载 也是可以通过点击超链接来演示 
   * 
   */
  onUnload: function () {
    console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
    // 页面的数据 或者效果 重新 刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   * 需要让页面 出现上下滚动才行 
   */
  onReachBottom: function () {
    console.log("onReachBottom");
    // 上拉加载下一页数据 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage");
  },
  /**
   * 页面滚动 就可以触发 
   */
  onPageScroll(){
    console.log("onPageScroll");
  },
  /**
   * 页面的尺寸发生改变的时候 触发
   * 小程序 发生了 横屏竖屏 切换的时候触发 
   */
  onResize(){
    console.log("onResize");
  },
  /**
   * 1 必须要求当前页面 也是tabbar页面
   * 2 点击的自己的tab item的时候才触发
   */
  onTabItemTap(){
    console.log("onTabItemTap");
  }
})
```

