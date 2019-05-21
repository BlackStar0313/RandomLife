class ResultView extends eui.Component implements eui.UIComponent {
    public lbResult: eui.Label;
    private data;

    public constructor(data) {
        super();
        this.data = data;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.lbResult.text = this.data.message;
    }

}