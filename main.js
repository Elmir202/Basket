let shoppingCart = (function () {

    cart = []

    function Item(name, price, count) {
        this.name = name
        this.price = price
        this.count = count
    }


function save() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
}

function load() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
}

if (sessionStorage.getItem('shoppingCart') != null) {
    load()
}

let object = {}

object.addItemCart = function (name, price, count) {
    for (var item in cart) {
        if (cart[item].name === name) {
            cart[item].count++
            save()
            return
        }
    }
    var item = new Item(name, price, count)
    cart.push(item)
    save()
}

object.setCountForItem = function (name, count) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count = count
            break
        }
    }
}

object.removeItemFromCart = function (name){
    for(var item in cart){
        if(cart[item].name=== name){
            cart[item].count--
        }
        if(cart[item].count===0){
            cart.splice(item,1)
        }
        break
    }
    save()
}

object.removeEverything = function(name) {
    for(var item in cart) {
        if(cart[item].name === name) {
            cart.splice(item, 1)
            break
        }
    }
    save()
}

object.clear=function(){
    cart=[]
    save()
}

object.totalCount=function(){
    let totalCount=0
    for(var item in cart){
        totalCount += cart[item].count
   }
   return totalCount
}

object.fullCart=function(){
    let fullCart=0
    for(var item in cart){
        fullCart+=cart[item].price * cart[item].count
    }
    return Number(fullCart.toFixed(2))
}

object.listCart=function(){
    let cartCopy=[]
    for(var i in cart){
        item = cart[i]
        copyItem = {}
        for( var e in item){
            copyItem[e]=item[e]
        }
        copyItem.total =Number(item.price*item.count).toFixed(2)
        cartCopy.push(copyItem)
    }
    return cartCopy
}

return object
})()

function displayCart() {
    let cartArray = shoppingCart.listCart();
    let output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>"
    }
    $('.show-cart').html(output)
    $('.total-cart').html(shoppingCart.fullCart())
    $('.total-count').html(shoppingCart.totalCount())
}

$('.add-to-cart').click(function(event){
    event.preventDefault()
    let name=this.getAttribute("data-name")
    let price=Number(this.getAttribute("data-price"))
    shoppingCart.addItemCart(name, price, 1)
    displayCart()
 })

 $('.clear-cart').click(function(){
    shoppingCart.clear() 
    displayCart()
 })
 $('.show-cart').on("click", ".delete-item", function(event) {
    let name = this.getAttribute("data-name")
    shoppingCart.removeEverything(name)
    displayCart()
})
  

$('.show-cart').on("click", ".minus-item", function(event) {
    let name = this.getAttribute("data-name")
    shoppingCart.removeItemFromCart(name)
    displayCart()
})
  

$('.show-cart').on("click", ".plus-item", function(event) {
    let name = this.getAttribute("data-name")
    shoppingCart.addItemCart(name)
    displayCart()
})

$('.show-cart').on("change", ".item-count", function(event) {
    let name = this.getAttribute("data-name")
    let count = this.getAttribute("value")
    shoppingCart.setCountForItem(name, count)
    displayCart()
});

displayCart()