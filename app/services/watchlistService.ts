import { HttpClient } from './httpClient'
import { NodeClient } from './nodeClient'
import { BrowserClient } from './browserClient'

import config from '../conf'

export class WatchlistService {
  private client: HttpClient
  private static service: WatchlistService

  private constructor(isServer: boolean) {
    const endpoint = `${config.serviceEndpoint}/api`
    this.client = isServer ? new NodeClient(endpoint) : new BrowserClient(endpoint)
  }

  public static GetServerInstance() {
    return this.service || (this.service = new this(true))
  }

  public static GetBrowserInstance() {
    return this.service || (this.service = new this(false))
  }

  // Authentication

  public async authenticate(email: string, password: string) {
    const result = await this.client.sendPost('auth/authenticate', { email, password })
    
    return result?.body
  }
  
  public async signUp(name: string, email: string, password: string) {
    const result = await this.client.sendPost('auth/register', { name, email, password })
  
    return !!result?.ok
  }

  // List Management
  public async getListItems(listId: number, pageNumber: number, pageSize: number) {
  
  }
}
