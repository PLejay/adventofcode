import { createHash } from "crypto";
import { readFile } from "../../utils/utils";

const inputString = readFile("2015", "day4").toString();
// const inputString = "abcdef";

const getMD5Hash = (originString: string): string =>
  createHash("md5").update(originString).digest("hex");

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
