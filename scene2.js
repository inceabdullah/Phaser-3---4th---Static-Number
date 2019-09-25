class scene2 extends Phaser.Scene{
  constructor(){super({key:"scene2"});}

  create(){

this.add.text(0,0,"Loss", {font: "bold 40px Georgia"});

this.input.on("pointerdown", function(){this.scene.start("scene1");}, this);


  }
}
