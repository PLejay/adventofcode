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
