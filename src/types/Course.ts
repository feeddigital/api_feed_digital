export interface Course {
  _id?: string;
  name: string;
  description: string;
  classroom: string;
  startDate: {
    date: string;
    description: string;
  };
  endDate: {
    date: string;
    description: string;
  };
  image: string;
  daysOfClases: string[];
  hoursOfClases: string[];
  inscripts: any[];
  active: boolean;
  price: number;
}
