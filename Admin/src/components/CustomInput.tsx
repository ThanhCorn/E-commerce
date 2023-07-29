interface ICustomInput {
  type: string;
  name: string;
  className: string;
  placeholder: string;
  id?: string;
}

const CustomInput = (props: ICustomInput) => {
  const { type, name, className, placeholder, id } = props;
  return (
    <div className="mb-3 relative">
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`input ${className}`}
      />
    </div>
  );
};

export default CustomInput;
