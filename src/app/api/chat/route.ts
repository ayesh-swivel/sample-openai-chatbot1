import { NextRequest, NextResponse } from "next/server";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import * as dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";

// export const GET = async (req: Request, res: NextResponse) => {
//     try {

//       return NextResponse.json({ message: "Success" }, { status: 200 });
//     } catch (err) {
//       return NextResponse.json({ message: "Error", err }, { status: 500 });
//     } finally {
//     //   await prisma.$disconnect();
//     }
//   };

dotenv.config();

const endpoint = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT || "";
const azureApiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY || "";

export async function POST(req: NextRequest) {
  console.log("== Chat Completion Sample ==");

  const body = await req.json();
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );
  const deploymentName = "HRAssistent";
  console.log(body.conversation);
  try {
    const events = await client.getChatCompletions(
      deploymentName,
      body.conversation
    );

    for (const choice of events.choices) {
      return NextResponse.json({ message: choice.message }, { status: 200 });
      console.log(choice.message);
    }
  } catch (error) {
    console.error("The sample encountered an error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

