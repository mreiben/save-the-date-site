var SaveTheDate = SaveTheDate || {};

SaveTheDate.ResultState = {
  create: function() {
    this.game.add.plugin(PhaserInput.Plugin);
    this.scoreReady = false;

    this.camera.flash('#000000');
    var background = this.game.add.sprite(0,0,'background_cave');

    // stop game music
    SaveTheDate.GameState.orchestra.stop();

    // create heart group
    this.hearts = this.add.group();

    // add player
    this.player = this.add.sprite(-50, this.game.world.centerY + 100, SaveTheDate.selectedPlayer);
    this.player.animations.add('dance', [1, 3, 5], 4, true);
    this.player.animations.add('walk', [1, 2, 3, 4, 5], 10, true);
    this.player.play('walk');
    this.player.anchor.setTo(0.5);
    this.player.scale.x = 0.5;
    this.player.scale.y = 0.5;

    // add calendar
    this.calendar = this.game.add.sprite(this.game.world.centerX - 75, this.game.world.centerY - 400, 'wall_calendar');

    // add date (in calendar)
    let date_name = SaveTheDate.selectedPlayer === 'Sarah' ? 'Jason' : 'Sarah'
    this.the_date = this.game.add.sprite(this.game.world.centerX - 15, this.game.world.centerY - 350, date_name);
    this.the_date.scale.x = 0.15;
    this.the_date.scale.y = 0.15;
    this.the_date.anchor.setTo(0.5);
    this.the_date.frame = 6;
    this.the_date.animations.add('dance', [1, 3, 5], 4, true);

    // add cal-endar
    this.cal_endar = this.game.add.sprite(this.game.world.centerX + 500, this.game.world.centerY, 'cal_endar');
    this.cal_endar.anchor.setTo(0.5);
    this.cal_endar.frame = 0;
    this.cal_endar.animations.add('dance', [4, 5], 4, true);

    //add blue_endar
    this.blue_endar = this.game.add.sprite(this.game.world.centerX + 30, this.game.world.centerY - 15, 'blue_endar');
    this.blue_endar.anchor.setTo(0.5);
    this.blue_endar.alpha = 0;
    this.blue_endar.animations.add('dance', [0, 1], 4, true);

    // add orange-endar
    this.orange_endar = this.game.add.sprite(this.game.world.centerX - 600, this.game.world.centerY + 200, 'orange_endar');
    this.orange_endar.anchor.setTo(0.5);
    this.orange_endar.alpha = 0;
    this.orange_endar.animations.add('dance', [0, 1], 4, true);

    // add dentist
    this.dentist = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY + 300, 'dentist');
    this.dentist.anchor.setTo(0.5);
    this.dentist.scale.x = 0.7;
    this.dentist.scale.y = 0.7;
    this.dentist.alpha = 0;
    this.dentist.animations.add('dance', [0, 1], 4, true);

    // add judge
    this.judge = this.game.add.sprite(this.game.world.centerX - 300, this.game.world.centerY - 250, 'judge');
    this.judge.anchor.setTo(0.5);
    this.judge.alpha = 0;
    this.judge.animations.add('dance', [0, 1], 4, true);

    
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

    this.score_box = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'save_score_box');
    this.score_box.anchor.setTo(0.5);
    this.score_box.scale.x = 2.5;
    this.score_box.scale.y = 2.5;
    this.score_box.alpha = 0;

    let heart_text = `Heart Score: ${SaveTheDate.GameState.score}`;
    let energy_text = `Energy: ${this.game.energy} X 250 = ${this.game.energy * 250}`;
    let hitMiss = this.game.shots != 0 ? (this.game.hits / this.game.shots) : 1;
    let accuracy = Math.floor(hitMiss * 100);
    let accuracy_text = `Accuracy: ${accuracy}% x 5 = ${accuracy * 5}`;
    // TODO: add difficulty settings
    let difficulty = 0;
    if (SaveTheDate.difficulty === 'medium'){
      difficulty = 10;
    }
    if (SaveTheDate.difficulty === 'hard'){
      difficulty = 20;
    }
    let difficulty_percent = `${SaveTheDate.difficulty}: ${difficulty}%`;
    let difficulty_text = `Bonus: ${difficulty_percent} = ${SaveTheDate.GameState.score * (difficulty/100)}`;

    this.total_points = Math.floor((SaveTheDate.GameState.score * (1 + (difficulty/100)))
                      + (this.game.energy * 250)
                      + (accuracy * 5));
    this.scoreReady = true;
    let total_text = `TOTAL: ${this.total_points}`;

    let heart_score = this.game.add.text(310, 200, heart_text, score_style);
    heart_score.alpha = 0;
    let energy_score = this.game.add.text(310, 440, energy_text, score_style);
    energy_score.alpha = 0;
    let accuracy_score = this.game.add.text(310, 360, accuracy_text, score_style);
    accuracy_score.alpha = 0;
    let difficulty_score = this.game.add.text(310, 280, difficulty_text, score_style);
    difficulty_score.alpha = 0;
    let total_score = this.game.add.text(310, 520, total_text, final_score_style);
    total_score.alpha = 0;

    this.save_button = this.game.add.sprite(1075, 600, 'save_button');
    this.save_button.frame = 2;

    this.text_group = [heart_score, energy_score, accuracy_score, difficulty_score, total_score];

    this.game.add.tween(this.score_box).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    this.text_group.forEach((text) => {
      this.game.add.tween(text).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    });

    // change continue/save button text
    // this.game.input.keyboard.onDownCallback = (e) => {
    //   if(this.save_button && this.inputName.value !== '') {
    //     console.log("hum");
    //     this.save_button.frame = 2;
    //   }
    //   else {
    //     console.log('huuuum');
    //     this.save_button.frame = 0;
    //   }
    // }

    this.inputName = this.game.add.inputField(310, 605, {
      font: '36px "Press Start 2p"',
      fontWeight:'bold',
      width: 675,
      padding: 26,
      borderRadius: 4,
      placeHolder: 'Your Name',
      blockInput: false
    });

    // this.inputName.startFocus();

    this.save_button.inputEnabled = true;
    this.save_button.events.onInputDown.add(function() {
      this.preSubmitScore();
    }, this);
  },

  preSubmitScore() {
    this.save_button.frame += 1;
    this.submitScore(this.total_points);
    setTimeout(() => {
      this.text_group.forEach((el) => {
        this.game.add.tween(el).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
      });
      this.game.add.tween(this.save_button).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
      // this.game.add.tween(this.inputName).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.score_box).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
      this.inputName.destroy();
      setTimeout(() => {
        this.playEnding();
      }, 1000)
    }, 500);
  },

  submitScore(score) {
    let name = this.inputName.value;
    let names = name.toUpperCase().split(' ');
    let initials = '';
    names.forEach((word) =>{
      initials += word.substring(0, 1);
    });

    let value = score;
    let player = SaveTheDate.selectedPlayer;
    let mode = SaveTheDate.difficulty;
    let payload = {
      name,
      value,
      player,
      initials,
      mode
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://save-the-date-api.herokuapp.com/api/scores/', true);
    xhr.setRequestHeader('Content-Type' ,'application/json');
    xhr.send(JSON.stringify(payload));

    
  },

  playEnding() {
    this.cal_endar.frame = 3;

    // add all dialogue boxes, make invisible
    // load dialogue
    // add text obj
    // loop through dialogue and put in the right place
    this.player_x_dialogue_box = this.player.position.x + 40;
    this.player_y_dialogue_box = this.player.position.y - 320;
    this.player_x = this.player.position.x;
    this.player_y = this.player.position.y;
    this.cal_endar_x = this.cal_endar.position.x - 480;
    this.cal_endar_y = this.cal_endar.position.y - 250;
    
    this.player_dialogue = this.game.add.sprite(this.player_x_dialogue_box, this.player_y_dialogue_box, 'dialogue_left')
    this.cal_endar_dialogue = this.game.add.sprite(this.cal_endar.position.x - 480, this.cal_endar.position.y - 250, 'dialogue_right')
    this.cal_endar_dialogue.alpha = 0;
    this.player_dialogue.alpha = 0;

    let closing_dialogue = JSON.parse(this.game.cache.getText('closing_dialogue'))['wrapup'];

    let line_num = 0;

    let style = { font: '25px "Press Start 2P"', fill: '#000' };

    this.line_text = this.game.add.text(this.player_x_dialogue_box, this.player_y_dialogue_box, '', style);

    for(let i = 0; i < closing_dialogue.length; i++){
      const line = closing_dialogue[i];
      if(line.has_input){
        line.content = `for fewer\nthan ${this.total_points}\npoints!`;
      }
      setTimeout(() =>{
        if(line.speaker === "hero"){
          this.player_dialogue.alpha = 1;
          this.cal_endar_dialogue.alpha = 0;
          this.line_text.x = this.player_x_dialogue_box + 25;
          this.line_text.y = this.player_y_dialogue_box + 25;
          this.line_text.setText(line.content);
        }
        else if (line.speaker === 'pause') {
          this.barfHearts();
          this.player_dialogue.alpha = 0;
          this.cal_endar_dialogue.alpha = 0;
          this.line_text.setText('');
        }
        else {
          this.player_dialogue.alpha = 0;
          this.cal_endar_dialogue.alpha = 1;
          this.line_text.x = this.cal_endar_x + 25;
          this.line_text.y = this.cal_endar_y + 25;
          this.line_text.setText(line.content);
        }
      }, i * line.duration * 1000);
    }

    setTimeout(() => {
      // date leaves calendar
      this.player_dialogue.alpha = 0;
      this.cal_endar_dialogue.alpha = 0;
      this.line_text.setText('');
      let position = this.game.add.tween(this.the_date).to({
        y: this.player_y,
        x: this.player_x + 125,
      }, 2000, Phaser.Easing.Linear.None, true);
      let size = this.game.add.tween(this.the_date.scale).to({
        y: 0.5,
        x: -0.5
      }, 2000, Phaser.Easing.Linear.None, true, 100);
      let angle = this.game.add.tween(this.the_date).to({
        angle: 720
      }, 2000, Phaser.Easing.Linear.None, true, 100);
    }, closing_dialogue.length * 2000);


    setTimeout(()=> {
      this.the_date.frame = 2;
      this.player.frame = 2;
      this.the_date.scale.x = -.5;
    }, (closing_dialogue.length + 1.25) * 2000);


    setTimeout(()=> {
      let heart = this.game.add.sprite(this.player_x + 65, this.player_y, 'heart');
      heart.scale.x = 0.2;
      heart.scale.y = 0.2;
      heart.anchor.setTo(0.5);
      let alpha = this.game.add.tween(heart).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true);
      let size = this.game.add.tween(heart.scale).to({
        y: 2,
        x: 2
      }, 2000, Phaser.Easing.Linear.None, true, 100);
      let angle = this.game.add.tween(heart).to({
        angle: 720
      }, 2000, Phaser.Easing.Linear.None, true, 100);
    }, (closing_dialogue.length + 1.25) * 2000);

    setTimeout(()=> {
      this.the_date.frame = 0;
      this.player.frame = 0;
      this.line_text.setText('');
    }, (closing_dialogue.length + 2) * 2000);

    setTimeout(()=> {
      this.playConfrontation();
    }, (closing_dialogue.length + 2.5) * 2000);
  },

  barfHearts(){

    for(let i = 0; i < 10; i++){
      setTimeout(() => {
        let xDiff = Math.floor(Math.random() * 100);
        let yDiff = Math.floor(Math.random() * 100);
        this.hearts.add(new SaveTheDate.Heart(
          this.game,
          this.player.position.x + xDiff,
          this.player.position.y - 200,
          1
        ));
      }, i * 200);
    }

    // loop through x times (if score / 100 < 10, 10, else score/100 )

      // create a heart object at hero's hands

      // add tween that makes heart fly straight up off screen

      // heart picks a random x position

      // heart falls to random y position between __ and __
  },

  playConfrontation() {
    this.date_x_dialogue_box = this.the_date.position.x + 40;
    this.date_y_dialogue_box = this.the_date.position.y - 280;
    this.date_dialogue = this.game.add.sprite(this.date_x_dialogue_box, this.date_y_dialogue_box, 'dialogue_left')
    this.cal_endar_dialogue.alpha = 0;
    this.player_dialogue.alpha = 0;
    this.date_dialogue.alpha = 0;

    let confrontation_dialogue = JSON.parse(this.game.cache.getText('closing_dialogue'))['confrontation'];

    let line_num = 0;

    let style = { font: '25px "Press Start 2P"', fill: '#000' };

    this.line_text = this.game.add.text(this.player_x_dialogue_box, this.player_y_dialogue_box, '', style);
    for(let i = 0; i < confrontation_dialogue.length; i++){
      let line = confrontation_dialogue[i];
      setTimeout(() =>{
        if(line.speaker === "hero"){
          this.player_dialogue.alpha = 1;
          this.cal_endar_dialogue.alpha = 0;
          this.date_dialogue.alpha = 0;
          this.line_text.x = this.player_x_dialogue_box + 25;
          this.line_text.y = this.player_y_dialogue_box + 25;
          this.line_text.setText(line.content);
        }
        else if (line.speaker === "date"){
          this.date_dialogue.alpha = 1;
          this.player_dialogue.alpha = 0;
          this.cal_endar_dialogue.alpha = 0;
          this.line_text.x = this.date_x_dialogue_box + 25;
          this.line_text.y = this.date_y_dialogue_box + 25;
          this.line_text.setText(line.content);
        }

        else {
          this.date_dialogue.alpha = 0;
          this.player_dialogue.alpha = 0;
          this.cal_endar_dialogue.alpha = 1;
          this.line_text.x = this.cal_endar_x + 25;
          this.line_text.y = this.cal_endar_y + 25;
          this.line_text.setText(line.content);
          if(line.start_dance){
            this.cal_endar.play('dance');
            this.the_date.play('dance');
            this.the_date.scale.x *= -1;
            this.player.play('dance');
            this.orange_endar.alpha = 1;
            this.orange_endar.play('dance');
            this.blue_endar.alpha = 1;
            this.blue_endar.play('dance');
            this.dentist.alpha = 1;
            this.dentist.play('dance');
            this.judge.alpha = 1;
            this.judge.play('dance');
          };
        }
      }, i * line.duration * 1000);
    }

    setTimeout(()=> {
      this.the_date.scale.x = 0.5;
    }, 10000);
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