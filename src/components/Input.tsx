type InputFieldProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  error?: string
  type?: string
}

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
    <div style={{ marginBottom: "1rem" }}>
      <label>
        {label}
        {required && (
          <span
            style={{
              color: "var(--danger)",
            }}
          >
            {" "}
            *{" "}
          </span>
        )}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{ borderColor: error ? "var(--danger)" : "#ccc" }}
      />
      {error && <span className='error-message'>{error}</span>}
    </div>
  )
}

export default InputField
