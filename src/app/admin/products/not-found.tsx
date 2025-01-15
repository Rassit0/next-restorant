import Link from "next/link";

export default function NotFound() {
    
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-light">404</h1>
      <p>No se encontro el producto</p>
      <Link className="text-primary" href={'/admin/products'}>Volver</Link>
    </section>
  );
}