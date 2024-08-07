// @ts-nocheck
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export default function SizePicker({ size, setValue }) {
  return (
    <>
      <Label htmlFor="sizes" className="">
        Виберіть розміри виробу.
      </Label>
      <div id="sizes" className="grid grid-flow-col items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="xxs" className="text-xs">
            XXS
          </Label>
          <Checkbox
            id="xxs"
            className="size-5"
            checked={size[0].xxs}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xxs: !size.xxs,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="xs" className="text-xs">
            XS
          </Label>
          <Checkbox
            id="xs"
            className="size-5"
            defaultChecked
            checked={size[1].xs}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xs: !size.xs,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="s" className="text-xs">
            S
          </Label>
          <Checkbox
            id="s"
            className="size-5"
            defaultChecked
            checked={size[2].s}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                s: !size.s,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="m" className="text-xs">
            M
          </Label>
          <Checkbox
            id="m"
            className="size-5"
            defaultChecked
            checked={size[3].m}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                m: !size.m,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="l" className="text-xs">
            L
          </Label>
          <Checkbox
            id="l"
            className="size-5"
            defaultChecked
            checked={size[4].l}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                l: !size.l,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="xl" className="text-xs">
            XL
          </Label>
          <Checkbox
            id="xl"
            className="size-5"
            defaultChecked
            checked={size[5].xl}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xl: !size.xl,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="one size" className="text-xs">
            ONE SIZE
          </Label>
          <Checkbox
            id="one size"
            className="size-5"
            defaultChecked
            checked={size[6].oneSize}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                oneSize: !size.oneSize,
              }))
            }}
          />
        </div>
      </div>
    </>
  )
}
