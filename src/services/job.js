import axios from "axios"

class JobService {

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
