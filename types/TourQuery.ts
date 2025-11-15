export interface FormDataType {
  fullName: string;
  email: string;
  phone: string;
  travelers: string | number;
  travelDate: string;
  departureCity: string;
  specialRequests: string;
}

export type HandleChangeType = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;
