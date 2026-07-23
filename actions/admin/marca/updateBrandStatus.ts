'use server'

import { prisma } from "@/libs";

interface Props {
  marcaId: number;
  status: boolean;
}

export const updateBrandStatus = async ({
  marcaId,
  status,
}: Props) => {
  try {
    await prisma.marca.update({
      where: { id: marcaId },
      data: {
        activo: status,
      },
    });

    return {
      ok: true,
      message: status
        ? "Marca activada correctamente"
        : "Marca desactivada correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el estado de la marca",
    };
  }
};