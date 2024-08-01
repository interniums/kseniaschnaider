// @ts-nocheck
import { Input } from './ui/input'
import { Label } from './ui/label'

export default function FormInput({
  label,
  placeholder,
  id,
  type,
  setValue,
  error,
  setError,
}) {
  return (
    <>
      <Label htmlFor={id} className="">
        {label}
      </Label>
      <Input
        style={{ outline: error[id] ? '2px solid red' : 'none' }}
        required
        type={type}
        id={id}
        placeholder={error[id] ? 'заповніть поле' : placeholder}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        autoComplete="off"
        onInput={() => {
          setError((prev) => ({ ...prev, [id]: false }))
        }}
      />
    </>
  )
}
