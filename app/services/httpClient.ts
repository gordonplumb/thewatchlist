export class HttpClient {
  private endpoint: string
  private getToken: Function

  protected constructor(endpoint: string, getToken: Function) {
    this.endpoint = endpoint
    this.getToken = getToken
  }

  public async sendGet(path: string) {
    const headers = new Headers()
    const token = await this.getToken()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    return fetch(`${this.endpoint}/${path}`)
  }

  public async sendPost(path: string, body: object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const token = await this.getToken()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    let result
    try {
      const response = await fetch(`${this.endpoint}/${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      })
      if (response.ok) {
        result = {
          ok: true,
          body: await response.json()
        }
      } else {
        result = {
          ok: false,
          status: response.status
        }
      }
    } catch (error) {
      console.log(error)
      // todo
    }
    return result
  }
}
