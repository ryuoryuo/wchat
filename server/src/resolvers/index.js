import hi from "./queries/hi";

import SubscriptionResolver from "./SubscriptionResolver";


export default {
  Query: {
    hi
  },
  Subscription: SubscriptionResolver
};
