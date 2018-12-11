// pages/slide/slide.js 获取全局应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      movies:[
        {
          images:{
            large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
          },
          id:"1"
        },
        {
        	images:{
        		large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
        	},
          id:"2"
        },
        {
        	images:{
        		large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
        	},
          id:"3"
        }
      ],
      loading:true
  },

  //-从缓存中获取
  getCache (){
      return new Promise(resolve => {
        app.wechat.getStorage("last_splash_data")
        .then(res => {
          const {movies, express } = res.data
          
          if(movies && express > Date.now()){
            return resolve(res.data)
          }
          
          //-否则已经过期
          return resolve(null)
        })
        .catch(e => resolve(null))
      })
  },
  
  
  //-跳转立即体验
  handleStart (){
    wx.switchTab({
      url:"../index/index"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCache()
    .then(cache => {
      //-如果有缓存
      if(cache){
          this.setData({movies:cache.movies, loading:false})
      }
      
      //-否则进行请求数据
      app.douban.find('coming_soon', 1, 3)
      .then(d => {
        //-返回的数据进行负值
        this.setData({movies:d.subjects, loading:false})
        
        return app.wechat.setStorage("last_splash_data", {
          movies:d.subjects,
          express:Date.now() + 1 * 24 * 60 * 60 * 1000
        })
      })
      .then(() => {
        //-打印数据
        // console.log(this.data)
      })
      
    })
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