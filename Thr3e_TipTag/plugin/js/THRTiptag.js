(function(window){
    var THRTipTag = function(options){
        // 定义属性
        this.confBtn   = null;
        this.cancelBtn = null;
        this.textInput = null;
        this.closeBtn  = null;
        this.mainWrap  = null;
        this.alertImg  = null;
        this.colorStyle= {
            "warning" : "#f23557",
            "error"   : "#f23557",
            "message" : "#00bbf0",
            "doubt"   : "#ffc93c",
            "correct" : "#52d681"
        }

        //设置默认样式
        this.config = {
            "type"           : "default",
            "message"        : "",
            "autoClose"      : 0,
            "title"          : "",
            "placeholder"    : "请输入...",
            "cancelTitle"    : "取消",
            "confTitle"      : "确定",
            "cancelCallBack" : "",
            "confCallBack"   : "",
            "iconURL"        : "",
            "alertType"      : "correct",
            "highlightColor" : ""
        }
        // 扩展默认属性
        options && this.extend(this.config, options);
        // 初始化方法
        this.init();
        //设置样式
        this.loadStyle(this.config.highlightColor || this.colorStyle[this.config.alertType]);
        // 事件添加
        this.confBtn   && this.addEvent(this.confBtn  , "click", this.btnClick.bind(this));
        this.cancelBtn && this.addEvent(this.cancelBtn, "click", this.btnClick.bind(this));
        this.closeBtn  && this.addEvent(this.closeBtn , "click", this.btnClick.bind(this));

        document.body.style.cssText = "overflow: hidden;";
        // 判断是否自动关闭
        this.config.autoClose && setTimeout(this.close, this.config.autoClose);
    };

    THRTipTag.prototype = {
        init : function(){
            var _this    = this,
                config   = this.config,
                tagHtmls = "";
            config.iconURL = this.getIconPath(this);
            
            //加载页面元素
            tagHtmls = this.getHtml(config);
            document.body.insertAdjacentHTML("beforeEnd", tagHtmls);
            //获取元素
            this.confBtn   = _this.getEl("#THR-tiptag-conf-btn");
            this.cancelBtn = _this.getEl("#THR-tiptag-canc-btn");
            this.textInput = _this.getEl("#THR-tiptag-text-ipt");
            this.closeBtn  = _this.getEl("tiptag-closeBtn");
            this.mainWrap  = _this.getEl('tiptag-wrap');
            this.alertImg  = _this.getEl("tiptag-img");
            this.closeBtn  = _this.getEl("tiptag-closeBtn");
            //加载页面样式
            setTimeout(function(){
                this.mainWrap.className = 'appear';
                if (!config.message) (_this.getEl("tiptag-content")).style.display = "none";
                this.alertImg.style.cssText = "background-image : url(" + config.iconURL + ")";
                this.closeBtn.style.cssText = "background-image : url(" + this.getPath(_this.getEl).slice(0,-15) + "imgs/close.svg)"
            }.bind(this), 10);
        },
        extend : function (oldObj, newObj) {
            for(var key in newObj) {
                oldObj[key] = newObj[key];
            }
            return oldObj;
        },
        addEvent: function(el, type, callBack) {
            if (el.attachEvent) {
                el.attachEvent('on' + type, callBack);
            } else {
                el.addEventListener(type, callBack, false);
            }
        },
        btnClick: function (e) {
            e = e || event;
            var _this   = this,
                _tarId  = e.target.id,
                _config = _this.config;
            switch(_tarId) {
                // 点击取消按钮
                case "THR-tiptag-canc-btn":{
                    _config.cancelCallBack && _config.cancelCallBack();
                } break;
                // 点击确认按钮
                case "THR-tiptag-conf-btn": {
                    var text = '';
                    if (_config.type === "prompt"){
                        if (!_this.textInput.value) {
                            _this.textInput.className = 'thr3e-uninput';
                            _this.textInput.onfocus = function(){
                                _this.textInput.classList.remove('thr3e-uninput');
                            };
                            return;
                        }else {
                            text = _this.textInput.value;
                        }
                    } 
                    _config.confCallBack && _config.confCallBack(text);
                }break;
            }
            _this.close();
        },
        close: function () {
            var tiptag  = document.getElementsByTagName("THR-tiptag")[0],
                tipWrap = document.getElementsByTagName("tiptag-wrap")[0];
            tipWrap.className = 'close';
            tiptag.style.cssText = "background : transparent";
            setTimeout(function(){
                document.body.removeChild(tiptag);
                document.body.style.cssText = "overflow: auto;";
            }, 200);
        },
        loadStyle : function(color){
            if(color) {
                var hlSpan  = document.querySelectorAll("THR-tiptag .THR-highlight"),
                    confBtn = document.querySelector("#THR-tiptag-conf-btn");
                if (confBtn) {
                    confBtn.style.background = color;
                }
                for (var idx = 0, len = hlSpan.length; idx < len; idx++) {
                    hlSpan[idx].style.color = color;
                };
            }
        },
        getPath : function(callBack){
            var oScript = callBack('script', true);
            for (var idx = 0, len = oScript.length; idx < len; idx++) {
                if (oScript[idx].src.match("THRTiptag.js"))
                    return oScript[idx].src;
            }
        },
        getHtml : function(config){
            var htmlStr = "";
            htmlStr +=  "<THR-tiptag><tiptag-wrap>" + "<tiptag-img></tiptag-img>"+
                        "<tiptag-closeBtn></tiptag-closeBtn>" +
                        "<tiptag-title>"   + config.title   + "</tiptag-title>"  +
                        "<tiptag-content>" + config.message + "</tiptag-content>";
            switch (config.type) {
                case "prompt" : htmlStr += "<tiptag-ipt><input type='text' id='THR-tiptag-text-ipt' placeholder='" + config.placeholder + "'></tiptag-ipt>" ;
                case "confirm" : htmlStr += 
                "<tiptag-btnbox>"  +
                "<tiptag-btn id='THR-tiptag-canc-btn'>" + config.cancelTitle + "</tiptag-btn>" ;
                case "alert" : {
                    if (config.type === "alert")
                        htmlStr += "<tiptag-btnbox>";
                    htmlStr += "<tiptag-btn id='THR-tiptag-conf-btn'>" + config.confTitle + "</tiptag-btn>" + "</tiptag-btnbox>";
                }
            };
            htmlStr += "</tiptag-wrap></THR-tiptag>";

            return htmlStr;
        },
        getEl : function(sel, isAll) {
            if (isAll) return document.querySelectorAll(sel);
            else return document.querySelector(sel);
        },
        getIconPath : function(_this){
            if (_this.config.iconURL) return _this.config.iconURL;
            else {
                var curPath  = (_this.getPath(_this.getEl)).slice(0,-15);
                return curPath + "imgs/" + _this.config.alertType + ".svg";
            }

        }
    };
    window.THRTipTag = THRTipTag;
})(window);