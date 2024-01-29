import { HttpClient } from './httpClient'
import { NodeClient } from './nodeClient'
import { BrowserClient } from './browserClient'

import config from '../conf'
import { MovieDetails } from '../types/MovieDetails'

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
    
    return result.body
  }
  
  public async signUp(name: string, email: string, password: string) {
    const result = await this.client.sendPost('auth/register', { name, email, password })
  
    return result.ok
  }

  // List Management
  public async getList(listId: string) {
    const result = await this.client.sendGet(`list/${listId}`)

    return result.body
  }
  public async getUserLists(userId: string) {
    const result = await this.client.sendGet(`list/user/${userId}`)

    return result.body
  }

  public async getListItems(listId: string, pageNumber: number, pageSize: number) {
    const result = await this.client.sendGet(`list/${listId}/items`, {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    })

    return result.body
  }

  public async addListItem(
    listId: string,
    tmdbId: number,
    title: string,
    tags: string[],
    runtime: number,
    watched: boolean
  ) {
    const result = await this.client.sendPost(`list/${listId}/items`, {
      tmdbId,
      title,
      tags,
      runtime,
      watched
    })

    return result.ok
  }

  public async updateListItem(
    listId: string,
    listItemId: string,
    updateValues: { tags: string[] | undefined, watched: boolean | undefined }
  ) {
    const result = await this.client.sendPut(
      `list/${listId}/items/${listItemId}`,
      updateValues
    )

    return result.ok
  }

  public async deleteListItem(listId: string, listItemId: string) {
    const result = await this.client.sendDelete(`list/${listId}/items/${listItemId}`)

    return result.ok
  }

  // search
  public async search(query: string, pageNumber: number) {
    const result = await this.client.sendGet('search', {
      query,
      pageNumber: pageNumber.toString() 
    })

    return result.body
  }

  public async getMovieDetails(id: number): Promise<MovieDetails> {
    const result = await this.client.sendGet(`search/${id}`)

    return result.body
  }
}
