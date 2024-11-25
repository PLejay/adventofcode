"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const utils_1 = require("../../utils/utils");
const inputString = utils_1.readFile("2015", "day4").toString();
// const inputString = "abcdef";
const getMD5Hash = (originString) => crypto_1.createHash("md5").update(originString).digest("hex");
const solver = () => {
    const limit = 10000000;
    let i = 0;
    let answer = 0;
    while (i < limit) {
        const hash = getMD5Hash(`${inputString}${i}`);
        if (hash.slice(0, 6) === "000000") {
            answer = i;
            i = limit;
        }
        i++;
    }
    return { answer, i };
};
console.log(solver());
//# sourceMappingURL=solver.js.map