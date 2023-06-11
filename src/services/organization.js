import axios from 'axios';

class OrganizationService {
  async getOrganizationById(organizationId) {
    try {
      // const url = `api/applicants/1`;
      const url = `/api/organizations/${organizationId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getJobByOrganizationId(organizationId, job) {
    try {
      // const url = `api/applicants/1`;
      const url = `/api/organizations/${organizationId}/jobs`;
      const response = await axios.get(url, job);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new OrganizationService();