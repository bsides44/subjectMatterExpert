AFRAME.registerComponent('on-click-start', {
    init: function () {
        this.playSecondVideo = this.playSecondVideo.bind(this);

        window.addEventListener('click', this.playSecondVideo);
        window.addEventListener('abuttondown', this.playSecondVideo);
        window.addEventListener('triggerdown', this.playSecondVideo);
        window.addEventListener('gripdown', this.playSecondVideo);
        window.addEventListener('xbuttondown', this.playSecondVideo);
    },
    playSecondVideo: function() {
        var isVisible = this.el.object3D.visible
        var secondVidId = "#eeOutdoor"
        // reduce number of vids for device performance
        var isMobile = AFRAME.utils.device.isMobile()
        if (isMobile) secondVidId = "#eeIndoorOne"

        if (isVisible) {
            // replace video source
            var videoPlayer = document.querySelector("#videoPlayer")
            videoPlayer.setAttribute("src", secondVidId);

            // play video
            var vidSource = document.querySelector(secondVidId)
            vidSource.muted = false
            vidSource.play()
    
            // emit playing event
            this.el.emit('videoChanged', {id: secondVidId});

            // make challenge disappear
            document.querySelector("#challengeText").object3D.visible = false
            document.querySelector("#startButton").object3D.visible = false
            
            // make egg counter appear
            document.querySelector("#eggCount").object3D.visible = true

            setTimeout(() => {
                this.appearButtons()
            }, 10000);

            // remove listeners
            window.removeEventListener('click', this.playSecondVideo);
            window.removeEventListener('abuttondown', this.playSecondVideo);
            window.removeEventListener('triggerdown', this.playSecondVideo);
            window.removeEventListener('gripdown', this.playSecondVideo);
            window.removeEventListener('xbuttondown', this.playSecondVideo);
        }
    },
    appearButtons: function() {
        var nextButton = document.querySelector("#nextButton")
        nextButton.object3D.visible = true;
    }
  })