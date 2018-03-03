var SaveTheDate = SaveTheDate || {};

SaveTheDate.Enemy = function(game, x, y, type, health, gameState) {
  if(gameState === 'DemoState'){
    x = game.world.width;
    y = game.world.centerY;
  }
  Phaser.Sprite.call(this, game, x, y, type);

  if(gameState === 'DemoState'){
    game.add.tween(this).to({

      y: game.world.centerY,
      x: game.world.width - 300
    }, 1000, Phaser.Easing.Linear.None, true);
  }

  this.category = 'enemy';
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.health = health;
  if (SaveTheDate.difficulty === 'easy') this.health *= .5;
  if (SaveTheDate.difficulty === 'medium') this.health *= 1;
  if (SaveTheDate.difficulty === 'hard') this.health *= 1.5;
  this.animations.add('walk', [0,1,2,1], 3, true);
  this.animations.add('damaged', [3,4,5,4], 3, false);
  this.play('walk');
};

SaveTheDate.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.Enemy.prototype.constructor = SaveTheDate.Enemy;

SaveTheDate.Enemy.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  this.play('damaged');

  if(this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('enemyParticle');
    emitter.minParticleSpeed.setTo(-400, -400);
    emitter.maxParticleSpeed.setTo(400, 400);
    emitter.gravity = false;
    emitter.start(true, 500, null, 100);

    // create heart
    if(this.game.currentState === 'DemoState') {
      SaveTheDate.DemoState.createHeart(this.x, this.y, 1);
    } else {
      SaveTheDate.GameState.createHeart(this.x, this.y, 1);
    }
  }

  setTimeout(() => {
    this.play('walk');
  }, 1000);
};
