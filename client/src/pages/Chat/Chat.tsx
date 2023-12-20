import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { isConnected } from "../../context/signals";
import { AuthenticatedUser } from "../UserSettings/UserSettings";
import ChatSidebar from "./ChatSidebar";

type SocketMessage = {
  action: "sendPublic" | "sendSystem" | "sendConnections" | "sendPrivate",
  username: string,
  sub: string,
  type: string,
  message: string
}

const Chat = () => {
  const { getAuthenticatedUser, getSession } = useContext(AccountContext);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(null);
  const [messages, setMessages] = useState<Array<{username?: string; message: string; isCurrentUser?: boolean; type: string; sub: string}>>([]);
  const [inputValue, setInputValue] = useState('');

  // helper for chat messaging input:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // TODO: channels or groups
  const chatChannels = ["all", "react", "go", "aws"];

  // Socket usage:
  const socket = useRef<WebSocket | null>(null);

  // socket methods:
  const onSocketOpen = useCallback(() => {
    if (authenticatedUser) {
      isConnected.value = true;
      socket.current?.send(JSON.stringify({
        action: 'sendPublic',
        sub: authenticatedUser.sub,
        type: "systemMessage",
        message: `User ${authenticatedUser.username} connected`
      }));
    }
  }, [authenticatedUser]);

  const onSocketClose = useCallback(() => {
    isConnected.value = false;
  }, []);

  const onSocketMessage = useCallback((dataStr: string) => {
    if (authenticatedUser) {
      const data: SocketMessage = JSON.parse(dataStr);
      const type = data.type;

      if (type === "userMessage") {
        const isCurrentUser = data.sub === authenticatedUser.sub;
        setMessages(oldMessages => [
          ...oldMessages,
          { username: data.username, message: data.message, isCurrentUser, type: "user", sub: data.sub }
        ]);
      } else if (type === "systemMessage") {
        setMessages(oldMessages => [
          ...oldMessages,
          { message: data.message, type: "system", sub: data.sub }
        ]);
      }
    }
  }, [authenticatedUser]);

  // socket usage:
  const onConnect = useCallback(() => {
    if (socket.current?.readyState !== WebSocket.OPEN && authenticatedUser) {
      socket.current = new WebSocket(import.meta.env.VITE_AWS_WEBSOCKET_URL);
      socket.current?.addEventListener('open', onSocketOpen);
      socket.current?.addEventListener('close', onSocketClose);
      socket.current?.addEventListener('message', event => {
        onSocketMessage(event.data);
      });
    }
  }, [onSocketOpen, onSocketClose, onSocketMessage, authenticatedUser]);

  useEffect(() => {
    getSession()
      .then(() => {
        getAuthenticatedUser().then((user: AuthenticatedUser) => {
          if (user) {
            setAuthenticatedUser(user);
          }
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });

    return () => {
      socket.current?.close();
    };
  }, [getSession, getAuthenticatedUser]);

  const onSendPublicMessage = useCallback(() => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      if (authenticatedUser && inputValue.length > 0) {
        socket.current?.send(JSON.stringify({
          action: 'sendPublic',
          username: authenticatedUser.username,
          sub: authenticatedUser.sub,
          type: "userMessage",
          message: inputValue
        }));
        setInputValue('');
      }
    }
  }, [inputValue, authenticatedUser])

  const onDisconnect = useCallback(() => {
    socket.current?.close();
    isConnected.value = false;
    console.log('Disconnected');
  }, []);

  return (
  <>
    <ChatSidebar chatChannels={chatChannels} authenticatedUser={authenticatedUser}/>
    <div id="chat-content-view" className="content fixed w-full sm:w-[calc(100%-256px)] left-0 sm:left-[256px]">
      <div className="my-6 mx-6 flex items-center">
        <div>
          {isConnected.value ? (
            <button
              onClick={onDisconnect}
              className="py-2 px-6 rounded bg-white border border-2 border-gray-300 text-gray-900">
                Disconnect
            </button>
          ) : (
            <button
              onClick={onConnect}
              className="py-2 px-6 rounded bg-chat-blue text-white border border-2 border-chat-blue">
                Connect
            </button>
          )}
        </div>
        <div className="flex items-center">
          <p className="fixed right-6 select-none">
          {isConnected.value ? (
            <>
              <span className="inline-block w-2.5 h-2.5 bg-green-500 bg-green-500 rounded-full mr-2 mt-[1.5px]" />
              Connected
            </>
          ) : (
            <>
              <span className="inline-block w-2.5 h-2.5 bg-gray-300 dark:bg-gray-300 rounded-full mr-2 mt-[1.5px]" />
              <span className="text-gray-400">
                  Disconnected
              </span>
            </>
          )}
          </p>
        </div>
      </div>
      <hr className="h-px w-100% my-0 bg-gray-200 border-0 dark:bg-gray-200"></hr>
      <div className="my-6 mx-6 flex flex-col overflow-y-auto overflow-x-hidden h-[calc(100vh-276px)]">
        {messages.map((msg, index) => {
          let messageClasses = "my-1 px-4 py-2 rounded-lg";
          if (msg.type === "user") {
            messageClasses += msg.isCurrentUser ? " ml-auto bg-blue-600 text-white" : " mr-auto bg-gray-100";
          } else if (msg.type === "system") {
            if (msg.sub != authenticatedUser?.sub) {
              messageClasses += " mr-auto italic text-gray-500";
            } else {
              messageClasses += " hidden";
            }
          }

          return (
            <div key={index} className={messageClasses}>
              {msg.type === "user" && <span className="font-bold">{msg.username}</span>}
              <span className="block break-words">{msg.message}</span>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 bg-white flex w-full sm:w-[calc(100%-256px)] h-[90px] py-6 px-6">
        {isConnected.value ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => { if (e.key === 'Enter') onSendPublicMessage(); }}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <button
              onClick={onSendPublicMessage}
              className="py-2 px-6 ml-2 rounded bg-chat-blue text-white flex-shrink-0">
                Send message
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value=""
              placeholder="Connect to the server to send a message."
              disabled
              aria-disabled
              className="bg-white border border-gray-300 placeholder-gray-400 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-sm rounded-lg block w-[100%] p-2.5 dark:border-gray-600 dark:placeholder-gray-400" />
            <button
              onClick={onSendPublicMessage}
              disabled
              aria-disabled
              className="py-2 px-6 ml-2 rounded bg-chat-blue text-white flex-shrink-0 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none">
                Send message
            </button>
          </>
        )}
      </div>
    </div>
  </>
  )
}

export default Chat;