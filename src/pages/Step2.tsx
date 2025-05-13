import React from "react"
import FileUpload from "../components/FileUpload"
import { FormData } from "../types/FormData"
import { validateForm } from "../utils/validateForm"

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
  const validate = () => {
    const newErrors = validateForm(data)
    console.log("Errors:", newErrors)
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) next()
  }

  return (
    <div className='form-step'>
      {}
      <div className='steps-indicator'>
        <div className='step-item completed'>
          <div className='step-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          </div>
          <div className='step-title'>Basic Information</div>
        </div>
        <div className='step-item active'>
          <div className='step-circle'>2</div>
          <div className='step-title'>Document Upload</div>
        </div>
        <div className='step-item'>
          <div className='step-circle'>3</div>
          <div className='step-title'>Confirmation Page</div>
        </div>
      </div>

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
