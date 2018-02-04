var SaveTheDate = SaveTheDate || {};

SaveTheDate.GameState = {

  create: function() {
    this.PLAYER_SPEED = 650;
    this.FIREBALL_SPEED = 2000;
    this.UHAUL_SPEED = -200;
    this.BACKGROUND_SPEED = -100;

    // this.selectedPlayer = 'sarah';

    this.background = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'background');
    this.background.autoScroll(this.BACKGROUND_SPEED, 0);

    // set the score
    this.score = 0;
    var style = { font: '60px "Press Start 2P"', fill: "#000" };
    this.scoreText = this.game.add.text(50, 50, "Score:" + this.score, style);
    this.energyText = this.game.add.text(50, 150, "Energy:", style);

    // set player energy
    this.energy = 3;
    this.batteries = this.add.group();
    this.battery1 = new SaveTheDate.Battery(this.game, 485, 175, 1);
    this.battery2 = new SaveTheDate.Battery(this.game, 560, 175, 2);
    this.battery3 = new SaveTheDate.Battery(this.game, 635, 175, 3);

    this.batteries.add(this.battery1);
    this.batteries.add(this.battery2);
    this.batteries.add(this.battery3);

    //player
    this.player = this.add.sprite(this.game.world.width * .15, this.game.world.centerY, SaveTheDate.selectedPlayer);
    this.player.animations.add('walk', [1, 2, 3, 4, 5], 8, true);
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
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { this.player.body.velocity.x = -1 * this.PLAYER_SPEED }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { this.player.body.velocity.x = 1 * this.PLAYER_SPEED }
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

    // check for overlap between fireballs and bosses
    this.game.physics.arcade.overlap(this.playerFireballs, this.bosses, this.damageEnemy, null, this);

    // check for overlap between player and bosses
    this.game.physics.arcade.overlap(this.player, this.bosses, this.damagePlayer, null, this);

    // check for overlap between player and bossBullets
    this.game.physics.arcade.overlap(this.player, this.bossBullets, this.damagePlayer, null, this);

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
    console.log(enemy);
    if(enemyType === 'enemy'){
      spacing = 80;
    } else if(enemyType === 'bossBullet' && enemy.name === 'floss'){
      spacing =  50;
    } else if(enemyType === 'bossBullet') {
      spacing = 100;
    } else if(enemyType === 'boss') {
      spacing = 160;
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
        console.log('game over!');
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

    if(this.currentLevel > this.numLevels){
      this.game.state.start('ResultState', true, false, this.score);
    }
    else {
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

    enemy.body.velocity.x = speed * (-.4 * this.currentLevel);
  },

  createBoss: function(type) {
    let boss = new SaveTheDate.Boss(this.game, this.game.world.width - 200, 500, type, 20);
    this.bosses.add(boss);
  },

  scheduleNextEnemy: function(){
    var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

    if(nextEnemy){
      if(this.currentLevel % 2 === 0) { // even levels are boss levels
        this.createBoss(nextEnemy.key);
      } else {
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
