import React, { useState } from "react"
import { FormData } from "../types/FormData"

type Step3Props = {
  data: FormData
  prev: () => void
}

const Step3: React.FC<Step3Props> = ({ data, prev }) => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    console.log("Form submitted!", { data })
    setSubmitted(true)
  }

  const renderFileInfo = (file: File | null) =>
    file ? (
      <li>
        {file.name} - {(file.size / 1024).toFixed(2)} KB
      </li>
    ) : (
      <li style={{ color: "red" }}>No file uploaded</li>
    )

  const renderFileList = (fileList: File[]) =>
    fileList?.length > 0 ? (
      fileList.map((file, index) => (
        <li key={index}>
          {file.name} - {(file.size / 1024).toFixed(2)} KB
        </li>
      ))
    ) : (
      <li style={{ color: "red" }}>No additional documents uploaded</li>
    )

  return (
    <div className='form-step'>
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
          <div className='step-title'>Document Upload</div>
        </div>
        <div className='step-item'>
          <div className='step-circle'>3</div>
          <div className='step-title'>Confirmation Page</div>
        </div>
      </div>
      <div className='step3-container'>
        <h2>Step 3: Confirmation Page</h2>

        <h3>Personal Information</h3>
        <ul>
          <li>Name: {data.name}</li>
          <li>Email: {data.email}</li>
          <li>Phone: {data.phone}</li>
          <li>Nationality: {data.nationality}</li>
          <li>Date of Birth: {data.dateOfBirth}</li>
        </ul>

        <h3>Uploaded Documents</h3>
        <ul>
          <strong>ID Front:</strong>
          {renderFileInfo(data.idFront)}
          <strong>ID Back:</strong>
          {renderFileInfo(data.idBack)}
          <strong>Additional Documents:</strong>
          {renderFileList(data.additionalDocs)}
        </ul>

        <div className='form-actions'>
          <button onClick={prev}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {submitted && (
          <div className='success-message'>
            Submission successful! Thank you.
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3
