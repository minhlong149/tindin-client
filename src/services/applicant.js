import axios from 'axios';

class ApplicantService {
  async getApplicantById(id) {
    try {
      // const url = `api/applicants/1`;
      const url = `api/applicants/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateApplicant(id, applicant) {
    try {
      // const url = `api/applicants/1`;
      const url = `api/applicants/${id}`;
      const response = await axios.put(url, applicant);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ApplicantService();