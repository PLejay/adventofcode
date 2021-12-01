"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputArr = fs
    .readFileSync('src/day13/input.txt')
    .toString()
    .split('\n')
    .map(function (x) {
    return x.split(',');
});
console.log('inputArr:', inputArr);
function solver1(timestamp, buses) {
    buses = buses.filter(function (num) { return num != 'x'; }).map(function (num) { return Number(num); });
    var waitTime = 0;
    var solution = 0;
    var foundBus = false;
    while (!foundBus) {
        buses.forEach(function (busID) {
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
    var highestBus = findHighest(buses);
    console.log('highestBus:', highestBus);
    var startingTimestamp = highestBus.id - highestBus.index;
    var solved = false;
    while (!solved) {
        solved = true;
        for (var i = 0; i < buses.length; i++) {
            var busID = buses[i];
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
    var highest = {
        id: 0,
        index: 0
    };
    for (var i = 0; i < buses.length; i++) {
        if (buses[i] != 'x' && buses[i] > highest.id) {
            highest.index = i;
            highest.id = Number(buses[i]);
        }
    }
    return highest;
}
// console.log('solver1(inputArr[0], inputArr[1]):', solver1(Number(inputArr[0][0]), inputArr[1]));
console.log('solver2(inputArr[1]):', solver2(inputArr[1]));
