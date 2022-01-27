// Exporting Module

console.log('EXPORTING');

const shippingCost = 10;
const cart = [];

// named export
export const addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice as price, totalQuantity };

export default function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}