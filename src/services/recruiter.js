import axios from "axios";

class RecruiterService {
  async getJobsByRecruiter(recruiterId) {
    try {
      const url = `api/recruiters/${recruiterId}/jobs`;
      const response = await axios.get(url);
      console.log('RecruiterService.getJobsByRecruiter');
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  }
}

export default new RecruiterService();
