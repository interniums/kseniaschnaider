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
import { getCategories, getCollections } from '@/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function ItemInfoComponent({ item, value, name, updateData, setUpdateData, variant, id, type }) {
  const { toast } = useToast()
  const [edit, setEdit] = useState(false)
  const [itemValue, setItemValue] = useState(value)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [item_collection, setItemCollection] = useState([])
  const [categories, setCategories] = useState([])
  const [collectionName, setCollectionName] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const getCollection = async () => {
    setLoading(true)
    axios.get(`http://localhost:3000/collection/${item.item_collection}`).then((response) => {
      setCollectionName(response.data.name)
      setLoading(false)
    })
  }

  const getCategory = async () => {
    setLoading(true)
    axios.get(`http://localhost:3000/category/${item.category}`).then((response) => {
      setCategoryName(response.data)
      setLoading(false)
    })
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
          setLoading(false)
          setError(true)
        }
        console.log(response.data)
        setError(false)
        setSuccess(true)
        setEdit(false)
        setUpdateData(!updateData)
      })
  }

  console.log(categories)

  useEffect(() => {
    const addToast = () => {
      toast({
        title: 'Item successfully edited',
        description: `New item ${name}: ${itemValue}`,
      })
    }
    addToast()
  }, [success])

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      name == 'item_collection' ? setItemCollection(await getCollections()) : null
      name == 'category' ? setCategories(await getCategories()) : null
    }
    getData()
    if (variant == 'select-cat' || variant == 'select-col') {
      getCollection()
      getCategory()
    } else {
      setLoading(false)
    }
  }, [success, item])

  return (
    <div className="w-full flex items-center justify-center">
      {success && <Toaster />}
      <Accordion collapsible className="w-1/2">
        <AccordionItem value={value}>
          <AccordionTrigger>{name.toUpperCase()}</AccordionTrigger>
          <AccordionContent className="flex items-center justify-between">
            {variant == 'select-col' || variant == 'select-cat' ? (
              <>
                {!edit ? (
                  <>
                    <p className="text-lg">
                      {variant == 'select-col' ? collectionName : categoryName.name + ' - ' + categoryName.gender}
                    </p>
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
                  </>
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
                            ? item_collection.map((collection, i) => (
                                <SelectItem key={i} value={collection._id}>
                                  {collection.name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                        <SelectGroup>
                          {variant == 'select-cat'
                            ? categories.map((category, i) => (
                                <SelectItem key={i} value={category._id}>
                                  {category.name}
                                </SelectItem>
                              ))
                            : null}
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
            ) : (
              <>
                {!edit ? (
                  <>
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
                  </>
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
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
