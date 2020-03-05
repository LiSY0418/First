//封装渲染模块
(function($, root) {
    var $scope = $(document.body);

    function renderInfo(data) {
        var html = "<h1 class = 'song-name'>" + data.song + "</h1>" +
            "<h3 class = 'singer-name'>" + data.singer + "</h3>" +
            "<h3 class = 'album-name'>" + data.album + "</h3>";
        $scope.find('.song-info').html(html);
    }
    //渲染歌曲图片
    function renderImage(src) {
        var img = new Image();
        img.onload = function() {
            $scope.find(".song-img img").attr("src", src);

        }
        img.src = src;
    }
    //渲染like按钮
    function renderLikeBtn(islike) {
        if (islike) {
            $scope.find(".like-btn").addClass("liked");
        } else {
            $scope.find(".like-btn").removeClass("liked");
        }
    }

    //  $.render = function(data) 
    root.render = function(data) {
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.islike);
    }
}(window.Zepto, window.player || (window.player = {})));
// window.player || (window.play = {})