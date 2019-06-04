class StartView extends eui.Component implements eui.UIComponent {
    public btnStart: eui.Button;

    public constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.request();
        }, this);
    }


    private request() {
        PromiseUtils.requestGet("http://47.95.246.80:9091/user/getRandDesc").then((data) => {
            console.log("Request data is ", data)
            this.parent.addChild(new ResultView(data));
            // this.parent.removeChild(this);
        });
    }

}