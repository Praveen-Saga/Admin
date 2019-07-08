export interface HealthProvider{
    _id:'string';
    providerName:'string';
}

export interface PeriodicElement {
    name: string;
    position: number;
    AvailableTime: string;
    AvailableDays: string;
    Speciality: string;
  }
  
  export interface DialogData {
    confirm:boolean
  }