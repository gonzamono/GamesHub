if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}

function  ready(){
    let buyButton = document.getElementById("buyButton")

    buyButton.addEventListener('click',async (e)=>{

    //  console.log('entra a comprar')

    // console.log(localStorage.getItem("productsInCart"))
    
     let prodsCart = JSON.parse(localStorage.getItem("productsInCart"))
     console.log('carrito',prodsCart)
     let body = {
                    total:prodsCart.reduce((acum, act) => acum += act.subTotal ,0).toFixed(2) ,
                    products:prodsCart
                }
    const response = await fetchCreate(body)
   
    // console.log('respuesta',response)
    if(response.information.status==200){
        Swal.fire(
            'Exito!',
            'Se ha creado la Orden exitosamente',
            'success'
        )
        localStorage.setItem("productsInCart", JSON.stringify([]))
        displayEmptyCart()
        displayCart()
    }
    })
    async function fetchCreate(model) { 
        const res = await fetch('/orders/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(model)
        })
        let info = await res.json()
        return info
    }   
   
}