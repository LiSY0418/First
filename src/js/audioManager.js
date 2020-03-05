(function($, root) {
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioManager.prototype = {
        //歌曲播放功能
        play: function() {
            this.audio.play();
            this.status = "play";

        },
        //歌曲暂停功能
        pause: function() {
            this.audio.pause();
            this.status = "pause";
        },
        //切换歌曲音频路径
        setAudioSource: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumptoPlay: function(duration) {
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.audioManager = audioManager;
}(window.Zepto, window.player || (window.player = {})))