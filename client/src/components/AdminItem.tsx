// @ts-nocheck

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getItem } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Card, CardContent } from './ui/card'
import { Label } from './ui/label'
import ItemInfoComponent from './ItemInfoComponent'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Reorder } from 'framer-motion'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

export default function AdminItem() {
  const { toast } = useToast()
  let userId = useParams()
  const [item, setItem] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [updateData, setUpdateData] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  const [images, setImages] = useState([])
  const [success, setSuccess] = useState(false)
  const [loadingForm, setLoadingForm] = useState(false)
  const [open, setOpen] = useState(false)
  const [imageInput, setImageInput] = useState('')
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    if (success) {
      setOpen(false)
      const addToast = () => {
        toast({
          title: 'Item successfully edited',
        })
      }
      addToast()
    }
  }, [success])

  useEffect(() => {
    setImages(item?.img)
  }, [loading])

  useEffect(() => {
    const get_item = async () => {
      const item = await getItem(userId.id)
      setItem(item.item)
      setLoading(false)
    }
    get_item()
  }, [updateData])

  const updatePhoto = async () => {
    setLoadingForm(true)
    let res
    axios
      .patch(`http://localhost:3000/item/edit/${item._id}`, {
        img: images,
      })
      .then((response) => {
        res = response.status
        if (res !== 200) {
          setError(true)
        }
        console.log(response.data)
        setError(false)
        setUpdateData(!updateData)
        setLoadingForm(false)
        setSuccess(true)
      })
  }

  const handleDeleteImage = (item) => {
    const newArr = images.filter((x) => x !== item)
    setImages(newArr)
  }

  return (
    <main className="absolute inset-0 pl-28 z-0 min-h-screen overflow-y-clip">
      {success && <Toaster />}
      {loading ? (
        <div className="flex w-full h-full items-center justify-center">
          <div className="grid items-center justify-center">
            <h1 className="text-4xl text-center">Loading...</h1>
            <ReloadIcon className="size-40 animate-spin" />
          </div>
        </div>
      ) : (
        <div className="py-10 overflow-y-auto h-full w-full pb-20">
          <h1 className="text-center text-3xl mb-4 mt-8">{item.name.toUpperCase()}</h1>
          <div className="grid grid-flow-row gap-6 justify-center justify-items-center">
            <Carousel className="w-1/3">
              <CarouselContent>
                {item?.img.map((item, i) => (
                  <CarouselItem key={item} className="flex justify-center">
                    <div>
                      <img src={item} alt="img" className="object-contain rounded-sm pointer-events-none" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext variant={'ghost'} className="size-12" />
              <CarouselPrevious variant={'ghost'} className="size-12" />
            </Carousel>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-1/3 py-2 px-8"
                  variant={'outline'}
                  onClick={() => {
                    setOpen(!open)
                    setSuccess(false)
                  }}
                >
                  Edit photo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit photos</DialogTitle>
                  <DialogDescription>Edit item photos here</DialogDescription>
                </DialogHeader>
                <div>
                  <div className="flex items-center justify-center gap-8">
                    <Reorder.Group values={images} onReorder={setImages} className="flex gap-12" axis="x">
                      {images?.map((item, i) => (
                        <Reorder.Item className="grid gap-4 cursor-pointer" key={item} value={item}>
                          <p className="text-center">
                            Photo: <span className="font-bold">{i + 1}</span>
                          </p>
                          <img src={item} alt="img" className="object-contain rounded-sm w-56 pointer-events-none" />
                          <Button className="w-full" variant={'outline'} onClick={() => handleDeleteImage(item)}>
                            Delete
                          </Button>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </div>
                  <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                      <Button variant={'outline'} className="w-full mt-10" onClick={() => setAddOpen(!addOpen)}>
                        Add photo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add link for photo</DialogTitle>
                        <DialogDescription>Fill input with photo link</DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-10 items-center justify-center py-2 px-2">
                        <Input type="text" placeholder="photo link" onChange={(e) => setImageInput(e.target.value)} />
                        <Button
                          onClick={() => {
                            setImages((prev) => [...prev, imageInput])
                            setAddOpen(false)
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    disabled={loadingForm ? true : false}
                    variant={'outline'}
                    className="w-full mt-2"
                    onClick={updatePhoto}
                  >
                    {!loadingForm ? 'Submit' : <ReloadIcon className="animate-spin size-4" />}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-6 mt-10">
            <ItemInfoComponent
              item={item}
              value={item.name}
              name={'name'}
              updateData={updateData}
              setUpdateData={setUpdateData}
              variant={'input'}
            />
            <ItemInfoComponent
              item={item}
              value={item.size}
              name={'size'}
              variant="count"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.size}
              name={'size'}
              updateData={updateData}
              setUpdateData={setUpdateData}
              variant={'size'}
            />
            <ItemInfoComponent
              item={item}
              value={item.active}
              name={'active'}
              variant="active"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.cost_uah}
              name={'cost_uah'}
              updateData={updateData}
              setUpdateData={setUpdateData}
              type={'number'}
              variant={'input'}
            />
            <ItemInfoComponent
              item={item}
              value={item.discount}
              name={'discount'}
              id={userId}
              variant={'input'}
              updateData={updateData}
              setUpdateData={setUpdateData}
              type={'number'}
            />
            <ItemInfoComponent
              item={item}
              value={item.carry_over}
              name={'carry_over'}
              variant="carry_over"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.description}
              name={'description'}
              updateData={updateData}
              setUpdateData={setUpdateData}
              variant={'input'}
            />
            <ItemInfoComponent
              item={item}
              value={item.material}
              name={'material'}
              updateData={updateData}
              setUpdateData={setUpdateData}
              variant={'input'}
            />
            <ItemInfoComponent
              item={item}
              value={item.item_collection}
              name={'item_collection'}
              variant="select-col"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.sale_name}
              name={'sale_name'}
              variant="sale_name"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.category}
              name={'category'}
              variant="select-cat"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.gender}
              name={'gender'}
              variant="checkbox"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
              variant={'gender'}
            />
            <ItemInfoComponent
              item={item}
              value={item.article}
              name={'article'}
              id={userId}
              variant={'input'}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.height}
              name={'height'}
              variant="height"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.recycled}
              name={'recycled'}
              variant="recycled"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.color[0]}
              name={'color'}
              variant="color"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
          </div>
        </div>
      )}
    </main>
  )
}
