import { FormData } from "../types/FormData";

export const validateForm = (data: FormData, step?: number) => {
  const newErrors: Record<string, string> = {};
  
  if(step === 1) {
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Please enter a valid email";
    if (!data.phone || !/^\d{10,15}$/.test(data.phone)) newErrors.phone = "Please enter a valid phone number";
    if (!data.nationality) newErrors.nationality = "Nationality is required";
    if(!data.gender) newErrors.gender = "Gender is required";
    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = getAge(data.dateOfBirth);
      if (age < 18 || age > 85) newErrors.dateOfBirth = "Age must be between 18 and 85 years old";
    }
  } else if(step === 2) {
    if (!data.idFront) newErrors.idFront = "Front side of ID card is required";
    if (!data.idBack) newErrors.idBack = "Back side of ID card is required";
  }
 

  return newErrors;
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
