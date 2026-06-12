/**
 * Backend API client (Axios/fetch).
 * Handles authentication and request/response formatting.
 */

export const apiClient = {
  getQueue: async () => ({}),
  getIncident: async (id: string) => ({}),
  approveIncident: async (id: string) => ({}),
  rejectIncident: async (id: string, reason: string) => ({})
};
