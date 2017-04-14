/// <reference path="../../libs/phaser/typescript/phaser.d.ts"/>
///<reference path="game_object.ts"/>

class CodeBuilding extends GameObject {
	public gnomeCode: Command[];
	public delay: number;

	constructor(game: Phaser.Game, public model: CodeBuildingModel, sprite) {
		super(game, model, sprite, false);
		this.inputEnabled = true;
		this.input.pixelPerfectClick = true;
		this.input.useHandCursor = true;

		this.gnomeCode = [];
		if (model.initialCode) {
			if (model.delay) {
				for (let i = 0; i < model.delay; i++) {
					this.gnomeCode.push(new Command(CommandType.DELAY));
				}
			}
			for (let i = 0; i < model.initialCode.length; i++) {
				this.gnomeCode.push(CommandType.getCommandTypeForShorthand(model.initialCode.charAt(i)));
			}
		}

		game.add.existing(this);
	}
}

interface CodeBuildingModel extends GameObjectModel {
	initialCode?: string;
	sizeLimit: number;
	readonly?: boolean;
	delay?: number;
}
