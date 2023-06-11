import axios from "axios"

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
  
    getDetailJob(jobId){
        return axios.get(`/api/jobs/${jobId}`);
    }

    applyJob(jobId, applicantId) {
        return axios.post(
          `/api/jobs/${jobId}?appliedUserId=${applicantId}&applicantId=${applicantId}`,
        );
    }

    unapplyJob(jobId, applicantId) {
        return axios.delete(`/api/jobs/${jobId}`, { data: { applicantId } });
    }
    getListApplicantByJobId(jobId)
    {
        return axios.get(`api/jobs/${jobId}/applicants`);
    }
}

export default new JobService();
