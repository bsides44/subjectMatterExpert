AFRAME.registerComponent('button-hover', {
  schema: {
    button: {type: 'string', default: '#nextButton'},
    scale: {type: 'vec3', default:{x: 0.8, y: 0.4, z: 0.8}}
  },
    init: function () {
      var button = document.querySelector(this.data.button)
      var scale = this.data.scale

      // change scale of button on controller hover 
      button.addEventListener('raycaster-intersected', () => {
        button.setAttribute('scale', {x:scale.x*1.25, y:scale.y*1.25, z: scale.z * 1.25});
      })
      button.addEventListener('raycaster-intersected-cleared', () => { 
        button.setAttribute('scale', this.data.scale);
      })
    },
})