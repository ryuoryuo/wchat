import React, { useEffect } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";


const MESSAGES_QUERY = gql`
  {
    hi
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessageAdded {
    messageAdded {
      content
    }
  }
`;

const ChatProviderInner = ({ subscribeToNewMessages, children, ...props }) => {
  useEffect(() => {
    subscribeToNewMessages();
  }, []);

  return children;
};

export const ChatProvider = ({ children }) => (
  <Query query={MESSAGES_QUERY}>
    {({ subscribeToMore, ...result }) => (
      <ChatProviderInner
        {...result}
        subscribeToNewMessages={() =>
          subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.messageAdded;

              return Object.assign({}, prev, {
                entry: {
                  messageList: [newMessage, ...prev.entry.messageList],
                },
              });
            },
          })
        }
      >
        {children}
      </ChatProviderInner>
    )}
  </Query>
);
