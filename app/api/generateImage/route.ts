import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const res = await request.json();
    const prompt = res.prompt;
    // connec to azure
   const response = await fetch(`https://ai-image-sanity-app.azurewebsites.net/api/generateimage`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt }),
   });
   const textData = await response.text();
   return NextResponse.json(textData)
}