class MainScene extends eui.UILayer {
    private view: StartView = null;
    public constructor() {
        super();

        this.width = StageUtils.stageWidth;
        this.height = StageUtils.stageHeight;
        this.view = new StartView(this);
        this.addView();
    }

    public addView() {
        this.addChild(this.view);
    }
}