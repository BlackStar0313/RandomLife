class StartView extends eui.Component implements eui.UIComponent {
    public rectBg: eui.Rect;
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
        this.handleShader();
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

    private handleShader() {
        let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";

        let fragmentSrc1 =
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +

            "uniform float customUniform;\n" +

            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.18;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";

        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0
            }
        );

        this.rectBg.filters = [customFilter1];

        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            customFilter1.uniforms.customUniform += 0.05;
            if (customFilter1.uniforms.customUniform > Math.PI * 2) {
                customFilter1.uniforms.customUniform = 0.0;
            }
        }, this)
    }

}