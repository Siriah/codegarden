Welcome to CodeGarden®

# Story
The GNOMEs want to populate the world.
Trees spawn GNOMEbabies, so let's go and grow some trees!

Just so you know
- GNOMEs have epic beards
- GNOMEs are infinite

# Gameplay elements
In the first few levels, the purpose of a level is to make a tree or number of trees grow enough to produce GNOMEbabies.
You do this by giving the GNOME a program that tells them exactly what to do to to make the trees grow.
GNOMEs have a limited number of actions they can undertake and it's your job to ensure all trees grow with the limited number of actions you have.

GNOMEs will loop the set of actions they are given, allowing the player to define a program once and let the GNOME repeat it.
Each GNOME starts at a house and programs are bound to a house, so the player can create different programs for each house.
GNOMEs can and should interact with the environment and each other.

Later level will have other win conditions than simply growing trees. 

### GNOME Movement
A GNOME moves as a result of player input in the form of functions.
There are only four functions a player can use as input.  

- Move forward
    * This function moves the GNOME one tile in the direction it is facing
- Rotate clockwise
    * This function rotates the GNOME 90 degrees to the right while remaining on the same tile
- Rotate counter-clockwise
    * This function rotates the GNOME 90 degrees to the left while remaining on the same tile
- Take Action
    * This function makes the GNOME do an action, depending on the tiles surrounding it.

### Contextual GNOME Actions
The action executed by the GNOME depends on the tile it is facing and the state of the GNOME.
For example, if it is holding water while facing a tree, using the action function will make the GNOME water the tree.
#### Holding Nothing
This is the default state of a GNOME.
- When facing a tile with water, a GNOME holding nothing will take out its watering can and collect water
- When facing a tile with a tree, a GNOME holding nothing will hug the tree
- When facing a tile with a rock, a GNOME holding nothing will kick the rock 
- When facing a tile with holding an item that can be picked up, a GNOME holding nothing will pick up the item.
#### Holding water
A GNOME holding water has a watering can in its hands.
Using the action function will make the GNOME empty the can on the tile it is facing, losing the water.
#### Holding items
During the course of a level, it is possible that a GNOME picks up an item.
If the action function is used while the GNOME is holding an item, that GNOME will attempt to perform an item-specific action.
If the action fails, the item remains in the possession of the GNOME.
If the action succeeds, the item may be lost, transformed, or remain in the hands of the GNOME.

### Programming GNOME Actions
GNOMEs are controlled through programming.
A program consists of a fixed number of turns.
Each function takes up one turn.
Every GNOME in a level has its own program. 
A level requires the player to program GNOMEs in order to reach the win condition.
#### Action orders
GNOMEs act in a specific order each level. 
When the level is started, each GNOME executes its first action, until all GNOMEs have finished.
Then the first GNOME executes its second action and so on. 
#### End of program
If a GNOME's program is at its end, it is automatically returned to its house. 
This takes one turn.
After returning to the house, the GNOME starts its program from the beginning.    
#### Doing nothing
Not every turn in a program is required to be filled.
GNOMEs executing programs with empty turns will skip those turns dancing.

### GNOME death
A GNOME may die in several ways, but always as the result of a GNOME action.
A death animation takes one turn, after which a gnome is respawned at its original house.
So, in total, death costs a GNOME two turns. 


## Objects
There are many different objects to be found in the world of CodeGarden®.

### Buildings

#### GNHOME
This is where GNOMEs spawn.
They start out in their house, with the direction of the door determining which direction the GNOME starts out facing

#### Library
Used to store a single subroutine.
Each GNOME can use a subroutine and libraries can use each others subroutines as well.

### Trees
Trees are of vital importance to GNOME reproduction as they spawn GNOMEbabies.
However, they can also be chopped down to provide *wood*, while a grown tree also is a source of *shade*.
Trees require water and sunlight to grow.
You can not walk through a tile with a tree on it.

### Rocks
Rocks may block your path.
You can not walk through a tile with a rock on it.

### Items
Items can be picked up. 
It *is* possible to walk through them as well.

## Tiles
Tiles represent the landscape of a level.
There are many different types of tiles, each with their own function.

### Grass
Grass tiles are fertile land.
Many different objects can grow on them and a GNOME can walk freely over an empty grass tile.

### Desert
Desert tiles contain very little water, meaning that only specific objects can grow on them.

### Water
Water tiles hold water. 
A GNOME can not walk over an empty water tile without drowning.
As any gardener will tell you, water is vital to a healthy CodeGarden®.

# BACKSTAGE INFO
Here be info not meant for the players


