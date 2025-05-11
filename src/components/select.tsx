type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  type?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div style={{ marginBottom: "1rem"}}>
      <label>
        {label}{required && '*'}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ borderColor: error ? "red" : "#ccc"}}
      />
      {error && <span style={{ color: "red" }}>{ error }</span>}
    </div>
  )
};

export default SelectField;