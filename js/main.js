$(document).ready(function(){


	$("#portfolio-contant-active").mixItUp();


	$("#testimonial-slider").owlCarousel({
	    paginationSpeed : 500,      
	    singleItem:true,
	    autoPlay: 3000,
	});




	$("#clients-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});

	$("#works-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});


	// google map
		var map;
		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: -34.397, lng: 150.644},
		    zoom: 8
		  });
		}


	// Counter

	$('.counter').counterUp({
        delay: 10,
        time: 1000
		});
		
	//create game
	// var SaveTheDate = SaveTheDate || {};
	// SaveTheDate.game = new Phaser.Game(1600, 900, Phaser.AUTO, 'game_window');

	// SaveTheDate.game.state.add('GameState', SaveTheDate.GameState);
	// SaveTheDate.game.state.add('HomeState', SaveTheDate.HomeState);
	// SaveTheDate.game.state.add('SetupState', SaveTheDate.SetupState);
	// SaveTheDate.game.state.add('PreloadState', SaveTheDate.PreloadState);
	// SaveTheDate.game.state.add('BootState', SaveTheDate.BootState);
	// SaveTheDate.game.state.add('ResultState', SaveTheDate.ResultState);
	// SaveTheDate.game.state.start('BootState');

});




