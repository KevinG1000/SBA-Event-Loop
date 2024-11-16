// Part 1 -- Stack Overflow
let counter = 0;

function incrementCounter() {
  try {
    counter++; // Increment the counter
    console.log(counter); // Log the current counter value
    incrementCounter(); // Recursively call the function
  } catch (error) {
    console.error("Error caught:", error); // Log the error message
    console.log("Final counter value before overflow:", counter);
  }
}

incrementCounter(); // Start the recursive function call


// Part 2 -- Trampolines
// Flatten array recursively
function arrayFlat(array) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    if (Array.isArray(element)) {
      result = result.concat(arrayFlat(element));
    } else {
      result.push(element);
    }
  }

  return result;
}

// Modified function for trampolining
function arrayFlatTrampoline(arr, result = []) {
  return () => {
    if (arr.length === 0) {
      return result;
    }

    let [first, ...rest] = arr;

    if (Array.isArray(first)) {
      return arrayFlatTrampoline([...first, ...rest], result);
    } else {
      result.push(first);
      return arrayFlatTrampoline(rest, result);
    }
  };
}

// Trampoline function
function trampoline(func) {
  let result = func();

  while (typeof result === "function") {
    result = result();
  }

  return result;
}

// Use trampoline to flatten the array
let nestedArray = [1, [2, [3, 4]], 5, [6, [7, [8, 9]]]];
let flattenedArray = trampoline(arrayFlatTrampoline(nestedArray));
console.log(flattenedArray);
// Expected Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]


// Part 3 -- Deferred Execution
// Function to check if a number is prime
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Function to calculate prime numbers with deferred execution
let textOne = document.querySelector("#textOne");

function primeFunc(n, current = 1) {
  if (current > n) {
    // When finished, show an alert
    alert("Calculation is finished");
    return;
  }

  if (isPrime(current)) {
    textOne.innerHTML += current + " "; // Add the prime number to the HTML element
  }

  // Defer the execution to allow the browser to render
  setTimeout(() => primeFunc(n, current + 1), 0);
}

// Call the function with n = 10000
primeFunc(10000);
