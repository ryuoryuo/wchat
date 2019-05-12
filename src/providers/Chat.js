import React, { useEffect } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";


const MESSAGES_QUERY = gql`
  {
    messages {
      message
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription messageAdded {
    messageAdded {
      message
      username
    }
  }
`;

const CONNECTION_SUBSCRIPTION = gql`
  subscription connectionMessage {
    connectionMessage {
      username
      connected
    }
  }
`;

const ChatProviderInner = ({
  subscribeToNewMessages,
  subscribeToNewConnections,
  children,
  messages,
  ...props
}) => {
  useEffect(() => {
    subscribeToNewMessages();
    subscribeToNewConnections();
  }, []);

  return children({ messages });
};

export const ChatProvider = ({ children }) => (
  <Query query={MESSAGES_QUERY}>
    {({
      subscribeToMore, data, loading, ...result
    }) => {
      if (loading || !data) return <div>Loading...</div>;

      return (
        <ChatProviderInner
          {...result}
          messages={data.messages}
          // messages={data.messages}
          subscribeToNewMessages={() =>
            subscribeToMore({
              document: MESSAGES_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.messageAdded;

                return {
                  messages: [...prev.messages, newMessage],
                };
              },
            })
          }
          subscribeToNewConnections={() =>
            subscribeToMore({
              document: CONNECTION_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { username, connected, __typename } = subscriptionData.data.connectionMessage;

                const message = connected
                  ? `${username} just joined chat`
                  : `${username} has left chat`;

                const newMessage = { message, __typename };

                return {
                  messages: [...prev.messages, newMessage],
                };
              },
            })
          }
        >
          {children}
        </ChatProviderInner>
      );
    }}
  </Query>
);
