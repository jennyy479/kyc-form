export interface FormData {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  gender?: string;
  address?: string;
  dateOfBirth: string; 

  idFront: File | null;
  idBack: File | null;
  additionalDocs: File[];
}