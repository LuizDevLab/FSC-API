import "dotenv/config.js";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";

const app = express();

app.use(express.json());

app.post('/api/users', async (request, response) => {
  const createdUserController = new CreateUserController()

  const {statusCode, body} = await createdUserController.execute(request)

  response.status(statusCode).send(body);
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
