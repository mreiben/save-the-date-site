var SaveTheDate = SaveTheDate || {};

SaveTheDate.DemoState = {

  create: function() {
    this.game.currentState = 'DemoState';

    this.GLOBAL_SPEED = .75;
    this.PLAYER_SPEED = 800 * this.GLOBAL_SPEED;
    this.FIREBALL_SPEED = 2000 * this.GLOBAL_SPEED;
    this.UHAUL_SPEED = -150 * this.GLOBAL_SPEED;
    this.BACKGROUND_SPEED = -100 * this.GLOBAL_SPEED;


    this.background = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'background_demo');
    this.background.autoScroll(this.BACKGROUND_SPEED, 0);

    // set the score
    this.score = 0;
    var style = { font: '50px "Press Start 2P"', fill: "#000" };
    this.scoreText = this.game.add.text(50, 50, "Score:" + this.score, style);
    this.energyText = this.game.add.text(50, 150, "Energy:", style);

    //instruction flag
    let instruction_flag_style = { font: '45px "Press Start 2P"', fill: '#000' };
    this.instruction_text = this.game.add.text(this.game.world.centerX - 100, 50, '', instruction_flag_style);

    // set player energy
    this.energy = 3;
    this.batteries = this.add.group();
    this.battery1 = new SaveTheDate.Battery(this.game, 435, 175, 1);
    this.battery2 = new SaveTheDate.Battery(this.game, 510, 175, 2);
    this.battery3 = new SaveTheDate.Battery(this.game, 585, 175, 3);

    this.batteries.add(this.battery1);
    this.batteries.add(this.battery2);
    this.batteries.add(this.battery3);

    //player
    this.player = this.add.sprite(this.game.world.width * .15, this.game.world.centerY, SaveTheDate.selectedPlayer);
    this.player.animations.add('walk', [1, 2, 3, 4, 5], 10, true);
    this.player.animations.add('walkBackwards', [5, 4, 3, 2, 1], 10, true);
    this.player.play('walk');
    this.player.anchor.setTo(0.5);
    this.player.scale.x = 0.5;
    this.player.scale.y = 0.5;
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.invincible = false;

    // create fireball pool
    this.initFireballs();

    // track 2 fireballs per second
    this.fireballShot = false;

    // create hearts
    this.hearts = this.add.group();
    this.hearts.enableBody = true;

    // create boss bullets
    this.bossBullets = this.add.group();
    this.bossBullets.enableBody = true;

    // set up level
    this.initEnemies();
    this.numLevels = 6;
    this.currentLevel = 1;
    this.loadLevel();

    // add fireball button
    this.pewButton = this.add.sprite(this.game.world.width - 225, this.game.world.height -125, 'pew');
    // this.pewButton.animations.add('fired');

    let startButton = this.add.sprite(125, this.game.world.height - 75, 'start_button');
    startButton.anchor.setTo(0.5);

    startButton.inputEnabled = true;
    startButton.events.onInputDown.add(function() {
      this.state.start('GameState');
      this.game.score = this.score;
      this.game.playerX = this.player.x;
      this.game.playerY = this.player.y;
    }, this);

    // movement instructions ~ 5 seconds to try

    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.showMovementInstructions, this);

    //fireball instructions - space bar to shoot or hit pew

    // enemy stands
  },

  showMovementInstructions(){
    this.instruction_text.text = 'Move with the \narrow keys or your\ntouch screen.';
    this.instruction_text.alpha = 0;
    this.game.add.tween(this.instruction_text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
    setTimeout(() => {
      this.game.add.tween(this.instruction_text).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
      setTimeout(() => {
        this.showFireballInstructions();
      }, 2000);
    }, 5000);
  },

  showFireballInstructions(){
    this.instruction_text.text = 'Throw a fireball\nwith the space bar\nor "PEW" button.';
    this.instruction_text.alpha = 0;
    this.game.add.tween(this.instruction_text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
    setTimeout(() => {
      this.game.add.tween(this.instruction_text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
      setTimeout(() => {
        this.showEnemyInstructions();
      }, 2000);
    }, 4000);
  },

  showEnemyInstructions(){
    this.instruction_text.text = 'Shoot or dodge\nenemies before\nthey drain\nyour energy!';
    this.instruction_text.alpha = 0;
    this.game.add.tween(this.instruction_text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
    setTimeout(() => {
      this.game.add.tween(this.instruction_text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
      setTimeout(() => {
        this.showHeartInstructions();
      }, 2000);
    }, 4000);
    if(this.game.currentState === 'DemoState'){
      this.createEnemy('tooth', 2, 0, 'DemoState');
    }
  },

  showHeartInstructions(){
    this.instruction_text.text = 'Collect hearts from\ndefeated enemies to\nscore points!';
    this.instruction_text.alpha = 0;
    this.game.add.tween(this.instruction_text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
    setTimeout(() => {
      this.game.add.tween(this.instruction_text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
      setTimeout(() => {
        this.showStartInstructions();
      }, 2000);
    }, 4000);
  },

  showStartInstructions(){
    this.instruction_text.text = 'Press "START"\nwhen you\'re ready\nto play!';
    this.instruction_text.alpha = 0;
    this.game.add.tween(this.instruction_text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
  },

  // 

  createHeart: function(x, y, size) {
    var heart = new SaveTheDate.Heart(this.game, x, y, size);
    this.hearts.add(heart);
    // set velocity
    heart.body.velocity.x = this.BACKGROUND_SPEED;
  },

  collectHeart: function(player, heart) {
    heart.damage(1);
    this.scoreText.text = "Score:" + this.score;
  },


  update: function(){
    // player movement
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    // player movment with cursor
    if(this.game.input.activePointer.isDown){
      // check if pointer is over fireball button
      let targetX = this.game.input.activePointer.position.x;
      let targetY = this.game.input.activePointer.position.y;
      const buttonMinX = this.game.world.width - 225;
      const buttonMaxX = this.game.world.width - 25;
      const buttonMinY = this.game.world.height - 125;
      const buttonMaxY = this.game.world.height - 25;

      let isOverFireballButton = targetX >= buttonMinX && targetX <= buttonMaxX && targetY >= buttonMinY && targetY <= buttonMaxY;
      if (isOverFireballButton) {
        this.createPlayerFireball();
      } else { //if not over fireball button, move player
        //X
        let playerX = this.player.body.center.x;
        let xDiff = targetX > playerX ? targetX - playerX : playerX - targetX;
        var directionX = targetX >= this.player.body.center.x ? 1 : -1;
        if (xDiff > 25) {
          this.player.body.velocity.x = directionX * this.PLAYER_SPEED;
          if(this.player.body.velocity < 0){
            this.player.play('walkBackwards');
          } else {
            this.player.play('walk');
          }
        }
        //Y
        let playerY = this.player.body.center.y;
        let yDiff = targetY > playerY ? targetY - playerY : playerY - targetY;
        var directionY = targetY >= this.player.body.center.y ? 1 : -1;
        if (yDiff > 25){
          // set bounds so player does not walk off ground
          if (directionY === -1 && this.player.body.bottom > 410){
            this.player.body.velocity.y = directionY * this.PLAYER_SPEED;
          }
          else if (directionY === 1){
            this.player.body.velocity.y = directionY * this.PLAYER_SPEED;
          }
        }
      }
    }

    // player movement with keyboard
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.body.velocity.x = -1 * this.PLAYER_SPEED;
      this.player.play('walkBackwards');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.body.velocity.x = 1 * this.PLAYER_SPEED;
      this.player.play('walk');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.bottom > 410) {
      this.player.body.velocity.y = -1 * this.PLAYER_SPEED
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) { this.player.body.velocity.y = 1 * this.PLAYER_SPEED }

    // fireball with Keyboard

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.createPlayerFireball();
    }


    // check for overlap between fireballs and enemies
    this.game.physics.arcade.overlap(this.playerFireballs, this.enemies, this.damageEnemy, null, this);

    // check for overlap between player and hearts
    this.game.physics.arcade.overlap(this.player, this.hearts, this.collectHeart, null, this);

    // check for overlap between enemies and player
    this.game.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);

    // flash player when damaged
    if (this.invincible) {
      this.player.alpha = 0.5;
    } else {
      this.player.alpha = 1;
    }
  },

  initEnemies: function() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;

    this.bosses = this.add.group();
    this.bosses.enableBody = true;
  },

  damageEnemy: function(fireball, enemy) {
    enemy.damage(1);
    fireball.kill();
  },

  damagePlayer: function(player, enemy) {
    let enemyType = enemy.category;
    let spacing;
    if(enemyType === 'enemy'){
      spacing = 130;
    } else if(enemyType === 'bossBullet' && enemy.name === 'floss'){
      spacing =  70;
    } else if(enemyType === 'bossBullet') {
      spacing = 100;
    } else if(enemyType === 'boss') {
      spacing = 200;
    } else {
      spacing = 0;
    }
    let invincibleTime = enemyType === 'enemy' ? 1000 : 2000;
    let yDiff = Math.abs(player.body.center.y - enemy.body.center.y);
    let xDiff = Math.abs(player.body.center.x - enemy.body.center.x);
    if(enemy.name === "floss"){
      xDiff = 0;
    }
    if (!this.invincible && yDiff < spacing && xDiff < spacing) {
      if (this.energy === 3) {
        this.battery3.kill();
      } else if (this.energy === 2) {
        this.battery2.kill();
      } else if (this.energy === 1) {
        this.battery1.kill();
      }
      this.energy -= 1;
      this.invincible = true;
      setTimeout(() => {
        this.invincible = false;
      }, invincibleTime);
      if (this.energy === 0){
        // game over
        this.game.paused = true;
        setTimeout(() => {
          this.game.paused = false;
          this.state.start('ResultState');
        }, 1000);
      }
    }
  },


  initFireballs: function() {
    this.playerFireballs = this.add.group();
    this.playerFireballs.enableBody = true;
    this.playerFireballs.allowRotation = true;
  },

  createPlayerFireball: function() {
    this.pewButton.frame = 1;
    if(!this.fireballShot) {
      this.fireballShot = true;
      var fireball = this.playerFireballs.getFirstExists(false);

      if(!fireball) {
        fireball = new SaveTheDate.PlayerFireball(this.game, this.player.x, this.player.y);
        this.playerFireballs.add(fireball);
      }
      else {
        // reset position
        fireball.reset(this.player.x, this.player.y);
      }

      // set velocity
      fireball.body.velocity.x = this.FIREBALL_SPEED;
      setTimeout(() => {
        this.pewButton.frame = 0;
        this.fireballShot = false;
      }, 500);
    }

  },

  createHeart: function(x, y, size) {
    var heart = new SaveTheDate.Heart(this.game, x, y, size);
    this.hearts.add(heart);
    // set velocity
    heart.body.velocity.x = this.BACKGROUND_SPEED;
  },

  collectHeart: function(player, heart) {
    heart.damage(1);
    this.scoreText.text = "Score:" + this.score;
  },

  loadLevel: function(){

  },

  //create enemy
  createEnemy: function(type, health, speed, gameState) {
    let sprite;
    // find random valid y
    let randY = Math.floor(Math.random()*490) + 335;

    var enemy = new SaveTheDate.Enemy(this.game, this.game.world.width, randY, type, health, gameState);
    this.enemies.add(enemy);

    enemy.body.velocity.x = speed * (-.4 * this.currentLevel) * this.GLOBAL_SPEED;
  },


};
