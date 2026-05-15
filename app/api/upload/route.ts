import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary si las variables existen
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No se subió ningún archivo' });
    }

    // Producción: usar Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Subir a Cloudinary como base64
      const base64 = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'pehueniago',
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
      });

      return NextResponse.json({
        success: true,
        url: result.secure_url,
      });
    }

    // Desarrollo local: guardar en /public/uploads/
    const { writeFile, mkdir } = await import('fs/promises');
    const { join } = await import('path');

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = file.name.split('.').pop();
    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = join(uploadsDir, filename);

    await writeFile(path, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Error interno del servidor',
    });
  }
}
