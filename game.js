var config = {

scene: [ scene1, scene2],

pixelArt: true,

scale: {

  mode: Phaser.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width:800,
  height: 600
},

physics:{
  default: "arcade",
  arcade:{
  //  debug:true
  }
}

}

var game = new Phaser.Game(config);
