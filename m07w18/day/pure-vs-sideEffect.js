// PURE FUNCTION
// A function that affects/interacts only its own scope

// SIDE EFFECT FUNCTION
// A function that affects/interacts with things outside its own scope

// SIDE EFFECTS
function consoleHi() {
  console.log('hi');
}

consoleHi();

// SIDE EFFECT
const ferrari = { color: 'red ' };

function paintCarBlue() {
  ferrari.color = 'blue';
}

console.log(ferrari);
paintCarBlue();
console.log(ferrari);

// PURE
function addTwo(num) {
  return num + 2;
}

let myNum = 10;
const result = addTwo(myNum);

console.log('myNum', myNum);
console.log('result', result);
