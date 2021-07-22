const MyMessage = ({ message }) => {
    if (message.attachments && message.attachments.length > 0) //the length of an image in an attachment is greater than 0 so we can check if it is an image then render it.
    {
        return (
            <img
                src={message.attachments[0].file}
                alt="message-attachments"
                className="message-image"
                style={{ float: 'right' }}
            />
        );
    }
    return (
        <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }} >
            {message.text}  {/* for normal messages*/}
        </div>

    );
}
export default MyMessage;