function Product(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
}

Product.prototype.display = function() {
    console.log(`Товар: ${this.name}, Ціна: ${this.price}, Категорія: ${this.category}`);
}


function Order() {
    this.products = [];
    this.total = 0;
}

Order.prototype.addProduct = function(product) {
    this.products.push(product);
    this.total += product.price;
}

Order.prototype.showOrder = function() {
    console.log("Оформлення замовлення:");
    this.products.forEach(p => p.display());
    console.log("Загальна сума:", this.total);
}


function Customer(name) {
    this.name = name;
    this.orders = [];
}

Customer.prototype.addOrder = function(order) {
    this.orders.push(order);
}

Customer.prototype.showOrders = function() {
    console.log(`Замовлення клієнта ${this.name}:`);
    this.orders.forEach((o, i) => {
        console.log(`Замовлення №${i+1}`);
        o.showOrder();
    });
}


const prod1 = new Product("Ноутбук", 15000, "Електроніка");
const prod2 = new Product("Мишка", 500, "Аксесуари");
const prod3 = new Product("Клавіатура", 1200, "Аксесуари");


const order1 = new Order();
order1.addProduct(prod1);
order1.addProduct(prod2);


const order2 = new Order();
order2.addProduct(prod3);


const customer1 = new Customer("Сергій");
customer1.addOrder(order1);
customer1.addOrder(order2);


customer1.showOrders();
