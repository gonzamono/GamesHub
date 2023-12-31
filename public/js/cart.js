if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}




function ready(){
    if (JSON.parse(localStorage.getItem("productsInCart")) == null)localStorage.setItem("productsInCart", JSON.stringify([]))
    // cartNumber()
    let button = document.querySelector(".product-addcar")
    // console.log(button)
    button.addEventListener("click", (e) => {
        addItem()
        Swal.fire(
            'Exito!',
            'Producto agregado al carrito!',
            'success'
        )
    })
}

function cartNumber() {
    let numberItems = document.querySelector(".cartNmb")
    let lengthCart = JSON.parse(localStorage.getItem("productsInCart")).length
    if (lengthCart != 0) numberItems.innerText = `${lengthCart}`
}

function addItem(){
    let prodsCart = JSON.parse(localStorage.getItem("productsInCart"))
    let product = {
        id: document.getElementById("id").innerText,
        name: document.getElementById("name").innerText,
        price: document.getElementById("product-final-price").innerText.replace("$", ""),
        image: document.getElementById("image").alt
    }

    //  console.log('Producto Agregado:',product)
    if (prodsCart.length > 0) {
        let productInCart = prodsCart.find(prod => prod.id == product.id)
        if (!productInCart) {
            // console.log('entrando por !productInCart es decir producto no encontrado')
            product.quantity = 1
            product.subTotal = product.quantity * product.price
            // console.log('producto:', product)
            prodsCart = [...prodsCart, product]
        }
        else {
            // console.log('entrando por productInCart')
            productInCart.quantity += 1
            productInCart.subTotal = productInCart.price * productInCart.quantity 
            // console.log('producto:', productInCart)
        }
    }
    else {
        // console.log('entrando por prodsCart.length= 0')
        product.quantity = 1
        product.subTotal = product.quantity * product.price
        prodsCart.push(product)
    }
    localStorage.setItem("productsInCart", JSON.stringify(prodsCart))
    // cartNumber()
}