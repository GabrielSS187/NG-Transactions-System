export const apiUrl = process.env.API_URL === "http://host.docker.internal:8000"
? process.env.DOCKER_API_URL : process.env.API_URL;


