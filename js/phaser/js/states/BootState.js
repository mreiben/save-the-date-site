var SaveTheDate = SaveTheDate || {};

SaveTheDate.BootState = {
  //initiate some game-level settings
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function() {
    this.load.image('logo', './js/phaser/assets/images/logo.png');
    this.load.image('preloadBar', './js/phaser/assets/images/loading.png');
  },

  create: function() {
    this.game.stage.backgroundColor = '#fff';

    this.state.start('PreloadState');
  }
};

SaveTheDate.selectedPlayer = '';
SaveTheDate.difficulty = 'easy';
