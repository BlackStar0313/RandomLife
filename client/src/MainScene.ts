class MainScene extends eui.UILayer {
    public constructor() {
        super();

        this.width = StageUtils.stageWidth;
        this.height = StageUtils.stageHeight;
        this.addChild(new StartView());
    }
}