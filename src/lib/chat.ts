import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { nanoid } from "nanoid";
import { initialPrompt, jsonTemplate } from "./prompts";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  maxTokens: 200,
});

const getChain = (sessionId: string) => {
  const memory = new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: sessionId, // Or some other unique identifier for the conversation
      sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
      config: {
        url: process.env.UPSTASH_REDIS_REST_URL ?? "", // Override with your own instance's URL
        token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "", // Override with your own instance's token
      },
    }),
  });

  const chain = new ConversationChain({ llm: model, memory });

  return chain;
};

export async function chat(input: string, sessionId: string = nanoid()) {
  const chain = getChain(sessionId);

  const template = ChatPromptTemplate.fromMessages([
    ["human", "I picked option {input}"]
  ]);

  const formattedChatPrompt = await template.format({
    input,
  });

  console.log(formattedChatPrompt);

  const res = await chain.invoke({ input: formattedChatPrompt });
  console.log("===>", res);
  const body = JSON.parse(res.response);
  return body;
}

export async function startChat(input: string, sessionId: string = nanoid()) {
  const chain = getChain(sessionId);
  // const initPrompt = SystemMessagePromptTemplate.fromTemplate(initialPrompt);
  const template = ChatPromptTemplate.fromMessages([
    ["system", initialPrompt],
    ["human", "The story start with: {start}"]
  ]);
  const formattedChatPrompt = await template.format({
    json_template: jsonTemplate,
    start: input,
  });

  console.log(formattedChatPrompt);
  //const formattedChatPrompt = initialPrompt + input;

  // console.log(formattedChatPrompt);

  const res = await chain.invoke({ input: formattedChatPrompt });
  console.log("===>", res);
  // // configure the model to return json like responses.
  const body = JSON.parse(res.response);
  console.log(body);
  return body;
}
