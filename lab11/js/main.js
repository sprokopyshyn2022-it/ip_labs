let n = Number(prompt("Введіть розмір матриці n:"));

console.log("Матриця " + n + "x" + n + ":");

for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
        if (i === j) {
            row += "1 ";
        } else {
            row += "0 ";
        }
    }
    console.log(row);
}



let a = Number(prompt("Введіть перший елемент a:"));
let r = Number(prompt("Введіть співвідношення r:"));
let count = Number(prompt("Введіть кількість елементів n:"));

let sum = 0;
let current = a;

console.log("Геометричний ряд:");

for (let i = 1; i <= count; i++) {
    console.log(current);
    sum += current;
    current *= r;
}

console.log("Сума ряду:", sum);



while (true) {
    let operation = prompt(
        "Введіть операцію (+, -, *, /, %) або end для виходу:"
    );

    if (operation === "end") {
        alert("Роботу завершено");
        break;
    }

    let x = Number(prompt("Введіть перше число:"));
    let y = Number(prompt("Введіть друге число:"));
    let result;

    switch (operation) {
        case "+":
            result = x + y;
            break;
        case "-":
            result = x - y;
            break;
        case "*":
            result = x * y;
            break;
        case "/":
            if (y === 0) {
                result = "Помилка: ділення на нуль";
            } else {
                result = x / y;
            }
            break;
        case "%":
            result = x % y;
            break;
        default:
            result = "Невідома операція";
    }

    alert("Результат: " + result);
}
