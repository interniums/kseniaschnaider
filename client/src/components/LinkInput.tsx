import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'

export default function LinkInput({}) {
  const [confirmed, setConfirmed] = useState(false)
  const [value, setValue] = useState('')
  console.log(value)

  return (
    <div className="gap-4 flex items-center mt-2 mb-4">
      <Input
        disabled={confirmed ? true : false}
        placeholder="введіть посилання"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <Button
        onClick={() => {
          setConfirmed(!confirmed)
        }}
        type="button"
        size="icon"
        className={
          !confirmed
            ? 'bg-green-400 size-8 hover:bg-green-500'
            : 'bg-red-400 size-8 hover:bg-red-500'
        }
      >
        {confirmed ? <Cross1Icon /> : <CheckIcon className="size-5" />}
      </Button>
    </div>
  )
}
