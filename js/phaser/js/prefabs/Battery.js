var SaveTheDate = SaveTheDate || {};

SaveTheDate.Battery = function(game, x, y, number) {
  Phaser.Sprite.call(this, game, x, y, 'battery');

  this.anchor.setTo(0.5);
  // this.scale.x = 0.4;
  // this.scale.y = 0.4;
  this.animations.add('glow', [0,1,2,1], 1.1, true);
  this.play('glow');
  this.health = 1;
};

SaveTheDate.Battery.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.Battery.prototype.constructor = SaveTheDate.Battery;

SaveTheDate.Battery.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  console.log('points increased!');
};
