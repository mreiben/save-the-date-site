var SaveTheDate = SaveTheDate || {};

SaveTheDate.ResultState = {
  create: function() {
    var background = this.game.add.sprite(0,0,'background');

    // stop game music
    SaveTheDate.GameState.orchestra.stop();

    // start awesome music
    this.scoreMusic = this.add.audio('highScore');
    this.scoreMusic.play();

    var style = { font: '60px "Press Start 2P"', fill: "#000" };
    this.scoreText = this.game.add.text(50, 50, "Your Score:" + SaveTheDate.GameState.score, style);
    this.energyText = this.game.add.text(50, 150, "Nice job!", style);

    var button = this.game.add.button(50, 250, 'replay');
    button.inputEnabled = true;

    button.events.onInputDown.add(function(){
      this.state.start('HomeState');
    }, this);

  }
};
