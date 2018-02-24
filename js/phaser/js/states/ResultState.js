var SaveTheDate = SaveTheDate || {};

SaveTheDate.ResultState = {
  create: function() {
    this.camera.flash('#000000');
    var background = this.game.add.sprite(0,0,'background_cave');

    // stop game music
    SaveTheDate.GameState.orchestra.stop();

    // add player
    this.player = this.add.sprite(-50, this.game.world.centerY + 100, SaveTheDate.selectedPlayer);
    this.player.animations.add('walk', [1, 2, 3, 4, 5], 10, true);
    this.player.play('walk');
    this.player.anchor.setTo(0.5);
    this.player.scale.x = 0.5;
    this.player.scale.y = 0.5;

    // add calendar
    let calendar = this.game.add.sprite(this.game.world.centerX - 75, this.game.world.centerY - 400, 'wall_calendar');

    // add date (in calendar)
    let date_name = SaveTheDate.selectedPlayer === 'Sarah' ? 'Jason' : 'Sarah'
    let the_date = this.game.add.sprite(this.game.world.centerX - 15, this.game.world.centerY - 350, date_name);
    the_date.scale.x = 0.15;
    the_date.scale.y = 0.15;
    the_date.anchor.setTo(0.5);

    // add cal-endar
    let cal_endar = this.game.add.sprite(this.game.world.centerX + 500, this.game.world.centerY, 'cal_endar');
    cal_endar.anchor.setTo(0.5);
    cal_endar.frame = 3;
    
    this.game.add.tween(this.player).to({
      y: this.game.world.centerY + 100,
      x: 300
    }, 2000, Phaser.Easing.Linear.None, true);

    setTimeout(() => {
      this.player.animations.stop();
      this.player.frame = 0;
      // start convo
    }, 2000)
  }
};



    // start awesome music
    // this.scoreMusic = this.add.audio('highScore');
    // this.scoreMusic.play();

    // var style = { font: '60px "Press Start 2P"', fill: "#000" };
    // this.scoreText = this.game.add.text(50, 50, "Your Score:" + SaveTheDate.GameState.score, style);
    // this.energyText = this.game.add.text(50, 150, "Nice job!", style);

    // var button = this.game.add.button(50, 250, 'replay');
    // button.inputEnabled = true;

    // button.events.onInputDown.add(function(){
    //   this.state.start('HomeState');
    // }, this);