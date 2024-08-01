// @ts-nocheck
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

export default function ColorPicker({
  color,
  setColor,
  setColorInputs,
  colorInputs,
  item,
  error,
  setError,
}) {
  const [colorName, setColorName] = useState('')
  const [colorRgb, setColorRgb] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorRGB, setErrorRGB] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    errorName || errorRGB
      ? toast({
          title:
            'Введіть кольір чи кольори виробу, а також виберіть колір в палітрі.',
          variant: 'destructive',
        })
      : null
  }, [errorName, errorRGB])

  const handleSubmit = (e) => {
    if (!colorName.length) {
      setErrorName(true)
      return
    }
    if (!colorRgb.length) {
      setErrorRGB(true)
      return
    }
    const newColor = color
    newColor.push({ name: colorName, rgb: colorRgb })
    setColor(newColor)
    setSuccess(true)
  }

  const handleDelete = () => {
    setColor(color.filter((color) => color.name !== colorName))
    setColorInputs(colorInputs.filter((number) => number !== item))
  }

  return (
    <>
      <div className="flex gap-4">
        <div
          className="relative w-full rounded-md"
          style={{ outline: errorName || error ? '2px solid red' : 'none' }}
        >
          <Input
            disabled={success ? true : false}
            type="text"
            id="color"
            placeholder="назва кольору"
            autoComplete="off"
            onChange={(e) => {
              setColorName(e.target.value)
            }}
            onFocus={() => {
              setErrorName(false)
              setError((prev) => ({ ...prev, color: false }))
            }}
          />
          <Input
            disabled={success ? true : false}
            type="color"
            className="absolute w-1/10 top-0 right-0 p-1 cursor-pointer"
            onChange={(e) => setColorRgb(e.target.value)}
            onFocus={() => setErrorRGB(false)}
            style={{ outline: errorRGB ? '2px solid red' : 'none' }}
          />
          <Toaster />
        </div>
        {!success ? (
          <Button
            className="bg-slate-200 text-black w-24 hover:bg-slate-300"
            type="button"
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            SUBMIT
          </Button>
        ) : (
          <>
            <Button
              className="bg-slate-200 text-black w-24 hover:bg-red-300"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </>
  )
}
