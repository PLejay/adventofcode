const fs = require ('fs');

let inputArr = fs.readFileSync('day7/input.txt').toString().split('\n');

let rules = {};
let validBags = new Set();

function cleanData1 (arr) {
  arr = arr.map(rule => rule.split(' '));
  for (let i = 0; i < arr.length; i++) {
    const rule = arr[i];
    let bags = {};
    const container = `${rule[0]} ${rule[1]}`;
    let adjIndex = 5;
    let colIndex = 6;
    if (rule[4] === 'no') {
      rules[container] = 0;
    } else {
      rules[container] = {};
      while (rule[adjIndex]) {
        let containee = `${rule[adjIndex]} ${rule[colIndex]}`;
        rules[container][containee] = 1;
        adjIndex += 4;
        colIndex += 4;
      }
    }
  }
}

function solver1 (obj) {

  let innerObj = obj;
  delete innerObj['shiny gold'];
  console.log('innerObj:', innerObj);

  function loop (newObj, currentBag = '') {
    // console.log('newObj, validBags:', newObj, validBags);
    for (bag in newObj) {
      // console.log('bag:', bag);
      if (bag === 'shiny gold' || validBags.has(bag)) {
        // console.log('bag, newObj:', bag, newObj);
        // step--;
        validBags.add(currentBag);
        // console.log('hit gold! validBags:', validBags);
        return 1;
      }
      if (newObj[bag] === 0) {
        // step--;
        return 0;
      }
      // step++;
      loop (innerObj[bag], bag)
    }
  }

  for (let i = 0; i < 100; i++) {
    loop(innerObj);
  }
  validBags.delete('');
  console.log('validBags.size:', validBags.size);
}

cleanData1(inputArr);
solver1(rules);
// console.log('rules:', rules);
console.log('validBags:', validBags);