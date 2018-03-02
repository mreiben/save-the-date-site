var SaveTheDate = SaveTheDate || {};

SaveTheDate.PreloadState = {

  //load the game assets before the game starts
  preload: function(){

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 75, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 256, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);


    this.load.image('background', './js/phaser/assets/images/background.png');
    this.load.image('background_demo', './js/phaser/assets/images/background_demo.png');
    this.load.image('background_cave', './js/phaser/assets/images/background_cave.png');
    this.load.image('dialogue_left', './js/phaser/assets/images/dialogue_left.png');
    this.load.image('dialogue_right', './js/phaser/assets/images/dialogue_right.png');
    this.load.image('living_room', './js/phaser/assets/images/living_room.png');
    this.load.spritesheet('Sarah', './js/phaser/assets/images/sarah.png', 240, 318, 10, 0, 0);
    this.load.spritesheet('Sarah_glow', './js/phaser/assets/images/sarah_glow.png', 300, 400, 3, 0, 0);
    this.load.spritesheet('Jason', './js/phaser/assets/images/jason.png', 288, 416, 10, 0, 0);
    this.load.spritesheet('Jason_glow', './js/phaser/assets/images/jason_glow.png', 310, 500, 3, 0, 0);
    this.load.image('replay', './js/phaser/assets/images/replay.png');
    this.load.image('enemyParticle', './js/phaser/assets/images/enemyParticle.png');
    this.load.spritesheet('skip_button','./js/phaser/assets/images/skip_button.png', 200, 100, 2, 0, 0);
    this.load.spritesheet('save_button','./js/phaser/assets/images/save_button.png', 200, 100, 2, 0, 0);
    this.load.spritesheet('pew','./js/phaser/assets/images/pew.png', 200, 100, 2, 0, 0);
    this.load.spritesheet('start_button','./js/phaser/assets/images/start_button.png', 200, 100, 2, 0, 0);
    this.load.spritesheet('uhaul','./js/phaser/assets/images/uhaul.png', 435, 330, 5, 0, 0);
    this.load.spritesheet('judge','./js/phaser/assets/images/judge.png', 310, 381, 4, 0, 0);
    this.load.spritesheet('heart','./js/phaser/assets/images/heart.png', 240, 224, 3, 0, 0);
    this.load.spritesheet('battery','./js/phaser/assets/images/battery.png', 50, 75, 3, 0, 0);
    this.load.spritesheet('box','./js/phaser/assets/images/box.png', 194, 129, 6, 0, 0);
    this.load.spritesheet('gavel','./js/phaser/assets/images/gavel.png', 180, 150, 6, 0, 0);
    this.load.spritesheet('bossGavel','./js/phaser/assets/images/bossGavel.png', 180, 180, 4, 0, 0);
    this.load.spritesheet('tooth','./js/phaser/assets/images/tooth.png', 150, 180, 6, 0, 0);
    this.load.spritesheet('fireball', './js/phaser/assets/images/fireball.png', 40, 40, 4, 0, 0);
    this.load.spritesheet('floss','./js/phaser/assets/images/floss.png', 1200, 100, 2, 0, 0);
    this.load.spritesheet('dentist','./js/phaser/assets/images/dentist.png', 305, 500, 4, 0, 0);
    this.load.spritesheet('cal_endar','./js/phaser/assets/images/cal_endar.png', 475, 475, 4, 0, 0);
    this.load.image('wall_calendar', './js/phaser/assets/images/wall_calendar.png');
    this.load.image('stats_box', './js/phaser/assets/images/stats_box.png');
    this.load.image('save_score_box', './js/phaser/assets/images/save_score_box.png');
    this.load.image('cave_mouth', './js/phaser/assets/images/cave_mouth.png');


    this.load.audio('orchestra', ['./js/phaser/assets/audio/JPEinstrumental.mp3', 'assets/audio/JPEinstrumental.ogg']);
    this.load.audio('highScore', ['./js/phaser/assets/audio/high_score.wav']);

    //load level data
    this.load.text('level1', './js/phaser/assets/data/level1.json');
    this.load.text('level2', './js/phaser/assets/data/level2.json');
    this.load.text('level3', './js/phaser/assets/data/level3.json');
    this.load.text('level4', './js/phaser/assets/data/level4.json');
    this.load.text('level5', './js/phaser/assets/data/level5.json');
    this.load.text('level6', './js/phaser/assets/data/level6.json');
    this.load.text('opening_dialogue', './js/phaser/assets/data/opening_dialogue.json');
    this.load.text('closing_dialogue', './js/phaser/assets/data/closing_dialogue.json');
  },

  create: function() {
    this.state.start('HomeState');
  }

};
