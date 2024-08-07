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
            checked={size.xxs.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xxs: {
                  ...prev.xxs,
                  available: !available,
                },
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
            checked={size.xs.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xs: {
                  ...prev.xs,
                  available: !available,
                },
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
            checked={size.xs.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                s: {
                  ...prev.s,
                  available: !available,
                },
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
            checked={size.m.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                m: {
                  ...prev.m,
                  available: !available,
                },
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
            checked={size.l.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                l: {
                  ...prev.l,
                  available: !available,
                },
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
            checked={size.xl.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xl: {
                  ...prev.xl,
                  available: !available,
                },
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
            checked={size.oneSize.available}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                oneSize: {
                  ...prev.oneSize,
                  available: !available,
                },
              }))
            }}
          />
        </div>
      </div>
    </>
  )
}
