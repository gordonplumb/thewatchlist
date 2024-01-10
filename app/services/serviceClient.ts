import config from '../conf'

class ServiceClient {
  private endpoint: string
  private static client: ServiceClient

  private constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  public static Instance() {
    return this.client || (this.client = new this(`${config.serviceEndpoint}/api`))
  }

  public sendGet(path: string) {
    return fetch(`${this.endpoint}/${path}`)
  }

  public async sendPost(path: string, body: object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let result
    try {
      const response = await fetch(`${this.endpoint}/${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      })
      if (response.ok) {
        result = {
          body: await response.json()
        }
      } else {
        result = {
          status: response.status
        }
      }
    } catch (error) {
      // todo
    }
    return result
  }
}

export default ServiceClient
