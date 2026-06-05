'use client'

import { getUsersListAddress } from "@/actions/shop/address/address"
import { getDepartments } from "@/actions/shop/address/getDepartments"
import { getDistritoByProvinciaId } from "@/actions/shop/address/getDistritoByProvinciaId"
import { getProvinciaByRegionId } from "@/actions/shop/address/getProvinciaByRegionId"
import { AddressUser } from "@/src/interface/checkout-payment"
import { useQuery } from "@tanstack/react-query"



export const useDepartments = () => {
    const query = useQuery({
        queryKey: ['departments'],
        queryFn: () => getDepartments(),
    })
    return query
}

export const useProvinces = (departmentId?: number) => {
    const query = useQuery({
        queryKey: ['provinces', departmentId],
        queryFn: () => getProvinciaByRegionId(departmentId ?? 0),
        enabled: !!departmentId
    })
    return query
}

export const useDistricts = (provinceId?: number) => {
    const query = useQuery({
        queryKey: ['districts', provinceId],
        queryFn: () => getDistritoByProvinciaId(provinceId ?? 0),
        enabled: !!provinceId
    })
    return query
}

export const useListAddressUser = () => {
  return useQuery<AddressUser[]>({
    queryKey: ["addressListUser"],
    queryFn: async (): Promise<AddressUser[]> => {
      const res = await fetch("/api/address")

      if (!res.ok) {
        throw new Error("Error al obtener direcciones")
      }

      return res.json()
    }
  })
}