export interface DateRange {
      startDateTime: Date;
      endDateTime: Date;
}

export interface Data {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      ipAddress: string;
      company: string;
      department: string;
      city: string;
      phone: string;
      creditCardType: string;
      creditCardNumber: string;
      currency: string;
      creditCardExpires: Date;
      shifts?: Array<DateRange>;
}
