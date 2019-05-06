import { pubsub } from "../../pubsub";


export const sendMessage = (obj, args, context) => {
  pubsub.publish("messageAdded", {
    messageAdded: { message: args.input.inputValue }
  });

  return true;
};
