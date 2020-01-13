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