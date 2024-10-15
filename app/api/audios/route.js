import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const audioDirectory = path.join(process.cwd(), 'public/audios');
  const filenames = fs.readdirSync(audioDirectory);
  const audioFiles = filenames.map((name) => `/audios/${name}`);
  
  return NextResponse.json(audioFiles);
}