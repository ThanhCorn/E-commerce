

interface ICustomInput {
        type: string,
        name: string,
        placeholder: string,
        className: string,
}

const CustomInput = (props:ICustomInput) => {
    const {type, name, placeholder, className} = props
  return (
    <div className=" mb-3">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  </div>
  )
}

export default CustomInput