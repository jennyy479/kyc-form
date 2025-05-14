import React, { useState, useEffect }  from "react"
import { FormData } from "../types/FormData"
import { validateForm } from "../utils/validateForm"
import FileUpload from "../components/FileUpload"
import StepIndicator from "../components/StepIndicator"

type Step2Props = {
  data: FormData
  setData: React.Dispatch<React.SetStateAction<FormData>>
  next: () => void
  prev: () => void
  errors: Record<string, string>
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const Step2: React.FC<Step2Props> = ({
  data,
  setData,
  prev,
  next,
  errors,
  setErrors,
}) => {
  const [shouldValidate, setShouldValidate] = useState(false)
  const currentStep = 2

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

  const steps = [
    { title: "Basic Information" },
    { title: "Document Upload" },
    { title: "Confirmation Page" },
  ];



  return (
    <div>
      <StepIndicator steps={steps} currentStep={currentStep} />
      <h2>Step 2: Document Upload</h2>

      <div className='form-group'>
        <FileUpload
          label='ID Card Front'
          name='idFront'
          accept='.jpg,.jpeg,.png,.pdf'
          value={data.idFront}
          onChange={(f) => setData((prev) => ({ ...prev, idFront: f as File }))}
          required
          type='file'
          limit_file_size={5}
          error={errors.idFront}
        />
      </div>

      <div className='form-group'>
        <FileUpload
          label='ID Card Back'
          name='idBack'
          accept='.jpg,.jpeg,.png,.pdf'
          value={data.idBack}
          onChange={(f) => setData((prev) => ({ ...prev, idBack: f as File }))}
          required
          type='file'
          limit_file_size={5}
          error={errors.idBack}
        />
      </div>

      <div className='form-group'>
        <FileUpload
          label='Additional Documents'
          name='additional'
          accept='.jpg,.jpeg,.png,.pdf'
          value={data.additionalDocs}
          onChange={(f) =>
            setData((prev) => ({ ...prev, additionalDocs: f as File[] }))
          }
          type='file'
          limit_file_size={10}
          error={errors.additionalDocs}
          multiple
        />
      </div>

      <div className='form-actions'>
        <button onClick={prev} className='secondary'>
          Back
        </button>
        <button onClick={validate} className='primary-button'>
          Next
        </button>
      </div>
    </div>
  )
}

export default Step2
