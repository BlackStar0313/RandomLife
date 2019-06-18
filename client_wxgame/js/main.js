var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var StageUtils = (function () {
    function StageUtils() {
    }
    Object.defineProperty(StageUtils, "stage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils, "stageHeight", {
        get: function () {
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils, "stageWidth", {
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils, "isFullscreen", {
        // 全屏屏检测 
        get: function () {
            return (StageUtils.stageHeight / StageUtils.stageWidth > StageUtils.fullScreenRatio);
        },
        enumerable: true,
        configurable: true
    });
    StageUtils.startFullscreenAdaptation = function (designWidth, designHeight, resizeCallback) {
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.resizeCallback = resizeCallback;
        this.onResize();
    };
    StageUtils.onResize = function () {
        this.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
        var width = this.designWidth;
        var height = this.designHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        var designRatio = width / height;
        var clientRatio = clientWidth / clientHeight;
        // 当viewport的宽高比比设计宽高比大时(比如iPad或横屏)
        // 我们可以按照viewport的宽高比加宽stage宽度，来显示更多的背景图
        if (clientRatio > designRatio) {
            width = Math.floor(this.designHeight * clientRatio);
        }
        this.stage.setContentSize(width, clientHeight);
        this.resizeCallback && this.resizeCallback();
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    };
    StageUtils.initTouchNum = function () {
        this.stage.maxTouches = 1;
    };
    StageUtils.fullScreenRatio = 2 / 1;
    return StageUtils;
}());
__reflect(StageUtils.prototype, "StageUtils");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        StageUtils.startFullscreenAdaptation(640, 1136, function () {
        });
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.stage.addChild(new MainScene());
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.width = StageUtils.stageWidth;
        _this.height = StageUtils.stageHeight;
        _this.addChild(new StartView());
        return _this;
    }
    return MainScene;
}(eui.UILayer));
__reflect(MainScene.prototype, "MainScene");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var PromiseUtils = (function () {
    function PromiseUtils() {
    }
    PromiseUtils.loadTheme = function (configURL, stage) {
        return new Promise(function (resolve, reject) {
            var theme = new eui.Theme(configURL, stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, null);
        });
    };
    PromiseUtils.requestPost = function (url, data, retryTimes) {
        if (retryTimes === void 0) { retryTimes = 3; }
        return new Promise(function (resolve, reject) {
            var sendRequest = function () {
                retryTimes--;
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(url, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "multipart/form-data");
                request.addEventListener(egret.Event.COMPLETE, function () {
                    resolve(JSON.parse(request.response));
                }, null);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    if (retryTimes > 0) {
                        sendRequest();
                    }
                    else {
                        reject(event);
                    }
                }, null);
                console.log('sending request, retryTimes: ', retryTimes);
                request.send(JSON.stringify(data));
            };
            sendRequest();
        });
    };
    PromiseUtils.requestGet = function (url, isNeedQuit, retryTimes) {
        if (isNeedQuit === void 0) { isNeedQuit = false; }
        if (retryTimes === void 0) { retryTimes = 5; }
        return new Promise(function (resolve, reject) {
            var sendRequest = function () {
                retryTimes--;
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(url, egret.HttpMethod.GET);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send();
                request.addEventListener(egret.Event.COMPLETE, function () {
                    resolve(JSON.parse(request.response));
                }, null);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    if (retryTimes > 0) {
                        sendRequest();
                    }
                    else {
                        if (isNeedQuit) {
                            console.log("error nihaima ");
                            // App.ins.platform.showSystemNetError();
                        }
                        else {
                            reject(event);
                        }
                    }
                }, null);
            };
            sendRequest();
        });
    };
    PromiseUtils.loadTextureAsync = function (photo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!photo) {
                reject();
            }
            var loader = new egret.ImageLoader();
            loader.crossOrigin = "anonymous";
            loader.addEventListener(egret.Event.COMPLETE, function () {
                var texture = new egret.Texture();
                texture._setBitmapData(loader.data);
                resolve(texture);
            }, _this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                reject();
            }, _this);
            loader.load(photo);
        });
    };
    return PromiseUtils;
}());
__reflect(PromiseUtils.prototype, "PromiseUtils");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var LocalHelper = (function () {
    function LocalHelper() {
    }
    LocalHelper.getRandomTimestamp = function () {
        var time = localStorage.getItem("randomTimestamp");
        return time ? parseInt(time) : 0;
    };
    LocalHelper.updateRandomTimestamp = function () {
        var time = new Date();
        localStorage.setItem("randomTimestamp", time.getTime().toString());
    };
    LocalHelper.setData = function (dataStr) {
        localStorage.setItem("data", dataStr);
    };
    LocalHelper.getData = function () {
        var data = localStorage.getItem("data");
        return data ? data : "";
    };
    return LocalHelper;
}());
__reflect(LocalHelper.prototype, "LocalHelper");
var WxHelper = (function () {
    function WxHelper() {
    }
    WxHelper.ins = function () {
        if (!WxHelper._this) {
            WxHelper._this = new WxHelper();
        }
        return WxHelper._this;
    };
    WxHelper.prototype.share = function (title, imgUrl, query) {
        wx.shareAppMessage({
            title: title,
            imageUrl: imgUrl,
            query: query
        });
        return Promise.resolve();
    };
    return WxHelper;
}());
__reflect(WxHelper.prototype, "WxHelper");
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView(data, change) {
        var _this = _super.call(this) || this;
        _this.change = change;
        _this.data = data;
        _this.width = StageUtils.stageWidth;
        _this.height = StageUtils.stageHeight;
        return _this;
    }
    ResultView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        if (this.data.success) {
            this.lbResult.text = this.data.advice;
            this.lbLove.text = "\u6843\u82B1\u8FD0:";
            this.lbPos.text = "\u6700\u4F73\u65B9\u4F4D:\t" + this.data.pos;
            this.lbSlogon.text = "slogon:\t" + this.data.slogon;
            this.lbMoney.text = "\u8D22\u8FD0:\t" + this.data.money;
            this.handleLove(this.data.loveLv);
            this.handleGoodBad();
            LocalHelper.setData(JSON.stringify(this.data));
            LocalHelper.updateRandomTimestamp();
        }
        else {
            this.lbResult.text = "error!!!";
        }
        var dateTimeNow = new Date();
        var year = dateTimeNow.getUTCFullYear();
        var month = dateTimeNow.getUTCMonth() + 1;
        var day = dateTimeNow.getUTCDate();
        this.lbDate.text = year + "\u5E74\n" + month + "\u6708" + day + "\u53F7";
        this.lbDate.lineSpacing = 20;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
        }, this);
        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WxHelper.ins().share("看看今天你的命怎么样", "share.png", "")];
                    case 1:
                        _a.sent();
                        egret.setTimeout(function () {
                            _this.parent.removeChild(_this);
                            _this.change();
                        }, this, 2000);
                        return [2 /*return*/];
                }
            });
        }); }, this);
    };
    ResultView.prototype.handleGoodBad = function () {
        var good = "";
        this.data.good.map(function (str) {
            good += str + '\n';
        });
        var bad = "";
        this.data.bad.map(function (str) {
            bad += str + '\n';
        });
        this.lbGood.text = good;
        this.lbGood.lineSpacing = 15;
        this.lbBad.text = bad;
        this.lbBad.lineSpacing = 15;
    };
    ResultView.prototype.handleLove = function (level) {
        var maxLv = 5;
        for (var i = 0; i < maxLv; ++i) {
            var img = new eui.Image();
            img.source = i <= level ? "star_png" : "star_empty_png";
            img.width = 65;
            img.height = 65;
            this.groupLove.addChild(img);
        }
    };
    return ResultView;
}(eui.Component));
__reflect(ResultView.prototype, "ResultView", ["eui.UIComponent", "egret.DisplayObject"]);
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView() {
        var _this = _super.call(this) || this;
        _this.width = StageUtils.stageWidth;
        _this.height = StageUtils.stageHeight;
        return _this;
    }
    StartView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.openResultView();
        }, this);
        this.lbSlogon.text = "生活\n10%是创造的\n90%是接纳的";
        this.lbSlogon.lineSpacing = 20;
        this.lbTips.text = "Tips: 每天更新一次哦";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addToStage();
    };
    StartView.prototype.addToStage = function () {
        this.imgNew.visible = this.isTimeNowNewDayUTC();
    };
    StartView.prototype.openResultView = function () {
        var data = LocalHelper.getData();
        if (this.isTimeNowNewDayUTC() || data == '')
            this.request();
        else {
            data = JSON.parse(data);
            this.parent.addChild(new ResultView(data, this.request.bind(this)));
        }
    };
    StartView.prototype.request = function () {
        var _this = this;
        PromiseUtils.requestGet("https://randomlife.redpotato.cn/api/getRandDesc").then(function (respData) {
            console.log("Request data is ", respData);
            _this.parent.addChild(new ResultView(respData, _this.request.bind(_this)));
        });
    };
    StartView.prototype.isTimeNowNewDayUTC = function () {
        var timeBefore = LocalHelper.getRandomTimestamp();
        var isNewDay = false;
        var dateTimeNow = new Date();
        var dateTimeBefore = new Date(timeBefore);
        if ((dateTimeNow.getUTCFullYear() == dateTimeBefore.getUTCFullYear()
            && (dateTimeNow.getUTCMonth() > dateTimeBefore.getUTCMonth()
                || (dateTimeNow.getUTCMonth() == dateTimeBefore.getUTCMonth()
                    && dateTimeNow.getUTCDate() > dateTimeBefore.getUTCDate()))
            || dateTimeNow.getUTCFullYear() > dateTimeBefore.getUTCFullYear())) {
            isNewDay = true;
        }
        return isNewDay;
    };
    return StartView;
}(eui.Component));
__reflect(StartView.prototype, "StartView", ["eui.UIComponent", "egret.DisplayObject"]);

;window.Main = Main;