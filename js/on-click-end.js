AFRAME.registerComponent('on-click-end', {
    init: function () {
        this.playLastVideo = this.playLastVideo.bind(this);

        this.el.addEventListener('click', this.playLastVideo);
    },
    playLastVideo: function() {
        var videoPlayer = document.querySelector("#videoPlayer")
		videoPlayer.getAttribute('material').src.play()
  
        // make text disappear
        document.querySelector("#victoryText").object3D.visible = false
        document.querySelector("#friendsButton").object3D.visible = false

        var sceneEl = document.querySelector("a-scene")
        sceneEl.emit('removeListeners')

        // remove listeners
        this.el.removeEventListener('click', this.playLastVideo);

        // NB: video & text handled in play-video, eggs handled in egg-appear
    }
  })