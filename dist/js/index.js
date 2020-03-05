var root = window.player;
// console.log(window.player);
var $ = window.Zepto;
var $scope = $(document.body);
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playlist = root.playlist;

$scope.on("play:change", function(e, index, flag) {
    var curdata = songList[index];
    // root.render(songList[index]);
    root.render(curdata);
    audiomanager.setAudioSource(curdata.audio); //歌曲信息
    if (audiomanager.status === "play" || flag) {
        audiomanager.play();
        processor.start();
    }
    processor.render(curdata.duration); //进度条
})

$scope.on("click", ".prev-btn", function() {
    var index = controlmanager.prev();
    // root.render(songList[index]);
    $scope.trigger("play:change", [index])
})

$scope.on("click", ".next-btn", function() {
    var index = controlmanager.next();
    // root.render(songList[index]);
    $scope.trigger("play:change", [index])
})

$scope.on("click", ".play-btn", function() {
    if (audiomanager.status === "play") {
        processor.stop();
        audiomanager.pause();
    } else {
        processor.start();
        audiomanager.play();
    }
    $scope.find(".play-btn").toggleClass('playing');
})

$scope.on("click", '.list-btn', function() {
        playlist.show(controlmanager);
    })
    //绑定touch事件
function bindTouch() {
    var $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    // console.log(offset, left, width)
    $slidePoint.on("touchstart", function(e) {
        // console.log(e);
        processor.stop();
    }).on("touchmove", function(e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if (percentage > 1 || percentage < 0) {
            percentage = 0;
        }
        // processor.start(percentage);
        processor.updata(percentage);
        var curDuration = songList[controlmanager.index].duration;
        var duration = curDuration * percentage;
        audiomanager.jumptoPlay(duration);
        $scope.find(".play-btn").addClass("playing")
    }).on("touchend", function(e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if (percentage > 1 || percentage < 0) {
            percentage = 0;
        }
        processor.start(percentage);
        var curDuration = songList[controlmanager.index].duration;
        var duration = curDuration * percentage;
        audiomanager.jumptoPlay(duration);
        $scope.find(".play-btn").addClass("playing");
    })

}

function getDate(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: successedFn,
        error: function() {
            console.log("error");
        }
    });
}

function successedFn(data) {
    // console.log(data[0]);
    // root.render(data[0]);
    bindTouch();
    songList = data;
    controlmanager = new root.controlManager(data.length);
    // $.render(data[0]);
    // root.render(data[0]);
    $scope.trigger("play:change", [0]);
    playlist.render(data);

}
getDate("/mock/data.json")