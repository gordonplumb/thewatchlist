export class HttpClient {
  private endpoint: string
  private getToken: Function

  protected constructor(endpoint: string, getToken: Function) {
    this.endpoint = endpoint
    this.getToken = getToken
  }

  private async sendRequest(
    method: string,
    path: string,
    headers: Headers | null,
    body: object | null
  ) {
    if (!headers) {
      headers = new Headers()
    }

    const token = await this.getToken()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }

    let result
    try {
      const response = await fetch(`${this.endpoint}/${path}`, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
      })
      if (response.ok) {
        result = {
          ok: true,
          body: response.status !== 204 ? await response.json() : null
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
      result = { ok: false }
    }
    return result
  }

  public async sendGet(path: string, params: Record<string, string> | null = null) {
    return this.sendRequest(
      'GET',
      params ? `${path}?${new URLSearchParams(params)}` : path,
      null,
      null
    )
  }

  public async sendPost(path: string, body: object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    
    return this.sendRequest('POST', path, headers, body)
  }

  public async sendPut(path: string, body: object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    return this.sendRequest('PUT', path, headers, body)
  }

  public async sendDelete(path: string) {
    return this.sendRequest('DELETE', path, null, null)
  }
}
