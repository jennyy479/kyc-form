type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  type,
}) => {
  return (
    <div style={{ marginBottom: "1rem"}}>
      <label>
        {label}{required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{ borderColor: error ? "red" : "#ccc"}}
      />
      {error && <span style={{ color: "red" }}>{ error }</span>}
    </div>
  )
};

export default InputField;