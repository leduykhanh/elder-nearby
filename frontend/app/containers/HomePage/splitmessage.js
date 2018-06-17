export default function splitMessage(message) {
  let MAX_LENGTH = 5;
  let messages = [];
  if (message.length < MAX_LENGTH) {
    messages.push(message);
    return messages;
  }
  let total = 1, count = 1;
  let currentLength = 4, currentMessage = "";
  let splittedMessage = message.split(" ");
  let refinedMessages = [];
  splittedMessage.map(
    (item) => {
      if (currentLength + item.length + 1 > MAX_LENGTH) {
        messages.push(currentMessage);
        count ++;
        total ++;
        currentMessage = "";
        currentLength = 0;
      }
      else {
        currentMessage += item;
        currentLength += (item.length + 1);
      }
    }
  );

  console.log(messages);

  messages.map(
    (item, index) => {
      refinedMessages.push( (index + 1) + "/" + count + " " + item);
    }
  );
  return refinedMessages;
}
