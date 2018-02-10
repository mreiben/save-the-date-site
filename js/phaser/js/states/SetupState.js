var SaveTheDate = SaveTheDate || {};

SaveTheDate.SetupState = {
  create: function() {
    let background = this.game.add.sprite(0,0,'living_room');

    let calendar = this.game.add.sprite(this.game.world.centerX + 550, this.game.world.centerY - 300, 'wall_calendar');
    let cal_endar = this.game.add.sprite(this.game.world.centerX + 605, this.game.world.centerY - 250, 'cal_endar');
    cal_endar.scale.x = 0.15;
    cal_endar.scale.y = 0.15;
    cal_endar.anchor.setTo(0.5);

    let sarah = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, 'sarah');
    sarah.anchor.setTo(0.5);
    sarah.scale.x = 0.5;
    sarah.scale.y = 0.5;

    let jason = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, 'jason');
    jason.anchor.setTo(0.5);
    jason.scale.x = -0.5;
    jason.scale.y = 0.5;

    let skipButton = this.add.sprite(this.game.world.width - 225, this.game.world.height -125, 'skip');

    skipButton.inputEnabled = true;
    skipButton.events.onInputDown.add(function() {
      this.state.start('GameState');
    }, this);

    // load dialogue
    var proposal_dialogue = JSON.parse(this.game.cache.getText('opening_dialogue'))['proposal'];
    // var proposal_dialogue = this.game.cache.getJSON('opening_dialogue')["proposal"];

    const sarah_x = sarah.position.x - 300;
    const sarah_y = sarah.position.y - 310;
    const jason_x = jason.position.x - 40;
    const jason_y = jason.position.y - 340

    let sarah_box = this.game.add.sprite(sarah_x, sarah_y, 'dialogue_right');
    sarah_box.alpha = 0;

    let jason_box = this.game.add.sprite(jason_x, jason_y, 'dialogue_left');
    jason_box.alpha = 0;

    let line_num = 0;

    let style = { font: '25px "Press Start 2P"', fill: '#000' };

    let line_text = this.game.add.text(sarah_x, sarah_y, '', style);

    let phases = ['proposal', 'cal_endar', 'stolen'];

    for(let i = 0; i < proposal_dialogue.length; i++){
      const line = proposal_dialogue[i];
      setTimeout(() =>{
        if(line.speaker === "Sarah"){
          sarah_box.alpha = 1;
          jason_box.alpha = 0;
          line_text.x = sarah_x + 25;
          line_text.y = sarah_y + 25;
          line_text.setText(line.content);
        }
        else {
          sarah_box.alpha = 0;
          jason_box.alpha = 1;
          line_text.x = jason_x + 25;
          line_text.y = jason_y + 25;
          line_text.setText(line.content);
        }
      }, i * line.duration * 1000);
    }
    setTimeout(() =>{
      jason.scale.x = .5;
      let position = this.game.add.tween(cal_endar).to({

        y: this.game.world.centerY + 50,
        x: this.game.world.centerX + 550
      }, 2000, Phaser.Easing.Linear.None, true);
      let size = this.game.add.tween(cal_endar.scale).to({
        y: 1,
        x: 1
      }, 2000, Phaser.Easing.Linear.None, true, 100);
      let angle = this.game.add.tween(cal_endar).to({
        angle: 720
      }, 2000, Phaser.Easing.Linear.None, true, 100);
    }, proposal_dialogue.length * 2000)

  },

  proposal() {
    for(let i = 0; i < proposal_dialogue.length; i++){
      const line = proposal_dialogue[i];
      setTimeout(() =>{
        if(line.speaker === "Sarah"){
          sarah_box.alpha = 1;
          jason_box.alpha = 0;
          line_text.x = sarah_x + 25;
          line_text.y = sarah_y + 25;
          line_text.setText(line.content);
        }
        else {
          sarah_box.alpha = 0;
          jason_box.alpha = 1;
          line_text.x = jason_x + 25;
          line_text.y = jason_y + 25;
          line_text.setText(line.content);
        }
      }, i * line.duration * 1000);
    }
  }

};