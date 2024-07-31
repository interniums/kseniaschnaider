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
import { collections, getCategories, getCollections } from '@/lib/utils'
import { Toaster } from './ui/toaster'
import { useToast } from './ui/use-toast'
import { SelectPortal, SelectViewport } from '@radix-ui/react-select'
import ImagesForm from './ImagesForm'
import axios from 'axios'
import ItemSuccess from './ItemSuccess'
import { Navigate, redirect, useNavigate } from 'react-router-dom'

export default function AdminForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [categories, setCategories] = useState()
  const [collections, setCollections] = useState()
  const [success, setSuccess] = useState(true)
  const [loading, setLoading] = useState(false)
  const [postError, setPostError] = useState(false)

  useEffect(() => {
    const get_cat = async () => {
      setCategories(await getCategories())
    }
    get_cat()
  }, [])

  useEffect(() => {
    const get_col = async () => {
      setCollections(await getCollections())
    }
    get_col()
  }, [])

  // states
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [material, setMaterial] = useState('')
  const [cost, setCost] = useState(0)
  const [collection, setCollection] = useState('')
  const [height, setHeight] = useState(false)
  const [gender, setGender] = useState('Унісекс')
  const [color, setColor] = useState([])
  const [article, setArticle] = useState('')
  const [images, setImages] = useState([])
  const [size, setSize] = useState({
    xxs: true,
    xs: true,
    s: true,
    m: true,
    l: true,
    xl: true,
    oneSize: false,
  })
  const [category, setCategory] = useState('')
  const [doubled, setDoubled] = useState(true)

  // utils
  const [colorInputs, setColorInputs] = useState([0])
  const [imagesInputs, setImagesInputs] = useState([0])
  const [error, setError] = useState({
    name: false,
    description: false,
    material: false,
    cost: false,
    collection: false,
    color: false,
    article: false,
    images: false,
    category: false,
    doubled: false,
  })

  const addColorInput = () => {
    setColorInputs([...colorInputs, colorInputs.length])
  }

  const addImagesInput = () => {
    setImagesInputs([...imagesInputs, imagesInputs.length])
  }

  const validateForm = () => {
    if (!name.length) return setError((prev) => ({ ...prev, name: true }))
    if (!article.length) return setError((prev) => ({ ...prev, article: true }))
    if (!description.length)
      return setError((prev) => ({ ...prev, description: true }))
    if (!material.length)
      return setError((prev) => ({ ...prev, material: true }))
    if (cost == 0) return setError((prev) => ({ ...prev, cost: true }))
    if (!collection.length)
      return setError((prev) => ({ ...prev, collection: true }))
    if (!Object(color).length)
      return setError((prev) => ({ ...prev, color: true }))
    if (!images.length) return setError((prev) => ({ ...prev, images: true }))
    pushData()
    if (!category.length)
      return setError((prev) => ({ ...prev, category: true }))
    pushData()
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
    if (error.article) {
      toast({
        title: 'Введіть артикул.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
    if (error.images) {
      toast({
        title: 'Додайте фотографії.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
    if (error.category) {
      toast({
        title: 'Додайте категорію.',
        description: 'Заповніть всі поля.',
        variant: 'destructive',
      })
    }
  }, [error])

  const pushData = async () => {
    setLoading(true)
    axios
      .post('http://localhost:3000/item/add', {
        name,
        description,
        material,
        cost,
        collection,
        height,
        gender,
        color,
        article,
        size,
        images,
        doubled,
      })
      .then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          setLoading(false)
          setSuccess(true)
        } else {
          setPostError(true)
        }
      })
  }

  return (
    <main className="abosulute inset-0 py-12 px-40 flex w-full h-screen justify-center items-center">
      {success && <Navigate to="/admin-page/item-form/success" />}
      <div className="w-full rounded-md border max shadow-md py-8 px-8 overflow-y-scroll h-full">
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
                style={{
                  outline: error.description ? '2px solid red' : 'none',
                }}
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
                  style={{
                    outline: error.collection ? '2px solid red' : 'none',
                  }}
                  onFocus={() =>
                    setError((prev) => ({ ...prev, collection: false }))
                  }
                >
                  <Select onValueChange={setCollection}>
                    <SelectTrigger>
                      <SelectValue placeholder="виберіть колецію" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections?.map((item) => (
                        <SelectItem key={item._id} value={item.name}>
                          {item.name}
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
            <div className="w-full grid gap-4">
              <Label className="text-xl" htmlFor="images">
                Додайте посилання на фотографії виробу.
              </Label>
              <p>
                Додайте фотографії у порядку в якому вони мають бути розташовані
                на сайті.
              </p>
              <div className="grid gap-4">
                {imagesInputs.map((item) => (
                  <ImagesForm
                    key={item}
                    images={images}
                    setImages={setImages}
                    imagesInputs={imagesInputs}
                    setImagesInputs={setImagesInputs}
                    item={item}
                    error={error.images}
                    setError={setError}
                  />
                ))}
                <Button
                  onClick={() => addImagesInput()}
                  type="button"
                  className="bg-slate-100 hover:bg-slate-200"
                >
                  <PlusIcon className="size-6 text-black" />
                </Button>
              </div>
            </div>
          </div>
          <div className="rightSite flex flex-col gap-4">
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
            <div className="w-full grid gap-4">
              <Label className="text-xl" htmlFor="doubled">
                Виріб в декількох кольорах?
              </Label>
              <div id="doubled" className="grid grid-flow-col items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="yap">Так</Label>
                  <Checkbox
                    id="yap"
                    className="size-5"
                    onCheckedChange={(e) => {
                      setDoubled(!doubled)
                    }}
                    checked={doubled ? false : true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="nope">Ні</Label>
                  <Checkbox
                    id="nope"
                    className="size-5"
                    onCheckedChange={(e) => {
                      setDoubled(!doubled)
                    }}
                    checked={!doubled ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="w-full grid gap-4">
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
            <div className="w-full grid gap-4">
              <FormInput
                setValue={setArticle}
                placeholder={'введіть артикул'}
                label={'Артикул.'}
                id={'article'}
                type={'text'}
                error={error}
                setError={setError}
              />
            </div>
            <div className="w-full grid gap-4">
              <Label className="text-xl">Виберіть категорію виробу.</Label>
              <div
                style={{ outline: error.category ? '2px solid red' : 'none' }}
                className="rounded-md"
                onFocus={() =>
                  setError((prev) => ({ ...prev, category: false }))
                }
              >
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="виберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name} - {item.gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
    </main>
  )
}
