// snippet prc
"use client"

import { useUIStore } from "@/modules/shared";
import { Button } from "@nextui-org/react";

export default function ProductsPage() {

  const {handleMenuOpen} = useUIStore();
  const saludo = () => {
    console.log('Hola mundo')
  }
  return (
    <div>
      <h1>Pagina de productos</h1>

      {/* <button onClick={saludo} className="bg-indigo-500 px-3 py-2 rounded-3xl text-white cursor-pointer">Agregar Productos</button> */}
      <Button onPress={handleMenuOpen} color="primary">Abrir menu</Button>
    </div>
  );
}