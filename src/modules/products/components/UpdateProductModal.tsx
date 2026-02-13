"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Category, Product } from "@prisma/client";
import { PencilEdit01Icon } from "hugeicons-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { updateProduct } from "@/modules/products";

interface Props {
  categories: Category[];
  product: Product;
}

export const UpdateProductModal = ({ categories, product }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const { productName, description, image, price, stock, categoryId } =
      e.target as HTMLFormElement;

    const formData = new FormData();

    if (image.files && image.files[0]) {
      // Si hay un archivo seleccionado, lo agregamos
      formData.append("image", image.files[0]);
    }

    formData.append("id", product.id);
    formData.append("name", productName.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("categoryId", categoryId.value);

    const { error, message } = await updateProduct(formData);
    if (error) {
      toast.warning("Ocurrió un error", {
        description: message,
      });

      setIsLoading(false);
      return;
    }

    // Si se guarda con exito
    toast.success(message);
    onClose();
    setIsLoading(false);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="warning"
        variant="light"
        startContent={<PencilEdit01Icon />}
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Editar Producto</ModalHeader>
              <ModalBody>
                <Input
                  variant="underlined"
                  label="Nombre"
                  placeholder="Agrega un nombre al producto"
                  name="productName"
                  defaultValue={product.name}
                />

                <Textarea
                  variant="underlined"
                  name="description"
                  label="Descripción"
                  placeholder="Agrega la descripción del producto"
                  defaultValue={product.description}
                ></Textarea>

                <Input
                  variant="underlined"
                  label="Precio"
                  placeholder="Agrega un precio"
                  type="number"
                  name="price"
                  defaultValue={product.price.toString()}
                />

                <Input
                  variant="underlined"
                  label="Stock"
                  placeholder="Agrega el stock disponible"
                  type="number"
                  name="stock"
                  defaultValue={product.stock.toString()}
                />

                <input type="file" name="image" id="image" />

                <Select
                  label="Categorías"
                  placeholder="Selecciona una categoría"
                  name="categoryId"
                  variant="underlined"
                  defaultSelectedKeys={[product.categoryId || ""]}
                >
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>

                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Actualizar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
