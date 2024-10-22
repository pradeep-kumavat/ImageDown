import { GoogleGenerativeAI } from "@google/generative-ai";


import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse){
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
  const { text } = await req.body;

  if (!text) {
    return res.status(400).json({
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

    return Response.json({
      success:true,
      message: result.response.text()
    },
    {
      status: 200
    })

  } catch (error) {
      console.log("Error in generating response")
      return Response.json({
        success:false,
        message:"Error in generating response"
      },
      {
        status: 500
      })
  }
  
}

