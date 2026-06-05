import { getUserProfile } from '@/actions/shop/address/getUserProfile'
import { auth } from '@/auth'
import React from 'react'
import ProfileForm from './ui/ProfileForm'

const PerfilPage = async () => {

  const session = await auth()
  const email = session?.user?.email ?? ""


  const resProfile = await getUserProfile(email)



  if (!resProfile.ok || !resProfile.profile) {
    return (
      <div className='flex items-center justify-center'>
        <h3 className='text-red-500'>
          {"Perfil no encontrado"}
        </h3>
      </div>
    )
  }
  // if(!resProfile.profile){
  //   return (
  //     <div>

  //     </div>
  //   )
  // }


  return (
    <div>
      <h3 className='text-2xl font-medium'>Perfil del usuario</h3>
      <p className='leading-relaxed text-sm'>
        Aquí puedes editar tus datos personales y mantener tu información actualizada.
      </p>
      <div>
        <ProfileForm profile={resProfile.profile} />
      </div>
    </div>
  )
}

export default PerfilPage