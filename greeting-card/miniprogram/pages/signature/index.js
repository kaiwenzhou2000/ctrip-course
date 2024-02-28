let that = null; // 页面this指针
Page({
  data: {
    url: "",
    content: "",
    audio: "",
    name: "",
  },
  /**
   * 页面加载
   */
  onLoad(options) {
    that = this; // 页面this指向指针变量
    that.setData({
      ...options,
    });
  },
  onInput({ detail }) {
    this.setData({
      name: detail.value,
    });
  },
  onConfirm() {
    wx.navigateTo({
      url: `/pages/card/index?url=${this.data.url}&content=${this.data.content}&audio=${this.data.audio}&name=${this.data.name}`,
    });
  },
  onShareAppMessage() {
    return {
      title: "语音礼品卡",
      path: `/pages/card/index?url=${this.data.url}&content=${this.data.content}&audio=${this.data.audio}&name=${this.data.name}`,
    };
  },
});
