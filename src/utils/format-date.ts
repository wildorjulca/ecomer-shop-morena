export const formatDate = (date: string | Date) => {

  if (!date) return ''

  const fecha = new Date(date)

  const formatted = fecha.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Capitalizar primera letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}