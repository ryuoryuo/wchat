import { pubsub } from "../../pubsub";


export const sendMessage = (obj, args) => {
  pubsub.publish("messageAdded", {
    messageAdded: { message: args.input.inputValue }
  });

  return true;
};
