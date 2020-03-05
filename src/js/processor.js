//渲染进度条
(function($, root) {
    var $scope = $(document.body);
    var startTime;
    var curDuration;
    var frameId;
    var lastPercentage = 0;

    //转换时间
    function formatTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    //渲染总时间
    function render(duration) {
        curDuration = duration;
        lastPercentage = 0; //切换下一首时
        updata(0);
        var allTime = formatTime(duration);
        // console.log(allTime);
        $scope.find(".all-time").text(allTime);
    }
    //进度条运动
    function setProcessor(percentage) {
        var percent = (percentage - 1) * 100 + "%";
        $scope.find('.pro-top').css({
            "transform": "translateX(" + percent + ")"
        })
    }

    function updata(percentage) {
        var curTime = formatTime(percentage * curDuration);
        $scope.find(".cur-time").text(curTime);
        setProcessor(percentage);
    }
    //渲染时间和进度条
    function start(percent) {
        if (percent === undefined) {
            lastPercentage = lastPercentage;
        } else {
            lastPercentage = percent;
        }
        cancelAnimationFrame(frameId); //切换时，解上一个进度条
        startTime = new Date().getTime();
        // console.log(startTime, curDuration, );

        function frame() {
            var curTime = new Date().getTime();
            // console.log(curTime);
            var percentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);

            if (percentage < 1) {
                // console.log(percentage);
                updata(percentage);
                frameId = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    //结束动画
    function stop() {
        var curTime = new Date().getTime();
        lastPercentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.processor = {
        render: render,
        start: start,
        stop: stop,
        updata: updata
    }

}(window.Zepto, window.player || (window.player = {})))