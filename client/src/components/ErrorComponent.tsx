// @ts-nocheck

import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export default function ErrorComponent() {
  return (
    <main className="absolute inset-0 grid justify-center items-center">
      <div className="grid items-center justify-center gap-10">
        <h1 className="text-5xl">PAGE NOT FOUND 404</h1>
        <Link className="flex justify-center items-center" to="/">
          <Button variant={'outline'} className="py-4 px-20 text-xl">
            HOME
          </Button>
        </Link>
      </div>
    </main>
  )
}
