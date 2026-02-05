export interface TeamMember {
  name: string;
  isChecked: boolean;
  role?: string;
  ign?: string;
  email?: string;
  phone?: string;
}

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
  teamLeadName: string;
  teamLeadPhone: string;
  eventId: string;
  eventName: string;
  isCheckedIn: boolean;
  checkInTime?: Date;
  checkOutTime?: Date;
  members: TeamMember[];
  verificationStatus: VerificationStatus;
  checkInStatus: CheckInStatus;
  teamLeadIgn?: string;
  teamLeadEmail?: string;
  logoUrl?: string;
  dropErangel?: string;
  dropMiramar?: string;
  dropRondo?: string;
}

