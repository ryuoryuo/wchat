import { pubsub } from "../pubsub";


export default {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator("messageAdded")
  }
};
