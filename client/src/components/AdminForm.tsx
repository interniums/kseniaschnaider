import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import LinkInput from './LinkInput'

export default function AdminForm() {
  const [images, setImages] = useState([])
  return (
    <div className="w-full rounded-md border h-full shadow-md p-6">
      <h1 className="text-xl font-bold mb-4">
        Заповніть поля, щоб створити нову позицію.
      </h1>
      <form>
        <div className="w-1/2">
          <Label htmlFor="name">Назва позиції.</Label>
          <Input
            className="mt-2 mb-4"
            type="text"
            id="name"
            placeholder="введіть назву позиції"
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="description">Опис пизиції.</Label>
          <Textarea
            id="description"
            className="resize-none mt-2 mb-4"
            placeholder="опишіть позциію"
          />
        </div>
        <div className="w-1/2 grid">
          <p className="font-medium text-sm">
            Додайте посилання на фотографії.
          </p>
          <LinkInput />
          <Button variant="ghost" className="w=full" type="button">
            Add another one
          </Button>
        </div>
      </form>
    </div>
  )
}
