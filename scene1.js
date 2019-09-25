class scene1 extends Phaser.Scene{

constructor(){

super({key:"scene1"});

this.__UNAnim_say = 0;
this.__tour = 0;
this.__loss = 0;

this.__stopSprite_say = 0;
this.__level = 0;
this.__tmp_tour = ["",[],[]];
this.__next_by_nextPcs = 5;
this.__point = 0;


}

preload(){

  this.__velocityXs = [-200, 200];
  this.__velocityYs = [-200, 200];
  this.__configs = [];
  this.__number_pcs = 3;
//  this.__UNAnim_say = 0; // ###: contiune counting
  this.__total_sec_def = 10;
  this.__total_sec = this.__total_sec_def + this.__loss;
  this.__sec_toggle = {key: true, sign: (this.__tour + 1)};
  this.__tour++;
  this.__spriteDics = [];
  this.textReWrite_say = 0;
  this.__trueClick = 0;

this.load.spritesheet("numbers", "assets/numbers.png", {
  frameWidth: 64,
  frameHeight: 64
});



//################# sprites w,h square ###############################

this.canvas = this.sys.game.canvas;

//			console.log(this.canvas);

this._width = this.canvas.offsetWidth;
this._height = this.canvas.offsetHeight;



// def w,h: 800,600 in v1

this.__sprite_w = 64;
this.__sprite_h = 64;


this.__gap = this._width/(this.__next_by_nextPcs + 1);
this.__sprite_w_scale = this.__gap/(this._width*64/800);
this.__sprite_h_scale = this.__gap/(this._height*64/600);


}



create(){

  // #### add text ########################

  this.__text_obj = this.add.text(0,0,"Sec.: " + this.__total_sec, {font: "bold 40px Georgia"});
  this.__point_text = this.add.text(0,40,"Point: " + this.__point, {font: "bold 40px Georgia", fill: "Yellow"});

// this.add.text(0,0,"loaded");

// this.__physics_group = this.physics.add.group();
//this.physics.world.setBoundsCollision();

for (let i = 0; i < this.__number_pcs + (this.__tour - 1); i++){

  let range_18 = Phaser.Math.Between(1,10);

  let _i = i + 1;
  this.__configs.push({
    key: "conf" + this.__tour + "_" + _i,
    frames: this.anims.generateFrameNumbers("numbers", {
      start: range_18,
    //  end: _i
    }),
    frameRate: 1,
    repeat: -1
  });

  this.anims.create(this.__configs[i]);

  this.__sprite = this.physics.add.sprite(0,0, "numbers")
  .setScale(this.__sprite_w_scale, this.__sprite_h_scale);


  this.__spriteDics.push({object: this.__sprite,
  key: "conf" + this.__tour + "_" + _i});

//  this.__physics_group.add(this.__sprite);

  this.__sprite.setRandomPosition();

  this.__sprite.play("conf" + this.__tour + "_" + _i);


  this.__sprite.setVelocityX(this.__velocityXs[Phaser.Math.Between(0,1)]);
  this.__sprite.setVelocityY(this.__velocityYs[Phaser.Math.Between(0,1)]);
  this.__sprite.setCollideWorldBounds(true);
  this.__sprite.setBounce(1);
  this.__sprite.setInteractive();




}

// ###############UN Anim SPrite ###################################

  this.makeUNAnimSprite();

  this.input.on("gameobjectdown", this.selectObject, this);



}

update(){

  this.textReWrite();

  this.checkItemPcs();



//  this.__sprite.velocityFromAngle(15);
//  this.__sprite.body.facing = 1;
//  this.__sprite.setVelocityX(100);

 // console.log(this.__sprite.body.velocity);
}


selectObject(pointer, gameObject){

  let __key = this.__spriteDics.find(s=>s.object === gameObject).key;

  console.log(__key.substring(0,2));

  if (__key.substring(0,1) === "U"){

    this.__trueClick++;

    this.__total_sec += (this.__total_sec_def-this.__trueClick);

    this.spriteDestroy(gameObject);

    this.stopOneSprite();


  }

  else {

    this.__total_sec -= 1;

  }

//  gameObject.setVelocity(0);
//  gameObject.setGravityY(600);



} // selectObject

makeUNAnimSprite(){

  this.__UNAnim_say++;

  let range_18 = Phaser.Math.Between(1,10);

  let _config = {
    key: "UNAnim" + this.__UNAnim_say,
    frames: this.anims.generateFrameNumbers("numbers", {
      start: range_18,
      end: range_18
    }),
    frameRate: 1,
    repeat: 0
  }

  this.anims.create(_config);

  let _sprite = this.physics.add.sprite(0,0, "numbers")
  .setScale(this.__sprite_w_scale, this.__sprite_h_scale);

  this.__spriteDics.push({object: _sprite,
  key: "UNAnim" + this.__UNAnim_say});

  _sprite.setRandomPosition()
  .play("UNAnim" + this.__UNAnim_say)
  .setVelocityX(this.__velocityXs[Phaser.Math.Between(0,1)])
  .setVelocityY(this.__velocityYs[Phaser.Math.Between(0,1)])
  .setCollideWorldBounds(true)
  .setBounce(1)
  .setInteractive();


}

textReWrite(){

  this.textReWrite_say++;

  let _tmp_toggle = this.__sec_toggle;

  if (_tmp_toggle.key === true && this.textReWrite_say >= 200){

    this.__sec_toggle.key = false;



    setTimeout(() => {

      const date = new Date();
      console.log("time");
      console.log(date.getSeconds() + " - " + date.getMilliseconds());


      if (this.__tour === 2){
        // console.log(this.__tour);
      }
console.log(_tmp_toggle.sign);
//console.log(this.__tmp_tour[1].length);
//console.log(this.__tmp_tour[2].length);

      this.__total_sec--;

      this.checkRunOutTime(this.__total_sec);

      this.__text_obj.destroy();

      this.__point_text.destroy();

      this.__text_obj = this.add.text(0,0,"Sec.: " + this.__total_sec, {font: "bold 40px Georgia"});

      this.__point_text = this.add.text(0,40,"Point:  " + this.__point, {font: "bold 40px Georgia", fill:"Yellow"});

      this.__sec_toggle = {key: true, sign: this.__sec_toggle.sign};
  //    this.__tmp_tour[this.__tour].push(this.__tour);

}, 1000);

}




}

checkRunOutTime(sec){

if (sec === 0){

this.__loss += 1;
this.__tour -= 2;

if (this.__loss > 1) this.__loss = 1;
if (this.__tour <= 0) this.__tour = 1;

this.__point = 0;

this.scene.start("scene2");

}

}

spriteDestroy(sprite_object){

this.__spriteDics.splice(this.__spriteDics.indexOf(this.__spriteDics.find(s=>s.object === sprite_object)), 1);

sprite_object.destroy();

}

stopOneSprite(){

  this.__stopSprite_say++;

  let range_18 = Phaser.Math.Between(1,10);

  let rangeSpriteNumber = Phaser.Math.Between(1, this.__spriteDics.length);

  let rangeSpriteOrder = rangeSpriteNumber-1;

  let _static_conf = {

    key: "UNAnim" + this.__tour + "_" + this.__stopSprite_say,

    frames: this.anims.generateFrameNumbers("numbers", {
      start: range_18,
      end: range_18
    }),
    frameRate: 1,
    repeat: 0


  }

  this.anims.create(_static_conf);
  this.__spriteDics[rangeSpriteOrder].key = "UNAnim" + this.__tour + "_" + this.__stopSprite_say;
  this.__spriteDics[rangeSpriteOrder].object.play("UNAnim" + this.__tour + "_" + this.__stopSprite_say);


  console.log("static" + this.__tour + "_" + this.__stopSprite_say);




}

checkItemPcs(){

  if (this.__spriteDics.length === 1){

    this.__level += 1;
    this.__sec_toggle = false;
    this.__point += this.__total_sec;
    this.scene.start("scene1");

  }
}

}
