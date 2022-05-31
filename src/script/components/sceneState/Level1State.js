import GameState from "./GameState";
import Player from "../entities/Player";
import Blocks from "../entities/Blocks";
import {levels} from "./LevelData";

export class Level1State extends GameState{
    constructor() {
        super(new Player(3), Blocks.fromArray(levels[0]), "Level 1");
    }
}