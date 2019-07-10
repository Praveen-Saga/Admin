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

  export interface Availability{
    availableDays: string;
    availableTimes: string[];
  }
  export interface AddProvider{
    providerId: string;
    _id?:string;
    name: string;
    qualification: string;
    speciality: string;
    experience: number;
    language: string;
    slots: Availability[];
    address: string;
    latitude: number;
    longitude: number;
    photo: string;
    gender: string;
    phone: number;
    email: string;
  }