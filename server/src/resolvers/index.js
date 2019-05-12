import messages from "./queries/messages";
import { sendMessage, connectionUpdate } from "./mutations";
import SubscriptionResolver from "./SubscriptionResolver";


export default {
  Query: {
    messages
  },
  Mutation: {
    sendMessage,
    connectionUpdate
  },
  Subscription: SubscriptionResolver
};
