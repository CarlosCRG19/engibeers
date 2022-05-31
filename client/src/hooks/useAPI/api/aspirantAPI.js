import APIGateway from './apiGateway';

class AspirantAPI extends APIGateway {
  async getAll() {
    try {
      const response = await this._client.get('/aspirants');

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const response = await this._client.post('/aspirants/login', { email, password });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AspirantAPI;