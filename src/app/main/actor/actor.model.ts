export interface HealthProvider{
    _id:string;
    status?: 'active' | 'inactive'  
    providerName:string;
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
    status?: 'active' | 'inactive'
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

  export interface SearchPage{
    name: string;
    phone: number;
    email: string;
  }

  export interface LoginResponse{
    _id:string;
    email:string;
    password:string;
    token?:string;
    expirationTime?:string;
  }

  export interface AuthDetails{
    resEmail:string;
  }

  export interface Qualification{
    _id?:string,
    status?: 'active' | 'inactive'
    providerId:string;
    providerName?:string;
    qualification:string;
  } 
  export interface Slots{
    _id?:string;
    status?: 'active' | 'inactive'
    fromtime:string;
    totime:string;
    slotValue?:string;
  }

  export interface Appointment{
    _id:string,
    patientId:string,
    patientname:string,
    address:string,
    doctorname:string,
    doctorId:string,
    pickedslots:[{
      day:string,
      time:string,
    }]
  }

