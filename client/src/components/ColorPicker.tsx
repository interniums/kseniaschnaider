// @ts-nocheck
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

export default function ColorPicker({ color, setColor, setColorInputs }) {
  const [colorName, setColorName] = useState('')
  const [colorRgb, setColorRgb] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorRGB, setErrorRGB] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    errorName || errorRGB
      ? toast({
          title: 'Поле не має бути пустим',
          description: 'Заповніть всі поля.',
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
    setColor((prev) => ({ ...prev, [colorName]: colorRgb }))
    setSuccess(true)
  }

  const handleDelete = () => {
    // console.log(colorRgb)
    // console.log(color)
    // console.log(Object.values(color)[0])
    for (let i = 0; i < color.length; i++) {
      if (Object.values(color)[i] == colorRgb) {
        const newColor = { ...color }
        console.log(color)
        delete newColor[i]
        setColor((prev) => ({ newColor }))
        // setColorInputs((prev) => ({ ...prev }))
      }
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <div
          className="relative w-full rounded-md"
          style={{ outline: errorName ? '2px solid red' : 'none' }}
        >
          <Input
            disabled={success ? true : false}
            type="text"
            id="color"
            onChange={(e) => {
              setColorName(e.target.value)
            }}
            onFocus={() => setErrorName(false)}
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
            Submit
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
