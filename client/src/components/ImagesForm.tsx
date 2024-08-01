// @ts-nocheck
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

export default function ImagesForm({
  images,
  setImages,
  setImagesInputs,
  imagesInputs,
  item,
  error,
  setError,
}) {
  const [imageLink, setImageLink] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorImage, setErrorImage] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    errorImage
      ? toast({
          title: 'Введіть посилання на фотографії.',
          variant: 'destructive',
        })
      : null
  }, [errorImage])

  const handleSubmit = (e) => {
    if (!imageLink.length) {
      setErrorImage(true)
      return
    }
    const newImages = images
    newImages.push(imageLink)
    setImages(newImages)
    setSuccess(true)
  }

  const handleDelete = () => {
    setImages(images.filter((image) => image !== imageLink))
    setImagesInputs(imagesInputs.filter((number) => number !== item))
  }

  return (
    <>
      <div className="flex gap-4">
        <div
          className="relative w-full rounded-md"
          style={{ outline: errorImage ? '2px solid red' : 'none' }}
        >
          <Input
            style={{ outline: error ? '2px solid red' : 'none' }}
            disabled={success ? true : false}
            type="text"
            id="image"
            placeholder="посилання на фотографію"
            onChange={(e) => {
              setImageLink(e.target.value)
            }}
            autoComplete="off"
            onFocus={() => {
              setErrorImage(false)
              setError((prev) => ({ ...prev, images: false }))
            }}
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
