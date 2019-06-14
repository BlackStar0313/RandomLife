interface resultData {
    advice: string,
    good: string[],
    bad: string[],
    loveLv: number,
    slogon: string,
    pos: string,
    money: string,
    success: boolean
}

class ResultView extends eui.Component implements eui.UIComponent {
    public lbDate: eui.Label;
    public lbResult: eui.Label;
    public lbGood: eui.Label;
    public lbBad: eui.Label;
    public lbSlogon: eui.Label;
    public lbPos: eui.Label;
    public lbLove: eui.Label;
    public lbMoney: eui.Label;
    public btnClose: eui.Image;


    private data: resultData;

    public constructor(data) {
        super();
        this.data = data;
        this.width = StageUtils.stageWidth;
        this.height = StageUtils.stageHeight;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        if (this.data.success) {
            this.lbResult.text = this.data.advice;
            this.lbLove.text = `桃花运:\t${this.data.loveLv}`;
            this.lbPos.text = `最佳方位:\t${this.data.pos}`;
            this.lbSlogon.text = `slogon:\t${this.data.slogon}`;
            this.lbMoney.text = `财运:\t${this.data.money}`;
            this.handleGoodBad();
            LocalHelper.setData(JSON.stringify(this.data));
            LocalHelper.updateRandomTimestamp();
        }
        else {
            this.lbResult.text = "error!!!"
        }


        let dateTimeNow = new Date();
        let year = dateTimeNow.getUTCFullYear();
        let month = dateTimeNow.getUTCMonth() + 1;
        let day = dateTimeNow.getUTCDate();

        this.lbDate.text = `${year}年\n${month}月${day}号`;
        this.lbDate.lineSpacing = 20;

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.parent.removeChild(this);
        }, this);
    }

    private handleGoodBad() {
        let good = "";
        this.data.good.map((str: string) => {
            good += str + '\n'
        })

        let bad = "";
        this.data.bad.map((str: string) => {
            bad += str + '\n'
        })
        this.lbGood.text = good;
        this.lbGood.lineSpacing = 15;
        this.lbBad.text = bad;
        this.lbBad.lineSpacing = 15;
    }

}