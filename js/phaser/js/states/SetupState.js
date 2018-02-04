var SaveTheDate = SaveTheDate || {};

SaveTheDate.SetupState = {
  create: function() {
    let background = this.game.add.sprite(0,0,'living_room');

    let player = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, SaveTheDate.selectedPlayer);
    player.anchor.setTo(0.5);
    player.scale.x = 0.5;
    player.scale.y = 0.5;

    let pewButton = this.add.sprite(this.game.world.width - 225, this.game.world.height -125, 'pew');

    pewButton.inputEnabled = true;
    pewButton.events.onInputDown.add(function() {
      this.state.start('GameState');
    }, this);

    let style = { font: '35px Arial', fill: '#000' };
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'Story will go here!', style);
    text.anchor.setTo(0.5);


  }
};
