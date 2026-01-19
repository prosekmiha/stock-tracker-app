import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) return NextResponse.json([])

  try {
    const res = await fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${encodeURIComponent(query)}`)
    
    // preverimo, če vrača JSON
    const contentType = res.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      console.error("Non-JSON response", await res.text())
      return NextResponse.json([])
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error("Ticker API error:", err)
    return NextResponse.json([])
  }
}
