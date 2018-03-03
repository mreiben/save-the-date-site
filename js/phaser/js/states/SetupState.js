var SaveTheDate = SaveTheDate || {};

SaveTheDate.SetupState = {
  create: function() {
    SaveTheDate.difficulty = SaveTheDate.HomeState.difficulty;
    let background = this.game.add.sprite(0,0,'living_room');

    let calendar = this.game.add.sprite(this.game.world.centerX + 550, this.game.world.centerY - 300, 'wall_calendar');

    let sarah = this.game.add.sprite(this.game.world.centerX - 152, this.game.world.centerY, 'Sarah');
    sarah.anchor.setTo(0.5);
    sarah.scale.x = 0.5;
    sarah.scale.y = 0.5;

    let jason = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, 'Jason');
    jason.anchor.setTo(0.5);
    jason.scale.x = -0.5;
    jason.scale.y = 0.5;

    let cal_endar = this.game.add.sprite(this.game.world.centerX + 610, this.game.world.centerY - 250, 'cal_endar');
    cal_endar.scale.x = 0.15;
    cal_endar.scale.y = 0.15;
    cal_endar.anchor.setTo(0.5);

    let skipButton = this.add.sprite(125, this.game.world.height - 75, 'skip_button');
    skipButton.anchor.setTo(0.5);

    // let gameStarted = false;
    // skipButton.inputEnabled = true;
    // skipButton.events.onInputDown.add(function() {
    //   gameStarted = true;
    //   this.state.start('GameState');
    // }, this);

    let gameStarted = false;
    skipButton.inputEnabled = true;
    skipButton.events.onInputDown.add(function() {
      gameStarted = true;
      this.state.start('DemoState');
    }, this);

    // load dialogue
    var proposal_dialogue = JSON.parse(this.game.cache.getText('opening_dialogue'))['proposal'];
    var stolen_dialogue = JSON.parse(this.game.cache.getText('opening_dialogue'))['stolen'];

    const sarah_x = sarah.position.x - 300;
    const sarah_y = sarah.position.y - 310;
    const jason_x = jason.position.x - 40;
    const jason_y = jason.position.y - 340;

    let sarah_box = this.game.add.sprite(sarah_x, sarah_y, 'dialogue_right');
    sarah_box.alpha = 0;

    let jason_box = this.game.add.sprite(jason_x, jason_y, 'dialogue_left');
    jason_box.alpha = 0;

    let cal_endar_box = this.game.add.sprite(this.game.world.centerX + 415, this.game.world.centerY + 335, 'dialogue_left');
    cal_endar_box.alpha = 0;
    cal_endar_box.angle = 180;

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

        y: this.game.world.centerY + 100,
        x: this.game.world.centerX + 550
      }, 2000, Phaser.Easing.Linear.None, true);
      let size = this.game.add.tween(cal_endar.scale).to({
        y: 1,
        x: 1
      }, 2000, Phaser.Easing.Linear.None, true, 100);
      let angle = this.game.add.tween(cal_endar).to({
        angle: 720
      }, 2000, Phaser.Easing.Linear.None, true, 100);

      const cal_endar_x = cal_endar.position.x - 200;
      const cal_endar_y = cal_endar.position.y + 550;


      for(let i = 0; i < stolen_dialogue.length; i++){
        const line = stolen_dialogue[i];
        setTimeout(() =>{
          if(line.speaker === "Sarah"){
            sarah_box.alpha = 1;
            jason_box.alpha = 0;
            cal_endar_box.alpha = 0;
            line_text.x = sarah_x + 25;
            line_text.y = sarah_y + 25;
            line_text.setText(line.content);
          }
          else if(line.speaker === "Jason") {
            sarah_box.alpha = 0;
            jason_box.alpha = 1;
            cal_endar_box.alpha = 0;
            line_text.x = jason_x + 25;
            line_text.y = jason_y + 25;
            line_text.setText(line.content);
          } else if(line.speaker === 'Cal_Endar'){
            sarah_box.alpha = 0;
            jason_box.alpha = 0;
            cal_endar_box.alpha = 1;
            line_text.x = cal_endar_x - 300;
            line_text.y = cal_endar_y - 130;
            line_text.setText(line.content);
          } else {
            sarah_box.alpha = 0;
            jason_box.alpha = 0;
            cal_endar_box.alpha = 0;
            line_text.setText('');
          }
        }, i * line.duration * 1000);
      }

    }, proposal_dialogue.length * 2000);

    setTimeout(() => {
      cal_endar.frame = 2;
    }, proposal_dialogue.length * 2000 + 7000);

    setTimeout(() => {
      cal_endar.frame = 1;
    }, proposal_dialogue.length * 2000 + 12000);

    setTimeout(() => {
      //demo state timer
      if(!gameStarted){
        this.state.start('DemoState');
      }
    },(proposal_dialogue.length + stolen_dialogue.length + 3.5) * 2000)

    setTimeout(() => {
      // date goes into calendar
      sarah_box.alpha = 0;
      jason_box.alpha = 0;
      cal_endar_box.alpha = 0;
      line_text.setText('');
      let date = SaveTheDate.selectedPlayer === 'Sarah' ? jason : sarah;
      let position = this.game.add.tween(date).to({
        y: this.game.world.centerY - 250,
        x: this.game.world.centerX + 610
      }, 2000, Phaser.Easing.Linear.None, true);
      let size = this.game.add.tween(date.scale).to({
        y: 0.15,
        x: 0.15
      }, 2000, Phaser.Easing.Linear.None, true, 100);
      let angle = this.game.add.tween(date).to({
        angle: 720
      }, 2000, Phaser.Easing.Linear.None, true, 100);
    }, (proposal_dialogue.length + stolen_dialogue.length) * 2000);

    setTimeout(() => {
      sarah_box.alpha = 0;
      jason_box.alpha = 0;
      cal_endar_box.alpha = 0;
      line_text.setText('');
      let date = SaveTheDate.selectedPlayer === 'Sarah' ? jason : sarah;
      date.frame = 6;
      let hero_box = SaveTheDate.selectedPlayer === 'Sarah' ? sarah_box : jason_box;
      cal_endar.scale.x = -1;
      let position = this.game.add.tween(cal_endar).to({
        y: this.game.world.centerY - 150,
        x: this.game.world.centerX + 540
      }, 1000, Phaser.Easing.Linear.None, true);

      setTimeout(() => {
        this.game.add.tween(cal_endar).to({
          y: this.game.world.centerY - 150,
          x: this.game.world.centerX + 1100
        }, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(calendar).to({
          y: this.game.world.centerY - 150,
          x: this.game.world.centerX + 1100
        }, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(date).to({
          y: this.game.world.centerY - 150,
          x: this.game.world.centerX + 1100
        }, 1000, Phaser.Easing.Linear.None, true);
      }, 1500);

      setTimeout(() =>{
        // dramatic no
        hero_box.alpha = 1;
        let hero_x = SaveTheDate.selectedPlayer === 'Sarah' ? sarah_x + 25 : jason_x + 25;
        let hero_y = SaveTheDate.selectedPlayer === 'Sarah' ? sarah_y + 25 : jason_y + 25;
        line_text.x = hero_x;
        line_text.y = hero_y;
        line_text.setText("NOOOOOO!");
        if (SaveTheDate.selectedPlayer === 'Sarah') {
          sarah.frame = 6;
        } else {
          jason.frame = 6;
        }
      }, 3000);
    }, (proposal_dialogue.length + stolen_dialogue.length + 1) * 2000);

  }
};