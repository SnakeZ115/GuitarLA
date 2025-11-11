// HOOKS
// FUNCIONES DE JS

import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

// siempre tener use{nombre}
function useCart() {

    // Busca si hay algo en el local storage, si hay, el valor inicial de cart es lo que hay en local storage, si no, regresa un arreglo vacio
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    function addToCart(item) {
        const itemExits = cart.findIndex((guitar) => guitar.id === item.id)
        if (itemExits >= 0) {
            // El item existe
            const updateCart = [...cart] // copia del state
            if (updateCart[itemExits].quantity < MAX_ITEMS) {
                updateCart[itemExits].quantity++;
                setCart(updateCart)
            }
        }
        else {
            // el item no existe
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    function deleteFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCard = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCard)
    }

    function decreaseQuantity(id) {
        const updatedCard = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCard)
    }

    function deleteCart() {
        setCart([])
    }

    // Funcion para guardar en el local storage y que no se pierdan los items seleccionados
    // Cuando cambie carrito, se ejecuta este codigo
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    // State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]) // depende del state del cart
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    // Acceder a los valores del hook, los necesitamos pasar con return y como un objeto
    return {
        data,
        cart,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        deleteCart,
        isEmpty,
        cartTotal
    }
}

export default useCart