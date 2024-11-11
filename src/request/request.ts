export async function request(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown
): Promise<Response> {
    // const uuid = uuidv4(); // In case of Idempotency key
    // const envVars = await getEnvVars(); // In case of environment variables for frontend
    const baseUrl:string = "http://localhost:3000/"; //Replace with baseUrl from environment variables
    const token = "Input your bearer token here"; // Add bearer token

    const response: Response = await fetch(`${baseUrl}/${path}`,{
        method,
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    if (response.ok){
        return response;
    }

    throw response.statusText;
}