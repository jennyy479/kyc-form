import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

type FileUploadProps = {
  label: string;
  name: string;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  required?: boolean;
  error?: string;
  type?: string;
  accept?: string;
  multiple?: boolean;
};
const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  value,
  required = false,
  error,
  onChange,
  type = "file",
  accept,
  multiple = false
}) => {
  const [inputId] = useState(() => uuidv4());
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);

    const oversized = selectedFiles.find(file => file.size > MAX_FILE_SIZE);
    if (oversized) {
      const sizeMB = (oversized.size / 1024 / 1024).toFixed(2);
      alert(`檔案大小為 ${sizeMB} MB，超過 5MB 限制`);
      e.target.value = '';
      return;
    }

    if (multiple) {
      const currentFiles = Array.isArray(value) ? value : [];
      const mergedFiles = [...currentFiles, ...selectedFiles];

  
      const uniqueFiles = mergedFiles.filter((file, index, self) =>
        index === self.findIndex(f => f.name === file.name && f.size === file.size)
      );

      onChange(uniqueFiles);
    } else {
      onChange(selectedFiles[0]);
    }
    e.target.value = '';
  };

  const handleRemove = (index?: number) => {
    if(multiple && Array.isArray(value)) {
      const newFiles =  [...value];
      if (typeof index === 'number') {
        newFiles.splice(index, 1);
      }
      onChange(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange(null);
    }
  }

  const handleButtonClick = () => {
    const input = document.getElementById(inputId);
    input?.click();
  };


  return (
    <div style={{ marginBottom: "1rem"}}>
      <label>
        {label} 
        {required && 
          <span 
            style={{
            color: "var(--danger)"  }}> * </span>}
      </label>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          type="button"
          className={"w-100"}
          onClick={handleButtonClick} 
          >
          新增附件
        <input
          id={inputId}
          style={{ display: "none" }}
          type={type}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}   
        />
        </button>
        { Array.isArray(value) ? (
          value.map((file, idx) => (
            <div style={{display: "flex"}} key={idx}>
              <span>{file.name}</span>
              <button className="small-button" type="button" onClick={() => handleRemove(idx)}>x</button>
            </div>
          ))
        ) : value ? (
          <div style={{display: "flex"}}>
            <span>{value.name}</span>
            <button className="small-button" type="button" onClick={() => handleRemove()}>x</button>
          </div>
        ) : null}
      </div>
      {error && <span className='error-message'>{ error }</span>}
    </div>
  )
};


export default FileUpload;