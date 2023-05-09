let apiKey = "";

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);
const app = express();

// CORS 이슈 해결
let corsOptions = {
  origin: "https://gptrecipe.pages.dev",
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/gptrecipe", async function (req, res) {
  let { myfoodName, userMessages, assistantMessages } = req.body;
  let message = [
    { role: "system", content: "당신은 요리사 입니다." },
    { role: "user", content: "당신은 요리사 입니다." },
    {
      role: "assistant",
      content:
        "네, 저는 요리에 대해 도움을 드릴 수 있는 요리사 AI입니다. 어떤 종류의 요리나 질문이 있으신가요?",
    },
    {
      role: "user",
      content: `${myfoodName}에 대한 레시피를 알려주세요.`,
    },
  ];
  while (userMessages.length != 0 || assistantMessages != 0) {
    if (userMessages.length != 0) {
      message.push({
        role: "user",
        content: String(userMessages.shift().replace(/\n/g, "<br />")),
      });
    }
    if (assistantMessages != 0) {
      message.push({
        role: "assistant",
        content: String(assistantMessages.shift().replace(/\n/g, "<br />")),
      });
    }
  }
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    top_p: 0.8,
    max_tokens: 1000,
    presence_penalty: 0.4,
    messages: message,
  });
  let guide = completion.data.choices[0].message["content"];
  console.log(guide);
  // res.send(guide)
  res.json({ assistant: guide });
});

const serverless = require("serverless-http");
// app.listen(3000);
module.exports.handler = serverless(app);
