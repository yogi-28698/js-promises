const cart = ["Bat", "Bowl", "Gloves", "Shoes"];

//Consumer
const promise = createOrder(cart);
//console.log(promise);
promise.then(function(cartDetails) {
    console.log(cartDetails);
    return cartDetails;
})
.then (function (cartDetails) {
    return proceedToPayment(cartDetails);
})
.then (function (totalPayment) {
    console.log(totalPayment);
})
.catch (function (err) {
    console.log(err.message);
})


//Producer
function createOrder (cart) {
    const pr = new Promise(function (resolve, reject) {
        let cartDetails = {};
        if (!validateCart(cart)) {
            const err = new Error("Cart is empty! Inside the createOrder Function.");
            reject(err);
        } else {
            for (let i = 0; i < cart.length; i++) {
                cartDetails[cart[i]] = 1000;
            }
            resolve(cartDetails);
        } 
    });
    return pr;
}

function validateCart (cart) {
    if (cart.length === 0) return false;
    return true;
}

function proceedToPayment (cartDetails) {
        return new Promise (function (resolve, reject) {
            let totalPayment = 0;
            //console.log(typeof Object.keys(cartDetails).length + " Inside the proceedToPayment Function.");
            if (Object.keys(cartDetails) === 0) {
                const err1 = new Error ("Cart is Empty! Inside the proceedToPayment Function.");
                reject(err1);
            } else {
                let items = Object.entries(cartDetails);
                for ([key, val] of items) totalPayment += val;
                resolve(totalPayment);
            }
        });
}