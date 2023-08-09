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
  return (
    <div className=" mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input ${className}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
