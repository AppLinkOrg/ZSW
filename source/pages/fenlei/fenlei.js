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
      show:1,
      currentcity: {
        id: 3,
        name: "北京"
      }
    })
  }

  loadlist() {
    var cond={};
    var currentcity = this.Base.getMyData().currentcity;
    if(currentcity.id!=-1){
      cond.city_id=currentcity.id;
    }
    var memberapi = new MemberApi();
    memberapi.video(cond, (videolist) => {
      this.Base.setMyData({
        videolist
      })
    })
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var memberapi = new MemberApi();
    memberapi.city({}, (citylist) => {
      this.Base.setMyData({
        citylist
      })
    })

    this.loadlist();
  }

  xiala(e){
    var show=this.Base.getMyData().show;
    this.Base.setMyData({show:show==1?0:1});
  }

  citychange(e) {
    var citylist = this.Base.getMyData().citylist;
    var currentcity=null;
    for (var i = 0; i < citylist.length;i++){
      if(citylist[i].id==e.currentTarget.id){
        currentcity=citylist[i];
      }
    }
    if(currentcity==null){
      currentcity = {
        id: -1,
        name: "全部"
      };
    }
    this.Base.setMyData({currentcity,show:1});
    this.loadlist();
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;

body.onMyShow = content.onMyShow;
body.loadlist = content.loadlist; 
body.xiala = content.xiala;
body.citychange = content.citychange;
Page(body)