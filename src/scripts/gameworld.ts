/// <reference path="../libs/phaser/typescript/phaser.d.ts"/>

/// <reference path="coordinates.ts"/>
/// <reference path="gnome.ts"/>
/// <reference path="tree.ts"/>
/// <reference path="world_constants.ts"/>
/// <reference path="victory_condition.ts"/>
/// <reference path="messages/message.ts"/>
///<reference path="gameObject.ts"/>
///<reference path="house.ts"/>

/**
 * This class is responsible for keeping track of the world state and handling collisions.
 */
class GameWorld {
	constructor(public game: Phaser.Game) {
		this.blockGroup = game.add.group(game.world, "blocks");
		this.entityGroup = game.add.group(game.world, "entities");

		this.startCodeTimer();
	}

	public level: Level;

	private gnomes: Array<Gnome>;
	private gnomeCode: GnomeCode;
	private blockGroup: Phaser.Group;
	private entityGroup: Phaser.Group;

	public selectionListener: (house?: House) => void;

	/**
	 * Loads the level with the provided name. It should be a JSON file that is loaded into the cache
	 * in the preloader.
	 */
	loadLevel(levelName: string) {
		this.blockGroup.removeAll(true);
		this.entityGroup.removeAll(true);
		this.gnomes = [];
		this.gnomeCode = new GnomeCode({});
		if (this.selectionListener) {
			this.selectionListener();
		}

		let levelDefinition = this.game.cache.getJSON(levelName).LEVEL_DEFINITION;
		this.level = new Level(levelDefinition);
		this.level.renderStage(this.blockGroup);
		this.level.renderObjects(this.entityGroup);
		if (levelDefinition.introMessage) {
			Messages.show(levelDefinition.introMessage);
		}

		this.level.houses.forEach(house => {
			house.events.onInputDown.add(() => {
				if (this.selectionListener) {
					this.selectionListener(house);
				}
			});
		});
	}

	/**
	 * Performs an action with the active gnome. Results depend on gnome location
	 */
	doGnomeAction(gnome: Gnome) {
		let actionLocation = gnome.location.getNeighbor(gnome.direction);
		let block = this.level.getBlock(actionLocation);
		if (gnome.wateringCan) {
			if (this.level.waterObject(actionLocation)) {
				gnome.wateringCan = false;
			}
		}
		else if (block === WorldConstants.BlockType.WATER) {
			gnome.wateringCan = true;
		}
	}

	/**
	 * Try to move the gnome forward. Depending on what's in the way, this might succeed, fail, or kill the gnome.
	 */
	tryMove(gnome: Gnome) {
		let newLocation = gnome.location.getNeighbor(gnome.direction);
		let gnomeExistsInLocation = this.gnomes.filter(g => g.location.equals(newLocation)).length;
		if (!gnomeExistsInLocation && this.level.pointIsPassable(newLocation)) {
			gnome.location = newLocation;
			this.determineEntityZIndices();
		}

		let causeOfDeath = this.level.getPointCauseOfDeath(newLocation);
		if (causeOfDeath) {
			this.killGnome(gnome, causeOfDeath);
		}
	}

	killGnome(gnome: Gnome, causeOfDeath: CauseOfDeath) {
		this.gnomes.splice(this.gnomes.indexOf(gnome), 1);
		this.entityGroup.remove(gnome);
		this.game.world.add(gnome);
		gnome.die(causeOfDeath);
	}

	spawnGnomes() {
		this.level.houses.forEach(house => {
			let newGnome = new Gnome(this.game,
				house.model.positionX + Direction.getXDelta(house.model.direction),
				house.model.positionY + Direction.getYDelta(house.model.direction),
				house.model.direction,
				house.gnomeCode);
			this.entityGroup.add(newGnome);
			this.gnomes.push(newGnome);
			this.determineEntityZIndices();
		});
	}

