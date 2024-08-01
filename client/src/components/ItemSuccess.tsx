// @ts-nocheck

import { useContext } from 'react'
import { Button } from './ui/button'
import AdminContext from '@/hooks/AdminContext'
import { Link } from 'react-router-dom'

export default function ItemSuccess() {
  const adminData = useContext(AdminContext)
  return (
    <main className="abosulute inset-0 py-12 px-40 flex w-full h-screen justify-center items-center">
      <div className="w-full rounded-md border max shadow-md py-8 px-8 h-full grid">
        <h1 className="text-3xl font-bold">Виріб успішно доданий.</h1>
        <div className="w-full overflow-y-auto grid">
          <div className="w-full items-center justify-center flex">
            <div className="w-5/6 grid grid-cols-3">
              {adminData?.images.map((item, i) => (
                <div key={i}>
                  <img
                    className="object-contain"
                    src={adminData.images[i]}
                    alt="photo"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-center">{adminData?.name}</h1>
            <h2 className="text-xl text-center">{adminData?.cost} UAH</h2>
            <h2 className="text-l text-center">{adminData?.description}</h2>
          </div>
        </div>
        <div className="w-full flex items-end justify-end">
          <Link to="../">
            <Button className="bg-slate-200 hover:bg-slate-300 text-black py-6 px-12 text-2xl">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
