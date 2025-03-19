import { server } from "./mocks/browser";

server.listen();

async function app() {
    const response = await fetch("http://localhost:8080/applications");
    const applications = await response.json();
    console.log(applications);
}

app()
