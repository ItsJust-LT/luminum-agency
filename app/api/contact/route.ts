import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      ])

    if (error) throw error

    return NextResponse.json({ message: 'Message sent successfully!' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}