// @ts-nocheck
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ReloadIcon } from '@radix-ui/react-icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Input } from './ui/input'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import { Toast } from './ui/toast'
import { Toaster } from './ui/toaster'
import { getCategories, getCollections, getSales } from '@/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'

export default function ItemInfoComponent({ item, value, name, updateData, setUpdateData, variant, id, type }) {
  const { toast } = useToast()
  const [edit, setEdit] = useState(false)
  const [itemValue, setItemValue] = useState(value)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [item_collection, setItemCollection] = useState([])
  const [categories, setCategories] = useState([])
  const [sales, setSales] = useState([])
  const [collectionName, setCollectionName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [saleName, setSaleName] = useState('')

  const getCollection = async () => {
    const collection = item_collection.find((x) => x._id === item.item_collection)
    setCollectionName(collection?.name)
    setLoading(false)
  }

  const getCategory = async () => {
    const category = categories.find((x) => x._id === item.category)
    setCategoryName(category?.name + ' - ' + category?.gender)
    setLoading(false)
  }

  const getSale = async () => {
    const sale = sales.find((x) => x._id === item.sale_name)
    setSaleName(sale?.name)
    setLoading(false)
  }

  const pushChange = () => {
    setLoading(true)
    let res
    axios
      .patch(`http://localhost:3000/item/edit/${item?._id}`, {
        [name]: itemValue,
      })
      .then((response) => {
        res = response.status
        if (res !== 200) {
          setError(true)
        }
        console.log(response.data)
        setError(false)
        setSuccess(true)
        setEdit(false)
        setUpdateData(!updateData)
      })
  }

  useEffect(() => {
    const addToast = () => {
      toast({
        title: 'Item successfully edited',
        description:
          variant !== 'size' && variant !== 'count' && variant !== 'color' && variant !== 'sale_name'
            ? `New item ${name}: ${itemValue}`
            : 'Item updated',
      })
    }
    addToast()
  }, [success])

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      name == 'item_collection' ? setItemCollection(await getCollections()) : null
      name == 'category' ? setCategories(await getCategories()) : null
      name == 'sale_name' ? setSales(await getSales()) : null
    }
    setLoading(false)
    getData()
  }, [success, item])

  useEffect(() => {
    if (
      (variant == 'select-col' && item_collection.length > 1) ||
      (variant == 'select-cat' && categories.length > 1) ||
      (variant == 'sale_name' && sales.length > 1)
    ) {
      getCollection()
      getCategory()
      getSale()
    } else {
      setLoading(false)
    }
  }, [item_collection, categories, sales])

  return (
    <div className="w-full flex items-center justify-center">
      {success && <Toaster />}
      <Accordion collapsible className="w-1/2">
        <AccordionItem value={value.toString()}>
          <AccordionTrigger>
            {name == 'size' && variant == 'count' ? 'in_stock'.toUpperCase() : name.toUpperCase()}
          </AccordionTrigger>
          <AccordionContent className="flex items-center justify-between">
            {variant == 'select-col' || variant == 'select-cat' ? (
              <>
                {!edit ? (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg">{variant == 'select-col' ? collectionName : categoryName}</p>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="w-full flex gap-16 py-2 px-4">
                    <Select disabled={loading ? true : false} className="w-full" onValueChange={setItemValue}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={variant == 'select-col' ? collectionName : categoryName} />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup className="w-full">
                          <SelectItem value="без колеції">без колеції</SelectItem>
                          {variant == 'select-col'
                            ? item_collection.map((item, i) => (
                                <SelectItem key={i} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ))
                            : categories.map((category, i) => (
                                <SelectItem key={i} value={category._id}>
                                  {category.name + ' - ' + category.gender}
                                </SelectItem>
                              ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button
                      className="w-28"
                      variant={'outline'}
                      onClick={() => pushChange()}
                      disabled={loading ? true : false}
                    >
                      {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                    </Button>
                  </div>
                )}
              </>
            ) : null}
            {variant == 'sale_name' ? (
              <>
                {!edit ? (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg">{saleName}</p>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="w-full flex gap-16 py-2 px-4">
                    <Select disabled={loading ? true : false} className="w-full" onValueChange={setItemValue}>
                      <SelectTrigger className="w-full" disabled={loading ? true : false}>
                        <SelectValue placeholder={saleName} />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup className="w-full">
                          {sales?.map((item, i) => (
                            <SelectItem key={i} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button
                      className="w-28"
                      variant={'outline'}
                      onClick={() => pushChange()}
                      disabled={loading ? true : false}
                    >
                      {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                    </Button>
                  </div>
                )}
              </>
            ) : null}
            {variant == 'input' ? (
              <>
                {!edit ? (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg">{itemValue}</p>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <Input
                      value={itemValue}
                      placeholder="change item"
                      onChange={(e) => setItemValue(e.target.value)}
                      className="w-2/3"
                      disabled={loading ? true : false}
                      type={type == 'number' ? 'number' : 'text'}
                    />
                    <Button
                      className="w-28"
                      variant={'outline'}
                      onClick={() => pushChange()}
                      disabled={loading ? true : false}
                    >
                      {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                    </Button>
                  </div>
                )}
              </>
            ) : null}
            {variant == 'gender' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <p className="text-lg">{itemValue}</p>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Жіночий</Label>
                        <Checkbox
                          className="size-5"
                          value={'Жіночий'}
                          checked={itemValue == 'Жіночий' ? true : false}
                          onCheckedChange={(e) => setItemValue('Жіночий')}
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Чоловічий</Label>
                        <Checkbox
                          className="size-5"
                          value={'Чоловічий'}
                          checked={itemValue == 'Чоловічий' ? true : false}
                          onCheckedChange={(e) => setItemValue('Чоловічий')}
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Унісекс</Label>
                        <Checkbox
                          className="size-5"
                          value={'Унісекс'}
                          checked={itemValue == 'Унісекс' ? true : false}
                          onCheckedChange={(e) => setItemValue('Унісекс')}
                        />
                      </div>
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'carry_over' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg">
                      {itemValue == true ? (
                        <span className="text-green-400 font-bold">true</span>
                      ) : (
                        <span className="text-red-500 font-bold">false</span>
                      )}
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Yes</Label>
                        <Checkbox
                          className="size-5"
                          value={true}
                          checked={itemValue == true ? true : false}
                          onCheckedChange={() => setItemValue(true)}
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>No</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue == true ? false : true}
                          onCheckedChange={() => setItemValue(false)}
                        />
                      </div>
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'height' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg">
                      {itemValue == true ? (
                        <span className="text-green-400 font-bold">true</span>
                      ) : (
                        <span className="text-red-500 font-bold">false</span>
                      )}
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Yes</Label>
                        <Checkbox
                          className="size-5"
                          value={true}
                          checked={itemValue == true ? true : false}
                          onCheckedChange={() => setItemValue(true)}
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>No</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue == true ? false : true}
                          onCheckedChange={() => setItemValue(false)}
                        />
                      </div>
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'recycled' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg">
                      {itemValue == true ? (
                        <span className="text-green-400 font-bold">true</span>
                      ) : (
                        <span className="text-red-500 font-bold">false</span>
                      )}
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Yes</Label>
                        <Checkbox
                          className="size-5"
                          value={true}
                          checked={itemValue == true ? true : false}
                          onCheckedChange={() => setItemValue(true)}
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>No</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue == true ? false : true}
                          onCheckedChange={() => setItemValue(false)}
                        />
                      </div>
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'active' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg">
                      {itemValue == true ? (
                        <span className="text-green-400 font-bold">true</span>
                      ) : (
                        <span className="text-red-500 font-bold">false</span>
                      )}
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <div className="flex gap-2 items-center justify-center">
                        <Label>Yes</Label>
                        <Checkbox
                          className="size-5"
                          value={true}
                          checked={itemValue == true ? true : false}
                          onCheckedChange={() => setItemValue(true)}
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>No</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue == true ? false : true}
                          onCheckedChange={() => setItemValue(false)}
                        />
                      </div>
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'size' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg grid grid-cols-4">
                      <div>
                        xxs:{' '}
                        {itemValue.xxs.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                      <div>
                        xs:{' '}
                        {itemValue.xs.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                      <div>
                        s:{' '}
                        {itemValue.s.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                      <div>
                        m:{' '}
                        {itemValue.m.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                      <div>
                        l:{' '}
                        {itemValue.l.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                      <div>
                        xl:{' '}
                        {itemValue.xl.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                      <div>
                        oneSize:{' '}
                        {itemValue.oneSize.available == true ? (
                          <span className="text-green-400 font-bold">true</span>
                        ) : (
                          <span className="text-red-500 font-bold">false</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <div className="flex gap-2 items-center justify-center">
                        <Label>xxs</Label>
                        <Checkbox
                          className="size-5"
                          checked={itemValue.xxs.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              xxs: {
                                ...prev.xxs,
                                available: !itemValue.xxs.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>xs</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue.xs.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              xs: {
                                ...prev.xs,
                                available: !itemValue.xs.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>s</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue.s.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              s: {
                                ...prev.s,
                                available: !itemValue.s.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>m</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue.m.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              m: {
                                ...prev.m,
                                available: !itemValue.m.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>l</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue.l.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              l: {
                                ...prev.l,
                                available: !itemValue.l.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>xl</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue.xl.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              xl: {
                                ...prev.xl,
                                available: !itemValue.xl.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <Label>oneSize</Label>
                        <Checkbox
                          className="size-5"
                          value={false}
                          checked={itemValue.oneSize.available == true ? true : false}
                          onCheckedChange={() =>
                            setItemValue((prev) => ({
                              ...prev,
                              oneSize: {
                                ...prev.oneSize,
                                available: !itemValue.oneSize.available,
                              },
                            }))
                          }
                        />
                      </div>
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'count' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg grid grid-cols-4">
                      <div>
                        xxs: <span className="font-bold">{itemValue.xxs.in_stock}</span>
                      </div>
                      <div>
                        xs: <span className="font-bold">{itemValue.xs.in_stock}</span>
                      </div>
                      <div>
                        s: <span className="font-bold">{itemValue.s.in_stock}</span>
                      </div>
                      <div>
                        m: <span className="font-bold">{itemValue.m.in_stock}</span>
                      </div>
                      <div>
                        l: <span className="font-bold">{itemValue.l.in_stock}</span>
                      </div>
                      <div>
                        xl: <span className="font-bold">{itemValue.xl.in_stock}</span>
                      </div>
                      <div>
                        oneSize: <span className="font-bold">{itemValue.oneSize.in_stock}</span>
                      </div>
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full grid gap-4 items-center justify-between w-full py-2 px-6">
                    <div className="grid grid-cols-4 items-center justify-between gap-4 w-full">
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">xxs</Label>
                        <Input
                          type="number"
                          value={itemValue.xxs.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              xxs: {
                                ...prev.xxs,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">xs</Label>
                        <Input
                          type="number"
                          value={itemValue.xs.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              xs: {
                                ...prev.xs,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">s</Label>
                        <Input
                          type="number"
                          value={itemValue.s.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              s: {
                                ...prev.s,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">m</Label>
                        <Input
                          type="number"
                          value={itemValue.m.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              m: {
                                ...prev.m,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">l</Label>
                        <Input
                          type="number"
                          value={itemValue.l.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              l: {
                                ...prev.l,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">xl</Label>
                        <Input
                          type="number"
                          value={itemValue.xl.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              xl: {
                                ...prev.xl,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2 items-center justify-center">
                        <Label className="text-lg">oneSize</Label>
                        <Input
                          type="number"
                          value={itemValue.oneSize.in_stock}
                          onChange={(e) =>
                            setItemValue((prev) => ({
                              ...prev,
                              oneSize: {
                                ...prev.oneSize,
                                in_stock: e.target.value.toString(),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      variant={'outline'}
                      onClick={() => pushChange()}
                      disabled={loading ? true : false}
                    >
                      {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
            {variant == 'color' ? (
              <div className="h-full flex items-center justify-between w-full">
                {!edit ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-lg flex items-center justify-center gap-6">
                      Color: {itemValue.name}
                      <div style={{ backgroundColor: itemValue.rgb }} className={`w-8 h-8 border rounded-md`}></div>
                    </div>
                    <Button
                      variant={'outline'}
                      className="py-2 px-14"
                      onClick={() => {
                        setEdit(!edit)
                        setSuccess(false)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="h-full py-2 px-4 flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                      <Input
                        type="text"
                        value={itemValue.name}
                        onChange={(e) =>
                          setItemValue((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="color"
                        value={itemValue.rgb}
                        onChange={(e) =>
                          setItemValue((prev) => ({
                            ...prev,
                            rgb: e.target.value,
                          }))
                        }
                      />
                      <Button
                        className="w-28"
                        variant={'outline'}
                        onClick={() => pushChange()}
                        disabled={loading ? true : false}
                      >
                        {!loading ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
