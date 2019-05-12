import { pubsub } from "../../pubsub";


export const connectionUpdate = (obj, args) => {
  pubsub.publish("connectionMessage", {
    connectionMessage: {
      username: args.connection.username,
      connected: args.connection.connected
    }
  });

  return true;
};
