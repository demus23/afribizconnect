import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM   = 'AfriBizConnect <hello@afribizconnect.com>'

const TEMPLATES = {
  welcome: (name: string) => ({
    subject: 'Welcome to AfriBizConnect 🌍',
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px">
        <div style="background:linear-gradient(135deg,#0c1e6b,#1e40af);border-radius:16px;padding:32px;margin-bottom:24px;text-align:center">
          <h1 style="color:white;font-size:28px;margin:0 0 8px">Welcome, ${name}! 🌍</h1>
          <p style="color:rgba(191,219,254,0.8);margin:0;font-size:15px">Africa's #1 B2B Trade Platform</p>
        </div>
        <p style="color:#374151;font-size:15px;line-height:1.6">Your account is active. Here's what you can do right now:</p>
        <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:20px 0">
          ${['🛒 Browse 3,200+ verified global suppliers','📋 Post your first RFQ and receive quotes','📈 Explore $46M+ in active investment deals','🚚 Get freight quotes from DHL, Maersk, and more','🤖 Ask our AI assistant any trade question'].map(item => `<div style="padding:8px 0;color:#374151;font-size:14px;border-bottom:1px solid #e8edf3">${item}</div>`).join('')}
        </div>
        <div style="text-align:center;margin:28px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block">
            Go to your dashboard →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:12px;text-align:center">AfriBizConnect Ltd · DIFC, Dubai, UAE · <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color:#94a3b8">Privacy</a> · <a href="${process.env.NEXT_PUBLIC_APP_URL}/terms" style="color:#94a3b8">Terms</a></p>
      </div>
    `
  }),

  rfq_posted: (name: string, rfqTitle: string) => ({
    subject: `RFQ posted: "${rfqTitle}" — suppliers will respond within 24h`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px">
          <h2 style="color:#059669;margin:0 0 8px">✅ RFQ Published Successfully</h2>
          <p style="color:#065f46;margin:0;font-size:14px">Your buyer request is now live to 3,200+ verified suppliers</p>
        </div>
        <p style="color:#374151;font-size:15px">Hi ${name},</p>
        <p style="color:#374151;font-size:15px;line-height:1.6">Your RFQ "<strong>${rfqTitle}</strong>" has been posted. Verified suppliers matching your requirements will respond within 24-48 hours.</p>
        <div style="text-align:center;margin:28px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/sourcing" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;display:inline-block">
            View your RFQ →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:12px;text-align:center">AfriBizConnect Ltd · DIFC, Dubai, UAE</p>
      </div>
    `
  }),

  new_message: (name: string, senderName: string, preview: string) => ({
    subject: `New message from ${senderName} on AfriBizConnect`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px">
        <h2 style="color:#0f172a">💬 New message from ${senderName}</h2>
        <div style="background:#f8fafc;border-left:4px solid #1e40af;padding:16px;border-radius:0 8px 8px 0;margin:20px 0">
          <p style="color:#374151;margin:0;font-style:italic">"${preview}"</p>
        </div>
        <div style="text-align:center;margin:28px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/messages" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;display:inline-block">
            Reply now →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:12px;text-align:center">AfriBizConnect Ltd · DIFC, Dubai, UAE</p>
      </div>
    `
  }),

  investment_inquiry: (name: string, dealTitle: string) => ({
    subject: `Investment inquiry received: ${dealTitle}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px">
        <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin-bottom:24px">
          <h2 style="color:#7c3aed;margin:0 0 8px">📈 New Investment Inquiry</h2>
          <p style="color:#5b21b6;margin:0;font-size:14px">An investor has expressed interest in your deal</p>
        </div>
        <p style="color:#374151;font-size:15px">Hi ${name},</p>
        <p style="color:#374151;font-size:15px;line-height:1.6">A verified investor has expressed interest in "<strong>${dealTitle}</strong>". Check your messages to respond.</p>
        <div style="text-align:center;margin:28px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/messages" style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;display:inline-block">
            View inquiry →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:12px;text-align:center">AfriBizConnect Ltd · DIFC, Dubai, UAE</p>
      </div>
    `
  }),

  upgrade_confirmation: (name: string, plan: string) => ({
    subject: `You're now on the ${plan} plan 🎉`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px">
        <div style="background:linear-gradient(135deg,#0c1e6b,#1e40af);border-radius:16px;padding:32px;margin-bottom:24px;text-align:center">
          <h1 style="color:#fbbf24;font-size:24px;margin:0 0 8px">🎉 Welcome to ${plan}!</h1>
          <p style="color:rgba(191,219,254,0.8);margin:0">You now have full access to AfriBizConnect ${plan}</p>
        </div>
        <p style="color:#374151;font-size:15px">Hi ${name}, your upgrade is confirmed. Your new features are active immediately.</p>
        <div style="text-align:center;margin:28px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0c1e6b;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;display:inline-block">
            Explore your new features →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:12px;text-align:center">AfriBizConnect Ltd · DIFC, Dubai, UAE</p>
      </div>
    `
  }),
}

export async function POST(request: NextRequest) {
  try {
    const { type, to, name, ...data } = await request.json()
    if (!type || !to) return NextResponse.json({ error: 'Missing type or to' }, { status: 400 })

    let template
    switch (type) {
      case 'welcome':             template = TEMPLATES.welcome(name); break
      case 'rfq_posted':         template = TEMPLATES.rfq_posted(name, data.rfqTitle); break
      case 'new_message':        template = TEMPLATES.new_message(name, data.senderName, data.preview); break
      case 'investment_inquiry': template = TEMPLATES.investment_inquiry(name, data.dealTitle); break
      case 'upgrade':            template = TEMPLATES.upgrade_confirmation(name, data.plan); break
      default: return NextResponse.json({ error: 'Unknown email type' }, { status: 400 })
    }

    const result = await resend.emails.send({
      from:    FROM,
      to:      [to],
      subject: template.subject,
      html:    template.html,
    })

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
