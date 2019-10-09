### Static Number

## How to Play

Should be click static number, there are some numbers that are changeable except one of them. You should click it.

the 4th game trying with Phaser 3









**used**


`sprite.setInteractive()` like 3th
`this.physics.add.sprite()`
`this.input.on("gameobjectdown", fx, this)`
`spritesheet()`
`.setRandomPosition()`
`.play()`
`.setVelocity()`
`.setCollideWorldBounds()`
`.setBounce()`



### Resized sprites with the real ratios in dynamic Canvas sizes:

`this.__next_by_nextPcs = 7;`


   `this.canvas = this.sys.game.canvas;
				this._width = this.canvas.offsetWidth;
				this._height = this.canvas.offsetHeight;


				this.__sprite_w = 64;
				this.__sprite_h = 64;
				this.__gap = this._width/(this.__next_by_nextPcs + 1);
				this.__sprite_w_scale = this.__gap/(this._width*64/800);
				this.__sprite_h_scale = this.__gap/(this._height*64/600);`
        
        with this ratio:
        `  this.__sprite = this.physics.add.sprite(0,0, "numbers")`
  `.setScale(this.__sprite_w_scale, this.__sprite_h_scale);`
  
  
  ## Some notes
  
  There was a problem with setTimeout()
  
  `setTimeout(() => {

      const date = new Date();
      console.log("time");
      console.log(date.getSeconds() + " - " + date.getMilliseconds());


      if (this.__tour === 2){
        // console.log(this.__tour);
      }
console.log(_tmp_toggle.sign);`
`
//console.log(this.__tmp_tour[1].length);`
`
//console.log(this.__tmp_tour[2].length);`

      `this.__total_sec--;

      this.checkRunOutTime(this.__total_sec);

      this.__text_obj.destroy();

      this.__point_text.destroy();

      this.__text_obj = this.add.text(0,0,"Sec.: " + this.__total_sec, {font: "bold 40px Georgia"});

      this.__point_text = this.add.text(0,40,"Point:  " + this.__point, {font: "bold 40px Georgia", fill:"Yellow"});

      this.__sec_toggle = {key: true, sign: this.__sec_toggle.sign};
  //    this.__tmp_tour[this.__tour].push(this.__tour);`

`}, 1000);`

Problem was that on the new screen1 renew the timer before 1000ms.

solved by adding this: 
`this.textReWrite_say++;`

  `if (_tmp_toggle.key === true && this.textReWrite_say >= 200){`
  
  ## [Facebook instant games](https://apps.facebook.com/398784267718147 "Facebook instant games")


## [Demo](https://html5.ozguruygulama.com/static_number/index.html "Demo")
