import React, { useState, useEffect } from "react"
import { FormData } from "../types/FormData"
import { validateForm } from "../utils/validateForm"
import InputField from "../components/Input"
import SelectFeild from "../components/Select"
import StepIndicator from "../components/StepIndicator"
import DatePickerField from '../components/DatePicker'

type Step1Props = {
  data: FormData
  setData: React.Dispatch<React.SetStateAction<FormData>>
  next: () => void
  errors: Record<string, string>
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const Step1: React.FC<Step1Props> = ({
  data,
  setData,
  next,
  errors,
  setErrors,
}) => {
  const currentStep = 1;
  const [nationalityOptions, setNationalityOptions] = useState<
    { label: string; value: string }[]
  >([])
  const [shouldValidate, setShouldValidate] = useState(false)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchNationalityData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const data = await response.json()

      const countryNames = data.map((country: any) => country.name.common)
      const options = countryNames.map((country: string) => ({
        label: country,
        value: country,
      }))

      setNationalityOptions(options)
    } catch (error) {
      console.error(error)
    }
  }

  fetchNationalityData()

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ]

  const steps = [
    { title: "Basic Information" },
    { title: "Document Upload" },
    { title: "Confirmation Page" },
  ];

  const runValidation = () => {
    const newErrors = validateForm(data, currentStep)
    setErrors(newErrors)
    return newErrors
  }
  
  const validate = () => {
    setShouldValidate(true)
    const newErrors = runValidation()
    if (Object.keys(newErrors).length === 0) next()
  }
  
  useEffect(() => {
    if(shouldValidate) runValidation()
  })

  return (
    <div>
      <StepIndicator steps={steps} currentStep={currentStep} />
      <h2>Step 1: Basic Information</h2>

      <div className='form-group'>
        <InputField
          label='Name'
          name='name'
          value={data.name}
          onChange={handleChange}
          required
          type='text'
          error={errors.name}
        />
      </div>

      <div className='form-group'>
        <InputField
          label='Email'
          name='email'
          value={data.email}
          onChange={handleChange}
          required
          type='text'
          error={errors.email}
        />
      </div>

      <div className='form-group'>
        <InputField
          label='Phone'
          name='phone'
          value={data.phone}
          onChange={handleChange}
          required
          type='text'
          error={errors.phone}
        />
      </div>

      <div className='form-group'>
        <SelectFeild
          label='Nationality'
          options={nationalityOptions}
          value={data.nationality}
          onChange={(val) => setData({ ...data, nationality: val })}
          required
          error={errors.nationality}
        />
      </div>

      <div className='form-group'>
        <SelectFeild
          label='Gender'
          options={genderOptions}
          value={data.gender || ""}
          onChange={(val) => setData({ ...data, gender: val })}
          required
          error={errors.gender}
        />
      </div>

      <div className='form-group'>
        <InputField
          label='Address'
          name='address'
          value={data.address || ""}
          onChange={handleChange}
          type='text'
          error={errors.address}
        />
      </div>

      <div className='form-group'>
        <DatePickerField
          label="Date of Birth"
          type='date'
          name='dateOfBirth'
          value={data.dateOfBirth || ""}
          onChange={handleChange}
          required
          error={errors.dateOfBirth}
        />
      </div>

      <div className='form-actions'>
        <div></div> {}
        <button onClick={validate} className='primary-button'>
          Next
        </button>
      </div>
    </div>
  )
}

export default Step1
