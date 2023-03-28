export async function GET(request: Request) {
    // connec to azure
    const response =await fetch(`https://ai-image-sanity-app.azurewebsites.net/api/getchatgptsuggestion`, {
        cache: "no-store",
    });

    const textData = await response.text();
    return new Response(JSON.stringify(textData.trim()), {
        status: 200,
    });
}