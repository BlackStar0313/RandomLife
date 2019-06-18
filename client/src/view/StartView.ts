class StartView extends eui.Component implements eui.UIComponent {
    public btnStart: eui.Button;
    public lbSlogon: eui.Label;
    public imgNew: eui.Image;
    public lbTips: eui.Label;

    public constructor() {
        super();
        this.width = StageUtils.stageWidth;
        this.height = StageUtils.stageHeight;
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.openResultView();
        }, this);
        this.lbSlogon.text = "生活\n10%是创造的\n90%是接纳的";
        this.lbSlogon.lineSpacing = 20;
        this.lbTips.text = "Tips: 每天更新一次哦";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addToStage();
    }

    private addToStage() {
        this.imgNew.visible = this.isTimeNowNewDayUTC();
    }

    private openResultView() {
        let data = LocalHelper.getData();
        if (this.isTimeNowNewDayUTC() || data == '')
            this.request();
        else {
            data = JSON.parse(data);
            this.parent.addChild(new ResultView(data, this.request.bind(this)));
        }
    }

    private request() {
        PromiseUtils.requestGet("https://randomlife.redpotato.cn/api/getRandDesc").then((respData) => {
            console.log("Request data is ", respData)
            this.parent.addChild(new ResultView(respData, this.request.bind(this)));
        });
    }



    public isTimeNowNewDayUTC(): boolean {
        let timeBefore = LocalHelper.getRandomTimestamp();
        let isNewDay = false;
        let dateTimeNow = new Date();
        let dateTimeBefore = new Date(timeBefore);
        if ((dateTimeNow.getUTCFullYear() == dateTimeBefore.getUTCFullYear()
            && (dateTimeNow.getUTCMonth() > dateTimeBefore.getUTCMonth()
                || (dateTimeNow.getUTCMonth() == dateTimeBefore.getUTCMonth()
                    && dateTimeNow.getUTCDate() > dateTimeBefore.getUTCDate()))
            || dateTimeNow.getUTCFullYear() > dateTimeBefore.getUTCFullYear())) {
            isNewDay = true;
        }
        return isNewDay;
    }

}