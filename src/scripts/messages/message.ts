namespace Messages {
	const MESSAGE_X_OFFSET = 370;
	const MESSAGE_Y_OFFSET = 10;

	const TEXT_STYLE = {
		font: "24px MessageFont", fill: "#000",
		align: "left",
		boundsAlignH: "left",
		boundsAlignV: "top",
		wordWrap: true
	};

	let messageGroup: Phaser.Group;

	function drawSpeechBubble(game: Phaser.Game, text: Phaser.Text) {
		let speechBubble = new Phaser.Graphics(game);
		speechBubble.parent = text;
		speechBubble.lineStyle(3, 0x000000, 1.0);
		speechBubble.beginFill(0xffffff);
		speechBubble.drawRoundedRect(0, 0, text.width + 20, text.height + 20, 5);
		speechBubble.endFill();

		speechBubble.moveTo(2, 20);
		speechBubble.beginFill(0xffffff);
		speechBubble.quadraticCurveTo(-10, 20, -25, 30);
		speechBubble.quadraticCurveTo(-10, 20, 2, 35);
		speechBubble.endFill();
		speechBubble.x = text.x - 10;
		speechBubble.y = text.y - 15;

		return speechBubble;
	}

	/**
	 * Function for showing a message to the player. It stays visible until clicked.
	 * @param game The Phaser game
	 * @param message The message to show
	 * @param options See the MessageOptions interface. All options are optional.
	 */
	export function show(game: Phaser.Game, message: string, options?: MessageOptions) {
		let optionMap = options ? options : {};

		if (messageGroup) {
			messageGroup.destroy();
		}
		messageGroup = game.add.group(game.world, "message");
		messageGroup.fixedToCamera = true;

		let king = messageGroup.add(new Phaser.Sprite(game, MESSAGE_X_OFFSET, MESSAGE_Y_OFFSET, WorldConstants.SPRITE_SHEET));
		king.animations.add("hover", Phaser.Animation.generateFrameNames("gnome_king_", 0, 3));
		king.animations.play("hover", 10, true);
		game.add.tween(king).to({ y: MESSAGE_Y_OFFSET + 5 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1).yoyo(true);

		let text = messageGroup.add(new Phaser.Text(game, MESSAGE_X_OFFSET + 100, MESSAGE_Y_OFFSET + 30, message, TEXT_STYLE));
		text.wordWrapWidth = WorldConstants.MINIMUM_GAME_WIDTH - MESSAGE_X_OFFSET - 120;
		let speechBubble = drawSpeechBubble(game, text);
		messageGroup.add(speechBubble, false, 0);

		text.wordWrapWidth = text.width + 10;
		text.text = "";
		let counter = 0;
		let loop = game.time.events.loop(30, () => {
			counter++;
			text.text = message.substr(0, counter);
			if (counter >= message.length) {
				game.time.events.remove(loop);
			}
		});
		speechBubble.inputEnabled = true;

		let clickHandler = () => {
			if (text.text.length < message.length) {
				text.text = message;
				game.time.events.remove(loop);
			}
			else {
				messageGroup.removeAll(true);
				if (optionMap.callback) {
					optionMap.callback();
				}
			}
		};

		addClickHandler(king, clickHandler);
		addClickHandler(text, clickHandler);
		addClickHandler(speechBubble, clickHandler);
	}

	function addClickHandler(object, clickHandler) {
		object.inputEnabled = true;
		object.input.useHandCursor = true;
		object.events.onInputUp.add(clickHandler);
	}

	export interface MessageOptions {
		callback?: () => any; //Function to execute after the player closes the message. Its return value is ignored.
	}
}
