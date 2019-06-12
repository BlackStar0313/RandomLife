class StageUtils {

    public static get stage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    public static get stageHeight(): number {
        return this.stage.stageHeight;
    }

    public static get stageWidth(): number {
        return this.stage.stageWidth;
    }

    private static readonly fullScreenRatio: number = 2 / 1;
    // 全屏屏检测 
    public static get isFullscreen(): boolean {
        return (StageUtils.stageHeight / StageUtils.stageWidth > StageUtils.fullScreenRatio);
    }

    /**
     * 开启全屏适配方案
     */
    private static designWidth: number;
    private static designHeight: number;
    private static resizeCallback: Function;

    public static startFullscreenAdaptation(designWidth: number, designHeight: number, resizeCallback?: Function): void {
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.resizeCallback = resizeCallback;
        this.onResize();
    }

    private static onResize(): void {
        this.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);

        let width: number = this.designWidth;
        let height: number = this.designHeight;
        let clientWidth: number = window.innerWidth;
        let clientHeight: number = window.innerHeight;

        let designRatio: number = width / height;
        let clientRatio: number = clientWidth / clientHeight;

        // 当viewport的宽高比比设计宽高比大时(比如iPad或横屏)
        // 我们可以按照viewport的宽高比加宽stage宽度，来显示更多的背景图
        if (clientRatio > designRatio) {
            width = Math.floor(this.designHeight * clientRatio);
        }

        this.stage.setContentSize(width, clientHeight);

        this.resizeCallback && this.resizeCallback();
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    }

    public static initTouchNum() {
        this.stage.maxTouches = 1;
    }
}