## Levels
Level design philosophy:
- Do not make popup-tutorials
- Do not underestimate your users
- Make things flow naturally
- From the very first level, all concepts are available if applicable.
For example, if we make it rain from the gnomes beards after they die, this should happen in the first level as well even if it's useless.
- See also: [this video](https://www.youtube.com/watch?v=8FpigqfcvlM)

Houses will be numbered according to their natural order; counting from left to right, then from top to bottom.

### Level 0 - The start menu
- Here, we are going to introduce gnome movement.
The start menu is a T-intersection with three choices at its ends (quit, start, options).
The gnome starts in the center facing downward.
The menu options are shown with the programs required to move the gnome shown next to them.
Clicking one of the menu options actually starts that option, so the gnome will move to one of
the ends of the intersection.
Just for fun, players are allowed to edit the programs that have the gnome move to the correct place, potentially messing up their menu.

### Region 1
Region 1 is a desert. There will be a bit of water here, some rocks and a few trees, but not much else.

#### Level interconnection

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|---|---|---|---|---|---|---|---|---|--- |--- |--- |--- |--- |--- |--- |
| 1 | 1 | 1 | 1 | 1 | X | X | X | X | X  | X  | X  | X  | X  | X  | X  |
| 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2  | 2  | X  | X  | X  | X  | X  |
| 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2  | 2  | X  | X  | X  | X  | X  |
| 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2  | 2  | X  | X  | X  | X  | X  |
| 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2  | 2  | X  | X  | X  | X  | X  |
| 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2  | 2  | X  | X  | X  | X  | X  |
| 3 | 3 | 3 | 3 | 3 | 5 | 5 | 5 | 5 | 5  | 6  | 6  | 6  | 6  | 6  | 6  |
| 3 | 3 | 3 | 3 | 3 | 5 | 5 | 5 | 5 | 5  | 6  | 6  | 6  | 6  | 6  | 6  |
| 4 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5  | 6  | 6  | 6  | 6  | 6  | 6  |
| 4 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5  | 6  | 6  | 6  | 6  | 6  | 6  |
| 4 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5  | 6  | 6  | 6  | 6  | 6  | 6  |
| 4 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5  | 6  | 6  | 6  | 6  | 6  | 6  |

#### Level 1 - Growing trees 
Level one introduces the following concepts:
- Basic programming
- Watering a tree
- Obstacles

Level layout (D = desert, # = house, W = water, R = rock, T = tree):
```
D1DWD
DDDWD
DDRWW
DDDDT
```

House orientation:   
1 => SW (down)

Required program to win the level:  
1: 	[FFLFFLARA]

#### Level 2 - Multiple gnomes
Level two introduces the following concepts:
- Multiple gnomes
- Gnome clashing
- Fixed functions

Level layout (D = desert, # = house, W = water, T = tree):  
```
DDDWDD
WWWWDD
MW1W2T
DDDDDD
TDDDDD
```

House orientation:   
1 => SW (down)   
2 => SW (down)

Required programs to win the level:   
1: 	[LFLARFFLA] => this program is fixed and cannot be changed    
2: 	[FRFFFRFALFLA] => Note that starting out with [RF] will cause both gnomes to end up on the same tile.
This will cause a problem as they will bump into each other, returning them to their previous position.

#### Level 3 - Subroutines
Level three introduces the following concepts:
- Library with single subroutine
- Mushrooms

Level layout (L= library, D = desert, # = house, M = mushroom, W = Water, T = tree)
```
1DDDM
WWWDM
TDWWW
LDDDW
```

House orientation:   
1 => SE (right)

Required programs to win the level:   
1: 	[FFRFLARFFRFFRFLA] = [F1 RFFR F1] => Use subroutine F1

F1: [FFRFLA]

A mushroom makes the GNOME float across 1 square of space (prevents death by falling/drowning).
It's not possible to get water while floating.
Mushrooms are consumed when using them.
A square of mushrooms can be watered to grow more mushrooms (with a maximum of 3).

#### Level 4 - Sharing
Level four introduces the following concepts:
- Programming two gnomes
- Sharing

Level layout (D = desert, R = rock, W = water, # = house, L = library, T = tree)
```
1RDDW
DLDDD
DDDR2
DTDDD
```

House orientation:   
1 => SW (down)   
2 => NE (up)

Required programs to win the level:   
1:	[FLFFLALFLA] 	= [F F1 LFLA] => The last action from Fn1 will take water from the other gnome    
2: 	[ALFFLA] 		= [A F1] => The last action will give water to the other gnome

F1: [LFFLA] 

#### Level 5 - Delays
Level five introduces the following concepts:
- Delayed starting    

Level layout (D = desert, W = water, # = house, L = library, T = tree, M = mushroom)
```
MD1WW
WWWWT
WDDLD
2DDDD
DDDDD
DDD3D
```

House orientation:    
1 => NW (left)    
2 => SE (right)    
3 => NE (up)    

House delays:    
2 => 6    
3 => 8    

Required programs to win the level:    
1: 	[ALFFRALA] (this program is fixed and cannot be changed)    
2: 	[XXXXXXLARFA]				= [F1 A]    
3: 	[XXXXXXXXFLARRFLFA]			= [F F1 RFLRA]    

F1: [LARF]    

#### Level 6 - Bit of a challenge
Level six introduces no new concepts

Level layout (D = desert, R = rock, W = water, # = house, L = library, T = tree, M = mushroom)
```
WWDDDT
MWL2DD
DWDDD3
DWWDLD
1DWDDD
DTWMDD
```

House orientation:    
1 => NE (up)    
2 => SW (down)    
3 => NW (left)

House delays:    
2 => 10    
3 => 15    

Possible program to win the level:    
1: 	[FARFFRALA]				    = [F F1 A]    
2: 	[XXXXXXXLARFFARFFRALLA]	= [LARFF F1 LA]    
3: 	[XXXXXXXXXXXARFFRA]			= [F1]

F1: [ARFFRAL]				    = [ARF F2]    
F2: [FRAL]

### Other
- Death gnomes spawn clouds, 3 clouds make rain, rain waters the ground directly under where the gnome died.
This requires other ways to kill gnomes...
- Kicking certain rocks may move them one tile in the kick direction, depending on the gnome
- Upgrading gnomes to other types (Strong gnome, fast gnome, ...) with certain "abilities". 
For example, fast gnomes move multiple tiles and strong gnomes can move certain objects. 
- Moving obstacles
- Have an overview with the different gnomes and the actions they are going to perform.
Also allow naming your gnomes there ("tree-waterer", "lumberjack", ...)- 
