var SaveTheDate = SaveTheDate || {};

SaveTheDate.GameState = {

  create: function() {
    this.game.currentState = 'GameState';
    SaveTheDate.GameState.score = 0;
    this.movementEnabled = true;
    this.game.shots = 0;
    this.game.hits = 0;

    this.GLOBAL_SPEED = .75;
    this.PLAYER_SPEED = SaveTheDate.selectedPlayer === 'Sarah' ? 650 * this.GLOBAL_SPEED : 800 * this.GLOBAL_SPEED;
    this.FIREBALL_SPEED = 2000 * this.GLOBAL_SPEED;
    this.UHAUL_SPEED = -150 * this.GLOBAL_SPEED;
    this.BACKGROUND_SPEED = -100 * this.GLOBAL_SPEED;
    this.FIRE_POWER = SaveTheDate.selectedPlayer === 'Sarah' ? 500 : 650;

    // this.selectedPlayer = 'sarah';

    this.background = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'background');
    this.background.autoScroll(this.BACKGROUND_SPEED, 0);

    // set the score
    var style = { font: '50px "Press Start 2P"', fill: "#000" };
    this.scoreText = this.game.add.text(50, 50, "Score:" + this.game.score, style);
    this.energyText = this.game.add.text(50, 150, "Energy:", style);

    let enemy_flag_style = { font: '45px "Press Start 2P"', fill: '#000' };
    this.line_text = this.game.add.text(this.game.world.centerX - 100, 50, '', enemy_flag_style);

    // set player energy
    this.game.energy = 3;
    this.batteries = this.add.group();
    this.battery1 = new SaveTheDate.Battery(this.game, 435, 175, 1);
    this.battery2 = new SaveTheDate.Battery(this.game, 510, 175, 2);
    this.battery3 = new SaveTheDate.Battery(this.game, 585, 175, 3);

    this.batteries.add(this.battery1);
    this.batteries.add(this.battery2);
    this.batteries.add(this.battery3);

    this.cave = this.add.sprite(this.game.width, 100, 'cave_mouth');
    this.cave.scale.x = 1.2;
    this.cave.scale.y = 1.2;

    //player
    this.player = this.add.sprite(this.game.playerX, this.game.playerY, SaveTheDate.selectedPlayer);
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

    // start awesome music
    this.orchestra = this.add.audio('orchestra');
    this.orchestra.play();

    // set up level
    this.initEnemies();
    this.numLevels = 6;
    this.currentLevel = 1;
    this.loadLevel();

    // add fireball button
    this.pewButton = this.add.sprite(this.game.world.width - 225, this.game.world.height -125, 'pew');
    // this.pewButton.animations.add('fired');
  },

  update: function(){
    // player movement
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    // player movment with cursor
    if(this.game.input.activePointer.isDown && this.movementEnabled){
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

    // TEMPORARY: skip to results stage
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
      this.game.state.start('ResultState');
    }

    // player movement with keyboard
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.movementEnabled) {
      this.player.body.velocity.x = -1 * this.PLAYER_SPEED;
      this.player.play('walkBackwards');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&& this.movementEnabled) {
      this.player.body.velocity.x = 1 * this.PLAYER_SPEED;
      this.player.play('walk');
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.bottom > 410 && this.movementEnabled) {
      this.player.body.velocity.y = -1 * this.PLAYER_SPEED;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.movementEnabled) {
      this.player.body.velocity.y = 1 * this.PLAYER_SPEED;
    }

    // fireball with Keyboard

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.movementEnabled) {
      this.createPlayerFireball();
    }

    // damage cannot happen when movement is disabled
    if(this.movementEnabled){
      // check for overlap between fireballs and enemies
      this.game.physics.arcade.overlap(this.playerFireballs, this.enemies, this.damageEnemy, null, this);

      // check for overlap between player and hearts
      this.game.physics.arcade.overlap(this.player, this.hearts, this.collectHeart, null, this);

      // check for overlap between enemies and player
      this.game.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);

      // check for overlap between fireballs and bosses
      this.game.physics.arcade.overlap(this.playerFireballs, this.bosses, this.damageEnemy, null, this);

      // check for overlap between player and bosses
      this.game.physics.arcade.overlap(this.player, this.bosses, this.damagePlayer, null, this);

      // check for overlap between player and bossBullets
      this.game.physics.arcade.overlap(this.player, this.bossBullets, this.damagePlayer, null, this);
    }

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
    this.game.hits++;
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
      spacing = 225 ;
    } else {
      spacing = 0;
    }
    let invincibleTime = enemyType === 'enemy' ? 2000 : 3000;
    let yDiff = Math.abs(player.body.center.y - enemy.body.center.y);
    let xDiff = Math.abs(player.body.center.x - enemy.body.center.x);
    if(enemy.name === "floss"){
      xDiff = 0;
    }
    if (!this.invincible && yDiff < spacing && xDiff < spacing) {
      if (this.game.energy === 3) { 
        this.battery3.kill();
      } else if (this.game.energy === 2) {
        this.battery2.kill();
      } else if (this.game.energy === 1) {
        this.battery1.kill();
      }
      this.game.energy -= 1;
      this.invincible = true;
      setTimeout(() => {
        this.invincible = false;
      }, invincibleTime);
      if (this.game.energy === 0){
        // game over
        this.game.paused = true;
        setTimeout(() => {
          this.game.paused = false;
          this.transitionToResults(this.player.x, this.player.y);
        }, 1000);
      }
    }
  },

  transitionToResults: function(playerX, playerY) {
    let screenElements = [this.enemies, this.bosses, this.playerFireballs, this.bossBullets, this.hearts];
    screenElements.forEach((el) =>{
      this.game.add.tween(el).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
      setTimeout(() => {
        el.kill;
      }, 1500);
    });
    this.movementEnabled = false;
    // bring cave to screen
    this.game.add.tween(this.cave).to({
      x: this.game.world.width - 400
    }, 9000, Phaser.Easing.Linear.None, true);

    // move character to center
    this.game.add.tween(this.player).to({
      y: this.game.world.centerY + 100,
      x: this.game.world.centerX
    }, 3000, Phaser.Easing.Linear.None, true);

    setTimeout(() => {
      // pause background after transitions
      this.background.autoScroll(0,0);
      this.player.animations.stop(null, true);
      this.player.frame = 0;

      // say something then enter cave
      setTimeout(() =>{
        let player_box = this.game.add.sprite(this.player.x -30, this.player.y - 315, 'dialogue_left');
        player_box.alpha = 1;
        let style = { font: '25px "Press Start 2P"', fill: '#000' };

        let line_text = this.game.add.text(this.player.x - 10, this.player.y - 295, 'Ooh,\na cave!', style);

        setTimeout(() => {
          player_box.alpha = 0;
          line_text.text = '';

          this.player.play('walk');
          this.game.add.tween(this.player).to({
            y: 350,
            x: this.game.world.width -170
          }, 3000, Phaser.Easing.Linear.None, true);

          setTimeout(()=> {
            this.camera.fade('#000000');
            this.camera.onFadeComplete.add(function(){
              this.game.state.start('ResultState');
            },this)
          }, 2500)
        }, 2000)
      }, 1000);
    }, 9000);
  },

  initFireballs: function() {
    this.playerFireballs = this.add.group();
    this.playerFireballs.enableBody = true;
    this.playerFireballs.allowRotation = true;
  },

  createPlayerFireball: function() {
    this.pewButton.frame = 1;
    if(!this.fireballShot) {
      this.game.shots++;
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
      }, this.FIRE_POWER);
    }

  },

  createHeart: function(x, y, size) {
    var heart = new SaveTheDate.Heart(this.game, x, y, size);
    this.hearts.add(heart);
    // set velocity
    heart.body.velocity.x = this.BACKGROUND_SPEED;
    if(SaveTheDate.GameState.currentBoss === "judge" && size === 2){
      setTimeout(() => {
        heart.body.velocity.x = 0;
      }, 8000);
    }
  },

  collectHeart: function(player, heart) {
    heart.damage(1);
    this.scoreText.text = "Score:" + SaveTheDate.GameState.score;
  },

  loadLevel: function(){
    // only load new level if player has energy
    if(this.movementEnabled){
      this.currentEnemyIndex = 0;
      this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
      this.scheduleNextEnemy();
    }
  },

  //create enemy
  createEnemy: function(type, health, speed) {
    let sprite;
    // find random valid y
    let randY = Math.floor(Math.random()*490) + 335;

    var enemy = new SaveTheDate.Enemy(this.game, this.game.world.width, randY, type, health);
    this.enemies.add(enemy);

    enemy.body.velocity.x = speed * (-.4 * this.currentLevel) * this.GLOBAL_SPEED;
  },

  createBoss: function(type) {
    let boss = new SaveTheDate.Boss(this.game, this.game.world.width - 200, 500, type, 20);
    this.bosses.add(boss);
  },

  scheduleNextEnemy: function(){
    var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

    if(nextEnemy){
      if(this.currentLevel % 2 === 0) { // even levels are boss levels
        let bossText;
        this.currentBoss = nextEnemy.key;
        if(nextEnemy.key === 'uhaul') bossText = 'Moving Day';
        if(nextEnemy.key === 'dentist') bossText = 'Dentist Appointment';
        if(nextEnemy.key === 'judge') bossText = 'Jury Duty';
        this.line_text.alpha = 0;
        this.line_text.text = `Calendar Conflict:\n${bossText}`;

        this.game.time.events.add(0, function() {
          this.game.add.tween(this.line_text).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        this.game.time.events.add(1000, function() {
          this.game.add.tween(this.line_text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        this.game.time.events.add(2000, function() {
          this.game.add.tween(this.line_text).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        setTimeout(()=>{
          this.createBoss(nextEnemy.key);
        }, 4000);
      } else {
        this.line_text.text = ``;
        var nextTime = 1500 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex -1].time));
        this.nextEnemyTimer = this.game.time.events.add(nextTime, () =>{
          this.createEnemy(nextEnemy.key, nextEnemy.health, nextEnemy.speedX);
          this.currentEnemyIndex++;
          this.scheduleNextEnemy();
        });
      }
    }
    else {
      setTimeout(() =>{
        this.currentLevel++;
        this.loadLevel();
      }, 4000);
    }
  },

};
