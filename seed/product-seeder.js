var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/M/D5/MD565/MD565?wid=445&hei=445&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=gAGkv0',
        title: 'Apple 60W MagSafe 2 Power Adapter',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur, cumque cupiditate, ea est ex fuga magnam minima mollitia nam praesentium quia sapiente sequi, suscipit veniam? Impedit omnis perferendis quis?',
        price: 40
    }),
    new Product({
        imagePath: 'https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/M/Q4/MQ4H2/MQ4H2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5%2C0.5&.v=1523990280705',
        title: 'Thunderbolt 3 (USB‑C) Cable (0.8 m)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur, cumque cupiditate, ea est ex fuga magnam minima mollitia nam praesentium quia sapiente sequi, suscipit veniam? Impedit omnis perferendis quis?',
        price: 39
    }),
    new Product({
        imagePath: 'https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/M/ME/MMEF2/MMEF2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=1503962928226',
        title: 'AirPods',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur, cumque cupiditate, ea est ex fuga magnam minima mollitia nam praesentium quia sapiente sequi, suscipit veniam? Impedit omnis perferendis quis?',
        price: 159
    }),
    new Product({
        imagePath: 'https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/M/LA/MLA22LL/MLA22LL?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5%2C0.5&.v=1496944005839',
        title: 'Magic Keyboard - US English',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur, cumque cupiditate, ea est ex fuga magnam minima mollitia nam praesentium quia sapiente sequi, suscipit veniam? Impedit omnis perferendis quis?',
        price: 99
    }),
    new Product({
        imagePath: 'https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/M/J2/MJ2R2/MJ2R2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=aXblN3',
        title: 'Magic Trackpad 2 - Silver',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur, cumque cupiditate, ea est ex fuga magnam minima mollitia nam praesentium quia sapiente sequi, suscipit veniam? Impedit omnis perferendis quis?',
        price: 129
    }),
    new Product({
        imagePath: 'https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/H/KQ/HKQ12/HKQ12?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=1496516069350',
        title: 'Belkin Thunderbolt 3 Express Dock HD',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur, cumque cupiditate, ea est ex fuga magnam minima mollitia nam praesentium quia sapiente sequi, suscipit veniam? Impedit omnis perferendis quis?',
        price: 349
    }),
];

var done = 0;
for (var i=0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}