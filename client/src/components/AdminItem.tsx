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

export default function AdminItem() {
  let userId = useParams()
  const [item, setItem] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [updateData, setUpdateData] = useState(false)

  useEffect(() => {
    const get_item = async () => {
      setItem(await getItem(userId.id))
      setLoading(false)
    }
    get_item()
  }, [updateData])

  return (
    <main className="absolute inset-0 pt-20 pl-28 z-0 min-h-screen overflow-y-clip">
      {loading ? (
        <div className="grid items-start justify-center">
          <h1 className="text-4xl text-center">Loading...</h1>
          <ReloadIcon className="size-40 animate-spin" />
        </div>
      ) : (
        <div className="py-10 overflow-y-auto h-full w-full">
          <div className="flex gap-10 items-center justify-center">
            {item?.item.img?.map((item, i) => (
              <div key={item}>
                <p className="text-center">Photo: {i + 1}</p>
                <img src={item} alt="img" className="h-96 object-contain" />
              </div>
            ))}
          </div>
          <div className="grid gap-6 mt-10">
            {/* <ItemInfoComponent
              item={item}
              value={item.item.name}
              name={'name'}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.item.description}
              name={'description'}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.item.material}
              name={'material'}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <ItemInfoComponent
              item={item}
              value={item.item.cost_uah}
              name={'cost_uah'}
              updateData={updateData}
              setUpdateData={setUpdateData}
            /> */}
            <ItemInfoComponent
              item={item.item}
              value={item.item.item_collection}
              name={'item_collection'}
              variant="select-col"
              id={userId}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <div>
              <Label>Category</Label>
              <div>
                <p>{item.item.categoryName}</p>
              </div>
            </div>
            <div>
              <Label>Gender</Label>
              <div>
                <p>{item.item.gender}</p>
              </div>
            </div>
            <div>
              <Label>Article</Label>
              <div>
                <p>{item.item.article}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
