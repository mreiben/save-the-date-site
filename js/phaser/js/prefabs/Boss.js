var SaveTheDate = SaveTheDate || {};

SaveTheDate.Boss = function(game, x, y, type, health) {
  Phaser.Sprite.call(this, game, x, y, type);
  this.isPaused = false;
  this.category = 'boss';
  if(type === 'doctopus'){
    this.scale.setTo(0.8);
  }
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.health = 20;
  this.bossType = type;
  console.log(this.bossType);
  this.animations.add('still', [0], 1, true)
  this.animations.add('walk', [0,1], 3, true);
  this.animations.add('damaged', [2,3], 3, false);
  this.animations.add('blink', [0, 4, 0, 4], 2, false);
  this.play('walk');

  // set boss state - 'start', 'reverse'
  this.bossState = 'start';
};

SaveTheDate.Boss.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.Boss.prototype.constructor = SaveTheDate.Boss;

SaveTheDate.Boss.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  this.play('damaged');

  if(this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('enemyParticle');
    emitter.minParticleSpeed.setTo(-400, -400);
    emitter.maxParticleSpeed.setTo(400, 400);
    emitter.gravity = false;
    emitter.start(true, 500, null, 100);

    // end loops
    this.game.time.events.remove(this.gavelLoop);

    // create heart
    SaveTheDate.GameState.createHeart(this.x, this.y, 2);
    SaveTheDate.GameState.currentLevel++;
    SaveTheDate.GameState.loadLevel();
  }

  setTimeout(() => {
    this.play('walk');
  }, 1000);
};

SaveTheDate.Boss.prototype.update = function() {
  let playerY = SaveTheDate.GameState.player.centerY;
  let bossY = this.body.center.y;
  let distance = Math.abs(playerY - bossY);
  let bossBelowPlayer = playerY < bossY;
  let direction = bossBelowPlayer ? -1 : 1;
  if(this.bossState === 'start'){
    this.body.velocity.y = -300;
  }

  if(this.bossType === 'uhaul'){
    if(this.bossState === 'start'){
      if(distance > 15){
        this.body.velocity.y = 300 * direction;
      } else {
        this.play('blink');
        this.bossState = 'blink';
      }
    }
    if(this.bossState === 'blink'){
      this.body.velocity.y = 0;
      setTimeout(() => {
        this.body.velocity.y = 0;
        this.play('walk');
        this.bossState = 'charge';
      }, 1000);
    }
    if(this.bossState === 'charge'){
      if(this.body.center.x > 200){
        this.body.velocity.x = -1500;
      } else {
        this.body.velocity.x = 0;
        setTimeout(() =>{
          this.play('blink');
          this.bossState = 'reverse';
        }, 1000);
      }
    }
    if(this.bossState === 'reverse'){
      if(this.body.center.x < 1300){
        this.body.velocity.x = 1000;
      } else {
        this.body.velocity.x = 0;
        setTimeout(() =>{
          this.play('walk');
          this.bossState = 'start';
        }, 1000);
      }
    }
  }

  if(this.bossType === 'judge'){
    if(bossY < 300){
      this.body.velocity.y = 300;
    } else if(bossY > 800){
      this.body.velocity.y = -300;
    }
    if(this.bossState === 'start'){
      this.gavelLoop = this.game.time.events.loop(1500, createGavel, this);
      this.bossState = 'fire';
    }
  }

  if(this.bossType === 'doctopus'){
    if(bossY < 300 && !this.isPaused){
      this.body.velocity.y = 300;
    } else if(bossY > 800 && !this.isPaused){
      this.body.velocity.y = -300;
    }
    if(this.bossState === 'start'){
      this.gavelLoop = this.game.time.events.loop(4000, createFloss, this);
      this.bossState = 'fire';
    }
  }
};

let createGavel = function() {
  let gavel = new SaveTheDate.BossBullet(this.game, this.x, this.y, 'bossGavel');
  SaveTheDate.GameState.bossBullets.add(gavel);
  let radians = this.game.physics.arcade.angleBetween(SaveTheDate.GameState.player, gavel);
  let degrees = radians * (180/Math.PI);
  let speed = ((20 - this.health) * -50) + -800;
  this.game.physics.arcade.velocityFromAngle(degrees, speed, gavel.body.velocity);
};

let createFloss = function() {
  let floss = new SaveTheDate.BossBullet(this.game, this.x - 770, this.y - 35, 'floss');
  this.isPaused = true;
  this.body.velocity.y = 0;
  SaveTheDate.GameState.bossBullets.add(floss);
  this.play('still');
  setTimeout(() => {
    this.isPaused = false;
    Math.floor(Math.random() * 2) === 0 ? this.body.velocity.y = -300 : this.body.velocity.y = 300;
    SaveTheDate.GameState.bossBullets.remove(floss);
    this.play('walk');
  }, 2000)
};
