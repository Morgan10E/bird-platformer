var speed = 0.10;
var cursors;
var right = true;

function update() {
	if (speed < 6) {
		speed += 0.001
	}
	scroll();
	playerUpdate();
	updateScore();
}

function scroll() {
	background.tilePosition.x -= speed;

	branches.setAll('body.velocity.x', -speed*60, true);
}

function playerUpdate() {
	game.physics.arcade.collide(player, branches);

	cursors = game.input.keyboard.createCursorKeys();

	if (player.body.touching.down) {
		player.body.velocity.x = 0;
	} else {
		player.body.velocity.x = -speed*60;
	}
	
	player.body.gravity.y = 400;

	if (cursors.right.isDown) {
		player.body.velocity.x = 150;
		player.animations.play('right_run');
		right = true;
	} else if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		player.animations.play('left_run');
		right = false;
	} else if (right) {
		player.animations.play('right_stand');
	} else {
		player.animations.play('left_stand');
	}


	if (cursors.up.isDown) {
		player.body.gravity.y = 200;
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -300;
	}
}

function updateScore() {
	scoreText.text = 'Score: ' + score;
}