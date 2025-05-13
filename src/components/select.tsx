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
    <div ref={containerRef} style={{ marginBottom: "1rem", position: "relative" }}>
      {label && <label>{label}{required && 
          <span 
            style={{
            color: "var(--danger)"  }}> * </span>}</label>}
      <div
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          border: "1px solid var(--gray-300)",  
          borderRadius: open ? 
            "var(--border-radius) var(--border-radius) 0 0" : 
            "var(--border-radius)", 
          fontSize: "0.95rem",               
          color: "var(--primary)",
          transition: "var(--transition)",
          backgroundColor: "var(--white)",
          cursor: "pointer",
          position: "relative",
          boxSizing: "border-box"
        }}
      >
        {!open ? (
          <div onClick={() => setOpen(true)}>
            {value ? options.find((opt) => opt.value === value)?.label : placeholder || "Please select"}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Searching..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            style={{ 
              width: "100%",
              border: "none",
              outline: "none",
              padding: "0",
              background: "transparent",
              fontSize: "0.95rem",
              color: "var(--primary)",
              boxSizing: "border-box"
            }}
          />
        )}
      </div>
      {open && (
        <div style={{ 
          border: "1px solid var(--gray-300)", 
          borderTop: "none", 
          maxHeight: "200px", 
          overflowY: "auto", 
          position: "absolute",
          left: "0",
          right: "0", 
          backgroundColor: "#fff", 
          zIndex: 999,
          borderBottomLeftRadius: "var(--border-radius)",
          borderBottomRightRadius: "var(--border-radius)",
          boxSizing: "border-box",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                setSearch("");
              }}
              style={{ 
                padding: "0.75rem 1rem", 
                cursor: "pointer", 
                borderBottom: "1px solid #eee",
                backgroundColor: value === option.value ? "var(--gray-100)" : "transparent",
                transition: "background-color 0.2s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {option.label}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div style={{ padding: "0.75rem 1rem", color: "var(--gray-500)" }}>
              No results found
            </div>
          )}
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: "0.5rem", fontSize: "0.85rem" }}>{error}</div>}
    </div>
  );
};

export default SelectFeild;
