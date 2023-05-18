AFRAME.registerComponent('play-video', {
    schema: {
        currentEvent: {type: 'number', default: 0},
      },
      init: function () {        
        this.playNextVideo = this.playNextVideo.bind(this);
        this.appearButtons = this.appearButtons.bind(this);

        this.el.addEventListener('click', this.playNextVideo);
		this.el.addEventListener('abuttondown', this.playNextVideo);
        this.el.addEventListener('triggerdown', this.playNextVideo);
        this.el.addEventListener('gripdown', this.playNextVideo);
        this.el.addEventListener('xbuttondown', this.playNextVideo);
		this.el.addEventListener('removeListeners', this.removeListeners)
    },
    playNextVideo: function() {
		var events = [
			{index: 0, id: "#intro", numberOfEggs: 0, buttonTimer: 0, buttonPrev: null, buttonNext: null, rotation:"0 -70 0" },
			{index: 1, id: "#eeOutdoor", numberOfEggs: 3, bonusEggs: 3, bonusTimer: 15000, buttonTimer: 10000, buttonPrev: false, buttonNext: true , rotation:"0 -90 0" },
			{index: 2, id: "#sing1", numberOfEggs: 3, buttonTimer: 10000, buttonPrev: true, buttonNext: true, rotation:"0 -90 0" },
			{index: 3, id: "#eeIndoorOne", numberOfEggs: 3, buttonTimer: 8000, buttonPrev: true, buttonNext: true , rotation:"0 -90 0" },
			{index: 4, id: "#sing2", numberOfEggs: 3, buttonTimer: 6000, buttonPrev: true, buttonNext: true , rotation:"0 -90 0" },
			{index: 5, id: "#articulate", numberOfEggs: 3, buttonTimer: 4000, buttonPrev: true, buttonNext: true, rotation:"0 70 0" },
			{index: 6, id: "#sing3", numberOfEggs: 3, buttonTimer: 3000, buttonPrev: true, buttonNext: true, rotation:"0 70 0" },
			{index: 7, id: "#eeIndoorTwo", numberOfEggs: 3, buttonTimer: 3000, buttonPrev: true, buttonNext: true, rotation:"-10 210 0" },
			{index: 8, id: "#sing4", numberOfEggs: 3, buttonTimer: 4000, buttonPrev: true, buttonNext: true, rotation:"0 115 0" },
			{index: 9, id: "#cheers", numberOfEggs: 0, buttonTimer: 0, buttonPrev: false, buttonNext: false, rotation:"0 160 0" },
		]
    // Less vids for mobile performance
    var mobileEvents = [
			{index: 0, id: "#intro", numberOfEggs: 0, buttonTimer: 0, buttonPrev: null, buttonNext: null, rotation:"0 -70 0" },
			{index: 1, id: "#eeIndoorOne", numberOfEggs: 3, buttonTimer: 8000, buttonPrev: false, buttonNext: true , rotation:"0 -90 0" },
			{index: 2, id: "#sing2", numberOfEggs: 3, buttonTimer: 6000, buttonPrev: true, buttonNext: true , rotation:"0 -90 0" },
			{index: 3, id: "#eeIndoorTwo", numberOfEggs: 3, buttonTimer: 3000, buttonPrev: true, buttonNext: true , rotation:"-10 210 0" },
			{index: 4, id: "#sing4", numberOfEggs: 3, buttonTimer: 4000, buttonPrev: true, buttonNext: true, rotation:"0 115 0" },
			{index: 5, id: "#cheers", numberOfEggs: 0, buttonTimer: 0, buttonPrev: false, buttonNext: false, rotation:"0 160 0" },
		]

    // Check for mobile
		var isMobile = AFRAME.utils.device.isMobile()

		//NB: #eeOutdoor handled from on-click-accept
		var event = isMobile ? mobileEvents[this.data.currentEvent] : events[this.data.currentEvent] 

		// emit playing event
		this.el.emit('videoChanged', {id: event.id});

    // replace video source
    var videoPlayer = document.querySelector("#videoPlayer")
		videoPlayer.getAttribute('material').src.pause()
		videoPlayer.getAttribute('material').src.muted = true
    if (event.id) videoPlayer.setAttribute("src", event.id);
		videoPlayer.setAttribute('rotation', event.rotation)

    // play video
    var vidSource = document.querySelector(event.id)
    vidSource.muted = false

		// last video handler
		if (event.index === 9 || isMobile && event.index === 5) {      
			var victoryText = document.querySelector("#victoryText")
      var friendsButton = document.querySelector("#friendsButton")
      victoryText.object3D.visible = true
			setTimeout(() => {
        victoryText.setAttribute('on-click-end', '')
        friendsButton.setAttribute('on-click-end', '')
				friendsButton.object3D.visible = true
			}, 2000);
		}
		else {
        	vidSource.play()
		}
  
        // make buttons disappear
        document.querySelector("#nextButton").object3D.visible = false
        document.querySelector("#prevButton").object3D.visible = false

        // set next buttons to appear. NB scene 2 buttons handled in on-click-accept
        if (event.buttonTimer >= 1) {
          setTimeout(() => {
            this.appearButtons(event)
        }, event.buttonTimer);
       }
    },
    appearButtons: function(event) {
        var prevButton = document.querySelector("#prevButton")
        var nextButton = document.querySelector("#nextButton")
        var isMobile = AFRAME.utils.device.isMobile()

        // new button text and play options
        if (event.buttonPrev) {
          prevButton.setAttribute("play-video", {currentEvent: event.index - 1})
          prevButton.object3D.visible = true;
        }
        
        // new button text and play options
        if (event.buttonNext) {
          if (event.index === 8) {
            nextButton.setAttribute('src', '#finishBtn')
          }
          if (isMobile && event.index === 4) {
            nextButton.setAttribute('src', '#finishBtn')
          }
          nextButton.setAttribute("play-video", {currentEvent: event.index + 1})
          nextButton.object3D.visible = true;
		      nextButton.components.sound.playSound();
          
        }
    },
	removeListeners: function() {
        this.el.addEventListener('click', this.playNextVideo);
		    this.el.addEventListener('abuttondown', this.playNextVideo);
        this.el.addEventListener('triggerdown', this.playNextVideo);
        this.el.addEventListener('gripdown', this.playNextVideo);
        this.el.addEventListener('xbuttondown', this.playNextVideo);
		    this.el.addEventListener('removeListeners', this.removeListeners)
    }
  })