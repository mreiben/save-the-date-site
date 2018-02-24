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
      this.setPlayerScore();
      // start convo
    }, 2000)
  },

  setPlayerScore: function() {
    var score_style = { font: '36px "Press Start 2P"', fill: "#000" };
    var bonus_score_style = { font: '36px "Press Start 2P"', fill: "#888" };
    var final_score_style = { font: '36px "Press Start 2P"', fill: "#EA0000" };

    let score_box = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'save_score_box');
    score_box.anchor.setTo(0.5);
    score_box.scale.x = 2.5;
    score_box.scale.y = 2.5;
    score_box.alpha = 0;

    let heart_text = `Heart Score: ${SaveTheDate.GameState.score}`;
    let energy_text = `Energy: ${this.game.energy} X 250 = ${this.game.energy * 250}`;
    let accuracy = Math.floor((this.game.hits / this.game.shots) * 100);
    let accuracy_text = `Accuracy: ${accuracy}% x 10 = ${accuracy * 10}`;
    // TODO: add difficulty settings
    let difficulty = SaveTheDate.difficulty === 'hard' ? 1000 : 0;
    let difficulty_text = `Difficulty: ${difficulty}`;

    let total_points = SaveTheDate.GameState.score + (this.game.energy * 250) + (accuracy * 10);
    let total_text = `TOTAL: ${total_points}`;

    let heart_score = this.game.add.text(310, 200, heart_text, score_style);
    heart_score.alpha = 0;
    let energy_score = this.game.add.text(310, 260, energy_text, score_style);
    energy_score.alpha = 0;
    let accuracy_score = this.game.add.text(310, 320, accuracy_text, score_style);
    accuracy_score.alpha = 0;
    let difficulty_score = this.game.add.text(310, 380, difficulty_text, score_style);
    difficulty_score.alpha = 0;
    let total_score = this.game.add.text(310, 440, total_text, final_score_style);
    total_score.alpha = 0;

    let text_group = [heart_score, energy_score, accuracy_score, difficulty_score, total_score];

    this.game.add.tween(score_box).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    text_group.forEach((text) => {
      this.game.add.tween(text).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    })
  }
};

    // this.game.time.events.add(0, function() {
    //   this.game.add.tween(this.line_text).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    // }, this);

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