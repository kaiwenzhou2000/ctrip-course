const app = getApp(); // 全局APP
let that = null; // 页面this指针
const { baseURL } = require("../../envList");
Page({
  data: {
    current: 0,
    indicatorDots: true,
    imageUrls: [
      "/images/card-1.png",
      "/images/card-2.png",
      "/images/card-3.png",
      "/images/card-4.png",
    ],
  },
  /**
   * 页面加载
   */
  onLoad() {
    that = this; // 页面this指向指针变量
    // wx.cloud
    //   .getTempFileURL({
    //     fileList: [
    //       {
    //         fileID: `${baseURL}/images/card-1.png`,
    //       },
    //       {
    //         fileID: `${baseURL}/images/card-2.png`,
    //       },
    //       {
    //         fileID: `${baseURL}/images/card-3.png`,
    //       },
    //       {
    //         fileID: `${baseURL}/images/card-4.png`,
    //       },
    //     ],
    //   })
    //   .then((res) => {
    //     // get temp file URL
    //     that.setData({
    //       imageUrls: res.fileList.map((item) => item.tempFileURL),
    //     });
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.error(error);
    //   });
  },
  onChange(event) {
    this.setData({
      current: event.detail.current,
    });
  },
  onConfirm() {
    console.log(this.data.current);
    wx.navigateTo({
      url: `/pages/text/index?url=${this.data.imageUrls[this.data.current]}`,
    });
  },
});
