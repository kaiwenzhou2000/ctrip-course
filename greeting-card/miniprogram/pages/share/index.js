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
  onConfirm() {
    // wx.navigateTo({
    //   url: `/pages/share/index?url=${this.data.url}&content=${this.data.content}&audio=${this.data.tempFilePath}&name=${this.data.name}`,
    // });
  },
});
