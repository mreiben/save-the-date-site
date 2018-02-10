//create game
var SaveTheDate = SaveTheDate || {};
SaveTheDate.game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'game_window');
SaveTheDate.game.state.add('GameState', SaveTheDate.GameState);
SaveTheDate.game.state.add('HomeState', SaveTheDate.HomeState);
SaveTheDate.game.state.add('SetupState', SaveTheDate.SetupState);
SaveTheDate.game.state.add('PreloadState', SaveTheDate.PreloadState);
SaveTheDate.game.state.add('BootState', SaveTheDate.BootState);
SaveTheDate.game.state.add('ResultState', SaveTheDate.ResultState);
SaveTheDate.game.state.start('BootState');
