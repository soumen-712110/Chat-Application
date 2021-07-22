import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    // console.log(props);
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];//to check if there are any active chats, then store the chat array.

    // console.log(chat,userName, messages);
    const renderReadReceipts = (message, isMyMessage) =>
        chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`,
                }}
            />
        ));


    const renderMessages = () => {
        const keys = Object.keys(messages);
        // console.log(keys);
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : key[index - 1];
            const isMyMessage = userName === message.sender.username;//to check whether this message was sent by the user who is using the app.

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={message[lastMessageKey]} />
                        }

                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}

                    </div>

                </div>
            )
        })
    }
    renderMessages();
    if (!chat) return 'Loading...';// if message is present then only render the chat else render loading.
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title" >
                    {chat?.title} {/* just to ensure that the chat is not null. */}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;