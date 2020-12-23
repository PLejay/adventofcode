const fs = require ('fs');

let inputArr = fs.readFileSync('day4/input.txt').toString().split('\n');
let cleanArr = [];

function cleanData (arr) {
  let passport = {};
  arr.forEach (el => {
    if (el === '') {
      cleanArr.push(passport);
      passport = {};
    }
    el = el.split(' ');
    el.forEach(field => {
      field = field.split(':');
      passport[field[0]] = field[1];
    });
  });
  cleanArr.push(passport);
}

let fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

function checkFields (arr) {
  let correctPass = 0;
  arr.forEach (pass => {
    let valid = true;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      let val = pass[field];
      if (!pass.hasOwnProperty(field)) {
        valid = false;
        break;
      } else if (field === 'byr' && (Number(val) < 1920 || Number(val) > 2002)) {
        valid = false;
        break;
      } else if (field === 'iyr' && (Number(val) < 2010 || Number(val) > 2020)) {
        valid = false;
        break;
      } else if (field === 'eyr' && (Number(val) < 2020 || Number(val) > 2030)) {
        valid = false;
        break;
      } else if (field === 'hgt') {
        console.log('hgt:', val);
        const metric = val.slice(-2);
        const value = val.slice(0, val.length - 2);
        if (!(metric === 'cm' || metric === 'in')) {
          valid = false;
          break;
        } else if (metric === 'cm' && (value < 150 || value > 193)) {
          valid = false;
          break;
        } else if (metric === 'in' && (value < 59 || value > 76)) {
          valid = false;
          break;
        }
      } else if (field === 'hcl') {
        const regexp = /^#[a-f0-9]{6}$/;
        if (!val.match(regexp)) {
          valid = false;
          break;
        }
      } else if (field === 'ecl' && !eyeColors.includes(val)) {
        valid = false;
        break;
      } else if (field === 'pid') {
        const regexp = /^[0-9]{9}$/;
        if (!val.match(regexp)) {
          valid = false;
          break;
        }
      }
    }
    if (valid) correctPass++;
  });
  return correctPass;
}

cleanData(inputArr);
console.log('cleanArr.length:', cleanArr.length);
console.log('correct passports:', checkFields (cleanArr));

// console.log('inputArr:', inputArr);
// console.log('cleanArr:', cleanArr);
