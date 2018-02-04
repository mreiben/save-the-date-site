var SaveTheDate = SaveTheDate || {};

SaveTheDate.PlayerFireball = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'fireball');

  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.animations.add('spin', [0,1,2,3], 10, true);
  this.play('spin');
};

SaveTheDate.PlayerFireball.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.PlayerFireball.prototype.constructor = SaveTheDate.PlayerFireball;
