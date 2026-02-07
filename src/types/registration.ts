

export enum VerificationStatus {
  Pending = 'pending',
  Verified = 'verified',
  Failed = 'failed'
}

export enum CheckInStatus {
  NotCheckedIn = 'not_checked_in',
  CheckedIn = 'checked_in',
  CheckedOut = 'checked_out'
}

export interface RegistrationTeam {
  id: string;
  teamName: string;
  eventId: string;
  eventName: string;
  isCheckedIn: boolean;
  checkInTime?: Date;
  checkOutTime?: Date;
  verificationStatus: VerificationStatus;
  checkInStatus: CheckInStatus;
  group?: string;
}

