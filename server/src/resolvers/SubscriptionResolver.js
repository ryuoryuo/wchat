import { pubsub, MSG_ADDED } from "../pubsub";


export default {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator([MSG_ADDED])
  }
};
