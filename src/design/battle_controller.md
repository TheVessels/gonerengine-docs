# Battle Controller

The GonerEngine `BattleController` node and scene aim to replicate the behavior of
several battle-related tools in Deltarune:

1. `scr_battle()`, which starts a battle by creating `obj_encounterbasic` and `obj_battleback`
    and creates enemy markers that enter from the right side of the screen.
2. `obj_battleback`, which is the purple grid background in battles.
3. `obj_encounterbasic`, which is is the intro animation that begins the battle.
4. `obj_battlecontroller`, which draws the battle UI and controls the logic of the battle.
