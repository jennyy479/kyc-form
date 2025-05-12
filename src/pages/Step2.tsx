import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { FormData } from "../types/FormData";


type Step2Props = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  next: () => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};


const Step2: React.FC<Step2Props> = ({ data, setData, next, errors, setErrors }) => {
  const [fileFront, setFileFront] = useState<File | null>(null);
const [fileBack, setFileBack] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "姓名為必填";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "請輸入正確的 Email";
    if (!data.phone || !/^\d{10,15}$/.test(data.phone)) newErrors.phone = "請輸入有效電話";
    if (!data.nationality) newErrors.nationality = "國籍為必填";
    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = "出生日期為必填";
    } else {
      const age = getAge(data.dateOfBirth);
      if (age < 18 || age > 85) newErrors.dateOfBirth = "年齡需介於 18 至 85 歲";
    }
    console.log(fileFront,newErrors.idFront )
    if(!fileFront) newErrors.idFront = "身分證正面為必填"
    if(!fileBack) newErrors.idBack = "身分證正面為必填"
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) next();
  };

  const getAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <h2>Step 2: Document Upload</h2>
      <div>
        <FileUpload
          label="ID Card Front"
          name="idFront"
          accept=".jpg,.jpeg,.png,.pdf"
          value={fileFront}
          onChange={(f) => setFileFront(f as File | null)}
          required
          type="file"
          error={errors.idFront}
        />
      </div>
      <div>
        <FileUpload
          label="ID Card Back"
          name="idBack"
          accept=".jpg,.jpeg,.png,.pdf"
          value={fileBack}
          onChange={(f) => setFileBack(f as File | null)}
          required
          type="file"
          error={errors.idBack}
        />
      </div>
      <div>
        <FileUpload
          label="Additional Documents "
          name="additional"
          accept=".jpg,.jpeg,.png,.pdf"
          value={files}
          onChange={(f) => setFiles(f as File[])} 
          type="file"
          error={errors.additional}
          multiple
        />
      </div>
      <button >Back</button>
      <button onClick={validate}>Next</button>
    </div>
  );
};

export default Step2;
