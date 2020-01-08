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
    var show=1;
    this.Base.setMyData({
      show
    })
    super.onLoad(options);
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var memberapi = new MemberApi();
console.log('所得税')
    memberapi.xiangqin({
      id: this.Base.options.id
    }, (xiangqinlist) => {
      this.Base.setMyData({
            xiangqinlist
       
        })
       
    })
 }


  aa(e){
    var type = e.currentTarget.id

    console.log(e, '节点值', type, '获取节点值');
    this.Base.setMyData({
      show:0
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;

body.onMyShow = content.onMyShow;
body.aa=content.aa;
Page(body)