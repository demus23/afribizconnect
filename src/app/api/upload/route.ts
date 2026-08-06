import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.formData()
    const file     = formData.get('file') as File
    const bucket   = (formData.get('bucket') as string) || 'documents'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })

    const allowed = ['image/jpeg','image/png','image/webp','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })

    const ext      = file.name.split('.').pop()
    const filename = `${user.id}/${Date.now()}.${ext}`
    const bytes    = await file.arrayBuffer()
    const buffer   = Buffer.from(bytes)

    const { data, error } = await supabase.storage.from(bucket).upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filename)

    return NextResponse.json({ url: publicUrl, path: filename, name: file.name, size: file.size, type: file.type })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
