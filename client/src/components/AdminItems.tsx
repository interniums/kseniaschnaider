// @ts-nocheck

import { Outlet, useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useContext, useDeferredValue, useEffect, useState } from 'react'
import { getItems } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import AdminTable from './AdminTable'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import axios from 'axios'
import { CheckIcon, MagnifyingGlassIcon, ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import AdminContext from '@/hooks/AdminContext'

export default function AdminItems() {
  const adminData = useContext(AdminContext)
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [lodaingData, setLoadingData] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const [checkedPositions, setCheckedPositions] = useState([])
  const [filtered, setFiltered] = useState([])

  const [sale, setSale] = useState(false)
  const [hideSale, setHideSale] = useState(false)
  const [active, setActive] = useState(false)
  const [hide, setHide] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [carryOver, setCarryOver] = useState(false)
  const [hideCarryOver, setHideCarryOver] = useState(false)

  const [alphabetical, setAlphabetical] = useState(true)
  const [costical, setCostical] = useState(true)
  const [activical, setActivical] = useState(true)
  const [salycal, setSalycal] = useState(true)
  const [carrycal, setCarrycal] = useState(true)

  useEffect(() => {
    allChecked ? setCheckedPositions(items.map((item) => item._id)) : setCheckedPositions([])
  }, [allChecked])

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
        hideSale,
        active,
        discount,
        hide,
        carryOver,
        hideCarryOver,
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

  const alphaSort = (getter, order) => {
    alphabetical ? (order = 'asc') : (order = 'desc')
    const arr = items.sort(
      order === 'desc' ? (a, b) => getter(b).localeCompare(getter(a)) : (a, b) => getter(a).localeCompare(getter(b))
    )
  }

  const priceSort = () => {
    costical ? items.sort((a, b) => a.cost_uah - b.cost_uah) : items.sort((a, b) => b.cost_uah - a.cost_uah)
  }

  const activeSort = () => {
    activical ? items.sort((a, b) => a.active - b.active) : items.sort((a, b) => b.active - a.active)
  }

  const saleSort = () => {
    salycal ? items.sort((a, b) => a.sale - b.sale) : items.sort((a, b) => b.sale - a.sale)
  }

  const carrySort = () => {
    carrycal ? items.sort((a, b) => a.carry_over - b.carry_over) : items.sort((a, b) => b.carry_over - a.carry_over)
  }

  const filter = () => {
    if (!lodaingData) {
      setFiltered(
        items?.filter(
          (item) =>
            item.name?.toLowerCase().includes(adminData.input.toLowerCase()) ||
            item.article?.includes(adminData.input) ||
            item.collection_name?.toLowerCase().includes(adminData.input.toLowerCase()) ||
            item.category_name?.toLowerCase().includes(adminData.input.toLowerCase()) ||
            item.cost_uah?.toString().includes(adminData.input)
        )
      )
    }
  }
  useEffect(() => {
    filter()
  }, [adminData.input])

  return (
    <main className="absolute inset-0 pt-20 px-28 z-0 min-h-screen overflow-y-clip">
      <div
        className={
          !lodaingData
            ? 'w-full py-16 px-20 gap-2 overflow-y-auto h-full'
            : 'w-full py-16 px-20 gap-2 h-full overflow-y-hidden'
        }
      >
        {!lodaingData ? (
          <>
            <div className="pl-4 flex justify-between w-full">
              <div className="flex items-center justify-center gap-8">
                <Checkbox className="size-6" checked={allChecked} onCheckedChange={() => setAllChecked(!allChecked)} />
                <Label>Check all</Label>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="px-10 py-0" variant={'outline'} onClick={() => setSuccess(false)}>
                      Edit chosen
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {!loading && !success ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Edit item(s)</DialogTitle>
                          <DialogDescription>
                            Виберіть параметри для зміни позицій, глибші зміни можливі на окремій сторінці кожної
                            позиції.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 grid gap-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                className="size-6"
                                onCheckedChange={() => setSale(!sale)}
                                checked={sale}
                                disabled={hideSale ? true : false}
                              />
                              <Label>Додати до розпродажу</Label>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                className="size-6"
                                onCheckedChange={() => setHideSale(!hideSale)}
                                checked={hideSale}
                                disabled={sale ? true : false}
                              />
                              <Label>Видалити з розпродажу</Label>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                checked={hide}
                                onCheckedChange={() => setHide(!hide)}
                                className="size-6"
                                disabled={active ? true : false}
                              />
                              <Label>Приховати позицію</Label>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                checked={active}
                                onCheckedChange={() => setActive(!active)}
                                className="size-6"
                                disabled={hide ? true : false}
                              />
                              <Label>Відновити позицію</Label>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                checked={carryOver}
                                onCheckedChange={() => setCarryOver(!carryOver)}
                                className="size-6"
                                disabled={hideCarryOver ? true : false}
                              />
                              <Label>Додати до керіовер</Label>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                checked={hideCarryOver}
                                onCheckedChange={() => setHideCarryOver(!hideCarryOver)}
                                className="size-6"
                                disabled={carryOver ? true : false}
                              />
                              <Label>Видалити з керіовер</Label>
                            </div>
                          </div>
                          <div className="flex gap-4 items-end justify-start">
                            <div className="grid gap-2 w-full">
                              <Label>Додати знижку</Label>
                              <p className="text-sm">Введіть розмір знижки у гривнях</p>
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
                            <h1 className="text-2xl text-center">Items successfully updated!</h1>
                            <div className="w-full flex items-center justify-center">
                              <CheckIcon className="size-96" />
                            </div>
                          </div>
                        ) : (
                          <div className="py-8">
                            <h1 className="text-3xl text-center mb-20">Loading...</h1>
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
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          setAlphabetical(!alphabetical)
                          alphaSort((g) => g.name)
                        }}
                      >
                        Name
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          setAlphabetical(!alphabetical)
                          alphaSort((g) => g.collection_name)
                        }}
                      >
                        Collection
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          setCostical(!costical)
                          priceSort()
                        }}
                      >
                        Price
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          setSalycal(!salycal)
                          saleSort()
                        }}
                      >
                        Sale
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          setActivical(!activical)
                          activeSort()
                        }}
                      >
                        Active
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          setCarrycal(!carrycal)
                          carrySort()
                        }}
                      >
                        Carry Over
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length < 1
                      ? items?.map((item) => (
                          <AdminTable
                            item={item}
                            key={item._id}
                            nav={nav}
                            allChecked={allChecked}
                            setAllChecked={setAllChecked}
                            checkedPositions={checkedPositions}
                            setCheckedPositions={setCheckedPositions}
                            filtered={filtered}
                          />
                        ))
                      : filtered.map((item) => (
                          <AdminTable
                            item={item}
                            key={item._id}
                            nav={nav}
                            allChecked={allChecked}
                            setAllChecked={setAllChecked}
                            checkedPositions={checkedPositions}
                            setCheckedPositions={setCheckedPositions}
                            filtered={filtered}
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
