export const apiUrl = process.env.NEXT_PUBLIC_API_URL === "http://host.docker.internal:8000"
? process.env.NEXT_PUBLIC_DOCKER_API_URL : process.env.NEXT_PUBLIC_API_URL;