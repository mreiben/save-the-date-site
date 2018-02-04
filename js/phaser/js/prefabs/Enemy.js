var SaveTheDate = SaveTheDate || {};

SaveTheDate.Enemy = function(game, x, y, type, health) {
  Phaser.Sprite.call(this, game, x, y, type);

  this.category = 'enemy';
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.health = health;
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
    SaveTheDate.GameState.createHeart(this.x, this.y, 1);

  }

  setTimeout(() => {
    this.play('walk');
  }, 1000);
};
