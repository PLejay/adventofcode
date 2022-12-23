"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const hexToBinary = (hexValue) => {
    const hexValueMap = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        A: "1010",
        B: "1011",
        C: "1100",
        D: "1101",
        E: "1110",
        F: "1111",
    };
    if (hexValueMap.hasOwnProperty(hexValue)) {
        return hexValueMap[hexValue];
    }
};
const inputString = (0, utils_1.readFile)("2021", "day16")
    .toString()
    .split("")
    .map(hex => hexToBinary(hex))
    .join("");
const analyseParentPacket = (packets) => {
    const versionNum = parseInt(packets.slice(0, 3), 2);
    const typeId = parseInt(packets.slice(3, 6), 2);
    const isOperator = typeId !== 4;
    let lengthTypeId = null;
    let childPacketsRule = null;
    let childPackets = null;
    let remainingPackets = null;
    let packetLength = null;
    if (isOperator) {
        lengthTypeId = packets[6];
        childPacketsRule =
            lengthTypeId === "0"
                ? { type: "totalBitLength", value: parseInt(packets.slice(7, 22), 2) }
                : { type: "subPacketNum", value: parseInt(packets.slice(7, 18), 2) };
        childPackets = lengthTypeId === "0" ? packets.slice(22) : packets.slice(18);
    }
    else {
        let currentPosition = 6;
        let reachedLastBit = false;
        while (!reachedLastBit) {
            if (packets[currentPosition] === "0") {
                reachedLastBit = true;
            }
            currentPosition += 5;
        }
        packetLength = currentPosition;
        remainingPackets = packets.slice(currentPosition);
    }
    return {
        versionNum,
        typeId,
        isOperator,
        lengthTypeId,
        childPacketsRule,
        childPackets,
        remainingPackets,
        packetLength,
    };
};
const solver = () => {
    let sumOfVersionNums = 0;
    // Track the position of the parser in the binary string
    let globalPosition = 0;
    let currentRules = [];
    const decodePackets = (packets) => {
        console.log(packets);
        const { versionNum, typeId, isOperator, lengthTypeId, childPacketsRule, childPackets, remainingPackets, packetLength, } = analyseParentPacket(packets);
        console.log(analyseParentPacket(packets));
        sumOfVersionNums += versionNum;
        // return;
        if (!isOperator) {
            return { remainingPackets, packetLength };
        }
        else {
            let totalPacketLength = packets.length - (childPackets ? childPackets.length : 0);
            let currentRemainingPackets = childPackets ?? "";
            let childPacketNum = 0;
            let ruleMet = false;
            while (!ruleMet &&
                packets.length > 0 &&
                packets.split("").includes("1")) {
                const { remainingPackets, packetLength } = decodePackets(currentRemainingPackets);
                childPacketNum++;
                if (childPacketsRule && childPacketsRule.type === "subPacketNum") {
                    console.log("childPacketNum " + childPacketNum);
                }
                totalPacketLength += packetLength ?? 0;
                currentRemainingPackets = remainingPackets ?? "";
                if (childPacketsRule &&
                    childPacketsRule.type === "totalBitLength" &&
                    totalPacketLength >= childPacketsRule.value) {
                    ruleMet = true;
                }
                else if (childPacketsRule &&
                    childPacketsRule.type === "subPacketNum" &&
                    childPacketNum >= childPacketsRule.value) {
                    ruleMet = true;
                }
                else if (currentRemainingPackets === "") {
                    ruleMet = true;
                }
            }
            return {
                remainingPackets: currentRemainingPackets,
                packetLength: totalPacketLength,
            };
        }
    };
    decodePackets(inputString);
    return { sumOfVersionNums };
};
console.log(solver());
//# sourceMappingURL=solver.js.map