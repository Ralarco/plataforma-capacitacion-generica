import React from 'react'

function MyProfile( { user } ) {
  return (
    <main className="flex flex-col md:flex-row gap-4 bg-slate-50 p-6 rounded-md shadow-md m-3 h-fit w-full">
      <div>
        {user?.profileimageurl && <img src={user.profileimageurl} alt="Foto de perfil" className="rounded-full w-24 h-24 mt-4 " />}
      </div>

      <div className='my-auto ml-5'>
        <h1 className="text-xl font-bold">{user?.fullname}</h1>
        <p>Email: {user?.email}</p>
        <p>Id: {user?.id}</p>
      </div>
    </main>
  )
}

export default MyProfile
