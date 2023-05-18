AFRAME.registerComponent('egg-appear', {
    schema: {
        eggTimeouts: {type: 'array', default: []}
    },
    init: function () {
        this.appearEgg = this.appearEgg.bind(this);
        this.selectScene = this.selectScene.bind(this);
        this.setEggTimer = this.setEggTimer.bind(this);
        this.eggCountIcon = this.eggCountIcon.bind(this);
        this.playOutdoor = this.playOutdoor.bind(this);
        this.playSing1 = this.playSing1.bind(this);
        this.playIndoorOne = this.playIndoorOne.bind(this);
        this.playSing2 = this.playSing2.bind(this);
        this.playArticulate = this.playArticulate.bind(this);
        this.playSing3 = this.playSing3.bind(this);
        this.playIndoorTwo = this.playIndoorTwo.bind(this);
        this.playSing4 = this.playSing4.bind(this);
        this.readyLastScene = this.readyLastScene.bind(this);

        var sceneEl = document.querySelector("a-scene")
        sceneEl.addEventListener('videoChanged', this.selectScene);
    },
    selectScene: function(event) {
        this.resetNewScene()
        if (event.detail.id == "#eeOutdoor") this.playOutdoor()
        if (event.detail.id == "#sing1") this.playSing1()
        if (event.detail.id == "#eeIndoorOne") this.playIndoorOne()
        if (event.detail.id == "#sing2") this.playSing2()
        if (event.detail.id == "#articulate") this.playArticulate()
        if (event.detail.id == "#sing3") this.playSing3()
        if (event.detail.id == "#eeIndoorTwo") this.playIndoorTwo()
        if (event.detail.id == "#sing4") this.playSing4()
        if (event.detail.id == "#cheers") this.readyLastScene()
    },
    playOutdoor: function () {
        this.eggCountIcon(6)
        this.setEggTimer("#eggOne", 8000);
        this.setEggTimer("#eggTwo", 12000);
        this.setEggTimer("#eggThree", 16000);
        this.setEggTimer("#eggSeven", 40000);
        this.setEggTimer("#eggEight", 38000);
        this.setEggTimer("#eggNine", 39000);
    },
    playSing1: function () {
        this.eggCountIcon(2)
        this.setEggTimer("#eggFour", 5000);
        this.setEggTimer("#eggFive", 20000);
    },
    playIndoorOne: function () {
        this.eggCountIcon(4)
        this.setEggTimer("#eggTwo", 5000);
        this.setEggTimer("#eggSix", 11000);
        this.setEggTimer("#eggFour", 16000);
        this.setEggTimer("#eggOne", 20000);
    },
    playSing2: function () {
        this.eggCountIcon(2)
        this.setEggTimer("#eggThree", 5000);
        this.setEggTimer("#eggFive", 30000);
    },
    playArticulate: function () {
        this.eggCountIcon(2)
        this.setEggTimer("#eggSix", 5000);
        this.setEggTimer("#eggTwo", 10000);
    },
    playSing3: function () {
        this.eggCountIcon(1)
        this.setEggTimer("#eggOne", 60000);
    },
    playIndoorTwo: function () {
        this.eggCountIcon(6)
        this.setEggTimer("#eggTwo", 4000);
        this.setEggTimer("#eggThree", 10000);
        this.setEggTimer("#eggFour", 11000);
        this.setEggTimer("#eggSeven", 20000);
        this.setEggTimer("#eggEight", 25000);
        this.setEggTimer("#eggNine", 30000);
    },
    playSing4: function () {
        this.eggCountIcon(1)
        document.querySelector("#eggSix").setAttribute('scale', '0.25 0.25 0.25')
        document.querySelector("#eggSix").setAttribute('animation__hover', 'property: scale; to: 0.5 0.5 0.5; startEvents: raycaster-intersected; dur: 1')
        document.querySelector("#eggSix").setAttribute('animation__endhover', 'property: scale; to: 0.25 0.25 0.25; startEvents: raycaster-intersected-cleared; dur: 1')
        this.setEggTimer("#eggSix", 3000);
    },
    resetNewScene: function() {
        document.querySelector("#eggIconOne").object3D.visible = false
        document.querySelector("#eggIconTwo").object3D.visible = false
        document.querySelector("#eggIconThree").object3D.visible = false
        document.querySelector("#eggIconFour").object3D.visible = false
        document.querySelector("#bonusIconOne").object3D.visible = false
        document.querySelector("#bonusIconTwo").object3D.visible = false
        document.querySelector("#bonusIconThree").object3D.visible = false
        document.querySelector("#eggOne").object3D.visible = false
        document.querySelector("#eggTwo").object3D.visible = false
        document.querySelector("#eggThree").object3D.visible = false
        document.querySelector("#eggFour").object3D.visible = false
        document.querySelector("#eggFive").object3D.visible = false
        document.querySelector("#eggSix").object3D.visible = false
        document.querySelector("#eggSeven").object3D.visible = false
        document.querySelector("#eggEight").object3D.visible = false
        document.querySelector("#eggNine").object3D.visible = false

        this.data.eggTimeouts.forEach(timeout => clearTimeout(timeout))
    },
    eggCountIcon: function(numberOfEggs) {
        if (numberOfEggs === 1 ) this.setOpacity("#eggIconOne")
        if (numberOfEggs === 2 ) {
            this.setOpacity("#eggIconOne")
            this.setOpacity("#eggIconTwo")
        }
        if (numberOfEggs === 3 ) {
            this.setOpacity("#eggIconOne")
            this.setOpacity("#eggIconTwo")
            this.setOpacity("#eggIconThree")
        }
        if (numberOfEggs === 4 ) {
            this.setOpacity("#eggIconOne")
            this.setOpacity("#eggIconTwo")
            this.setOpacity("#eggIconThree")
            this.setOpacity("#eggIconFour")
        }
        if (numberOfEggs === 6 ) {
            this.setOpacity("#eggIconOne")
            this.setOpacity("#eggIconTwo")
            this.setOpacity("#eggIconThree")
            this.setOpacity("#bonusIconOne")
            this.setOpacity("#bonusIconTwo")
            this.setOpacity("#bonusIconThree")
        }
    },
    setOpacity: function (id) {
        var icon = document.querySelector(id)
        icon.setAttribute('opacity', '0.2')
        icon.object3D.visible = true
    },
    setEggTimer: function (id, time) {
        this.data.eggTimeouts.push(setTimeout(() => { this.appearEgg(id)}, time))
    },
    appearEgg: function(id) {
        var egg = document.querySelector(id)
        var isVisible = egg.getAttribute('visible')
        if (!isVisible){
            egg.object3D.visible = true
            egg.components.sound.playSound();
        }
        this.appearIcon(id)
    },
    appearIcon: function(id) {      
        var eggIconOne = document.querySelector("#eggIconOne")
        var oneOpacity = eggIconOne.getAttribute('opacity')
        var eggIconTwo = document.querySelector("#eggIconTwo")
        var twoOpacity = eggIconTwo.getAttribute('opacity')
        var eggIconThree = document.querySelector("#eggIconThree")
        var threeOpacity= eggIconThree.getAttribute('opacity')
        var eggIconFour = document.querySelector("#eggIconFour")
        var fourOpacity = eggIconFour.getAttribute('opacity')
        var bonusIconOne = document.querySelector("#bonusIconOne")
        var bonusOpacityOne = bonusIconOne.getAttribute('opacity')
        var bonusIconTwo = document.querySelector("#bonusIconTwo")
        var bonusOpacityTwo = bonusIconTwo.getAttribute('opacity')
        var bonusIconThree = document.querySelector("#bonusIconThree")
        var bonusOpactiyThree= bonusIconThree.getAttribute('opacity')     
        var dull = 0.2
        var bright = 0.5

        // Activate Bonus Icons
        if (id == "#eggSeven" || id == "#eggEight" || id == "#eggNine") {
            if (bonusOpacityOne == dull && bonusOpacityTwo == dull && bonusOpactiyThree == dull) return bonusIconOne.setAttribute('opacity', bright)
            else if (bonusOpacityOne >= bright && bonusOpacityTwo == dull && bonusOpactiyThree == dull) return bonusIconTwo.setAttribute('opacity', bright)
            else if (bonusOpacityOne >= bright && bonusOpacityTwo >= bright && bonusOpactiyThree == dull) return bonusIconThree.setAttribute('opacity', bright)
        }
        else {
            // Activate Regular icons
            if (oneOpacity == dull && 
                twoOpacity == dull && 
                threeOpacity == dull && 
                fourOpacity == dull) {
                return eggIconOne.setAttribute('opacity', bright)
            }
            else if (oneOpacity >= bright && 
                twoOpacity == dull && 
                threeOpacity == dull  && 
                fourOpacity == dull) {
                return eggIconTwo.setAttribute('opacity', bright)
            }
            else if (oneOpacity >= bright && 
                twoOpacity >= bright &&
                threeOpacity == dull && 
                fourOpacity == dull) {
                return eggIconThree.setAttribute('opacity', bright)
            }
            else if (oneOpacity >= bright && 
                twoOpacity >= bright &&
                threeOpacity >= bright && 
                fourOpacity == dull) {
                return eggIconFour.setAttribute('opacity', bright)
            }
        }
    },
    readyLastScene: function() {
        this.data.eggTimeouts.forEach(timeout => clearTimeout(timeout))

        // var camera = document.querySelector("a-camera")
        // camera.parentNode.removeChild(camera);
        document.querySelector("#eggOne").object3D.visible = false
        document.querySelector("#eggTwo").object3D.visible = false
        document.querySelector("#eggThree").object3D.visible = false
        document.querySelector("#eggFour").object3D.visible = false
        document.querySelector("#eggFive").object3D.visible = false
        document.querySelector("#eggSix").object3D.visible = false
        document.querySelector("#eggSeven").object3D.visible = false
        document.querySelector("#eggEight").object3D.visible = false
        document.querySelector("#eggNine").object3D.visible = false
        // make egg counter disappear
		document.querySelector("#eggCount").object3D.visible = false
        // remove listeners
        var sceneEl = document.querySelector("a-scene")
        sceneEl.removeEventListener('videoChanged', this.selectScene);
    }
  })