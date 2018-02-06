var SaveTheDate = SaveTheDate || {};

SaveTheDate.SetupState = {
  create: function() {
    let background = this.game.add.sprite(0,0,'living_room');

    let sarah = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, 'sarah');
    sarah.anchor.setTo(0.5);
    sarah.scale.x = 0.5;
    sarah.scale.y = 0.5;

    let jason = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, 'jason');
    jason.anchor.setTo(0.5);
    jason.scale.x = -0.5;
    jason.scale.y = 0.5;

    let pewButton = this.add.sprite(this.game.world.width - 225, this.game.world.height -125, 'pew');

    pewButton.inputEnabled = true;
    pewButton.events.onInputDown.add(function() {
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

    let style = { font: '22px "Press Start 2P"', fill: '#000' };

    let line_text = this.game.add.text(sarah_x, sarah_y, '', style);

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

// let style = { font: '35px Arial', fill: '#fff' };
// let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'CHOOSE A PLAYER TO START', style);
// text.anchor.setTo(0.5);