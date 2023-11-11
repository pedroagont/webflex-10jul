// PURE FUNCTION
// Funcitons that affect/interact only with its own blocked scope

const addTwo = (num) => {
  return num + 2;
};

const myNum = 10;
const result = addTwo(myNum);
console.log(myNum);
console.log(result);

// SIDE EFFECT FUNCTION
// Funcitons that affect/interact with elements outside its own scope

function consoleSomething() {
  console.log('Hello!');
}

consoleSomething();

////////

const myCar = { color: 'red' };

const paintCarToBlue = () => {
  myCar.color = 'blue';
};

console.log(myCar);
paintCarToBlue();
console.log(myCar);