	private determineEntityZIndices() {
		this.entityGroup.customSort((a, b) => {
				let aZIndex = a.location.x + a.location.y;
				let bZIndex = b.location.x + b.location.y;
				if (aZIndex > bZIndex) {
					return 1;
				}
				else if (aZIndex < bZIndex) {
					return -1;
				}
				return 0;
			});
	}

	private startCodeTimer() {
		let timer = this.game.time.create();
		timer.loop(200, () => {
			this.gnomeCode.executeNextCommand(this, this.gnomes);
			if (this.level.checkVictory()) {
				this.winLevel();
			}
		});
		timer.start();
	}

	private winLevel() {
		//TODO: Go to the next level upon achieving victory
		Messages.show("You won!", {
			callback: () => this.loadLevel("tutorial_level_2")
		});
	}
}

class Level {
	//Array access should be done in [y][x] order!
	private layout: Array<Array<WorldConstants.BlockType>>;
	private objects: any;
	private victoryConditions: Array<VictoryCondition>;
	private objectMap = {};

	public houses: House[] = [];

	constructor(levelDefinition) {
		this.layout = levelDefinition.layout;
		this.objects = levelDefinition.objects;
		this.victoryConditions = levelDefinition.victoryConditions;
	}

	pointIsPassable(point: MapPoint): boolean {
		let object = this.getObject(point);
		return !object || object.passable;
	}

	getPointCauseOfDeath(point: MapPoint): CauseOfDeath {
		let block = this.getBlock(point);
		if (block === null) {
			return CauseOfDeath.FALLING;
		}

		if (block === WorldConstants.BlockType.WATER) {
			return CauseOfDeath.DROWNING;
		}

		return CauseOfDeath.NOTHING;
	}

	getBlock(point: MapPoint) {
		if (this.layout[point.y] === undefined || this.layout[point.y][point.x] === undefined) {
			return null;
		}

		return this.layout[point.y][point.x];
	}

	getObject(point: MapPoint) {
		return this.objectMap[point.toString()];
	}

	checkVictory() {
		if (!this.victoryConditions) {
			return false;
		}
		for (let victoryCondition of this.victoryConditions) {
			if (!VictoryCondition.check(victoryCondition, this.objects)) {
				return false;
			}
		}
		return true;
	}

	waterObject(point: MapPoint) {
		let object = this.objectMap[point.toString()];
		if (object && object.addWater) {
			object.addWater();
			return true;
		}

		return false;
	}

	renderStage(blockGroup: Phaser.Group) {
		let rows = this.layout.length;
		let columns = this.layout[0].length;

		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				this.renderBlock(blockGroup, column, row, this.layout[row][column]);
			}
		}
	}

	renderObjects(entityGroup: Phaser.Group) {
		for (let i = 0; i < this.objects.length; i++) {
			let model = this.objects[i];
			let objectInstance = this.renderObject(entityGroup.game, model);
			entityGroup.add(objectInstance);
			this.objectMap[new MapPoint(model.positionX, model.positionY).toString()] = objectInstance;
		}
	}

	renderObject(game: Phaser.Game, model): Phaser.Sprite {
		let object = ObjectType.instantiate(game, model);
		if (object instanceof House) {
			this.houses.push(object);
		}
		return object;
	}

	renderBlock(blockGroup: Phaser.Group, x: number, y: number, blockType: WorldConstants.BlockType) {
		let screenCoordinates = WorldConstants.COORDINATE_TRANSFORMER.map_to_screen(new MapPoint(x, y));
		let block = blockGroup.game.add.sprite(screenCoordinates.x, screenCoordinates.y, this.getBlockSprite(blockType));
		block.anchor.y = 1;
		blockGroup.add(block);
	}

	private getBlockSprite(blockType: WorldConstants.BlockType): string {
		switch (blockType) {
			case WorldConstants.BlockType.GRASS:
				return "stage_block";
			case WorldConstants.BlockType.WATER:
				return "water_block";
			case WorldConstants.BlockType.DESERT:
				return "desert_block";
			case WorldConstants.BlockType.STONE:
				return "stone_block";
			default: return "stage_block"; //TODO throw an error instead?
		}
	}
}
