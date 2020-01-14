// pages/xiangqin/xiangqin.js
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
var WxParse = require('../../wxParse/wxParse');

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
    memberapi.xiangqin({id:this.Base.options.id}, (xiangqin)=>{
      xiangqin.content = that.Base.util.HtmlDecode(xiangqin.content);
      WxParse.wxParse('content', 'html', xiangqin.content, that, 10);
      this.Base.setMyData({ xiangqin})
    })

  }
  fav(e){
    var that = this;
    var xiangqin = this.Base.getMyData().xiangqin;
    var id = e.currentTarget.id; 
    var status = e.currentTarget.dataset.type;

    console.log('let me look', xiangqin, 'let me look')
    // return;
    var memberapi = new MemberApi();
    memberapi.shoucang({
      video_id: id,
      status: status
    }, (ret) => {
      xiangqin.isfav = status;
      this.Base.setMyData({ xiangqin })
    }); 
  }
  hui() { 
    wx.navigateBack({
      delta: 2
    }) 
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fav = content.fav;
body.hui = content.hui; 
Page(body)