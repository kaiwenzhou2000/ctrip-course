let that = null; // 页面this指针
Page({
  data: {
    url: "",
    content: "",
    recorderManager: null,
    isRecording: false,
    tempFilePath: "",
    innerAudioContext: null,
    isPlaying: false,
  },
  /**
   * 页面加载
   */
  onLoad({ url, content }) {
    that = this; // 页面this指向指针变量
    console.log(content);
    that.setData({
      url,
      content,
    });
    that.initRecorderManager();
    that.initAudio();
  },
  initRecorderManager() {
    that.data.recorderManager = wx.getRecorderManager();
    that.data.recorderManager.onStart(() => {
      that.setData({
        isRecording: true,
      });
    });
    that.data.recorderManager.onStop((res) => {
      console.log(res, res.tempFilePath);
      that.setData({
        isRecording: false,
        tempFilePath: res.tempFilePath,
      });

      that.playRecord();
    });
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
  startRecord: function (event) {
    that.data.recorderManager.start({
      duration: 60000, // 录音的时长，单位为毫秒，这里设置为60秒
      format: "mp3", // 录音的格式，这里设置为mp3
    });
  },

  stopRecord: function () {
    that.data.recorderManager.stop();
  },

  playRecord: function () {
    console.log("playRecord");
    that.data.innerAudioContext.src = that.data.tempFilePath;
    that.data.innerAudioContext.play();
  },

  onConfirm() {
    wx.navigateTo({
      url: `/pages/signature/index?url=${this.data.url}&content=${
        this.data.content
      }&audio=${encodeURIComponent(this.data.tempFilePath)}`,
    });
  },
});
