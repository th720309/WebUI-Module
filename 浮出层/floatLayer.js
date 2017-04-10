/**
 * Created by Nicholas on 2017/4/10.
 * WebUI-Module-FloatLayer
 */

var FloatLayer = function(element) {
    this.ele = element;
    this.height = 300+"px";
    this.width = 300+"px";
    this.maskEle = null;
    this.addBuild();
}
FloatLayer.prototype = {

    init:function () {
        this.maskEle = document.getElementById("mask");
        this.maskEle.style.width = window.screen.width + "px";
        this.maskEle.style.height = window.screen.height + "px";
        this.maskEle.style.display = "none";
    },

    addBuild:function () {
        var self = this;
        var mouseOffsetX = 0;
        var mouseOffsetY = 0;
        var isDraging = false;
        $("loginbtn").addEventListener('click', function() {
            self.show();
        },false);
        $("closeBtn").addEventListener('click', function() {
            self.hide();
        },false);
        $("loginBoxHeader").addEventListener('mousedown', function (e) {
            var e = e || window.event;
            //鼠标点击点离浮出层左边框的距离
            mouseOffsetX = e.pageX - $("loginBox").offsetLeft;
            //鼠标点击点离浮出层上边框的距离
            mouseOffsetY = e.pageY - $("loginBox").offsetTop;
            isDraging = true;
        })
        document.onmousemove = function (e) {
            var e = e || window.event;
            var mouseX = e.pageX;
            var mouseY = e.pageY;

            var moveX = 0;
            var moveY = 0;

            if (isDraging === true) {

                moveX = mouseX - mouseOffsetX;
                moveY = mouseY - mouseOffsetY;
                //获取页面宽高度
                //document.documentElement.clientWidth 和 document.body.clientWidth 是不一样的 !
                var pageWidth = document.documentElement.clientWidth;
                var pageHeight = document.documentElement.clientHeight;

                //获取浮出层的宽高度
                //offsetWidth 和 clientWidth 是不一样的 !
                var loginBoxWidth = $("loginBox").offsetWidth;
                var loginBoxHeight = $("loginBox").offsetHeight;

                var maxMoveX = pageWidth - loginBoxWidth + loginBoxWidth/2;
                var maxMoveY = pageHeight - loginBoxHeight + loginBoxHeight/2;

                //moveX = moveX > 0 ? moveX : 0;
                //moveX = moveX < maxMoveX ? moveX : maxMoveX;
                moveX = Math.min(maxMoveX, Math.max(loginBoxWidth/2, moveX));
                moveY = Math.min(maxMoveY, Math.max(loginBoxHeight/2, moveY));
                $("loginBox").style.left = moveX + "px";
                $("loginBox").style.top = moveY + "px";
            }
        }
        document.onmouseup = function () {
            isDraging = false;
        }

    },

    show:function () {
        this.ele.style.display = "block";
        this.maskEle.style.display = "block";
        this.ele.style.position = "fixed";
        this.ele.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
    },

    hide:function(){
        this.ele.style.display = "none";
        this.ele.style.position = "fixed";
        this.maskEle.style.display = "none";
        this.ele.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
    }
}
//获取元素对象
function $(element){
    return document.getElementById(element);
}
function createFloatLayer(element) {
    return new FloatLayer(element);
}