export function GET() {
    return new Response(JSON.stringify({
        time: Date.now()
    }));
}