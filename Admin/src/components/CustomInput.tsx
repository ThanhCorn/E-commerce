interface ICustomInput {
  type: "text" | "password" | "number" | "date" | "email" | "color";
  name?: string;
  className: string;
  placeholder: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

const CustomInput = (props: ICustomInput) => {
  const { type, name, className, placeholder, id, onChange, value } = props;
  return (
    <div className="mb-3 relative">
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`input ${className}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
