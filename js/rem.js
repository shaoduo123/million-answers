/*!
 * rem.js v1.0.1
 * author:x-da
 * github:https://github.com/x-da/Rem.js
 */
;(function() {
    if (!-[1, ]) {
        return 0;
    };
    var html = document.getElementsByTagName('html')[0];
    var script = document.getElementsByTagName('script');
    var script_len = script.length;
    var script_last = script[script_len - 1];

    //参数
    var psd_w = script_last.getAttribute('fu-psd');
    var _min = script_last.getAttribute('fu-min');
    var _max = script_last.getAttribute('fu-max');
    var full = script_last.getAttribute('fu-full');
    //常量
    var win = window;
    var doc = document;
    var dpr = window.devicePixelRatio || 1;
    var screen = win.screen;
    //手机宽高比 短:高
    var ratio = Math.min(screen.width, screen.height) / Math.max(screen.width, screen.height);
    //与FreeUi框架会师
    win.FreeUi = win.FreeUi || {};
    FreeUi['Rem'] = _rem;

    function _rem(psd_w, _min, _max, full) {
        var win = window;
        //设计稿宽
        var _psd_w = Number(psd_w) || 640;
        //手机实际物理像素宽
        var win_w = html.getBoundingClientRect().width;
        //短的width
        if (!full) {
            var angle = window.screen.orientation ? window.screen.orientation.angle : 0;
            var orientation = win.orientation || angle || 0;
            if (orientation == 90 || orientation == -90) {
                //横屏
                win_w = win_w * ratio;
            };

        };
        var size = 100 / (_psd_w / win_w);
        var _min = Number(_min) || 50;
        var _max = Number(_max) || 100;
        size = size >= _max ? _max : size;
        size = size <= _min ? _min : size;
        if(html.style.fontSize != size+'px'){
            html.style.fontSize = size + 'px';
        };
        return size;
    };
    //立即执行
    var size = _rem(psd_w, _min, _max, full);
    //某些低性能安卓机延迟0.3s执行
    var _t = setTimeout(function() {
        _rem(psd_w, _min, _max, full);
    }, 300);

    //窗口改变
    var ua= navigator.userAgent;
    var is_orientation = Boolean('orientation' in win) && Boolean(ua.match(/iPhone|iPod|Android|ios|iPad|Windows Phone/));
    var event = is_orientation ? 'orientationchange' : 'resize';
    var time = is_orientation ? 300 : 100;
    if (!is_orientation || full) {
        win.addEventListener(event, function() {
            clearTimeout(_t);
            var _t = setTimeout(function() {
                _rem(psd_w, _min, _max, full);
            }, time)
        }, false);
    };
    //窗口显示
    win.addEventListener('pageshow', function() {
        _rem(psd_w, _min, _max, full);

    }, false);
    //文档加载完成
    if ("complete" === doc.readyState) {
        _rem(psd_w, _min, _max, full);
    };
    doc.addEventListener("DOMContentLoaded", function() {
        _rem(psd_w, _min, _max, full);
    }, false);
})();
