const fs = require ('fs');

let inputArr = fs.readFileSync('day8/input.txt').toString().split('\n');
inputArr = inputArr.map(rule => rule.split(' '));

function solver1 (arr) {
  // console.log('arr', arr)
  let accumulator = 0;
  let j = 0;
  let terminatedNormally = true;
  let newArr = arr.map(x => x);
  for (let i = 0; i < arr.length; i++) {
    let currentRule = newArr[i + j];
    // console.log('newArr, currentRule, i, j', newArr, currentRule, i, j);
    if (currentRule.length > 2) {
      terminatedNormally = false;
      break;
    }
    if (currentRule[0] === 'acc') accumulator += Number(currentRule[1]);
    if (currentRule[0] === 'jmp') j += Number(currentRule[1]) - 1;
    currentRule.push('executed');
    if (currentRule === newArr[newArr.length - 1]) break;
  }
  return terminatedNormally ? accumulator : null;
}

function solver2 (arr) {
  let newArr = arr.map(x => x);
  let solution = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    switch (newArr[i][0]) {
      case 'acc':
        break;
      case 'jmp':
        console.log('converting jmp to nop')
        newArr[i][0] = 'nop';
        const solver1Res = solver1(newArr);
        console.log('newArr, solver1Res:', newArr, solver1Res);
        solver1Res ? solution = solver1Res : newArr[i][0] = 'jmp';
        break;
      case 'nop':
        newArr[i][0] = 'jmp'
        const solver1Res2 = solver1(newArr);
        solver1Res2 ? solution = solver1Res2 : newArr[i][0] = 'nop';
        break;
    }
    // console.log('arr.length, i:', arr.length, i);
    if (solution) break;
  }
  return solution;
}

console.log('solver2(inputArr):', solver2(inputArr));