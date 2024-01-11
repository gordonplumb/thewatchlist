import ServiceClient from './serviceClient'

const client = ServiceClient.Instance()

export async function authenticate(email: string, password: string) {
  const result = await client.sendPost('auth/authenticate', { email, password })
  
  return result?.body
}

export async function signUp(name: string, email: string, password: string) {
  const result = await client.sendPost('auth/register', { name, email, password })

  return !!result?.ok
}
