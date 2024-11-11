export interface Property {
  id: string;
  title: string;
  price: number;
  status: "Deal Done" | "Available" | "No Resp.";
  availabilityStart: Date;
  availabilityEnd: Date;
  imageUrl: string;
  guests: number;
} 