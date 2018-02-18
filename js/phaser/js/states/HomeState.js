var SaveTheDate = SaveTheDate || {};

SaveTheDate.HomeState = {
  create: function() {
    let background = this.game.add.sprite(0,0,'living_room');

    let sarah = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, 'Sarah');
    sarah.anchor.setTo(0.5);
    sarah.scale.x = 0.5;
    sarah.scale.y = 0.5;

    sarah.inputEnabled = true;
    sarah.events.onInputDown.add(function() {
      SaveTheDate.selectedPlayer = 'Sarah';
      this.state.start('SetupState');
    }, this);

    let jason = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, 'Jason');
    jason.anchor.setTo(0.5);
    jason.scale.x = -0.5;
    jason.scale.y = 0.5;

    jason.inputEnabled = true;
    jason.events.onInputDown.add(function() {
      SaveTheDate.selectedPlayer = 'Jason';
      SaveTheDate.playerSpeed = 1000;
      this.state.start('SetupState');
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
