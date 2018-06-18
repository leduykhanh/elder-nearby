import splitMessage from 'containers/HomePage/splitmessage';

describe('testSplitText', () => {
  it('should generate the messages', () => {
    const message1 = 'I can\'t believe Tweeter now supports chunking my messages, so I don\'t have to do it myself.';
    const messages1 = ['1/2 I can\'t believe Tweeter now supports chunking', '2/2 my messages, so I don\'t have to do it myself.'];
    const message2 = 'short one one';
    const messages2 = ['short one one'];
    expect(splitMessage(message1)).toEqual(messages1);
    expect(splitMessage(message2)).toEqual(messages2);
  });
});
