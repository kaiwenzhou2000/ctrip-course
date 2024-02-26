let that = null; // 页面this指针
Page({
  data: {
    url: "",
    content: "",
    audio: "",
    name: "",
    innerAudioContext: null,
    isPlaying: false,
  },
  /**
   * 页面加载
   */
  onLoad(options) {
    that = this; // 页面this指向指针变量
    that.setData({
      ...options,
      audio: decodeURIComponent(options.audio),
    });
    that.initAudio();

    console.log(options, "card");
  },
  initAudio() {
    that.data.innerAudioContext = wx.createInnerAudioContext();
    that.data.innerAudioContext.onError((res) => {
      console.error("播放语音失败", res.errMsg);
    });
    that.data.innerAudioContext.onPlay(() => {
      that.setData({
        isPlaying: true,
      });
    });
    that.data.innerAudioContext.onEnded(() => {
      that.setData({
        isPlaying: false,
      });
    });
  },
  playRecord: function () {
    that.data.innerAudioContext.src = that.data.audio;
    that.data.innerAudioContext.play();
  },
});
