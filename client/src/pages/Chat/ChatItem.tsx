const ChatItem = ({ channel, selected }: { channel: string; selected: boolean }) => {
  const itemClass = `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
    selected ? 'bg-blue-500 text-white' : ''
  }`;

  return (
    <li id={channel} key={channel}>
      <a href={`#${channel}`} className={itemClass}>
        <span className="ml-3"># {channel}</span>
      </a>
    </li>
  );
};

export default ChatItem;
