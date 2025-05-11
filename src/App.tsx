import { useState } from "react";
import Step1 from "./pages/Step1";
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
    </div>
  );
}
