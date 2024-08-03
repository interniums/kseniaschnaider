// @ts-nocheck
import {
  DoubleArrowRightIcon,
  DoubleArrowLeftIcon,
  HomeIcon,
  PlusCircledIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  RowsIcon,
  FontFamilyIcon,
  RocketIcon,
  FontRomanIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Link } from 'react-router-dom'

export default function AdminNav() {
  const [resize, setResize] = useState(false)

  return (
    <div
      className={
        resize
          ? 'absolute left-0 top-0 w-44 h-full  bg-white transition-all ease-in-out z-10'
          : 'absolute left-0 top-0 w-12 h-full bg-white transition-all ease-in-out z-10'
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
        <main
          className={
            'w-full grid grid-flow-row items-center mb-6 justify-center'
          }
        >
          <div className="mb-6 flex gap-4 items-center justify-start">
            <Link to="/admin-page">
              <div className="flex gap-2 items-center">
                <div className="rounded-full hover:bg-slate-200 py-2 px-2 cursor-pointer">
                  <HomeIcon className="size-5" id="home" />
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
            </Link>
          </div>
          <div className="mb-6 flex gap-4 items-center">
            <Link to="/admin-page/item-form">
              <div className="flex gap-2 items-center">
                <div className="rounded-full hover:bg-slate-200 py-2 px-2 cursor-pointer">
                  <PlusCircledIcon className="size-5" id="plus" />
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
            </Link>
          </div>
          <div className="mb-6 flex gap-4 items-center">
            <Link to="/admin-page/item">
              <div className="flex gap-2 items-center">
                <div className="rounded-full hover:bg-slate-200 py-2 px-2 cursor-pointer">
                  <FontRomanIcon className="size-5" id="items" />
                </div>
                {resize ? (
                  <Label
                    htmlFor="items"
                    className="transition-all ease-in-out cursor-pointer"
                  >
                    All items
                  </Label>
                ) : null}
              </div>
            </Link>
          </div>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <Link to="/admin-page/category">
              <div className="flex gap-2 items-center">
                <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                  <RowsIcon className="size-5" id="glass" />
                </div>
                {resize ? (
                  <Label
                    htmlFor="glass"
                    className="transition-all ease-in-out cursor-pointer"
                  >
                    Categories
                  </Label>
                ) : null}
              </div>
            </Link>
          </div>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <Link to="/admin-page/collection">
              <div className="flex gap-2 items-center">
                <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                  <FontFamilyIcon className="size-5" id="glass" />
                </div>
                {resize ? (
                  <Label
                    htmlFor="glass"
                    className="transition-all ease-in-out cursor-pointer"
                  >
                    Collections
                  </Label>
                ) : null}
              </div>
            </Link>
          </div>
          <div className="mb-6 flex gap-4 items-center justify-start">
            <Link to="/admin-page/collection">
              <div className="flex gap-2 items-center">
                <div className="rounded-full hover:bg-slate-200 py-2 px-2">
                  <RocketIcon className="size-5" id="glass" />
                </div>
                {resize ? (
                  <Label
                    htmlFor="glass"
                    className="transition-all ease-in-out cursor-pointer"
                  >
                    Sales
                  </Label>
                ) : null}
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
