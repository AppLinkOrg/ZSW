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
    var show = 1;
    var xian=true;
    this.Base.setMyData({
      show,
      xian
    })
    super.onLoad(options);
    var touchStartX = 0; //触摸时的原点  
    var touchStartY = 0; //触摸时的原点  
    var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动  
    var interval = ""; // 记录/清理时间记录  
    var touchMoveX = 0; // x轴方向移动的距离
    var touchMoveY = 0; // y轴方向移动的距离
    this.Base.setMyData({
      touchStartX,
      touchStartY,
      time,
      interval,
      touchMoveX,
      touchMoveY,
    })
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


    memberapi.video({
      id: this.Base.options.id
    }, (video) => {
      var v = [];
      for (var i = 0; i < video.length; i++) {
        if (i < 3) {
          v.push(video[i]);
        }
      }
      this.Base.setMyData({



        video: v,
        idxd: 0,
        list: video

      })

    })
  }


  aa(e) {
    var type = e.currentTarget.id

    console.log(e, '节点值', type, '获取节点值');
    this.Base.setMyData({
      show: 0
    })
  }

  touchStart(e) {
    var that = this;
    var time = this.Base.getMyData().time;
    console.log(time);
    console.log("hhaha");
    var touchStartX = e.touches[0].pageX; // 获取触摸时的原点  
    var touchStartY = e.touches[0].pageY; // 获取触摸时的原点  
    // 使用js计时器记录时间    
    var interval = setInterval(() => {
      that.Base.setMyData({

        time: time++
      })

    }, 100);
    this.Base.setMyData({
      touchStartX,
      touchStartY,
      interval
    })
  }
  touchMove(e) {
    var touchMoveX = e.touches[0].pageX;
    var touchMoveY = e.touches[0].pageY;
    this.Base.setMyData({
      touchMoveX,
      touchMoveY

    })
  }
  touchEnd(e) {
    var time = this.Base.getMyData().time;
    var touchMoveX = this.Base.getMyData().touchMoveX;
    var touchStartX = this.Base.getMyData().touchStartX;
    var touchMoveY = this.Base.getMyData().touchMoveY;
    var touchStartY = this.Base.getMyData().touchStartY;

    var moveX = touchMoveX - touchStartX
    var moveY = touchMoveY - touchStartY
    if (Math.sign(moveX) == -1) {
      moveX = moveX * -1
    }
    if (Math.sign(moveY) == -1) {
      moveY = moveY * -1
    }
    if (moveX <= moveY) { // 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -30 && time < 10) {
        console.log("向上滑动")
      }
      // 向下滑动  
      if (touchMoveY - touchStartY >= 30 && time < 10) {
        console.log('向下滑动 ');
      }
    } else { // 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -30 && time < 10) {
        console.log("左滑页面")
      }
      // 向右滑动  
      if (touchMoveX - touchStartX >= 30 && time < 10) {
        console.log('向右滑动');
      }
    }
    var interval = this.Base.getMyData().interval;
    clearInterval(interval); // 清除setInterval  
    this.Base.setMyData({
      time: 0
    })
  }
  huadon(e) {


    var idx = this.Base.getMyData().idxd;
    console.log(idx);
    var v = wx.createVideoContext('v_' + idx);
    v.stop();


    var idxd = e.detail.current;

    var v = wx.createVideoContext('v_' + idxd);
    v.play();

    if (idx == 2) {
      this.huanle();
    }

    this.Base.setMyData({
      idxd: e.detail.current,
      v: v
    })


  }
  huanle() {
    var list = this.Base.getMyData().list;
    var video = this.Base.getMyData().video;
      
    var v=[];
     var danqianidx=video[video.length-1].id;
         
        list.map((item,idx)=>{
           
           if(item.id==danqianidx)
           {

            v.push(list[idx+1]);
            v.push(list[idx+2]);
            v.push(list[idx+3]);


           }


        })
     console.log(v);
        this.Base.setMyData({

          video:v
        })
    console.log(list);
    console.log(video);

  }
 aaa(e) {
    var type = e.currentTarget.id;
    console.log(e, '节点值', type, '获取节点值');
  var ss=this.Base.getMyData().xian;
  ss=!ss
  

    this.Base.setMyData({
      xian: ss
    })
  }
 fen(){
   wx.navigateTo({
     url: '/pages/fenxiang/fenxiang?id=' + this.Base.options.id,
   })
 }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.touchEnd = content.touchEnd;
body.huadon = content.huadon;
body.touchMove = content.touchMove;
body.touchStart = content.touchStart;
body.onMyShow = content.onMyShow;
body.aa = content.aa;
body.zantin = content.zantin;
body.huanle = content.huanle;
body.fen=content.fen;
body.aaa=content.aaa;

Page(body)