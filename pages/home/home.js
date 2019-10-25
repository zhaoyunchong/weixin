// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    start:10
  },
  loadMore:function(){
    wx.cloud.callFunction({
      name: "movelist1906",
      data: { "start": 0 }//参数
    })
      .then(res => { 
        var result=JSON.parse(res.result);
        console.log(result.subjects);
      this.setData({
        list:result.subjects
      }) })
      .catch(err => { console.log(err) })
  },
  details: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id);
    wx.navigateTo({
      url: `/pages/details1/details1?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //删除原来的的组件
    // wx.redirectTo({
    //   url: '',
    // });
    //保留原来的组件,可以返回
    
    
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
    var status;
    console.log(this.data.start);
    var start=this.data.start;;
    wx.cloud.callFunction({
      name: "movelist1906",
      data: { "start": start }//参数
    })
      .then(res => {
        var result = JSON.parse(res.result);
        console.log(result.subjects);
        if (result.subjects.length> 0) {
          this.data.start += 10;
        }
        console.log(this.data.start);
        // 拼接俩次的数据,再微信中使用数据为 this.data.变量名
        var rows=this.data.list.concat(result.subjects);
        this.setData({
          list: rows
        })
      })
      .catch(err => { console.log(err) })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})