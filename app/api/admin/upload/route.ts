import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Uploads are not connected. Add BLOB_READ_WRITE_TOKEN, or paste an image URL instead." }, { status: 503 });
    }
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
    if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 4 MB." }, { status: 400 });
    // Never trust the client: verify the declared MIME type AND the file's
    // magic bytes before storing anything publicly.
    const ALLOWED: Record<string, number[][]> = {
      "image/jpeg": [[0xff, 0xd8, 0xff]],
      "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
      "image/gif": [
        [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
      ],
      "image/webp": [[0x52, 0x49, 0x46, 0x46]],
      "image/avif": [[0x00, 0x00, 0x00]],
    };
    const sigs = ALLOWED[file.type];
    if (!sigs) return NextResponse.json({ error: "Only JPG, PNG, GIF, WebP or AVIF images." }, { status: 400 });
    const head = new Uint8Array((await file.slice(0, 12).arrayBuffer()));
    const matches = sigs.some((sig) => {
      if (file.type === "image/avif") {
        // AVIF: 4-byte size, then "ftyp", then brand (avif/mif1/msf1/heic…).
        return head.length >= 12 && head[4] === 0x66 && head[5] === 0x74 && head[6] === 0x79 && head[7] === 0x70;
      }
      return sig.every((b, i) => head[i] === b);
    });
    if (!matches) return NextResponse.json({ error: "That file is not a real image." }, { status: 400 });
    const blob = await put(`products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    if (!url) return NextResponse.json({ error: "Missing url." }, { status: 400 });
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
