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
  
  getAppliedJobs = async () => {
    try {
      const response = await axios.get(`/applicants/:id/jobs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  cancelApplication = async (jobId) => {
    try {
      await axios.delete(`/jobs/${jobId}`);
    } catch (error) {
      throw error;
    }
  };

  searchJobs = async (searchTerm) => {
    try {
      const response = await axios.get(`/api/jobs?search=${searchTerm}`);
      const results = response.data;
      // Process and filter the job search results
      const filteredJobs = results.filter((job) => {
        return job.title.includes(searchTerm);
      });
      console.log('Filtered job results:', filteredJobs);
      return filteredJobs;
    } catch (error) {
      throw new Error(`Error searching jobs: ${error.message}`);
    }
  };

  searchOrganizations = async (searchTerm) => {
    try {
      const response = await axios.get(`/api/organizations?search=${searchTerm}`);
      const results = response.data;
      // Process and filter the organization search results
      const filteredOrganizations = results.filter((organization) => {
        return organization.name.includes(searchTerm);
      });
      console.log('Filtered organization results:', filteredOrganizations);
      return filteredOrganizations;
    } catch (error) {
      throw new Error(`Error searching organizations: ${error.message}`);
    }
  };
}

export default new JobService();
