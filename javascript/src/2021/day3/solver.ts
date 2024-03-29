import { readFile } from "../../utils/utils";

const inputArr: string[] = readFile("2021", "day3").toString().split("\n");

const solver1 = (bitList: string[]): number => {
  let compressedArray = new Array(bitList[0].length).fill(0);

  bitList.forEach(bits => {
    bits.split("").forEach((bit, i) => {
      compressedArray[i] += Number(bit);
    });
  });

  const epsilonArray = compressedArray.map(bit =>
    bit > bitList.length / 2 ? 1 : 0
  );
  const gammaArray = epsilonArray.map(bit => (bit === 1 ? 0 : 1));

  return parseInt(epsilonArray.join(""), 2) * parseInt(gammaArray.join(""), 2);
};

const solver2 = (bitList: string[]): number => {
  const loop = (
    list: string[],
    currentIndex: number,
    mostOrLeast: string
  ): string[] | string | undefined => {
    if (list.length === 1) return list[0];
    if (currentIndex === bitList[0].length) return;

    // Determine the most/least common bit
    let bitSum = 0;
    list.forEach(bits => {
      bitSum += Number(bits[currentIndex]);
    });
    const mostCommonBit = bitSum >= list.length / 2 ? 1 : 0;
    const leastCommonBit = bitSum >= list.length / 2 ? 0 : 1;

    // Run the loop again with the matching values
    const newList = list.filter(
      bits =>
        Number(bits[currentIndex]) ===
        (mostOrLeast === "most" ? mostCommonBit : leastCommonBit)
    );
    return loop(newList, currentIndex + 1, mostOrLeast);
  };

  const co2Rating = loop(bitList, 0, "most") as string;
  const lifeSupportRating = loop(bitList, 0, "least") as string;

  return parseInt(co2Rating, 2) * parseInt(lifeSupportRating, 2);
};

console.log(solver1(inputArr));
console.log(solver2(inputArr));
