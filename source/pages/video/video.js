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

  videolist = [];
  current = 0;

  video0 = null;
  video1 = null;
  video2 = null;
  video3 = null;

  onReady() {

    this.Base.video0 = wx.createVideoContext('video0');
    this.Base.video1 = wx.createVideoContext('video1');
    this.Base.video2 = wx.createVideoContext('video2');
    this.Base.video3 = wx.createVideoContext('video3');

  }

  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);

    var iknow=wx.getStorageSync("iknowvideotips");
    
    if(iknow==""){
      
      this.Base.setMyData({
        show: 1,
      });
    }
    var memberapi = new MemberApi();
    memberapi.video({
      firstid:options.id,
      vodstatus: "A"
    }, (videolist) => {
      for (var i = 0; i < videolist.length; i++) {
        videolist[i].idx = i;
      }
      this.Base.videolist = videolist;
      this.Base.setMyData({
        url0: videolist[0],
        url1: videolist[1],
        url2: videolist[2],
        url3: videolist[videolist.length - 1],
        current: this.Base.current
      });
      if (iknow != "") {
        if (this.Base.video0 != null) {
          this.Base.video0.play();
        } else {
          var startit = setInterval(() => {
            if (this.Base.video0 != null) {
              this.Base.video0.play();
              clearInterval(startit);
            }
          }, 500);
        }
      }
    });

  }

  onMyShow() {
    var that = this;
  }

  last = 0;

  videochange(e) {
    console.log(e);
    var current = e.detail.current;

    if (this.calc(current, this.Base.last)) {
      this.Base.current++;
    } else {
      this.Base.current--;
    }
    console.log("kkk4", this.Base.current);
    this.Base.last = current;

    var listlength = this.Base.videolist.length;

    var next = this.Base.current + 2;
    while (next < 0) {
      next = next + listlength;
      console.log("kkknext", next, listlength);
    }

    while (next >= listlength) {
      next = next - listlength;
      console.log("kkknext", next, listlength);
    }
    var vk = this.Base.current;
    while (vk < 0) {
      vk = vk + 4;
    }
    var cursor = vk % 4;
    console.log("kkkcursor", this.Base.current, cursor, next);

    if (cursor == 0) {
      this.Base.setMyData({
        url2: this.Base.videolist[next]
      });
      this.Base.video0.play();
      this.Base.video1.pause();
      this.Base.video2.pause();
      this.Base.video3.pause();
      this
    } else if (cursor == 1) {
      this.Base.setMyData({
        url3: this.Base.videolist[next]
      });
      this.Base.video0.pause();
      this.Base.video1.play();
      this.Base.video2.pause();
      this.Base.video3.pause();
    } else if (cursor == 2) {
      this.Base.setMyData({
        url0: this.Base.videolist[next]
      });
      this.Base.video0.pause();
      this.Base.video1.pause();
      this.Base.video2.play();
      this.Base.video3.pause();
    } else if (cursor == 3) {
      this.Base.setMyData({
        url1: this.Base.videolist[next]
      });
      this.Base.video0.pause();
      this.Base.video1.pause();
      this.Base.video2.pause();
      this.Base.video3.play();
    }
    this.Base.setMyData({
      current: this.Base.current
    });
  }
  calc(curr, last) {

    if (curr == 0 && last == 3) {
      console.log("kkk1", curr, last, true);
      return true;
    }
    if (curr == 3 && last == 0) {
      console.log("kkk2", curr, last, false);
      return false;
    }
    console.log("kkk3", curr, last, curr >= last);
    return curr >= last;
  }
  videoplay(e) {
    var id = e.currentTarget.id;
    console.log(id + " video  played");
  }
  videopause(e) {
    var id = e.currentTarget.id;
    console.log(id + " video paused");
  }



  touchDotX = 0; //X按下时坐标
  touchDotY = 0; //y按下时坐标
  interval; //计时器
  time = 0; //从按下到松开共多少时间*100
  // 触摸开始事件
  touchStart(e) {
    this.Base.touchDotX = e.touches[0].pageX; // 获取触摸时的原点
    this.Base.touchDotY = e.touches[0].pageY;
    // 使用js计时器记录时间    
    this.Base.interval = setInterval(() => {
      this.Base.time++;
    }, 100);
  }
  // 触摸结束事件
  touchEnd(e) {
    let touchMoveX = e.changedTouches[0].pageX;
    let touchMoveY = e.changedTouches[0].pageY;
    let tmX = touchMoveX - this.Base.touchDotX;
    let tmY = touchMoveY - this.Base.touchDotY;
    if (this.Base.time < 20) {
      let absX = Math.abs(tmX);
      let absY = Math.abs(tmY);
      if (absX > 2 * absY) {
        if (tmX < 0) {
          console.log("左滑=====");
          var video = this.Base.videolist[this.Base.current];
          this.Base.info("右滑查看攻略:" + video.jianjie)
        } else {
          console.log("右滑=====");
          this.Base.backPage();
        }
      }
      if (absY > absX * 2 && tmY < 0) {
        console.log("上滑动=====")
      }
    }
    clearInterval(this.Base.interval); // 清除setInterval
    this.Base.time = 0;
  }
  iknow(){
    wx.setStorageSync("iknowvideotips","1");
    console.log("iknowwhat");
    this.Base.setMyData({show:0});
    if(this.Base.video0!=null){
      this.Base.video0.play();
    }else{
      var startit=setInterval(()=>{
        if(this.Base.video0!=null){
          this.Base.video0.play();
          clearInterval(startit);
        }
      },500);
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.onReady = content.onReady;
body.videochange = content.videochange;
body.calc = content.calc;
body.videoplay = content.videoplay;
body.videopause = content.videopause;
body.touchStart = content.touchStart; 
body.touchEnd = content.touchEnd;
body.iknow = content.iknow;
Page(body)