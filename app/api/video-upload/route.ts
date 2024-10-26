import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    [key: string]: unknown;

}

export async function POST(request: NextRequest) {
    

    try {
        //todo to check user
        if(
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET ||
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        ){
            return NextResponse.json({error: 'Cloudinary not configured'}, {status: 500});
        }


        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const originalSize = formData.get('originalSize') as string;

        if(!file) {
            return NextResponse.json({error: 'No file found'}, {status: 400});
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: 'nextjs-imageDown-video-uploads',
                    transformation:[
                        {quality: 'auto' ,fetchformat: 'auto'},
                    ]
                },
                    (error, result) => {
                        if(error) 
                            reject(error);
                        else resolve(result as CloudinaryUploadResult);   
                }
            )
            uploadStream.end(buffer);
        }
        );

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize: originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
            }
        })
        return NextResponse.json(video)

        
    } catch (error) {
        console.log("Upload Video failed", error);
        return NextResponse.json({error: "Upload Video failed"}, {status: 500}); 
    }
    finally{
        await prisma.$disconnect()
    }
}