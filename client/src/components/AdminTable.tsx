// @ts-nocheck

import { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { TableCell, TableRow } from './ui/table'

export default function AdminTable({
  item,
  nav,
  allChecked,
  checkedPositions,
  setCheckedPositions,
}) {
  return (
    <TableRow
      onClick={() => nav(item._id)}
      className={
        !item.active ? 'bg-slate-100 cursor-pointer' : 'bg-white cursor-pointer'
      }
    >
      <TableCell
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-start"
      >
        <Checkbox
          className="size-6"
          checked={
            checkedPositions?.includes(item._id) || allChecked ? true : false
          }
          onCheckedChange={(checked) => {
            checked
              ? setCheckedPositions((prev) => [...prev, item._id])
              : setCheckedPositions((prev) =>
                  prev.filter((a) => a !== item._id)
                )
          }}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.collection_name}</TableCell>
      <TableCell className="font-bold">{item.cost_uah} UAH</TableCell>
      <TableCell
        className={
          !item.sale ? 'bg-red-200 font-bold' : 'bg-green-200 font-bold'
        }
      >
        {!item.sale ? 'false' : 'true'}
      </TableCell>
      <TableCell
        className={
          !item.active ? 'bg-red-200 font-bold' : 'bg-green-200 font-bold'
        }
      >
        {!item.active ? 'false' : 'true'}
      </TableCell>
    </TableRow>
  )
}
