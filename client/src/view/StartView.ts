class StartView extends eui.Component implements eui.UIComponent {
    public btnStart: eui.Button;
    public lbSlogon: eui.Label;


    public constructor() {
        super();
        this.width = StageUtils.stageWidth;
        this.height = StageUtils.stageHeight;
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.request();
        }, this);
        this.lbSlogon.text = "生活\n10%是创造的\n90%是接纳的";
        this.lbSlogon.lineSpacing = 20;
    }


    private request() {
        PromiseUtils.requestGet("http://47.95.246.80:9091/api/getRandDesc").then((data) => {
            console.log("Request data is ", data)
            this.parent.addChild(new ResultView(data));
            // this.parent.removeChild(this);
        });
    }

}