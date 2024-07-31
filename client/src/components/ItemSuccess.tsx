// @ts-nocheck

import { Button } from './ui/button'

export default function ItemSuccess() {
  return (
    <main className="abosulute inset-0 py-12 px-40 flex w-full h-screen justify-center items-center">
      <div className="w-full grid rounded-md border max shadow-md py-8 px-8 h-full">
        <h1 className="text-xl font-bold">Виріб успішно доданий.</h1>
        <div></div>
        <div className="w-full flex items-center justify-end">
          <Button className="bg-slate-100 hover:bg-slate-200 text-black py-3 px-8 text-xl">
            Back
          </Button>
        </div>
      </div>
    </main>
  )
}
