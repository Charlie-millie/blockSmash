import {$BlockSmashInstance} from "../../Globals";
import Block from "./Block";

export default class Blocks {
    constructor(rowCount = 3, colCount = 5, padding = 10, offsetTop = 30, offsetLeft = 30) {
        this._rowCount = rowCount;
        this._colCount = colCount;
        this._padding = padding;
        this._offsetTop = offsetTop;
        this._offsetLeft = offsetLeft;

       /* const stageSize = $BlockSmashInstance.getStageSize();

        let blockWidth = stageSize.width - offsetLeft;
        blockWidth = blockWidth - (padding * colCount);
        blockWidth /= colCount;


        let blockHeight = stageSize.height / 2 - offsetTop;
        blockHeight -= padding * rowCount;
        blockHeight /= rowCount;

        console.log('[Blocks] Calculated blockWidth, blockHeight: ', blockWidth, blockHeight);

        this._blocks = this.buildBlock(rowCount, colCount, blockWidth, blockHeight);*/

    }

    set colCount(value) {
        this._colCount = Number(value);
    }

    set padding(value) {
        this._padding = Number(value);
    }

    set rowCount(value) {
        this._rowCount = Number(value);
    }

    set offsetTop(value) {
        this._offsetTop = Number(value);
    }

    set offsetLeft(value) {
        this._offsetLeft = Number(value);
    }

    set blocks(value) {
        if (Array.isArray(value)) {
            if (value.every(subarray => Array.isArray(subarray))) {
                this._blocks = value;
                this._colCount = value[0].length;
                this._rowCount = value.length;
            }
        }
    }

    buildBlock(rowCount, colCount, blockWidth, blockHeight) {
        const blocks = [];
        for (let row = 0; row < rowCount; row++) {
            let parsedRow = [];
            for (let col = 0; col < colCount; col++) {
                parsedRow.push(new Block(0, 0, 1, blockWidth, blockHeight));
            }
            blocks.push(parsedRow);
        }
        console.log("[Blocks] blocks: ", blocks);
        return blocks;

    }

    draw(ctx) {
        console.log("[Blocks] columns: ", this._colCount, " rows: ", this._rowCount);
        for (let row = 0; row < this._rowCount; row++) {
            for (let col = 0; col < this._colCount; col++) {
                console.info(`C: ${col}, R: ${row}`);
                if (!this._blocks[row][col].isDestroyed()) {
                    let blockX = (col * (this._blocks[row][col].width + this._padding)) + this._offsetLeft;
                    let blockY = (row * (this._blocks[row][col].height + this._padding)) + this._offsetTop;
                    this._blocks[row][col].x = blockX;
                    this._blocks[row][col].y = blockY;
                    this._blocks[row][col].draw(ctx);
                }
            }
        }

    }

    static fromArray(levelData, padding = 10, offsetTop = 30, offsetLeft = 30) {
        let rowCount = levelData.length;
        let colCount = levelData[0].length;
        console.log(`[Blocks]fromArray Rows: ${rowCount}, Columns: ${colCount}`);
        const stageSize = $BlockSmashInstance.getStageSize();

        let blockWidth = stageSize.width - offsetLeft;
        blockWidth = blockWidth - (padding * colCount);
        blockWidth /= colCount;

        let blockHeight = stageSize.height / 2 - offsetTop;
        blockHeight -= padding * rowCount;
        blockHeight /= rowCount;

        let blocks = this.parseLevelData(levelData, blockWidth, blockHeight);
        const field = new Blocks();
        field.blocks = blocks;
        field.colCount = blocks[0].length;
        field.rowCount = blocks.length;
        return field;
    }

    static parseLevelData(levelData, blockWidth, blockHeight) {
        const blocks = [];
        for (let row = 0; row < levelData.length; row++) {
            let parsedRow = [];
            for (let col = 0; col < levelData[row].length; col++) {
                let health = Number(levelData[row][col]);
                parsedRow.push(new Block(0, 0, health, blockWidth, blockHeight));
            }
            blocks.push(parsedRow);
        }
        console.log("[Blocks] parseLevelData blocks: ", blocks);
        return blocks;
    }

}