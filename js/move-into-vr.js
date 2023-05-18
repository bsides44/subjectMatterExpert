AFRAME.registerComponent('move-into-vr', {
    init: function() {
        var leftHand = document.createElement('a-entity');
        var rightHand = document.createElement('a-entity');
        
        window.addEventListener('enter-vr', () => {
            // move text and buttons down
            var sceneEl = document.querySelector('a-scene');
            var imageArr = sceneEl.querySelectorAll('a-image')
            var entityArr = sceneEl.querySelectorAll('a-entity')
            var welcomeText = document.querySelector('#welcomeText');
            var loadedText = document.querySelector('#loadedText');

            imageArr.forEach(image => this.moveDown(image, 1.6))
            entityArr.forEach(entity => this.moveDown(entity, 1.6))

            this.moveDown(welcomeText, 1.6)
            
            if (welcomeText.getAttribute('visible') || loadedText.getAttribute('visible')) {
                welcomeText.object3D.visible = false
                loadedText.object3D.visible = false
                document.querySelector('#vrText').object3D.visible = true
            }
            // add VR controllers
            leftHand.setAttribute('id', 'leftHand');
            leftHand.setAttribute('laser-controls', 'hand: left');
            leftHand.setAttribute('raycaster', 'objects: .cursor-listener');

            sceneEl.appendChild(leftHand);

            rightHand.setAttribute('id', 'rightHand');
            rightHand.setAttribute('laser-controls', 'hand: right');
            rightHand.setAttribute('raycaster', 'objects: .cursor-listener');

            sceneEl.appendChild(rightHand);
        })
        window.addEventListener('exit-vr', () => {
            // move text and buttons back up
            var sceneEl = document.querySelector('a-scene');
            var imageArr = sceneEl.querySelectorAll('a-image')
            var entityArr = sceneEl.querySelectorAll('a-entity')
            var welcomeText = document.querySelector('#welcomeText');
            var loadedText = document.querySelector('#loadedText');
            var vrText = document.querySelector('#vrText');

            imageArr.forEach(image => this.moveUp(image, 0.5))
            entityArr.forEach(entity => this.moveUp(entity, 1.6))

            this.moveUp(welcomeText, 1.6)
            
            if (vrText.getAttribute('visible')) {
                welcomeText.object3D.visible = true
                loadedText.object3D.visible = true
                vrText.object3D.visible = false
            }

            // remove VR controllers
            leftHand.parentNode.removeChild(leftHand);
            rightHand.parentNode.removeChild(rightHand);
        })
    },
    moveDown: function(element, yMove) {
        var oldPosition =  element.getAttribute('position')
        element.setAttribute('position', {x: oldPosition.x, y: oldPosition.y - yMove, z: oldPosition.z})
    },
    moveUp: function(element, yMove) {
        var newPosition =  element.getAttribute('position')
        element.setAttribute('position', {x: newPosition.x, y: newPosition.y + yMove, z: newPosition.z})
    },
})