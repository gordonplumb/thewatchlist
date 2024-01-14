import { getServerSession } from 'next-auth';
import { HttpClient } from './httpClient';

async function getToken() {
  const session = await getServerSession()
  return session?.accessToken
}

export class NodeClient extends HttpClient {
  public constructor(endpoint: string) {
    super(endpoint, getToken)
  }
}
