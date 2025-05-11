import React from "react";
import InputField from "../components/Input";
import { FormData } from "../types/FormData";

type Step1Props = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  next: () => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};


const Step1: React.FC<Step1Props> = ({ data, setData, next, errors, setErrors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

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
      <h2>Step 1: 基本資料</h2>
      <div>
        <InputField
          label="姓名"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          error={errors.name}
        />
      </div>
      <div>
        <InputField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          error={errors.email}
        />
      </div>
      <div>
        <InputField
          label="電話"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          error={errors.phone}
        />
      </div>
      <div>
        <label>國籍*</label>
        <select name="nationality" value={data.nationality} onChange={handleChange}>
          <option value="">請選擇</option>
          <option value="Taiwan">台灣</option>
          <option value="Japan">日本</option>
          <option value="USA">美國</option>
          {/* 可自行擴充 */}
        </select>
        {errors.nationality && <span>{errors.nationality}</span>}
      </div>
      <div>
        <label>性別</label>
        <select name="gender" value={data.gender} onChange={handleChange}>
          <option value="">請選擇</option>
          <option value="Male">男</option>
          <option value="Female">女</option>
          <option value="Prefer not to say">不透露</option>
        </select>
      </div>
      <div>
        <label>地址</label>
        <input name="address" value={data.address} onChange={handleChange} />
      </div>
      <div>
        <label>出生日期*</label>
        <input type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} />
        {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
      </div>
      <button onClick={validate}>下一步</button>
    </div>
  );
};

export default Step1;
