// pages/mymovie/mymovie.js
var db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    images: []
  },
  submit:function(){
    if(!this.data.images.length){
      wx.showToast({
        title: "请选择图片!",
        icon:'none'
      })
      return;
    }
    // 上传一张指定的图片 将图片的fileID保存起来  将留言和fileID存储到数据库中
    wx.showLoading({
      title: '正在上传中',
    });
    //直接获取images变量
    let item=this.data.images;
    console.log(item);
    let ext=/\.\w+$/.exec(item)[0];//正则对象不要加双引号要不就变成字符串了
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+ext,//上传云端的文件名
      filePath:item,
      success:res=>{
        console.log(res.fileID);
        db.collection("web1906_photo").add({
          data:{
            fileID:res.fileID,
            content:this.data.content
          }
        })
        wx.hideLoading();
        wx.showToast({
          title: '上传成功!'
        })
        this.data.images=[];
      }
    });
  },
  onContentChange: function (event) {
    this.setData({
      content: event.detail
    })
  },
  selectImg: function () {
    // 功能1: 获取用户选中图片交且保存images: { }
    // 1: 显示加载提示框
    // wx.showLoading({
    //   title: '图片上传中...',
    // })
    // 2: 选择一张图片
    // 3: 类型
    // 4: 来源
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        var file = res.tempFilePaths[0];
        this.setData({
          images: file    //将文件的云存储路径赋值给image变量，直接赋值 而不是push所以images就不是一个数组了  将原来的类型覆盖了 js是弱数据类型
        })

      },
    })
    // 5: 选择功能
    // 6: 将当前图片保存对象中
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})