import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No se subió ningún archivo' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generar un nombre único para evitar colisiones
    const extension = file.name.split('.').pop();
    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = join(process.cwd(), 'public', 'uploads', filename);

    await writeFile(path, buffer);
    
    // Devolvemos la URL pública
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Error interno del servidor' 
    });
  }
}
