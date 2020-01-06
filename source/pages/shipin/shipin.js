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
    // options.id=3;
    super.onLoad(options);
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var memberapi = new MemberApi();

    memberapi.xiangqin({ id: this.Base.options.id }, (xiangqinlist) => {
      this.Base.setMyData({
        xiangqinlist
      })
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
body.swichNav = content.swichNav;
body.dian = content.dian;
Page(body)