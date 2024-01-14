import { getSession } from 'next-auth/react';
import { HttpClient } from './httpClient';

async function getToken() {
  const session = await getSession()
  return session?.accessToken
}

export class BrowserClient extends HttpClient {
  public constructor(endpoint: string) {
    super(endpoint, getToken)
  }
}
