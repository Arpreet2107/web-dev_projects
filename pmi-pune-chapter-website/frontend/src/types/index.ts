export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'MEMBER' | 'VOLUNTEER';
  profile?: Profile;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  phone?: string;
  company?: string;
  designation?: string;
  experience?: number;
  bio?: string;
  avatarUrl?: string;
  certifications: string[];
  expertise: string[];
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  maxAttendees?: number;
  price: number;
  memberPrice: number;
  category: string;
  featured: boolean;
  status: 'DRAFT' | 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  ticketType: 'STANDARD' | 'EARLY_BIRD' | 'MEMBER' | 'STUDENT';
  amount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  attended: boolean;
  feedbackSubmitted: boolean;
}

export interface PDU {
  id: string;
  userId: string;
  category: 'EDUCATION' | 'GIVING_BACK' | 'WORKING';
  hours: number;
  description: string;
  evidenceUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  reviewedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}