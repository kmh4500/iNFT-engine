
exports.complete = (channel, context, text) => {
  prompt="The following is a conversation with an AIN. AIN is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAIN: I am an AIN. How can I help you today?\n",
  prompt += 'Human: ' + text + '\n'
  moreOptions = {
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["\n", " Human:", " AIN:"]
  }
  return openai.CompletionsCreate(prompt, 150, "davinci", moreOptions)
}
