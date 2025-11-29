import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { knowledgeContent } from "@/utils/knowledge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const AGENCY_KB = knowledgeContent;

const SYSTEM_INSTRUCTION = `
You are a friendly, human-like cost estimation assistant for a software/AI agency.

Goals:
- Help the user understand rough costs for websites, apps, and AI/agentic solutions.
- Use ONLY the knowledge in the agency knowledge base unless the user asks something generic.
- If the user's question is vague or "half-baked", ask 2-3 clarifying questions before giving a number.
- Always mention that prices are rough estimates and that final quotes depend on scope and timelines.
- Keep answers concise, conversational, and non-robotic.
- Never over-promise exact cost. Use ranges and phrases like "around", "roughly", "typically starts from".
- Always remember: 
  - Basic frontend-only websites start from $500 based on $50/page payrate.
  - Full-stack websites/apps (frontend + backend) start from $1,000 based on $50/hour payrate.
  - Agentic / AI solutions start from $2,500 based on $50/hour payrate.
  - All starting prices already include a 35% early-bird discount.
  - The whole development typically takes 2-4 weeks depending on complexity.
`;

const buildChatHistory = (
  messages: { role: "user" | "assistant"; content: string }[]
) => {
  const last = messages.slice(-8);

  return last.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));
};

export async function POST(req: NextRequest) {
  console.log("Received request in cost estimator API");
  try {
    const body = await req.json();
    const messages = (body.messages || []) as {
      role: "user" | "assistant";
      content: string;
    }[];

    const userText = messages[messages.length - 1]?.content || "";

    const chatHistory = buildChatHistory(messages.slice(0, -1));

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                SYSTEM_INSTRUCTION +
                "\n\nHere is the agency knowledge base (pricing + services):\n\n" +
                AGENCY_KB,
            },
          ],
        },
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: userText }],
        },
      ],
    });

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    console.log("Error in cost estimator API:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
