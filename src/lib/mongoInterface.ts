import { ConnectionStates } from 'mongoose';

export interface MongoConnection {
    isConnection: ConnectionStates;
}
