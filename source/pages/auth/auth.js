  import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = false;
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom, 
      isgrantuser: false,
      isgrantphonenumber: false

    })
   
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '找谁玩',
    });
  }
  onMyShow() {
    var that = this;
    var memberInfo=this.Base.getMyData().memberinfo

    this.Base.setMyData({
      memberInfo
    })
  }
  
  getUserInfo(){
    AppBase.UserInfo.openid = undefined;
    this.Base.setMyData({ isgrantuser:true})
  }

 

  detail(){
    console.log(AppBase.UserInfo,'ppp'); 
    wx.setStorage({
      key: "iknowvideotips",
      data: '2'
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var json = JSON.stringify(this.Base.getMyData().json)

    //不需要页面更新
    prevPage.setData({
      show:2
    })

      wx.navigateBack({

      })
  }

  

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getUserInfo = content.getUserInfo;
body.checkboxChange = content.checkboxChange;
body.detail = content.detail;
Page(body)