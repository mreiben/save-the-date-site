var SaveTheDate = SaveTheDate || {};

SaveTheDate.ResultState = {
  create: function() {
    this.game.add.plugin(PhaserInput.Plugin);
    this.scoreReady = false;

    this.camera.flash('#000000');
    this.background = this.game.add.sprite(0,0,'background_cave');

    // add uhaul
    this.uhaul = this.game.add.sprite(-600, this.game.world.centerY - 300, 'uhaul');
    this.uhaul.scale.x = 0.6;
    this.uhaul.scale.y = 0.6;

    this.background_front = this.game.add.sprite(0,0,'background_cave_front');

    // stop game music
    SaveTheDate.GameState.orchestra.stop();

    this.guests = [];

    // add calendar
    this.calendar = this.game.add.sprite(this.game.world.centerX - 75, this.game.world.centerY - 400, 'wall_calendar');

    // add disco ball
    this.disco_ball = this.game.add.sprite(this.game.world.centerX, -200, 'disco_ball');
    this.disco_ball.anchor.setTo(0.5);
    this.disco_ball.animations.add('spin', [2, 3, 4, 1], 2, true);

    // add player
    this.player = this.add.sprite(-50, this.game.world.centerY + 100, SaveTheDate.selectedPlayer);
    this.player.animations.add('dance', [1, 3, 5], 4, true);
    this.player.animations.add('walk', [1, 2, 3, 4, 5], 10, true);
    this.player.play('walk');
    this.player.anchor.setTo(0.5);
    this.player.scale.x = 0.5;
    this.player.scale.y = 0.5;

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

    // create heart group
    this.hearts = this.add.group();

    //add blue_endar
    this.blue_endar = this.game.add.sprite(this.game.world.width + 200, this.game.world.centerY - 15, 'blue_endar');
    this.guests.push({name: this.blue_endar, x: this.game.world.centerX + 30, y: this.game.world.centerY - 15});
    this.blue_endar.anchor.setTo(0.5);
    this.blue_endar.animations.add('dance', [0, 1], 4, true);

    // add orange-endar
    this.orange_endar = this.game.add.sprite(-150, this.game.world.centerY + 300, 'orange_endar');
    this.guests.push({name: this.orange_endar, x: this.game.world.centerX - 650, y: this.game.world.centerY + 300});
    this.orange_endar.anchor.setTo(0.5);
    this.orange_endar.animations.add('dance', [0, 1], 4, true);

    // add gonk
    this.gonk = this.game.add.sprite(-150, this.game.world.centerY - 100, 'gonk');
    this.guests.push({name: this.gonk, x: 200, y: this.game.world.centerY - 100});
    this.gonk.scale.x = 2;
    this.gonk.scale.y = 2;
    this.gonk.anchor.setTo(0.5);
    this.gonk.animations.add('dance', [0, 1], 4, true);

    // add dentist
    this.dentist = this.game.add.sprite(this.game.world.width + 100, this.game.world.centerY + 300, 'dentist');
    this.guests.push({name: this.dentist, x: this.game.world.centerX + 150, y: this.game.world.centerY + 300});
    this.dentist.anchor.setTo(0.5);
    this.dentist.scale.x = 0.7;
    this.dentist.scale.y = 0.7;
    this.dentist.animations.add('dance', [0, 1], 4, true);

    // add judge
    this.judge = this.game.add.sprite(-150, this.game.world.centerY - 150, 'judge');
    this.guests.push({name: this.judge, x: this.game.world.centerX - 300, y: this.game.world.centerY - 150});
    this.judge.anchor.setTo(0.5);
    this.judge.scale.x = 0.7;
    this.judge.scale.y = 0.7;
    this.judge.animations.add('dance', [0, 1], 4, true);

    // add teeth
    this.tooth = this.game.add.sprite(-100, this.game.world.centerY + 300, 'tooth')
    this.guests.push({name: this.tooth, x: this.game.world.centerX - 100, y: this.game.world.centerY + 300});
    this.tooth.anchor.setTo(0.5);
    this.tooth.animations.add('dance', [1, 2], 4, true);

    // add moving boxes
    this.box = this.game.add.sprite(this.game.world.width + 100, this.game.world.centerY + 305, 'box');
    this.guests.push({name: this.box, x: this.game.world.centerX + 450, y: this.game.world.centerY + 305});
    this.box.anchor.setTo(0.5);
    this.box.animations.add('dance', [1, 2], 4, true);

    // add sfx
    this.bigHeart = this.game.add.audio('success');
    
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
  update: function() {
    // TEMPORARY: skip to results stage
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
      this.stopAll();
    }
  },

  setPlayerScore: function() {
    var score_style = { font: '36px "Press Start 2P"', fill: "#000" };
    var bonus_score_style = { font: '36px "Press Start 2P"', fill: "#888" };
    var final_score_style = { font: '36px "Press Start 2P"', fill: "#EA0000" };
    let small_style = { font: '22px "Press Start 2P"', fill: "#BFBEBD"};

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
    let difficulty = 0;
    if (SaveTheDate.difficulty === 'medium'){
      difficulty = 10;
    }
    if (SaveTheDate.difficulty === 'hard'){
      difficulty = 20;
    }
    let difficulty_percent = `${difficulty}%`;
    let difficulty_text = `Difficulty bonus: ${difficulty_percent} = ${SaveTheDate.GameState.score * (difficulty/100)}`;

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
    let initials_text = this.game.add.text(310, 690, "Only your initials will go on the scoreboard!", small_style);
    total_score.alpha = 0;

    this.save_button = this.game.add.sprite(1075, 575, 'save_button');
    this.save_button.frame = 2;

    this.x_button = this.game.add.sprite(1245, 170, 'x_button');

    this.text_group = [heart_score, energy_score, accuracy_score, difficulty_score, total_score, initials_text];

    this.game.add.tween(this.score_box).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    this.text_group.forEach((text) => {
      this.game.add.tween(text).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    });

    this.inputName = this.game.add.inputField(310, 590, {
      font: '30px "Press Start 2p"',
      fontWeight:'bold',
      width: 675,
      padding: 20,
      borderRadius: 4,
      placeHolder: 'Your Name',
      blockInput: false
    });

    this.save_button.inputEnabled = true;
    this.save_button.events.onInputDown.add(function() {
      this.preSubmitScore();
    }, this);

    this.x_button.inputEnabled = true;
    this.x_button.events.onInputDown.add(function() {
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
      this.game.add.tween(this.x_button).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
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
        this.checkEmotion(line);
        if(line.speaker === "hero"){
          this.player_dialogue.alpha = 1;
          this.cal_endar_dialogue.alpha = 0;
          this.line_text.x = this.player_x_dialogue_box + 25;
          this.line_text.y = this.player_y_dialogue_box + 25;
          this.line_text.setText(line.content);
        }
        else if (line.speaker === 'pause') {
          if(line.barf) this.barfHearts();
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

  checkEmotion(line) {
    if(line.emotion) {
      switch(line.emotion) {
        case 'happy':
          this.cal_endar.frame = 0;
          break;
        case 'mad':
          this.cal_endar.frame = 1;
          break;
        case 'sad':
          this.cal_endar.frame = 2;
          break;
        case 'shocked':
          this.cal_endar.frame = 3;
          break;
      }
    }
  },

  barfHearts(){
    this.collect_heart = this.game.add.audio('collect_heart');
    for(let i = 0; i < 10; i++){
      setTimeout(() => {
        this.collect_heart.play();
        let heart = new SaveTheDate.Heart(
          this.game,
          this.player.position.x + 50,
          this.player.position.y,
          1
        );
        this.hearts.add(heart);
        this.game.add.tween(heart).to({x: this.calendar.x + 50, y: this.calendar.y + 100}, 500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(heart).to({alpha: 0}, 600, Phaser.Easing.Linear.None, true);
      }, i * 100);
    }

    setTimeout(() => {
      this.bigHeart.play();
    }, 4500);
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
        this.checkEmotion(line);
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
            this.game.add.tween(this.disco_ball).to({x: this.game.world.centerX, y: this.game.world.centerY}, 2000, Phaser.Easing.Linear.None, true);
            setTimeout(() => {
              this.cal_endar_dialogue.alpha = 0;
              this.line_text.alpha = 0;
              this.cal_endar.play('dance');
              this.the_date.play('dance');
              this.the_date.scale.x *= -1;
              this.player.play('dance');
              this.disco_ball.play('spin');
              this.guests.forEach((guest) => {
                this.game.add.tween(guest.name).to({x: guest.x, y: guest.y}, 2000, Phaser.Easing.Linear.None, true);
                guest.name.play('dance');
              });

              setTimeout(() => {
                this.game.add.tween(this.uhaul).to({x: 1000, y: this.game.world.centerY - 300}, 4000, Phaser.Easing.Linear.None, true);
                this.uhaul.animations.add('dance', [1,4], 4, true);
                this.uhaul.play('dance');
                setTimeout(() => {
                  this.game.add.tween(this.uhaul).to({x: -500, y: this.game.world.centerY - 300}, 4000, Phaser.Easing.Linear.None, true);

                  setTimeout(() => {
                        // add background fade sheet
                    this.bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
                    this.bg.anchor.setTo(0.5);
                    this.bg.alpha = 0;
                    this.bg.scale.x = 10;
                    this.bg.scale.y = 10;
                    this.game.add.tween(this.bg).to({alpha: 0.8}, 5000, Phaser.Easing.Linear.None, true);
                    this.scoreMusic.fadeOut(5000);
                    this.stopAll();
                  }, 2000);

                }, 5000);
              }, 5000);

              setTimeout(() => {
                this.calendar.alpha = 0;
                if(SaveTheDate.selectedPlayer === 'Sarah') {
                  // start awesome music
                  this.scoreMusic = this.add.audio('hava_nagila');
                  this.scoreMusic.play();
                } else {
                  // start awesome music
                  this.scoreMusic = this.add.audio('we_are_family');
                  this.scoreMusic.play();
                }
                this.game.time.events.loop(850, function() {
                  this.background_front.tint += 3000;
                }, this);
              }, 0);
            }, 2000);
          };
        }
      }, i * line.duration * 1000);
    }

    setTimeout(()=> {
      this.the_date.scale.x = 0.5;
    }, 8000);
  },

  stopAll() {
    setTimeout(() =>{
      let dancers = [this.player, this.the_date, this.cal_endar, this.blue_endar, this.orange_endar, this.box, this.tooth, this.judge, this.dentist, this.disco_ball, this.gonk];
      dancers.forEach((dancer) => {
        dancer.animations.stop();
        // dancer.frame = 1;
      });
      this.cal_endar.frame = 4;
      this.game.time.events.stop();
      this.setFinalWords();
    }, 4000)
  },

  setFinalWords(){
    let style = { font: '45px "Press Start 2P"', fill: '#fff'};
    //Thank you for
    this.thank_you = this.game.add.text(this.game.world.centerX, 220, `Thank you for`, style);
    this.thank_you.alpha = 0;
    this.game.add.tween(this.thank_you).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    this.thank_you.anchor.setTo(0.5);

    //saving the date!
    this.std = this.game.add.text(this.game.world.centerX, 280, `saving the date!`, style);
    this.std.alpha = 0;
    this.game.add.tween(this.std).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    this.std.anchor.setTo(0.5);

    //We hope you'll
    this.we_hope = this.game.add.text(this.game.world.centerX, 470, `We hope you'll`, style);
    this.we_hope.alpha = 0;
    this.game.add.tween(this.we_hope).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    this.we_hope.anchor.setTo(0.5);

    //join us on
    this.join_us = this.game.add.text(this.game.world.centerX, 530, `join us on`, style);
    this.join_us.alpha = 0;
    this.game.add.tween(this.join_us).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    this.join_us.anchor.setTo(0.5);

    //Sunday, October 7, 2018!
    let date_style = { font: '55px "Press Start 2P"', fill: '#fff'};
    this.final_date = this.game.add.text(this.game.world.centerX, 610, `Sunday, October 7, 2018!`, date_style);
    this.final_date.alpha = 0;
    this.game.add.tween(this.final_date).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    this.final_date.anchor.setTo(0.5);

  }

};