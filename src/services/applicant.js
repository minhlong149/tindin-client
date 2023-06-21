import axios from 'axios';

class ApplicantService {
  async getApplicantById(id) {
    try {
      // const url = `api/applicants/1`;
      const url = `/api/applicants/${id}`;
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
      const url = `/api/applicants/${id}`;
      const response = await axios.put(url, applicant);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getOrganizationInHCM() {
    return axios.get('/api/organizations?location=Hồ Chí Minh');
  }

  getRecommendJobByApplicantId(userId, page) {
    return axios.get(`api/jobs?applicantId=${userId}&pageNumber=${page}&pageSize=12`);
  }

  getJobPT(userId, page) {
    return axios.get(
      `api/jobs?applicantId=${userId}&pageNumber=${page}&pageSize=12&jobType=Part-time&jobTitle= `,
    );
  }

  getJobFT(userId, page) {
    return axios.get(
      `api/jobs?applicantId=${userId}&pageNumber=${page}&pageSize=12&jobType=Full-time&jobTitle= `,
    );
  }

  getJobIT(userId, page) {
    const type = 'Technology, Information & Media';
    return axios.get(
      `api/jobs?applicantId=${userId}&pageNumber=${page}&organizationIndustry=${type}&pageSize=12`,
    );
  }

  getJobFS(userId, page) {
    const type = 'Financial Services';
    return axios.get(
      `api/jobs?applicantId=${userId}&pageNumber=${page}&organizationIndustry=${type}&pageSize=12`,
    );
  }

  getJobHospital(userId, page) {
    const type = 'Hospitals and Health Care';
    return axios.get(
      `api/jobs?applicantId=${userId}&pageNumber=${page}&organizationIndustry=${type}&pageSize=12`,
    );
  }
}

export default new ApplicantService();