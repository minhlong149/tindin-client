import axios from 'axios';
class ApplicantService {
  getOrganizationInHCM() {
    return axios.get('/api/organizations?location=Hồ Chí Minh');
  }

  getRecommendJobByApplicantId(userId, page) {
    return axios.get(`api/jobs?applicantId=${userId}&pageNumber=${page}&pageSize=12`);
  }
}

export default new ApplicantService();
