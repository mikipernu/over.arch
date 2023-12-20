import { AuthenticatedUser } from '../UserSettings/UserSettings';

const ChatSidebar = ({ authenticatedUser }: { chatChannels: string[], authenticatedUser: AuthenticatedUser }) => {
  // TODO: add channels or users to sidebar
  // const location = useLocation();
  // const navigate = useNavigate();
  // const selectedChatChannel = location.hash.replace('#', '');

  // useEffect(() => {
  //   if (chatChannels.length > 0 && selectedChatChannel === '') {
  //     navigate(`#${chatChannels[0]}`, { replace: true });
  //   }
  // }, [chatChannels, selectedChatChannel, navigate]);

  return (
    <aside id="default-sidebar" className="fixed top-22 left-0 z-40 w-64 h-[calc(100%-4rem)] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {/* <h2 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white select-none">Channels:</h2>
        <ul className="space-y-2 font-medium">
          {chatChannels.map((channel) => (
            <ChatItem key={channel} channel={channel} selected={channel === selectedChatChannel} />
          ))}
        </ul> */}
      </div>
      <div className="fixed bottom-8 left-8 text-white">
        <p>Logged in as {authenticatedUser?.username}</p>
      </div>
    </aside>
  );
};

export default ChatSidebar;
