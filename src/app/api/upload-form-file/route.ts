import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextRequest, NextResponse } from 'next/server'

const MAX_SIZE_MB = 10

const s3 = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

export async function POST(req: NextRequest) {
  const { filename, contentType, sizeMB } = await req.json()

  if (!filename || !contentType) {
    return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 })
  }

  if (sizeMB > MAX_SIZE_MB) {
    return NextResponse.json({ error: `File exceeds the ${MAX_SIZE_MB}MB limit` }, { status: 400 })
  }

  const safeName = (filename as string).replace(/[^a-zA-Z0-9._-]/g, '_')
  const filePath = `form-uploads/${Date.now()}_${safeName}`
  const bucket = process.env.S3_BUCKET!

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: filePath,
    ContentType: contentType,
  })

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 })

  // Public URL uses Supabase's storage REST pattern, matching what Payload uses for media
  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`

  return NextResponse.json({ signedUrl, publicUrl })
}
