import * as fs from 'fs';

const inputArr: (number | string)[][] = fs
  .readFileSync('src/day13/input.txt')
  .toString()
  .split('\n')
  .map(x => {
    return x.split(',');
  });

console.log('inputArr:', inputArr);

type Bus = {
  id: number
  index: number
}

function solver1 (timestamp: number, buses: (string |number)[]): number {
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
function solver2 (buses: (string | number)[]): number {
  const highestBus = findHighest(buses);
  console.log('highestBus:', highestBus);
  let startingTimestamp = highestBus.id - highestBus.index;
  let solved = false;
  while (!solved) {
    solved = true;
    for (let i = 0; i < buses.length; i++) {
      let busID = buses[i];
      if (busID === 'x') continue;
      if ((startingTimestamp + i) % Number(busID) != 0) {
        solved = false;
        startingTimestamp += highestBus.id;
        break;
      }
    }
  }
  return startingTimestamp;
}

function findHighest (buses: (string | number)[]): Bus {
  let highest: Bus = {
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