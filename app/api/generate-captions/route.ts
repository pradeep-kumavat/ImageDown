import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
  const reqBody = await req.json()
        const {text} = reqBody

  if (!text) {
    return NextResponse.json({
      success: false,
      message: 'No text provided by the user',
    });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = text;
    
    const result = await model.generateContent(prompt);
    console.log(result)

    console.log(result.response.text());

    return NextResponse.json({
      success:true,
      message: result.response.text()
    },
    {
      status: 200
    })

  } catch (error) {
      console.log("Error in generating response")
      console.log(error)
      return NextResponse.json({
        success:false,
        message:"Error in generating response"
      },
      {
        status: 500
      })
  }
  
}

