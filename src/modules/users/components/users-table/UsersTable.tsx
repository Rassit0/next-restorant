"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {  User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import {
  DeleteUserModal,
  UpdateUserModal,
} from "@/modules/users";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <section className="container pt-8">
      <Table>
        <TableHeader>
          <TableColumn>IMAGEN</TableColumn>
          {/* <TableColumn>CODIGO</TableColumn> */}
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>CORREO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.image ? (
                  <Image
                    alt={user.name || "N/A"}
                    src={user.image}
                    width={70}
                    height={70}
                    className="rounded-full object-cover w-[70px] h-[70px]"
                  />
                ) : (
                  <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-primary text-white font-bold text-xl">
                    {user.name 
                      ? user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .substring(0, 2)
                      : '??'}
                  </div>
                )}
              </TableCell>
              {/* <TableCell>{user.id}</TableCell> */}
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <UpdateUserModal user={user} />
                <DeleteUserModal
                  userId={user.id}
                  userName={user.name || "usuario"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
