import axios from 'axios';

class JobService {
  async getCandidatesByJob(jobId) {
    try {
      const url = `api/jobs/${jobId}/applicants`;
      const response = await axios.get(url);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  }

  async getRecommendedCandidatesByJob(jobId) {
    try {
      const url = `api/jobs/${jobId}/recommended`;
      const response = await axios.get(url);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  }
}

export default new JobService();
