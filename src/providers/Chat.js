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
    }
  }
`;

const ChatProviderInner = ({
  subscribeToNewMessages, children, messages, ...props
}) => {
  useEffect(() => {
    subscribeToNewMessages();
  }, []);

  console.log(messages, "NEW");

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
                const newMessage = { message: subscriptionData.data.messageAdded.text };

                return {
                  messages: [newMessage],
                };

                return {
                  // ...prev,
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
