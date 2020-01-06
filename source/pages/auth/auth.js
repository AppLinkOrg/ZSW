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


  // getUserInfo(e) {
  //   var xuanze = this.Base.getMyData().xuanze;
  //   console.log(xuanze);
  //   console.log(666666666);
  //   var that = this;
  //   for(var i=0;i<xuanze.length;i++){
  //     console.log(xuanze[i])
  //     if(xuanze[i] == 'wx'){
  //       // wx.login({
  //       //   success: res => {
  //       //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       //     console.log(res);
  //       //     wx.getUserInfo({
  //       //       success: userres => {
  //       //         AppBase.UserInfo = userres.userInfo;
  //       //         console.log('哈哈哈哈哈哈')
  //       //         console.log(userres);

  //       //         var memberapi = new MemberApi();
  //       //         memberapi.getuserinfo({
  //       //           code: res.code,
  //       //           grant_type: "authorization_code"
  //       //         }, data => {
  //       //           console.log("here");
  //       //           console.log(data);
  //       //           AppBase.UserInfo.openid = data.openid;
  //       //           AppBase.UserInfo.session_key = data.session_key;
  //       //           console.log(AppBase.UserInfo);
  //       //           ApiConfig.SetToken(data.openid);
  //       //           console.log("goto update info");
  //       //           memberapi.update(AppBase.UserInfo, (ret) => {
  //       //             console.log("member update");
  //       //             console.log(ret);
  //       //           });


  //       //           console.log(AppBase.UserInfo);
  //       //           that.Base.setMyData({
  //       //             UserInfo: AppBase.UserInfo
  //       //           });
  //       //           that.onMyShow();
                 
  //       //           //that.Base.getAddress();
  //       //         });
  //       //       },
  //       //       fail: res => {
  //       //         console.log(res);
  //       //         //that.Base.gotoOpenUserInfoSetting();
  //       //         if (this.Base.needauth == true) {
  //       //           wx.redirectTo({
  //       //             url: '/pages/auth/auth',
  //       //           });
  //       //         } else {
  //       //           that.onMyShow();
  //       //         }
  //       //         //that.Base.getAddress();
  //       //       }
  //       //     });
  //       //   }
  //       // })
  //     } else if (xuanze[i] =='mobile') {
       
  //     }
  //   }
     

  //   //open-type="getUserInfo" bindgetuserinfo="getUserInfo"

  // }

  detail(){
    console.log(AppBase.UserInfo,'lll')
    // if(){
      // wx.navigateTo({
      //   url: '/pages/shipin/shipin?id=' + that.Base.options.id,
      // });
    // }
    
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