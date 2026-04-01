const path = require('path');
module.exports = {
entry: './src/index.ts', // Точка входу
output: {
filename: 'bundle.js', // Вихідний зібраний файл
path: path.resolve(__dirname, 'dist'),
},
resolve: {
extensions: ['.ts', '.js'], // Webpack сам розумітиме ці розширення
},
module: {
rules: [
{
test: /\.ts$/,
use: 'ts-loader',
exclude: /node_modules/,
},
{
test: /\.s[ac]ss$/i, // Правило для SCSS
use: [
'style-loader', // 3. Додає CSS у DOM (через тег <style>)
'css-loader', // 2. Перетворює CSS у CommonJS
'sass-loader', // 1. Компілює Sass у CSS
],
},
],
},
};