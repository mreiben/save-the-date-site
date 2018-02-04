var SaveTheDate = SaveTheDate || {};

SaveTheDate.HomeState = {
  create: function() {
    let background = this.game.add.sprite(0,0,'background');

    let sarah = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, 'sarah');
    sarah.anchor.setTo(0.5);
    sarah.scale.x = 0.5;
    sarah.scale.y = 0.5;

    sarah.inputEnabled = true;
    sarah.events.onInputDown.add(function() {
      SaveTheDate.selectedPlayer = 'sarah';
      this.state.start('SetupState');
    }, this);

    let jason = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, 'jason');
    jason.anchor.setTo(0.5);
    jason.scale.x = -0.5;
    jason.scale.y = 0.5;

    jason.inputEnabled = true;
    jason.events.onInputDown.add(function() {
      SaveTheDate.selectedPlayer = 'jason';
      this.state.start('SetupState');
    }, this);

    let style = { font: '35px Arial', fill: '#fff' };
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'CHOOSE A PLAYER TO START', style);
    text.anchor.setTo(0.5);


  }
};
