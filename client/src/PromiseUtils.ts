class PromiseUtils {
    public static loadTheme(configURL: string, stage: egret.Stage): Promise<any> {
        return new Promise((resolve, reject) => {
            let theme = new eui.Theme(configURL, stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve()
            }, null);
        });
    }

    public static requestPost(url: string, data: Object, retryTimes: number = 3): Promise<any> {
        return new Promise((resolve, reject) => {
            const sendRequest = () => {
                retryTimes--;
                let request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(url, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "multipart/form-data");
                request.addEventListener(egret.Event.COMPLETE, () => {
                    resolve(JSON.parse(request.response));
                }, null);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                    if (retryTimes > 0) {
                        sendRequest();
                    } else {
                        reject(event);
                    }
                }, null);
                console.log('sending request, retryTimes: ', retryTimes);
                request.send(JSON.stringify(data));
            }
            sendRequest();
        });

    }

    public static requestGet(url: string, isNeedQuit: boolean = false, retryTimes = 5): Promise<any> {
        return new Promise((resolve, reject) => {
            const sendRequest = () => {
                retryTimes--;
                let request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(url, egret.HttpMethod.GET);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send();
                request.addEventListener(egret.Event.COMPLETE, () => {
                    resolve(JSON.parse(request.response));
                }, null);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                    if (retryTimes > 0) {
                        sendRequest();
                    } else {
                        if (isNeedQuit) {
                            console.log("error nihaima ")
                            // App.ins.platform.showSystemNetError();
                        }
                        else {
                            reject(event);
                        }
                    }
                }, null);
            }
            sendRequest();
        });

    }


    public static loadTextureAsync(photo: string): Promise<egret.Texture> {
        return new Promise((resolve, reject) => {
            if (!photo) {
                reject();
            }

            let loader = new egret.ImageLoader();
            loader.crossOrigin = "anonymous";
            loader.addEventListener(egret.Event.COMPLETE, () => {
                let texture = new egret.Texture();
                texture._setBitmapData(loader.data);
                resolve(texture);
            }, this);

            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                reject();
            }, this);

            loader.load(photo);
        });

    }
}