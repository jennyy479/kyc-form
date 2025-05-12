import React, { useState }from "react";
import InputField from "../components/Input";
import SelectFeild from "../components/Select";
import { FormData } from "../types/FormData";

type Step1Props = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  next: () => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};


const Step1: React.FC<Step1Props> = ({ data, setData, next, errors, setErrors }) => {
  const [nationalityOptions, setNationalityOptions] = useState<
  { label: string; value: string }[]
>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is requied.";
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Please enter a valid Email";
    if (!data.phone || !/^\d{10,15}$/.test(data.phone)) newErrors.phone = "Please enter a valid phone number";
    if (!data.nationality) newErrors.nationality = "Nationality is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.address) newErrors.address = "Aaddress is required";
    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = getAge(data.dateOfBirth);
      if (age < 18 || age > 85) newErrors.dateOfBirth = "Age must be between 18 and 85";
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) next();
  };


  const fetchNationalityData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
  
      const countryNames = data.map((country: any) => country.name.common);
      const options = countryNames.map((country: string) => ({
        label: country,
        value: country
      }));

      setNationalityOptions(options);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  fetchNationalityData();

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ];
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
      <h2>Step 1: Basic Information</h2>
      <div>
        <InputField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          type="text"
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
          type="text"
          error={errors.email}
        />
      </div>
      <div>
        <InputField
          label="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          type="text"
          error={errors.phone}
        />
      </div>
      <div>
        <SelectFeild
          label="Nationality"
          options={nationalityOptions}
          value={data.nationality}
          onChange={(val) => setData({...data, nationality: val})}
          required
          error={errors.nationality}
        />
      </div>
      <div>
        <SelectFeild
          label="Gender"
          options={genderOptions}
          value={data.gender || ""}
          onChange={(val) => setData({...data, gender: val})}
          required
          error={errors.gender}
        />
      </div>
      <div>
        <InputField
          label="Address"
          name="address"
          value={data.address || ''}
          onChange={handleChange}
          required
          type="text"
          error={errors.address}
        />
      </div>
      <div>
        <label>Date of Birth*</label>
        <input type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} />
        {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
      </div>
      <button onClick={validate}>Next</button>
    </div>
  );
};

export default Step1;
