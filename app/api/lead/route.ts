import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // In production, you would:
    // 1. Store lead in Sanity/database
    // 2. Send notification email to site owner
    // 3. Send confirmation email to user
    // For MVP, we log the lead
    console.log('New lead received:', {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new',
    })

    // TODO: Integrate with Resend/SendGrid for email notifications
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'PawCompare <noreply@pawcompare.co.za>',
    //   to: process.env.LEAD_NOTIFICATION_EMAIL,
    //   subject: `New Lead: ${data.name}`,
    //   html: `<p>New lead from PawCompare</p><pre>${JSON.stringify(data, null, 2)}</pre>`,
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
