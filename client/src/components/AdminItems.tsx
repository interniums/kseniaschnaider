// @ts-nocheck

import { Outlet, useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { useEffect, useState } from 'react'
import { getItems } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import AdminTable from './AdminTable'
import { Label } from './ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import axios from 'axios'
import { CheckIcon, ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'

export default function AdminItems() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [lodaingData, setLoadingData] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const [checkedPositions, setCheckedPositions] = useState([])

  const [sale, setSale] = useState(false)
  const [active, setActive] = useState(false)
  const [hide, setHide] = useState(false)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    const get_items = async () => {
      setItems(await getItems())
      setLoadingData(false)
    }
    get_items()
  }, [success])

  const nav = (target) => {
    navigate(`/admin-page/item/${target}`)
  }

  const handleSubmit = () => {
    setLoading(true)
    axios
      .patch('http://localhost:3000/item/edit', {
        _id: checkedPositions,
        sale,
        active,
        discount,
        hide,
      })
      .then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          setCheckedPositions([])
          setAllChecked(false)
          setLoading(false)
          setSuccess(true)
        } else {
          setError(true)
        }
      })
  }

  return (
    <main className="absolute inset-0 pt-20 px-20 z-0 min-h-screen overflow-y-clip">
      <div
        className={
          !lodaingData
            ? 'w-full grid py-16 px-20 gap-2 overflow-y-scroll h-full'
            : 'w-full grid py-16 px-20 gap-2 h-full overflow-y-hidden'
        }
      >
        {!lodaingData ? (
          <>
            <div className="pl-4 flex justify-between w-full">
              <div className="flex items-center justify-center gap-8">
                <Checkbox
                  className="size-6"
                  checked={allChecked}
                  onCheckedChange={() => setAllChecked(!allChecked)}
                />
                <Label>Check all</Label>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="px-10 py-0"
                      variant={'outline'}
                      onClick={() => setSuccess(false)}
                    >
                      Edit chosen
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {!loading && !success ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Edit item(s)</DialogTitle>
                          <DialogDescription>
                            Виберіть параметри для зміни позицій, глибші зміни
                            можливі на окремій сторінці кожної позиції.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 grid gap-6">
                          <div className="flex gap-2 items-center">
                            <Checkbox
                              className="size-6"
                              onCheckedChange={() => setSale(!sale)}
                              checked={sale}
                            />
                            <Label>Додати до розпродажу</Label>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Checkbox
                              checked={hide}
                              onCheckedChange={() => setHide(!hide)}
                              className="size-6"
                            />
                            <Label>Приховати позицію</Label>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Checkbox
                              checked={active}
                              onCheckedChange={() => setActive(!active)}
                              className="size-6"
                            />
                            <Label>Відновити позицію</Label>
                          </div>
                          <div className="flex gap-4 items-end justify-start">
                            <div className="grid gap-2 w-full">
                              <Label>Додати знижку</Label>
                              <p className="text-sm">
                                Введіть розмір знижки у гривнях
                              </p>
                              <Input
                                type="number"
                                placeholder="введіть розмір знижки у гривнях"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                min={0}
                              />
                            </div>
                          </div>
                          <Button type="button" onClick={handleSubmit}>
                            SUBMIT
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        {success ? (
                          <div className="py-8">
                            <h1 className="text-2xl text-center">
                              Items successfully updated!
                            </h1>
                            <div className="w-full flex items-center justify-center">
                              <CheckIcon className="size-96" />
                            </div>
                          </div>
                        ) : (
                          <div className="py-8">
                            <h1 className="text-3xl text-center mb-20">
                              Loading...
                            </h1>
                            <div className="w-full flex items-center justify-center">
                              <ReloadIcon className="animate-spin size-48" />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              {!loading ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Collection</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Sale</TableHead>
                      <TableHead>Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items?.map((item) => (
                      <AdminTable
                        item={item}
                        key={item._id}
                        nav={nav}
                        allChecked={allChecked}
                        checkedPositions={checkedPositions}
                        setCheckedPositions={setCheckedPositions}
                      />
                    ))}
                  </TableBody>
                </Table>
              ) : null}
            </div>
          </>
        ) : (
          <div className="grid items-start justify-center">
            <h1 className="text-4xl text-center">Loading...</h1>
            <ReloadIcon className="size-40 animate-spin" />
          </div>
        )}
      </div>
    </main>
  )
}
