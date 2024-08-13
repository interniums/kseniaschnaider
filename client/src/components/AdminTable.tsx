// @ts-nocheck

import { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { TableCell, TableRow } from './ui/table'
import { getCollections } from '@/lib/utils'

export default function AdminTable({ item, nav, allChecked, checkedPositions, setCheckedPositions, setAllChecked }) {
  const [collections, setCollections] = useState([])
  const [collectionName, setCollectionName] = useState('')

  useEffect(() => {
    const getData = async () => {
      setCollections(await getCollections())
    }
    getData()
  }, [])

  useEffect(() => {
    const collection = collections.find((x) => x._id === item.item_collection)
    setCollectionName(collection?.name)
  }, [collections])

  return (
    <TableRow
      onClick={() => nav(item._id)}
      className={!item.active ? 'bg-slate-100 cursor-pointer' : 'bg-white cursor-pointer'}
    >
      <TableCell onClick={(e) => e.stopPropagation()} className="flex items-center justify-start">
        <Checkbox
          className="size-6"
          checked={checkedPositions?.includes(item._id) ? true : false}
          onCheckedChange={(checked) => {
            checked
              ? setCheckedPositions((prev) => [...prev, item._id])
              : setCheckedPositions((prev) => prev.filter((a) => a !== item._id))
          }}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{collectionName}</TableCell>
      <TableCell className="font-bold">{item.cost_uah} UAH</TableCell>
      <TableCell className={!item.active ? 'bg-red-200 font-bold text-center' : 'bg-green-200 font-bold text-center'}>
        {!item.active ? 'false' : 'true'}
      </TableCell>
      <TableCell
        className={!item.carry_over ? 'bg-red-200 font-bold text-center' : 'bg-green-200 font-bold text-center'}
      >
        {!item.carry_over ? 'false' : 'true'}
      </TableCell>
    </TableRow>
  )
}
