export interface Course {
  name: string;
  description: string;
  code: string;
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
}
