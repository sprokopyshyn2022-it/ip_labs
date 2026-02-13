function findMax(a, b) {
    return a > b ? a : b;
}

console.log("Максимум з 5 і 9:", findMax(5, 9));


const subtract = function(a, b) {
    return a - b;
};

console.log("5 - 3 =", subtract(5, 3));


const sqrt = (n) => Math.sqrt(n);

console.log("Квадратний корінь з 16 =", sqrt(16));


function geometricProgression(n, a, r) {
    if (n === 1) {
        return a;
    }
    return a * Math.pow(r, n - 1) + geometricProgression(n - 1, a, r);
}

console.log("Сума геометричної прогресії:", geometricProgression(4, 2, 3));


function createDivider(divisor) {
    return function(number) {
        return number / divisor;
    };
}

const divideBy2 = createDivider(2);
console.log("10 / 2 =", divideBy2(10));


function processSet(set, callback) {
    for (let value of set) {
        callback(value);
    }
}

const mySet = new Set([1, 2, 3, 4]);

processSet(mySet, function(value) {
    console.log("Елемент множини:", value);
});
