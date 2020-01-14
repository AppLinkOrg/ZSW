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
      },
      currentfenlei:{
        id:0,
        name:'推荐'
      }
    })
  }

  loadlist() {
    var cond={};
    var currentcity = this.Base.getMyData().currentcity;
    var currentfenlei=this.Base.getMyData().currentfenlei;
    if(currentcity.id!=-1){
      cond.city_id=currentcity.id;
    }

    if(currentfenlei.id!=0){
      cond.fenlei_id=currentfenlei.id;
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

    instapi.fenlei({}, (fenlei) => {
     fenlei.unshift({
       id:0,name:'推荐'
     })
    this.Base.setMyData({
      fenlei,seq:0
    })
    })

 
  }

  xiala(e){
    var show=this.Base.getMyData().show;
    this.Base.setMyData({show:show==1?0:1});
  }

  citychange(e) {
    var citylist = this.Base.getMyData().citylist;
    var currentcity=null;
    var currentfenlei=null;

    this.Base.setMyData({ye:e.currentTarget.dataset.current})

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
   
      currentfenlei = {
        id: 0,
        name: "推荐"
      }
    this.Base.setMyData({ currentcity, show: 1, seq: 0, currentfenlei});
    this.loadlist();
  }

  swichNav(e){
   var lei=this.Base.getMyData().videolist;
    var fenleilist=this.Base.getMyData().fenlei;
    var currentfenlei=null;
    this.Base.setMyData({seq:e.currentTarget.dataset.current})

    for(var i=0;i<fenleilist.length;i++){
      if(fenleilist[i].id==e.currentTarget.id){
        currentfenlei=fenleilist[i];
      }
    }
    if (currentfenlei == null) {
      currentfenlei = {
        id: 0,
        name: "推荐"
      }
    }
    this.Base.setMyData({currentfenlei,show:1});
    this.loadlist();

    console.log(e)
 }
  dian(e){ 
      wx.navigateTo({
        url: '/pages/video/video?id=' + e.currentTarget.id+'&member_id='+this.Base.getMyData().memberinfo.id,
     })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;

body.onMyShow = content.onMyShow;
body.loadlist = content.loadlist; 
body.xiala = content.xiala;
body.citychange = content.citychange;
body.swichNav=content.swichNav;
body.dian=content.dian;
Page(body)