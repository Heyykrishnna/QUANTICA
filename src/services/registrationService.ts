import api from '../lib/api';
import { RegistrationTeam, VerificationStatus, CheckInStatus } from '../types/registration';

export const registrationService = {
    getTeams: async (params?: {
        eventId?: string;
        status?: string;
        search?: string;
        verificationStatus?: string;
    }): Promise<RegistrationTeam[]> => {
        const response = await api.get('/registration/teams', { params });
        return response.data;
    },

    createTeam: async (data: Omit<RegistrationTeam, 'id' | 'checkInStatus' | 'verificationStatus'>): Promise<RegistrationTeam> => {
        const response = await api.post('/registration/teams', data);
        return response.data;
    },

    updateTeam: async (
        id: string,
        data: {
            checkInStatus?: CheckInStatus;
            verificationStatus?: VerificationStatus;
            members?: { name: string; isChecked: boolean }[];
        }
    ): Promise<RegistrationTeam> => {
        const response = await api.put(`/registration/teams/${id}`, data);
        return response.data;
    },

    verifyTeam: async (id: string, status: VerificationStatus): Promise<RegistrationTeam> => {
        const response = await api.post(`/registration/teams/${id}/verify`, { status });
        return response.data;
    },

    deleteTeam: async (id: string): Promise<void> => {
        await api.delete(`/registration/teams/${id}`);
    },
};
