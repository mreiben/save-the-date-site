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
  this.size = size;
  this.fromBoss = SaveTheDate.GameState.currentBoss ? SaveTheDate.GameState.currentBoss : 'minion';
  if(size === 1){
    this.points = 100;
  } else {
    this.points = 500;
  }

  if(SaveTheDate.difficulty === 'medium' && this.size === 1) {
    setTimeout(() => {
      this.game.add.tween(this).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true, 100);
    }, 4000);
    setTimeout(() => {
      Phaser.Sprite.prototype.damage.call(this, 1);
    }, 6000);
  }

  if(SaveTheDate.difficulty === 'hard' && this.size === 1) {
    setTimeout(() => {
      this.game.add.tween(this).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true, 100);
    }, 3000);
    setTimeout(() => {
      Phaser.Sprite.prototype.damage.call(this, 1);
    }, 5000);
  }
};

SaveTheDate.Heart.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.Heart.prototype.constructor = SaveTheDate.Heart;

SaveTheDate.Heart.prototype.damage = function(amount) {
  this.collect_heart = this.game.add.audio('collect_heart');
  this.collect_heart.play();

  if (SaveTheDate.difficulty === 'easy') this.points *= .5;
  if (SaveTheDate.difficulty === 'medium') this.points *= 1;
  if (SaveTheDate.difficulty === 'hard') this.points *= 1.5;
  Phaser.Sprite.prototype.damage.call(this, amount);
  if(this.game.currentState === 'DemoState'){
    SaveTheDate.DemoState.score += this.points;
  } else {
    SaveTheDate.GameState.score += this.points;
    if(this.fromBoss === 'judge') {
      // transition to cave
      SaveTheDate.GameState.transitionToResults();
      // this.game.state.start('ResultState', true, false, SaveTheDate.GameState.score);
    }
  }
};
