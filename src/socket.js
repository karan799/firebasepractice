import { io } from 'socket.io-client';


const URL = 'http://localhost:4000';
//  process.env.NODE_ENV === 'production' ? undefined :

export const socket = io(URL);