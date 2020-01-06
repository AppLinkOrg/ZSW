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
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '牛牛消毒',
    });
  }
  onMyShow() {
    var that = this;
  }
  checkPermission() {

  }

  checkboxChange(e) {
    console.log(e);
    console.log(e.detail.value)
    var xuanze = e.detail.value;
    for(var i=0;i<xuanze.length;i++){
      if(xuanze[i]=='wx'){
        var aa='wx'
      }else if(xuanze[i]=='mobile'){
        var aa = 'mobile'
      }
    }
    this.Base.setMyData({
      xuanze: xuanze,aa
    })
  }

  detail(){
    console.log(AppBase.UserInfo);
  
    if (AppBase.UserInfo.nickName == undefined) {
      wx.showToast({
        title: '请进行微信授权',
        icon: 'none'
      })
      return
    }
    if (AppBase.UserInfo.mobile==undefined){
      wx.showToast({
        title: '请绑定手机号码',
        icon:'none'
      })
      return
    }
   
    if (AppBase.UserInfo.mobile != '' && AppBase.UserInfo.nickName != ''){
      wx.redirectTo({
        url: '/pages/shipin/shipin?id='+this.Base.options.id,
      })
    }
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