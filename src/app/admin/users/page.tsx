import { UsersTable } from "@/modules/users";
import { HeaderPage } from "@/modules/shared";
import { getUsers } from "@/modules/users";

export default async function UsersPage() {
  // OBTENER CATEGORIAS
  const users = await getUsers();

  return (
    <>
      {/* HEADER */}
      <HeaderPage
        description="Listado de tus usuarios en el restaurante"
        title="Usuarios"
        linkName="Nuevo Usuario"
        pathName="/admin/users/new"
      />

      {/* TABLA DE CATEGORIAS */}
      <UsersTable users={users} />
    </>
  );
}
