var SaveTheDate = SaveTheDate || {};

SaveTheDate.HomeState = {
  create: function() {
    let background = this.game.add.sprite(0,0,'living_room');
    let statsStyle = { font: '35px "Press Start 2P"', fill: '#000' };
    this.selectedPlayer = '';

    let stats_box = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 250, 'stats_box');
    stats_box.anchor.setTo(0.5);
    stats_box.alpha = 0;

    let playerStats = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 250, '', statsStyle);
    playerStats.anchor.setTo(0.5);
    const sarahStats = 'name: Sarah\nspeed: 6\nfirepower: 10\nwords per minute: 102 ';
    const fade_speed = 300;

    let startButton = this.add.sprite(125, this.game.world.height - 75, 'start_button');
    startButton.anchor.setTo(0.5);

    startButton.inputEnabled = false;
    startButton.frame = 1;
    startButton.events.onInputDown.add(function() {
      this.state.start('SetupState');
    }, this);

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
      startButton.frame = 0;
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
      startButton.frame = 0;
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

    let style = {
      font: '40px "Press Start 2P"',
      fill: '#1e3cea',
      fontWeight: 'bold',
    };
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, 'CHOOSE A PLAYER', style);
    text.anchor.setTo(0.5);

    let calendar = this.game.add.sprite(this.game.world.centerX + 550, this.game.world.centerY - 300, 'wall_calendar');
    let cal_endar = this.game.add.sprite(this.game.world.centerX + 610, this.game.world.centerY - 250, 'cal_endar');
    cal_endar.scale.x = 0.15;
    cal_endar.scale.y = 0.15;
    cal_endar.anchor.setTo(0.5);
  }
};
