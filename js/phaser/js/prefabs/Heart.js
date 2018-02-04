var SaveTheDate = SaveTheDate || {};

SaveTheDate.Heart = function(game, x, y, size) {
  Phaser.Sprite.call(this, game, x, y, 'heart');

  this.anchor.setTo(0.5);
  this.scale.setTo(0.4 * size, 0.4 * size);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.animations.add('glow', [0,1,2,1], 3, true);
  this.play('glow');
  this.health = 1;
  if(size === 1){
    this.points = 100;
  } else {
    this.points = 500;
  }
};

SaveTheDate.Heart.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.Heart.prototype.constructor = SaveTheDate.Heart;

SaveTheDate.Heart.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  SaveTheDate.GameState.score += this.points;
};
