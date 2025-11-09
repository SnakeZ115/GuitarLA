// Los componentes siempre deben de iniciar con mayusculas
// function Nombre() para declarar componentes, son funciones de JS
// el return es lo que se renderiza en el HTML
// 2 propositos: reutilizable y separar funcionalidad
// un componente siempre debe tener un return

// HOOKS
// Te permiten utilizar las diferentes funciones de react en los componentes
// Ya hay algunas incluidas pero se pueden hacer unas propias

// STATE EN REACT
// El state es una variable con informacion relevante de la app de react
// algunas veces el state pertenece a algun componente en especifico o algunas veces deseas compartirlo a lo largo de otros componentes
// NOTA: Piensa en el como el resultado de alguna interaccion en el sitio web (listado de clientes, imagen a mostrar de una galeria, usuario autenticado o no)
// es creado con useState

// DECLARACION USE STATE
// const [productos, setProductos] = useState([]) (el VALOR INICIAL es un arreglo vacio)
// state -> productos   -   funcion para cambiar el state -> setProductos   -   [] -> valor inicial
// cada que el state cambia, react renderiza y actualiza todo para que la interfaz y el state siempre esten sincronizadas

// REGLAS DE HOOKS
// 1. LOS HOOKS SE COLOCAN EN LA PARTE SUPERIOR DE LOS COMPONENTES
// 2. NO SE DEBEN COLOCAR DENTRO DE CONDICIONALES NI DESPUES DE UN RETURN

// USEEFFECT
// Siempre tiene un callback que dependiendo como lo declares, va a hacer diferentes acciones
// DECLARACION
/*
  useEffect(() => {
    console.log('Componente listo')
  }, []) -> Arreglo de dependencias, si es vacio, se va a ejecutar cuando el componente este listo

*/
// useEffect se ejecuta automaticamente cuando en componente esta listo, buen lugar para colocar consultas a APIS o localStorage
// En el arreglo de dependencias, le puedes asignar una variable (state) y va a estar escuchando por los cambios de esa variable, puede actualizar el componente cuando eso suceda
// dependiendo que valor le pasemos al array de dependencias, useEffect hara algo diferente

// STATEMENTS
// Una app de JS es una serie de statements, un statement es una instruccion para hacer algo (creacion de variables, condicionales, iteraciones)

// EXPRESIONES
// Algo que produce un valor (ternarios, .map, array methods)

// PROPS
// Los componentes de react utilizan props para comunicarse entre ellos, se le puede pasar infor de un padre a un hijo mediante props, le puedes pasar de todo
// son como atributos de html

// EVENTOS
// Se manejan muy similar a JS
// se escriben en camelCase
// la funcion se escribe entre {funcion}
// se recomienda nombrarlos como handle{evento}, por ejemplo, handleSubmit

//INMUTABILIDAD
// QUE NO SE PUEDE CAMBIAR

import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item) {
    const itemExits = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExits >= 0) {
      // El item existe
      const updateCart = [...cart] // copia del state
      if(updateCart[itemExits].quantity < MAX_ITEMS) {
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
      if(item.id === id && item.quantity < MAX_ITEMS) {
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
      if(item.id === id && item.quantity > MIN_ITEMS) {
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

  return (
    <>
      <Header 
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteCart={deleteCart}
      /> 

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">

            {data.map((guitar) => (
                <Guitar
                  key={guitar.id} // el key siempre se pone siempre que se itera. tiene que ser un valor unico
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart} // pasandole la variable para actualizar el carrito
                />
              )
            )}
             
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>

    </>
  )
}

export default App
