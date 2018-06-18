export default function splitMessage(message) {
  const MAX_LENGTH = 50;
  const messages = [];
  if (message.length < MAX_LENGTH) {
    messages.push(message);
    return messages;
  }
  let count = 1;
  let currentLength = 0;
  let currentMessage = '';
  const splittedMessage = message.split(' ');
  const refinedMessages = [];
  splittedMessage.map(
    (item, index) => {
      if (currentLength + item.length + 1 > MAX_LENGTH - 4) {
        messages.push(currentMessage);
        count++;
        currentMessage = item;
        currentLength = item.length;
        if (index === (splittedMessage.length - 1)) {
          messages.push(item);
        }
      } else {
        currentMessage += (index === 0 ? '' : ' ') + item;
        currentLength += (item.length + 1);
        if (index === (splittedMessage.length - 1)) {
          messages.push(currentMessage);
        }
      }
    }
  );

  messages.map(
    (item, index) => {
      refinedMessages.push(`${(index + 1)}/${count} ${item}`);
    }
  );
  return refinedMessages;
}
