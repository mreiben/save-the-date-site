var SaveTheDate = SaveTheDate || {};

SaveTheDate.HomeState = {

  create: function() {
    this.difficulty = SaveTheDate.difficulty;
    let background = this.game.add.sprite(0,0,'living_room');
    let statsStyle = { font: '35px "Press Start 2P"', fill: '#000' };
    this.selectedPlayer = '';
    let playerSelected = false;

    let style = {
      font: '40px "Press Start 2P"',
      fill: '#1e3cea',
      fontWeight: 'bold',
    };
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, 'CHOOSE A PLAYER', style);
    text.anchor.setTo(0.5);

    let stats_box = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 275, 'stats_box');
    stats_box.anchor.setTo(0.5);
    stats_box.alpha = 0;

    let playerStats = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 275, '', statsStyle);
    playerStats.anchor.setTo(0.5);
    const sarahStats = 'name: Sarah\nspeed: 6\nfirepower: 10\nwords per minute: 102 ';
    const fade_speed = 300;

    let startButton = this.add.sprite(125, this.game.world.height - 75, 'start_button');
    startButton.anchor.setTo(0.5);

    startButton.inputEnabled = false;
    startButton.frame = 0;
    startButton.alpha = 0;

    startButton.events.onInputDown.add(function() {
      SaveTheDate.difficulty = this.difficulty;
      this.state.start('SetupState');
    }, this);

    // difficulty buttons
    let difficultyBox = this.add.sprite(this.game.world.width - 190, 650, 'difficulty_box');
    difficultyBox.anchor.setTo(0.5);

    let easyButton = this.add.sprite(this.game.world.width - 190, 575, 'easy');
    easyButton.animations.add('glow', [0,1,2,1], 4, true);
    easyButton.frame = 2;
    easyButton.anchor.setTo(0.5);
    easyButton.inputEnabled = true;

    easyButton.events.onInputDown.add(function() {
      this.difficulty = 'easy'
      easyButton.frame = 2;
      mediumButton.frame = 0;
      hardButton.frame = 0;
    }, this);

    let mediumButton = this.add.sprite(this.game.world.width - 190, 650, 'medium');
    mediumButton.animations.add('glow', [0,1,2,1], 4, true);    
    mediumButton.anchor.setTo(0.5);
    mediumButton.inputEnabled = true;

    mediumButton.events.onInputDown.add(function() {
      this.difficulty = 'medium'
      easyButton.frame = 0;
      mediumButton.frame = 2;
      hardButton.frame = 0;
    }, this);

    let hardButton = this.add.sprite(this.game.world.width - 190, 725, 'hard');
    hardButton.animations.add('glow', [0,1,2,1], 4, true);    
    hardButton.anchor.setTo(0.5);
    hardButton.inputEnabled = true;

    hardButton.events.onInputDown.add(function() {
      this.difficulty = 'hard'
      easyButton.frame = 0;
      mediumButton.frame = 0;
      hardButton.frame = 2;
    }, this);

    let difficulty_items = [difficultyBox, easyButton, mediumButton, hardButton];
    difficulty_items.forEach((item) => {
      item.scale.x = 0.75;
      item.scale.y = 0.75;
    })

    let sarah = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, 'Sarah_glow');
    sarah.anchor.setTo(0.5);
    sarah.scale.x = 0.5;
    sarah.scale.y = 0.5;
    sarah.animations.add('glow', [0,1,2,1], 4, true);

    // Sarah mouseover - scale up
    sarah.events.onInputOver.add(() => {
      playerStats.setText(sarahStats);
      this.game.add.tween(sarah.scale).to({
        x: .6,
        y: .6
      }, 500, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(playerStats).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(stats_box).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
    });

    // Sarah mouseout - scale down
    sarah.events.onInputOut.add(() => {
      this.game.add.tween(sarah.scale).to({
        x: 0.5,
        y: 0.5
      }, 500, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(playerStats).to({
        alpha: 0
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(stats_box).to({
        alpha: 0
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
    });

    // Sarah selected
    sarah.inputEnabled = true;
    sarah.events.onInputDown.add(function() {
      startButton.inputEnabled = true;
      this.game.add.tween(startButton).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      if(!playerSelected){
        playerSelected = true;
        this.game.add.tween(text).to({
          alpha: 0
        }, fade_speed, Phaser.Easing.Linear.None, true, 100);
        text.setText("Press START to begin!");
        this.game.add.tween(text).to({
          alpha: 1
        }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      }
      SaveTheDate.selectedPlayer = 'Sarah';
      sarah.play('glow');
      jason.animations.stop();
      jason.frame = 0;
      this.game.add.tween(playerStats).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(stats_box).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
    }, this);

    const jasonStats = 'name: Jason\nspeed: 8\nfirepower: 7\nresting heart rate: 53';

    let jason = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, 'Jason_glow');
    jason.anchor.setTo(0.5);
    jason.scale.x = -0.5;
    jason.scale.y = 0.5;
    jason.animations.add('glow', [0,1,2,1], 4, true);
    
    // Jason mouseover - scale up
    jason.events.onInputOver.add(() => {
      playerStats.setText(jasonStats);
      this.game.add.tween(jason.scale).to({
        x: -0.6,
        y: 0.6
      }, 500, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(playerStats).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(stats_box).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
    });

    // Jason mouseout - scale down
    jason.events.onInputOut.add(() => {
      this.game.add.tween(jason.scale).to({
        x: -0.5,
        y: 0.5
      }, 500, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(playerStats).to({
        alpha: 0
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(stats_box).to({
        alpha: 0
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
    });

    // Jason selected
    jason.inputEnabled = true;
    jason.events.onInputDown.add(function() {
      startButton.inputEnabled = true;
      this.game.add.tween(startButton).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      if(!playerSelected){
        playerSelected = true;
        this.game.add.tween(text).to({
          alpha: 0
        }, fade_speed, Phaser.Easing.Linear.None, true, 100);
        text.setText("Press START to begin!");
        this.game.add.tween(text).to({
          alpha: 1
        }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      }
      SaveTheDate.selectedPlayer = 'Jason';
      sarah.animations.stop();
      sarah.frame = 0;
      jason.play('glow');
      this.game.add.tween(playerStats).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
      this.game.add.tween(stats_box).to({
        alpha: 1
      }, fade_speed, Phaser.Easing.Linear.None, true, 100);
    }, this);

    let calendar = this.game.add.sprite(this.game.world.centerX + 550, this.game.world.centerY - 300, 'wall_calendar');
    let cal_endar = this.game.add.sprite(this.game.world.centerX + 610, this.game.world.centerY - 250, 'cal_endar');
    cal_endar.scale.x = 0.15;
    cal_endar.scale.y = 0.15;
    cal_endar.anchor.setTo(0.5);
  }
};
