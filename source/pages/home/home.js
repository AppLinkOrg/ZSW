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
    var menberInfo= this.Base.getMyData().memberinfo

    this.Base.setMyData({
      menberInfo
    })
  
    
    // instapi.city({}, (indexbanner) => {
    //   this.Base.setMyData({ indexbanner });
    // });


  }
  dian() {
    wx.navigateTo({
      url: '/pages/guan/guan',
    })
  }
  shou(){
    wx.navigateTo({
      url: '/pages/shoucang/shoucang',
    })
  }
  guan(){
    wx.navigateTo({
      url: '/pages/jilu/jilu',
    })
  }
  hui() {
    wx.navigateTo({
      url: 'B?id=1'
    })
  }
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.dian = content.dian;
body.hui = content.hui; 
body.shou=content.shou;
body.guan=content.guan;
Page(body)