class StartView extends eui.Component implements eui.UIComponent {
    public rectBg: eui.Rect;
    public btnStart: eui.Button;
    public lbSlogon: eui.Label;
    public imgNew: eui.Image;
    public lbTips: eui.Label;

    private scene: MainScene;

    public constructor(scene: MainScene) {
        super();
        this.width = StageUtils.stageWidth;
        this.height = StageUtils.stageHeight;
        this.scene = scene;
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
        this.alpha = 1;
    }

    private openResultView() {
        let data = LocalHelper.getData();
        if (this.isTimeNowNewDayUTC() || data == '')
            this.request();
        else {
            data = JSON.parse(data);
            this.onShow(data);
        }
    }

    private request() {
        PromiseUtils.requestGet("https://randomlife.redpotato.cn/api/getRandDesc").then((respData) => {
            console.log("Request data is ", respData)
            this.onShow(respData);
        });
    }

    private onShow(data) {
        this.handleStartShader();
        this.scene.addChildAt(new ResultView(data, this.request.bind(this), this.scene.addView.bind(this.scene)), 0);
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

    private handleStartShader() {
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

        let fragmentSrc1 = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform vec2 center;",
            "uniform vec3 params;", // 10.0, 0.8, 0.1"
            "uniform float time;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float dist = distance(uv, center);",

            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",

            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",

            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");

        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                center: { x: 0.5, y: 0.5 },
                params: { x: 10, y: 0.8, z: 0.1 },
                time: 0
            }
        );

        this.filters = [customFilter1];

        let callback = () => {
            customFilter1.uniforms.time += 0.01;
            if (customFilter1.uniforms.time > 1) {
                customFilter1.uniforms.time = 0.0;
            }
        }
        this.addEventListener(egret.Event.ENTER_FRAME, callback, this);

        let hideTime: number = 1000;
        egret.Tween.get(this)
            .to({ alpha: 0 }, hideTime)
            .call(() => {
                this.filters = [];
                this.removeEventListener(egret.Event.ENTER_FRAME, callback, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            });
    }
}