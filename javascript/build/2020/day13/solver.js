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
const fs = __importStar(require("fs"));
const inputArr = fs
    .readFileSync('src/day13/input.txt')
    .toString()
    .split('\n')
    .map(x => {
    return x.split(',');
});
console.log('inputArr:', inputArr);
function solver1(timestamp, buses) {
    buses = buses.filter(num => num != 'x').map(num => Number(num));
    let waitTime = 0;
    let solution = 0;
    let foundBus = false;
    while (!foundBus) {
        buses.forEach(busID => {
            // console.log('timestamp + waitTime, busID, remainder:', timestamp + waitTime, busID, (timestamp + waitTime) % busID);
            if (busID != 'x') {
                busID = Number(busID);
                if ((timestamp + waitTime) % busID === 0) {
                    // console.log('reached!');
                    solution = busID * waitTime;
                    foundBus = true;
                }
            }
        });
        waitTime++;
        // if (waitTime === 25) return 0;
    }
    return solution;
}
// NOTE: this solution is too slow. To fix, look up 'Chinese remainder theorem'
function solver2(buses) {
    const highestBus = findHighest(buses);
    console.log('highestBus:', highestBus);
    let startingTimestamp = highestBus.id - highestBus.index;
    let solved = false;
    while (!solved) {
        solved = true;
        for (let i = 0; i < buses.length; i++) {
            let busID = buses[i];
            if (busID === 'x')
                continue;
            if ((startingTimestamp + i) % Number(busID) != 0) {
                solved = false;
                startingTimestamp += highestBus.id;
                break;
            }
        }
    }
    return startingTimestamp;
}
function findHighest(buses) {
    let highest = {
        id: 0,
        index: 0
    };
    for (let i = 0; i < buses.length; i++) {
        if (buses[i] != 'x' && buses[i] > highest.id) {
            highest.index = i;
            highest.id = Number(buses[i]);
        }
    }
    return highest;
}
// console.log('solver1(inputArr[0], inputArr[1]):', solver1(Number(inputArr[0][0]), inputArr[1]));
console.log('solver2(inputArr[1]):', solver2(inputArr[1]));
//# sourceMappingURL=solver.js.map