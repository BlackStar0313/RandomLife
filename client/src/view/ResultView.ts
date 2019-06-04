class ResultView extends eui.Component implements eui.UIComponent {
    public lbResult:eui.Label;
    public btnClose:eui.Image;

    private data;

    public constructor(data) {
        super();
        this.data = data;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        if (this.data.success) {
            this.lbResult.text = this.data.advice;
        }
        else {
            this.lbResult.text = "error!!!"
        }

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{
            this.parent.removeChild(this);
        },this);
    }

}