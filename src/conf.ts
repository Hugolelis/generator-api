import fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "./middlewares/error_handler";

import { healthRoutes } from './routes/healthRoutes';
import { UUIDRoutes } from "./routes/uuidRoutes";
import { sortedNumberRoutes } from "./routes/sortedNumberRoutes";
import { dateRoutes } from "./routes/dateRoutes";
import { cpfRoutes } from "./routes/cpfRoutes";
import { passwordRoutes } from "./routes/passwordRoutes";
import { shortUrlRoutes } from "./routes/shortUrlRoutes";

export const app = fastify({ 
    logger: { transport: { target: 'pino-pretty' } }
});

app.setErrorHandler(errorHandler);
await app.register(cors);

const routes = [
    { route: healthRoutes, prefix: 'api/verify' },
    { route: UUIDRoutes, prefix: 'api/UUID' },
    { route: sortedNumberRoutes, prefix: 'api/sortedNumber' },
    { route: dateRoutes, prefix: 'api/date' },
    { route: cpfRoutes, prefix: 'api/CPF' },
    { route: passwordRoutes, prefix: 'api/password' },
    { route: shortUrlRoutes, prefix: 'api/shortUrl' }
];

routes.forEach(({ route, prefix }) => app.register(route, { prefix }));