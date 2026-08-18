import { auth } from "@/auth"
import { prisma } from "@/libs"

export async function GET() {
  const session = await auth()

  const userId = Number(session?.user?.id)

  if (!userId) {
    return Response.json({ error: "No auth" }, { status: 401 })
  }

  const addressUser = await prisma.direccion_usuario.findMany({
    where: { usuario_id: userId },
    include: {
      distrito: {
        include: {
          provincia: {
            include: {
              departamento: true
            }
          }
        }
      }
    }
  })

  return Response.json(
    addressUser.map((item) => ({
      id: item.id,
      nombres: item.nombres,
      apellidos: item.apellidos,
      telefono: item.telefono,
      direccion: item.direccion,
      distrito: item.distrito.nombre,
      provincia: item.distrito.provincia.nombre,
      departamento: item.distrito.provincia.departamento.nombre,

      distrito_id: item.distrito.id,
      provincia_id: item.distrito.provinciaId,
      departamento_id: item.distrito.provincia.departamentoId,
      es_principal: item.es_principal,
    }))
  )
}