import { useState } from "react";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import { FormData } from "./types/FormData";

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  gender: undefined,
  address: "",
  dateOfBirth: "",

  idFront: null,
  idBack: null,
  additionalDocs: [],
};

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="form-container">
      {step === 1 && (
        <Step1
          data={formData}
          setData={setFormData}
          next={() => setStep(2)}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {
        step === 2 && (
          <Step2
            data={formData}
            setData={setFormData}
            next={() => setStep(3)}
            prev={handlePrev} 
            errors={errors}
            setErrors={setErrors}
          />
        )
      }
      {
        step === 3 && (
          <Step3
            data={formData}
            prev={handlePrev}
          />

        )
      }
    </div>
  );
}
