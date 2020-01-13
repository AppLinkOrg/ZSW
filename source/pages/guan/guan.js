// pages/content/content.js
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
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      
    })
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var memberapi = new MemberApi();

    memberapi.aboutus({}, (aboutus) => {
      this.Base.setMyData({
        aboutus
      })
    })
  }
  hui() {
      wx.navigateBack({
      
      })
  }
  
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.hui=content.hui;
Page(body)