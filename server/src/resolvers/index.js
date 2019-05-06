import messages from "./queries/messages";
import { sendMessage } from "./mutations";
import SubscriptionResolver from "./SubscriptionResolver";


export default {
  Query: {
    messages
  },
  Mutation: {
    sendMessage
  },
  Subscription: SubscriptionResolver
};
