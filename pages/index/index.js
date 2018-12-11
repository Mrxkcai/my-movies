//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies:[
    	{
    		images:{
    			large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
    		},
    		id:"1",
        key:"in_theaters"
    	},
    	{
    		images:{
    			large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
    		},
    		id:"2",
        key:"coming_soon"
    	},
    	{
    		images:{
    			large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
    		},
    		id:"3",
        key:"new_movies"
    	},
    	{
    		images:{
    			large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539863111.jpg"
    		},
    		id:"4",
        key:"top250"
    	}
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  
  /**
   * 生命周期函数-监听页面加载
   */
  
  onLoad: function () {
    /**
     * 加载电影
     */
    wx.showLoading({title:"拼命加载中..."});
    const task = this.data.movies.map(board => {
      return app.douban.find(board.key,1, 8)
      .then(res => {
        
        board.title = res.title
        board.movies = res.subjects
        return board
      })
      
    })
    
    /**
     * Promise在执行多个ajax请求时非常有用返回所有结果的一个数组
     */
    Promise.all(task).then(boards => {
      // console.log(boards)
      this.setData({movies:boards, loading:false}),
      wx.hideLoading()
    })
    
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
