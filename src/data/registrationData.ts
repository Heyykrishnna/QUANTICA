import { RegistrationTeam, VerificationStatus, CheckInStatus } from '../types/registration';

export const dummyRegistrationTeams: RegistrationTeam[] = [
  {
    id: 'team-001',
    teamName: 'Cyber Warriors',
    teamLeadName: 'Rahul Sharma',
    teamLeadPhone: '+91 98765 43210',
    eventId: 'bgmi',
    eventName: 'BGMI',
    isCheckedIn: true,
    checkInTime: new Date('2026-02-02T09:30:00'),
    checkOutTime: undefined,
    verificationStatus: VerificationStatus.Verified,
    checkInStatus: CheckInStatus.CheckedIn,
    members: [
      { name: 'Priya Patel', isChecked: true, role: 'Developer' },
      { name: 'Amit Kumar', isChecked: true, role: 'Designer' },
      { name: 'Sneha Reddy', isChecked: true, role: 'Tester' },
      { name: 'Vikram Singh', isChecked: true, role: 'Developer' },
    ]
  },
  {
    id: 'team-002',
    teamName: 'Code Ninjas',
    teamLeadName: 'Ananya Iyer',
    teamLeadPhone: '+91 87654 32109',
    eventId: 'valorant',
    eventName: 'Valorant',
    isCheckedIn: true,
    checkInTime: new Date('2026-02-02T10:15:00'),
    checkOutTime: undefined,
    verificationStatus: VerificationStatus.Verified,
    checkInStatus: CheckInStatus.CheckedIn,
    members: [
      { name: 'Rohan Mehta', isChecked: true, role: 'Full Stack' },
      { name: 'Kavya Nair', isChecked: true, role: 'Backend' },
      { name: 'Aditya Joshi', isChecked: false, role: 'Frontend' }, // Missing member
      { name: 'Pooja Gupta', isChecked: true, role: 'UI/UX' },
    ]
  },
  {
    id: 'team-003',
    teamName: 'Pixel Pioneers',
    teamLeadName: 'Karthik Krishnan',
    teamLeadPhone: '+91 76543 21098',
    eventId: 'bgmi',
    eventName: 'BGMI',
    isCheckedIn: false,
    checkInTime: undefined,
    checkOutTime: undefined,
    verificationStatus: VerificationStatus.Pending,
    checkInStatus: CheckInStatus.NotCheckedIn,
    members: [
      { name: 'Divya Shah', isChecked: false, role: 'Lead Designer' },
      { name: 'Arjun Rao', isChecked: false, role: 'Developer' },
      { name: 'Meera Kapoor', isChecked: false, role: 'QA Engineer' },
    ]
  },
  {
    id: 'team-004',
    teamName: 'Tech Titans',
    teamLeadName: 'Neha Agarwal',
    teamLeadPhone: '+91 65432 10987',
    eventId: 'freefire',
    eventName: 'Free Fire',
    isCheckedIn: false,
    checkInTime: undefined,
    checkOutTime: undefined,
    verificationStatus: VerificationStatus.Pending,
    checkInStatus: CheckInStatus.NotCheckedIn,
    members: [
      { name: 'Siddharth Mishra', isChecked: false, role: 'Team Lead' },
      { name: 'Isha Bansal', isChecked: false, role: 'Developer' },
      { name: 'Rajesh Kumar', isChecked: false, role: 'DevOps' },
      { name: 'Anjali Verma', isChecked: false, role: 'Analyst' },
      { name: 'Manish Tiwari', isChecked: false, role: 'Developer' },
    ]
  },
  {
    id: 'team-005',
    teamName: 'Digital Dynamos',
    teamLeadName: 'Aryan Malhotra',
    teamLeadPhone: '+91 54321 09876',
    eventId: 'valorant',
    eventName: 'Valorant',
    isCheckedIn: true,
    checkInTime: new Date('2026-02-02T08:45:00'),
    checkOutTime: new Date('2026-02-02T17:30:00'),
    verificationStatus: VerificationStatus.Verified,
    checkInStatus: CheckInStatus.CheckedOut,
    members: [
      { name: 'Riya Sen', isChecked: true, role: 'Project Manager' },
      { name: 'Varun Chopra', isChecked: true, role: 'Full Stack' },
      { name: 'Tanvi Desai', isChecked: true, role: 'Data Scientist' },
    ]
  }
];

export const generateSimulatedOTP = (phone: string): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`[SIMULATED OTP] Phone: ${phone}, OTP: ${otp}`);
  return otp;
};

export const verifyOTP = (phone: string, enteredOTP: string, generatedOTP: string): boolean => {
  return enteredOTP === generatedOTP;
};
