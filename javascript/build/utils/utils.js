"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printGrid = exports.getGridDimensions = exports.createGrid = exports.readMockFile = exports.readFile = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readFile = (year, day) => fs.readFileSync(path.resolve(__dirname, `../../../adventofcode-inputs/${year}/${day}/input.txt`));
exports.readFile = readFile;
const readMockFile = () => fs.readFileSync(path.resolve(__dirname, "../../src/mockInput.txt"));
exports.readMockFile = readMockFile;
const createGrid = (gridWidth, gridHeight, fill) => Array.from(Array(gridHeight), () => Array(gridWidth).fill(fill));
exports.createGrid = createGrid;
const getGridDimensions = (grid) => {
    return { gridHeight: grid.length, gridWidth: grid[0].length };
};
exports.getGridDimensions = getGridDimensions;
const printGrid = (grid, delimiter = "") => {
    console.log(grid.map(row => row.join(delimiter)).join("\n"));
    console.log("\n");
};
exports.printGrid = printGrid;
//# sourceMappingURL=utils.js.map