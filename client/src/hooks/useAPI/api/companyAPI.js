import APIGateway from './apiGateway';

class CompanyAPI extends APIGateway {
  async getAll() {
    try {
      const response = await this._client.get('/companies');

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const { data } = await this._client.get(`/companies/${id}`);

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const response = await this._client.post('/login/company', { email, password });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(email, password, company) {
    try {
      const response = await this._client.post('/signup/company', { email, password, company });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async listBySearchQuery(query) {
    try {
      const response = await this._client.get(`/companies/?name=${query}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CompanyAPI;
