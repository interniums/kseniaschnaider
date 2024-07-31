// @ts-nocheck
import {
  DoubleArrowRightIcon,
  DoubleArrowLeftIcon,
  HomeIcon,
  PlusCircledIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { Separator } from './ui/separator'
import { Label } from './ui/label'

export default function AdminNav() {
  const [resize, setResize] = useState(false)

  return (
    <main
      className={
        resize
          ? 'absolute left-0 h-screen w-44 bg-white transition-all ease-in-out'
          : 'absolute left-0 h-screen w-12 bg-white transition-all ease-in-out'
      }
    >
      <div className="border shadow-md h-full w-full py-3">
        <header className="w-full grid mb-6">
          <div
            onClick={() => setResize(!resize)}
            className="rounded-full hover:bg-slate-200 py-2 px-2 self-center justify-self-center cursor-pointer"
          >
            {!resize ? (
              <DoubleArrowRightIcon className="size-5" />
            ) : (
              <DoubleArrowLeftIcon className="size-5" />
            )}
          </div>
          <Separator className="w-full mt-2" />
        </header>
        <main className={'w-full grid items-center justify-center mb-6'}>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <div className="flex gap-2 items-center">
              <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                <HomeIcon className="size-5 cursor-pointer" id="home" />
              </div>
              {resize ? (
                <Label
                  htmlFor="home"
                  className="transition-all ease-in-out cursor-pointer"
                >
                  Home
                </Label>
              ) : null}
            </div>
          </div>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <div className="flex gap-2 items-center">
              <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                <PlusCircledIcon className="size-5 cursor-pointer" id="plus" />
              </div>
              {resize ? (
                <Label
                  htmlFor="plus"
                  className="transition-all ease-in-out cursor-pointer"
                >
                  Add item
                </Label>
              ) : null}
            </div>
          </div>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <div className="flex gap-2 items-center">
              <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                <MagnifyingGlassIcon
                  className="size-5 cursor-pointer"
                  id="glass"
                />
              </div>
              {resize ? (
                <Label
                  htmlFor="glass"
                  className="transition-all ease-in-out cursor-pointer"
                >
                  Search
                </Label>
              ) : null}
            </div>
          </div>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <div className="flex gap-2 items-center">
              <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                <Pencil2Icon className="size-5 cursor-pointer" id="edit" />
              </div>
              {resize ? (
                <Label
                  htmlFor="edit"
                  className="transition-all ease-in-out cursor-pointer"
                >
                  Edit items
                </Label>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </main>
  )
}
