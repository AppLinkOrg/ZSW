import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
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
    var memberapi = new MemberApi();
    memberapi.addshoucang({ 

    }, (addshoucang) => { 
      this.Base.setMyData({ addshoucang })
    });
  }
  hui() { 
    wx.navigateBack({
      delta: 2
    }) 
  }
  tovideo(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/video/video?id=' + id, 
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tovideo = content.tovideo; 
body.hui = content.hui; 
Page(body)