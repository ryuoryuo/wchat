import React from "react";

import { ChatProvider } from "#/providers";

import { Chat as ChatView } from "./Chat";


export const Chat = () => (
  <ChatProvider>{messages => <ChatView {...messages} meta />}</ChatProvider>
);
