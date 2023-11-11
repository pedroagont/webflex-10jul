// PURE FUNCTION
// Functions that affect/interact only with its own scope

const addTwo = (num) => {
  return num + 2;
};

const myNum = 10;
const result = addTwo(myNum);
console.log(myNum);
console.log(result);

// SIDE EFFECT FUNCTION
// Functions that affect/interact with elements outside its own scope

function printHello() {
  console.log('Hello!');
}

printHello();

////////

const myCar = { color: 'red' };

const paintCarToBlue = () => {
  myCar.color = 'blue';
};

console.log(myCar); // original red
paintCarToBlue(); // call function
console.log(myCar); // blue, it mutated the external myCar object (side effect)

// Can we convert this to a pure function without changing original value?
// A: Yes, but we will need to create a new one
const otherCar = { color: 'red' };

const createBlueCar = (car) => {
  const newCar = {
    ...car,
    color: 'blue',
  };
  return newCar;
};

console.log(otherCar); // original red
const newCar = createBlueCar(otherCar); // call function AND store value in a new variable
console.log(otherCar); // still red, it did not mutate the otherCar external object (pure)
console.log(newCar); // new car is now blue
