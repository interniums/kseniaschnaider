// @ts-nocheck
import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import LinkInput from './LinkInput'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Checkbox } from './ui/checkbox'
import { PlusIcon } from '@radix-ui/react-icons'
import SizePicker from './SizePicker'
import ColorPicker from './ColorPicker'
import FormInput from './FormInput'
import { collections } from '@/lib/utils'
import { Toaster } from './ui/toaster'
import { useToast } from './ui/use-toast'
import { SelectPortal, SelectViewport } from '@radix-ui/react-select'

export default function AdminForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [material, setMaterial] = useState('')
  const [cost, setCost] = useState(0)
  const [collection, setCollection] = useState('')
  const [height, setHeight] = useState(false)
  const [gender, setGender] = useState('Унісекс')
  const [color, setColor] = useState([])
  const [size, setSize] = useState({
    xxs: true,
    xs: true,
    s: true,
    m: true,
    l: true,
    xl: true,
    oneSize: false,
  })
  const [colorInputs, setColorInputs] = useState([0])
  const [error, setError] = useState({
    name: false,
    description: false,
    material: false,
    cost: false,
    collection: false,
    color: false,
  })
  const { toast } = useToast()

  const addColorInput = () => {
    setColorInputs([...colorInputs, colorInputs.length])
  }

  console.log(color)

  const validateForm = () => {
    if (!name.length) return setError((prev) => ({ ...prev, name: true }))
    if (!description.length)
      return setError((prev) => ({ ...prev, description: true }))
    if (!material.length)
      return setError((prev) => ({ ...prev, material: true }))
    if (cost == 0) return setError((prev) => ({ ...prev, cost: true }))
    if (!collection.length)
      return setError((prev) => ({ ...prev, collection: true }))
    if (!Object(color).length)
      return setError((prev) => ({ ...prev, color: true }))
  }

  useEffect(() => {
    if (error.name) {
      toast({
        title: 'Введіть назву виробу.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
    if (error.description) {
      toast({
        title: 'Додайте опис виробу.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
    if (error.cost) {
      toast({
        title: 'Додайте ціну виробу.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
    if (error.material) {
      toast({
        title: 'Опишіть матеріал виробу.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
    if (error.collection) {
      toast({
        title: 'Визначте колецію виробу.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
  }, [error])

  return (
    <div className="w-full rounded-md border max shadow-md py-8 px-8">
      <Toaster />
      <h1 className="text-xl font-bold mb-6">
        Заповніть поля, щоб створити нову позицію.
      </h1>
      <form
        style={{ gridTemplateColumns: '1.15fr 1fr' }}
        className="grid grid-flow-col gap-20"
      >
        <div className="leftSide grid gap-4">
          <div className="w-full grid gap-4">
            <FormInput
              setValue={setName}
              placeholder={'введіть назву позиції'}
              label={'Назва позиції.'}
              id={'name'}
              type={'text'}
              error={error}
              setError={setError}
            />
          </div>
          <div className="w-full grid gap-4">
            <Label htmlFor="description" className="text-xl">
              Опис пизиції.
            </Label>
            <Textarea
              required
              id="description"
              className="resize-none"
              placeholder={
                error.description ? 'заповніть поле' : 'опишіть позциію'
              }
              onChange={(e) => setDescription(e.target.value)}
              style={{ outline: error.description ? '2px solid red' : 'none' }}
              onInput={() => {
                setError((prev) => ({ ...prev, description: false }))
              }}
            />
          </div>
          <div className="w-full grid gap-4">
            <FormInput
              setValue={setMaterial}
              placeholder={'введіть матеріал'}
              label={'Матеріал виробу.'}
              id={'material'}
              type={'text'}
              error={error}
              setError={setError}
            />
          </div>
          <div className="w-full grid gap-4">
            <FormInput
              setValue={setCost}
              placeholder={'введіть ціну в гривнях'}
              label={'Ціна в гривнях.'}
              id={'cost'}
              type={'number'}
              error={error}
              setError={setError}
            />
          </div>
          <div className="w-full grid gap-4">
            <Label htmlFor="collection" className="text-xl">
              Виберіть колецію.
            </Label>
            <div id="collection">
              <div
                className="rounded-md"
                style={{ outline: error.collection ? '2px solid red' : 'none' }}
                onFocus={() =>
                  setError((prev) => ({ ...prev, collection: false }))
                }
              >
                <Select onValueChange={setCollection}>
                  <SelectTrigger>
                    <SelectValue placeholder="виберіть колецію" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-xs mt-4 ml-2 text-slate-800 underline cursor-pointer">
                  Додати колецію?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightSite flex flex-col gap-12">
          <div className="w-full grid gap-6">
            <SizePicker setValue={setSize} size={size} />
          </div>
          <div className="w-full grid gap-6">
            <Label htmlFor="height" className="text-xl">
              Градація виробу по зросту.
            </Label>
            <div id="height" className="grid grid-flow-col items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="yes">Так</Label>
                <Checkbox
                  onSelect={(e) => setHeight(e.target.value)}
                  id="yes"
                  className="size-5"
                  checked={height}
                  onCheckedChange={(e) => setHeight(true)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="no">Ні</Label>
                <Checkbox
                  id="no"
                  className="size-5"
                  checked={!height}
                  onCheckedChange={(e) => setHeight(false)}
                />
              </div>
            </div>
          </div>
          <div className="w-full grid gap-6">
            <Label htmlFor="gender" className="text-xl">
              Гендер виробу.
            </Label>
            <div id="gender" className="grid grid-flow-col items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="male">Чоловічий</Label>
                <Checkbox
                  id="male"
                  className="size-5"
                  checked={gender === 'Чоловічий' ? true : false}
                  onCheckedChange={() => setGender('Чоловічий')}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="women">Жіночий</Label>
                <Checkbox
                  id="women"
                  className="size-5"
                  checked={gender === 'Жіночий' ? true : false}
                  onCheckedChange={() => setGender('Жіночий')}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="unisex">Унісекс</Label>
                <Checkbox
                  id="unisex"
                  className="size-5"
                  checked={gender === 'Унісекс' ? true : false}
                  onCheckedChange={() => setGender('Унісекс')}
                />
              </div>
            </div>
          </div>
          <div className="w-full grid gap-6">
            <Label htmlFor="color" className="text-xl">
              Виберіть колір чи кольори виробу.
            </Label>
            <p>
              Введіть назву кольору та колір в палітрі. Ці данні будуть
              відображатись на сторінці виробу.
            </p>
            <div className="grid gap-4">
              {colorInputs.map((item) => (
                <ColorPicker
                  key={item}
                  color={color}
                  setColor={setColor}
                  colorInputs={colorInputs}
                  setColorInputs={setColorInputs}
                  item={item}
                  error={error.color}
                  setError={setError}
                />
              ))}
            </div>
            <Button
              onClick={() => addColorInput()}
              type="button"
              className="bg-slate-100 hover:bg-slate-200"
            >
              <PlusIcon className="size-6 text-black" />
            </Button>
          </div>
        </div>
      </form>
      <div className="w-full flex items-center justify-end mt-12">
        <Button
          type="button"
          className="bg-slate-200 text-black py-6 px-8 text-xl hover:bg-slate-300"
          onClick={validateForm}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
