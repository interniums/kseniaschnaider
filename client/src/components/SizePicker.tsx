// @ts-nocheck
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export default function SizePicker({ size, setValue }) {
  return (
    <>
      <Label htmlFor="sizes" className="text-xl">
        Виберіть розміри виробу.
      </Label>
      <div id="sizes" className="grid grid-flow-col items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="xxs">XXS</Label>
          <Checkbox
            id="xxs"
            className="size-5"
            checked={size.xxs}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xxs: !size.xxs,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="xs">XS</Label>
          <Checkbox
            id="xs"
            className="size-5"
            defaultChecked
            checked={size.xs}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xs: !size.xs,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="s">S</Label>
          <Checkbox
            id="s"
            className="size-5"
            defaultChecked
            checked={size.s}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                s: !size.s,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="m">M</Label>
          <Checkbox
            id="m"
            className="size-5"
            defaultChecked
            checked={size.m}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                m: !size.m,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="l">L</Label>
          <Checkbox
            id="l"
            className="size-5"
            defaultChecked
            checked={size.l}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                l: !size.l,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="xl">XL</Label>
          <Checkbox
            id="xl"
            className="size-5"
            defaultChecked
            checked={size.xl}
            onCheckedChange={() => {
              setValue((prev) => ({
                ...prev,
                xl: !size.xl,
              }))
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="one size">ONE SIZE</Label>
          <Checkbox
            id="one size"
            className="size-5"
            defaultChecked
            checked={size.oneSize}
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
