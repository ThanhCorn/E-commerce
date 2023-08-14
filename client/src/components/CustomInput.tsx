interface ICustomInput {
  type: string;
  name: string;
  placeholder: string;
  className: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomInput = (props: ICustomInput) => {
  const { type, name, placeholder, className, onChange, value } = props;

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return (
    <div className=" mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input ${className}`}
        onChange={onChange}
        pattern={type === "email" ? emailPattern.source : undefined} // Apply pattern only for email input
        value={value}
      />
    </div>
  );
};

export default CustomInput;
