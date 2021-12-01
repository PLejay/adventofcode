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
    .readFileSync("src/day12/input.txt")
    .toString()
    .split("\n")
    .map(x => {
    let newEl = [];
    newEl.push(x.slice(0, 1));
    newEl.push(x.slice(1));
    return newEl;
});
function solver1(directions) {
    let distance;
    let coords = [0, 0]; //index 0: NS axis, index 1: EW axis
    // Representing directions as degrees with East as default (0/360)
    const directionGuide = {
        0: "E",
        90: "S",
        180: "W",
        270: "N",
    };
    let facingDir = 0;
    directions.forEach(instruction => {
        const action = instruction[0];
        const value = Number(instruction[1]);
        if (action === "N" || action === "S" || action === "E" || action === "W") {
            coords = moveItem(action, value, coords);
        }
        else if (action === "L") {
            facingDir = ((facingDir - value + 360) % 360);
        }
        else if (action === "R") {
            facingDir = ((facingDir + value) % 360);
        }
        else if (action === "F") {
            const dir = directionGuide[facingDir];
            moveItem(dir, value, coords);
        }
    });
    // Sum the absolute value of the N/S and E/W coordinates
    distance = Math.abs(coords[0]) + Math.abs(coords[1]);
    return distance;
}
function moveItem(dir, distance, coords) {
    if (dir === "N") {
        coords[0] += distance;
    }
    else if (dir === "S") {
        coords[0] -= distance;
    }
    else if (dir === "E") {
        coords[1] += distance;
    }
    else if (dir === "W") {
        coords[1] -= distance;
    }
    return coords;
}
function solver2(directions) {
    let mDistance;
    let shipCoords = [0, 0];
    let waypointCoords = [1, 10]; // Absolute coordinates
    // Representing directions as degrees with East as default (0/360)
    directions.forEach(instruction => {
        const action = instruction[0];
        const value = Number(instruction[1]);
        if (action === "N" || action === "S" || action === "E" || action === "W") {
            waypointCoords = moveItem(action, value, waypointCoords);
        }
        else if (action === "L") {
            // Rotating left by 90 degrees is the same as rotating right by 270
            rotateRight(360 - value);
        }
        else if (action === "R") {
            rotateRight(value);
        }
        else if (action === "F") {
            const moveNS = (waypointCoords[0] - shipCoords[0]) * value;
            const moveEW = (waypointCoords[1] - shipCoords[1]) * value;
            shipCoords = [shipCoords[0] + moveNS, shipCoords[1] + moveEW];
            waypointCoords = [waypointCoords[0] + moveNS, waypointCoords[1] + moveEW];
        }
    });
    // Rotate the waypoint right by a given number of degrees
    function rotateRight(value) {
        // Convert to relative values
        // So the waypoint is rotated around the ship instead of around the [0,0] point
        const prevRelativeNS = waypointCoords[0] - shipCoords[0];
        const prevRelativeEW = waypointCoords[1] - shipCoords[1];
        let relativeCoords;
        // Rotate
        if (value === 90)
            relativeCoords = [-prevRelativeEW, prevRelativeNS];
        else if (value === 270)
            relativeCoords = [prevRelativeEW, -prevRelativeNS];
        else {
            relativeCoords = [-prevRelativeNS, -prevRelativeEW];
        }
        // Convert back to absolute values (from [0,0])
        waypointCoords[0] = shipCoords[0] + relativeCoords[0];
        waypointCoords[1] = shipCoords[1] + relativeCoords[1];
    }
    mDistance = Math.abs(shipCoords[0]) + Math.abs(shipCoords[1]);
    return mDistance;
}
console.log(solver1(inputArr));
console.log(solver2(inputArr));
//# sourceMappingURL=solver.js.map