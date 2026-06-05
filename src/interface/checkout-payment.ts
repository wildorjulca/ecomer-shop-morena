

export type CheckoutFormInputs = {
  nombres: string
  apellidos: string
  direccion: string
  telefono: string
  departamento_id: number
  distrito_id: number
  provincia_id: number
  instrucciones?: string
  es_principal?: boolean
  selectedAddressId: number;
  orderCreated?: boolean

  editingAddressId?: number
}

export type AdressUserSave = {
  nombres: string
  apellidos: string
  direccion: string
  telefono: string
  distrito_id: number
  instrucciones?: string
  es_principal?: boolean
}
export interface AddressUser {
  id: number
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string
  distrito: string
  provincia: string
  departamento: string
  es_principal?: boolean

  distrito_id: number;
  provincia_id: number;
  departamento_id: number;
  // selectedAddressId: number
}