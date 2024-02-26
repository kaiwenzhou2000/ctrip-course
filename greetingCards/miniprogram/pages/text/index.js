const app = getApp(); // 全局APP
let that = null; // 页面this指针
Page({
  data: {
    url: "",
    content: "",
  },
  /**
   * 页面加载
   */
  onLoad({ url }) {
    this.setData({
      url,
    });
  },
  onInput({ detail }) {
    this.setData({
      content: detail.value,
    });
  },
  onConfirm() {
    wx.navigateTo({
      url: `/pages/voice/index?url=${this.data.url}&content=${this.data.content}`,
    });
  },
});
