// @ts-nocheck
import { Input } from './ui/input'
import { Label } from './ui/label'

export default function FormInput({ label, placeholder, id, type, setValue }) {
  return (
    <>
      <Label htmlFor={id} className="text-xl">
        {label}
      </Label>
      <Input
        required
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </>
  )
}
