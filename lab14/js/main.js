class Product {
    constructor(name, price, category) {
        this.name = name
        this.price = price
        this.category = category
    }
    display() {
        console.log(`Товар: ${this.name}, Ціна: ${this.price}, Категорія: ${this.category}`)
    }
}

class User {
    constructor(name) {
        this.name = name
    }
    getInfo() {
        console.log(`Користувач: ${this.name}`)
    }
}

class Customer extends User {
    constructor(name) {
        super(name)
        this.orders = []
    }
    addOrder(order) {
        this.orders.push(order)
    }
    showOrders() {
        console.log(`Замовлення користувача ${this.name}:`)
        this.orders.forEach((o, i) => {
            console.log(`Замовлення №${i+1}`)
            o.showOrder()
        })
    }
}

class Order {
    constructor() {
        this.products = []
        this.total = 0
    }
    addProduct(product) {
        this.products.push(product)
        this.total += product.price
    }
    showOrder() {
        console.log("Замовлення:")
        this.products.forEach(p => p.display())
        console.log("Загальна сума:", this.total)
    }
}

const prod1 = new Product("Ноутбук", 15000, "Електроніка")
const prod2 = new Product("Мишка", 500, "Аксесуари")
const prod3 = new Product("Клавіатура", 1200, "Аксесуари")

const order1 = new Order()
order1.addProduct(prod1)
order1.addProduct(prod2)

const order2 = new Order()
order2.addProduct(prod3)

const customer1 = new Customer("Сергій")
customer1.addOrder(order1)
customer1.addOrder(order2)

customer1.showOrders()
