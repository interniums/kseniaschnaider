// @ts-nocheck

import { getCategories, getCollections, getItems } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Link, Navigate } from 'react-router-dom'

export default function AdminSearch() {
  const dropDownRef = useRef(null)
  const dropDownRef2 = useRef(null)
  const [collections, setCollections] = useState([])
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([{}])

  const [displayItems, setDisplayItems] = useState([])
  const [displayCategories, setDisplayCategories] = useState([])
  const [displayCollections, setDisplayCollections] = useState([])

  const [filteredItems, setFilteredItems] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [filteredCollections, setFilteredCollections] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!loading) {
      if (input.length === 0) {
        setDisplayCategories(categories)
        setDisplayCollections(collections)
        setDisplayItems(items)
      } else {
        filter()
      }
    }
  }, [input, loading])

  useEffect(() => {
    const get_cat = async () => {
      setCategories(await getCategories())
    }
    get_cat()
    const get_col = async () => {
      setCollections(await getCollections())
    }
    get_col()
    const get_items = async () => {
      setItems(await getItems())
      setLoading(false)
    }
    get_items()
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleClickOutside = (event) => {
    if (
      dropDownRef.current &&
      dropDownRef2.current &&
      !dropDownRef.current.contains(event.target) &&
      !dropDownRef2.current.contains(event.target)
    ) {
      setOpen(false)
    }
  }

  const filter = () => {
    if (!loading) {
      let newItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.article.includes(input)
      )
      const newCollections = collections.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      )
      const newCategories = categories.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      )
      setDisplayCategories(newCategories)
      setDisplayCollections(newCollections)
      setDisplayItems(newItems)
    }
  }
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <header className="w-full flex items-center justify-center pt-4 absolute z-10">
          <div className="w-1/3">
            <div
              className="relative flex items-center"
              onFocus={() => setOpen(true)}
              ref={dropDownRef}
            >
              <div className="absolute pl-2">
                <MagnifyingGlassIcon className="size-6" />
              </div>
              <input
                type="text"
                autoComplete="off"
                className="w-full border py-2 pl-10 px-4 outline-none"
                style={{
                  borderBottomLeftRadius: open ? '0px' : '6px',
                  borderBottomRightRadius: open ? '0px' : '6px',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setOpen(true)
                }}
                placeholder="Search..."
              />
            </div>
            {open && (
              <div
                ref={dropDownRef2}
                style={{
                  borderTopLeftRadius: open ? '0px' : '6px',
                  borderTopRightRadius: open ? '0px' : '6px',
                }}
                className="w-full grid gap-4 py-2 px-4 border border-t-0 max-h-80 h-min overflow-y-auto rounded-md bg-white transition-all ease-in-out z-10"
              >
                {!displayCollections?.length == 0 ? (
                  <div>
                    <div className="mb-4">
                      <Link to="/admin-page/collection">
                        <p className="text-xl mb-2 hover:underline cursor-pointer">
                          Collections
                        </p>
                      </Link>
                      <hr />
                    </div>
                    <div className="grid gap-2">
                      {displayCollections?.map((items, i) => (
                        <Link
                          onClick={() => setOpen(false)}
                          to={`/admin-page/collection/${items?._id}`}
                          key={items?._id + i}
                        >
                          <div className="hover:bg-slate-200 py-1 px-4 cursor-pointer rounded">
                            <p className="">{items?.name}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
                {!displayCategories?.length == 0 ? (
                  <div>
                    <div className="mb-4">
                      <Link to="/admin-page/category">
                        <p className="text-xl mb-2 hover:underline cursor-pointer">
                          Categories
                        </p>
                      </Link>
                      <hr />
                    </div>
                    <div className="grid gap-2">
                      {displayCategories?.map((items, i) => (
                        <Link
                          onClick={() => setOpen(false)}
                          key={items._id + i}
                          to={`/admin-page/category/${items?._id}`}
                        >
                          <div className="flex gap-4 hover:bg-slate-200 py-2 px-4 cursor-pointer rounded items-center">
                            <p className="">
                              {items?.name} - {items?.gender}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
                {!displayItems?.length == 0 ? (
                  <div>
                    <div className="mb-4">
                      <Link to="/admin-page/item">
                        <p className="text-xl mb-2 hover:underline cursor-pointer">
                          Items
                        </p>
                      </Link>
                      <hr />
                    </div>
                    <div className="grid gap-2">
                      {displayItems?.map((items, i) => (
                        <Link
                          onClick={() => setOpen(false)}
                          key={items._id + i}
                          to={`/admin-page/item/${items?._id}`}
                        >
                          <div className="flex gap-4 hover:bg-slate-100 py-2 px-4 cursor-pointer rounded items-center">
                            <div className="max-w-32">
                              <img src={items.img[0]} alt="img" />
                            </div>
                            <p className="">{items?.name}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </header>
      )}
    </>
  )
}
