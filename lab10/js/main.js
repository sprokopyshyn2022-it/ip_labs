// Завдання 1: Результат виконання.
try {
  console.log(a); 
} catch (err) {
  console.log(err);
}
var a = 10;

try {
  console.log(b); 
} catch (err) {
  console.log(err);
}
let b = 20;

try {
  console.log(c); 
} catch (err) {
  console.log(err);
}
const c = 30;

// Завдання 2: Результат змінних.
function testScope() {
    if (true) {
        var x = 5;
        let y = 10;
        const z = 15;
    }
    try { console.log(x); } catch (err) { console.log(err); } 
    try { console.log(y); } catch (err) { console.log(err); } 
    try { console.log(z); } catch (err) { console.log(err); }
}

testScope();

// Завдання 3: Результат виконання коду.
console.log(5 + "5");       
console.log("5" - 2);        
console.log(true + false);  
console.log(null + 1);      
console.log(undefined + 1);  
console.log(0 == false);     
console.log(0 === false);   

// Завдання 4: Запуск кода та результат Object.freeze.
const person = {
    name: "John",
    age: 30
};

Object.freeze(person);

person.age = 31;
person.city = "New York";

console.log(person);

try {
    person = { name: "Alice", age: 25 }; 
} catch (err) {
    console.log(err);
}

// Завдання 5: Функція для визначення типу.
function checkType(value) {
    return typeof value;
}

console.log(checkType(10));      
console.log(checkType("Hello")); 
console.log(checkType(null));   
