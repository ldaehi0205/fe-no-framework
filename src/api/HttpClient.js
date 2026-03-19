class HttpClient {
  #baseUrl = 'https://post-deo.free.beeceptor.com';
  // #baseUrl = '/mock';

  async get(url) {
    const response = await fetch(this.#baseUrl + url);
    return response.json();
  }

  async post(url, body) {
    const response = await fetch(this.#baseUrl + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async put(url, body) {
    const response = await fetch(this.#baseUrl + url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async delete(url) {
    const response = await fetch(this.#baseUrl + url, { method: 'DELETE' });
    return response.json();
  }
}

export default HttpClient;
