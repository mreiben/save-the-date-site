var SaveTheDate = SaveTheDate || {};

SaveTheDate.BossBullet = function(game, x, y, type) {
  Phaser.Sprite.call(this, game, x, y, type);

  this.anchor.setTo(0.5);
  this.category = 'bossBullet';
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.animations.add('spin', [0,1,2,3], 7, true);
  this.animations.add('lasso', [0,1], 5, true);
  this.name = type;

  if(type === 'bossGavel'){
    this.play('spin');
  }
  else if (type === 'floss'){
    this.play('lasso');
  }
};

SaveTheDate.BossBullet.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.BossBullet.prototype.constructor = SaveTheDate.BossBullet;
