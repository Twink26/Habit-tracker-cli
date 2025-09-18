
export enum HabitStatus {
  Pending = "Pending",
  Done = "Done"
}

export interface Habit {
  id: number;          
  name: string;        
  status: HabitStatus; 
  createdAt: Date;     
}
