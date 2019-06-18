class WxHelper {
    public static _this;
    public static ins(): WxHelper {
        if (!WxHelper._this) {
            WxHelper._this = new WxHelper();
        }
        return WxHelper._this;
    }

    public share(title: string, imgUrl: string, query: string): Promise<void> {
        wx.shareAppMessage({
            title: title,
            imageUrl: imgUrl,
            query: query
        });

        return Promise.resolve();
    }
}