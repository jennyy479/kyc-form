import React, { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

const SelectFeild: React.FC<SelectProps> = ({ label, options, value, onChange, placeholder, required, error }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ marginBottom: "1rem" }}>
      {label && <label>{label}{required && " *"}</label>}
      <div
        onClick={() => setOpen(!open)}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          cursor: "pointer",
          position: "relative"
        }}
      >
        {value ? options.find((opt) => opt.value === value)?.label : placeholder || "Please select"}
      </div>
      {open && (
        <div style={{ border: "1px solid #ccc", maxHeight: "200px", overflowY: "auto", position: "absolute", backgroundColor: "#fff", width: "100%", zIndex: 999 }}>
          <input
            type="text"
            placeholder="Searching..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                setSearch("");
              }}
              style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #eee" }}
            >
              {option.label}
            </div>
          ))}
          {filteredOptions.length === 0 && <div style={{ padding: "8px", color: "#999" }}>No results found</div>}
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default SelectFeild;
