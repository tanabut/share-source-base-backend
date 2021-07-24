import Koa from 'koa';
import { Server } from 'http';
import supertest, { SuperAgentTest } from 'supertest';
import { mockValidToken } from '../authentication/authentication.mock';

let request: SuperAgentTest;
let server: Server;

export async function setupApp(app: Koa) {
  server = app.listen();
  request = supertest.agent(server);
}

export function getAppRequest(id: number) {
  request.set('Authorization', `Bearer ${mockValidToken(id)}`);
  return request;
}

export function getUnauthorizedRequest() {
  request.set('Authorization', '');
  return request;
}

export async function closeApp() {
  await server.close();
}
