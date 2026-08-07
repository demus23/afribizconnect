import { Resend } from 'resend'
function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}
const FROM   = 'AfriBizConnect <noreply@afribizconnect.com>'

// ── Welcome email on signup ──────────────────────────────────
export async function sendWelcomeEmail(email: string, name: string) {
  const resend = getResend()
if (!resend) return
await resend.emails.send({
    from: FROM, to: email,
    subject: 'Welcome to AfriBizConnect — Africa\'s Trade Platform',
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px">
        <div style="background:linear-gradient(135deg,#0c1e6b,#1e40af);border-radius:16px;padding:32px;margin-bottom:24px;text-align:center">
          <h1 style="color:#fbbf24;font-size:28px;margin:0 0 8px">AfriBizConnect</h1>
          <p style="color:rgba(191,219,254,0.8);margin:0;font-size:14px">Africa's B2B Trade Infrastructure Platform</p>
        </div>
        <h2 style="color:#0f172a;font-size:22px">Welcome, ${name}! 🎉</h2>
        <p style="color:#64748b;line-height:1.6">Your account is ready. You now have access to:</p>
        <ul style="color:#374151;line-height:2">
          <li>🏭 3,200+ verified global suppliers</li>
          <li>📋 Post unlimited RFQs and get quotes</li>
          <li>📈 Browse $46M+ in investment opportunities</li>
          <li>🚚 Freight quotes from DHL, Maersk, Emirates Cargo</li>
          <li>💬 Direct messaging with verified businesses</li>
          <li>🤖 AI trade assistant for duties, Incoterms, AfCFTA</li>
        </ul>
        <div style="margin:32px 0;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px">
            Go to your dashboard →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:12px;text-align:center">Complete your profile to get your Trust Score and Verified badge.</p>
        <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0"/>
        <p style="color:#94a3b8;font-size:11px;text-align:center">© 2025 AfriBizConnect Ltd. DIFC, Dubai, UAE</p>
      </div>
    `,
  })
}

// ── RFQ response notification ────────────────────────────────
export async function sendRfqResponseEmail(email: string, name: string, rfqTitle: string, supplierName: string) {
  const resend = getResend()
if (!resend) return
await resend.emails.send({
    from: FROM, to: email,
    subject: `New quote received for your RFQ: ${rfqTitle}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px">
        <h2 style="color:#0f172a">New supplier quote received 📦</h2>
        <p style="color:#64748b">Hi ${name},</p>
        <p style="color:#64748b"><strong>${supplierName}</strong> has responded to your RFQ: <strong>${rfqTitle}</strong></p>
        <div style="margin:24px 0;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/sourcing" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700">
            View quote →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:11px;text-align:center">© 2025 AfriBizConnect Ltd.</p>
      </div>
    `,
  })
}

// ── New message notification ─────────────────────────────────
export async function sendMessageEmail(email: string, name: string, senderName: string, preview: string) {
  const resend = getResend()
if (!resend) return
await resend.emails.send({
    from: FROM, to: email,
    subject: `New message from ${senderName} on AfriBizConnect`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px">
        <h2 style="color:#0f172a">New message received 💬</h2>
        <p style="color:#64748b">Hi ${name},</p>
        <p style="color:#64748b"><strong>${senderName}</strong> sent you a message:</p>
        <div style="background:#f8fafc;border-left:4px solid #1e40af;padding:16px;border-radius:8px;margin:20px 0">
          <p style="color:#374151;margin:0;font-style:italic">"${preview.slice(0,200)}${preview.length > 200 ? '...' : ''}"</p>
        </div>
        <div style="margin:24px 0;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/messages" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700">
            Reply now →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:11px;text-align:center">© 2025 AfriBizConnect Ltd.</p>
      </div>
    `,
  })
}

// ── Investment inquiry confirmation ──────────────────────────
export async function sendInvestmentInquiryEmail(email: string, name: string, dealTitle: string) {
  const resend = getResend()
if (!resend) return
await resend.emails.send({
    from: FROM, to: email,
    subject: `Investment inquiry received: ${dealTitle}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px">
        <h2 style="color:#0f172a">Investment inquiry confirmed 📈</h2>
        <p style="color:#64748b">Hi ${name},</p>
        <p style="color:#64748b">Your expression of interest in <strong>${dealTitle}</strong> has been received. The deal team will contact you within 48 hours.</p>
        <div style="margin:24px 0;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/invest" style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700">
            View all deals →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:11px;text-align:center">© 2025 AfriBizConnect Ltd.</p>
      </div>
    `,
  })
}

// ── Subscription confirmation ────────────────────────────────
export async function sendSubscriptionEmail(email: string, name: string, plan: string) {
  const resend = getResend()
if (!resend) return
await resend.emails.send({
    from: FROM, to: email,
    subject: `You're now on AfriBizConnect ${plan.charAt(0).toUpperCase() + plan.slice(1)}! 🚀`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px">
        <div style="background:linear-gradient(135deg,#0f172a,#1e3a8a);border-radius:16px;padding:32px;margin-bottom:24px;text-align:center">
          <h1 style="color:#fbbf24;font-size:24px;margin:0 0 8px">You're on ${plan.charAt(0).toUpperCase() + plan.slice(1)}! 🎉</h1>
          <p style="color:rgba(191,219,254,0.8);margin:0">AfriBizConnect Premium</p>
        </div>
        <p style="color:#64748b">Hi ${name}, your subscription is active. All premium features are now unlocked.</p>
        <div style="margin:24px 0;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700">
            Go to dashboard →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:11px;text-align:center">© 2025 AfriBizConnect Ltd.</p>
      </div>
    `,
  })
}

// ── Verification approved ────────────────────────────────────
export async function sendVerificationEmail(email: string, name: string, businessName: string, score: number) {
  const resend = getResend()
if (!resend) return
await resend.emails.send({
    from: FROM, to: email,
    subject: `${businessName} is now verified on AfriBizConnect ✅`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:24px;margin-bottom:24px;text-align:center">
          <div style="font-size:40px;margin-bottom:8px">✅</div>
          <h2 style="color:#059669;margin:0">Business Verified!</h2>
        </div>
        <p style="color:#64748b">Hi ${name},</p>
        <p style="color:#64748b">Congratulations! <strong>${businessName}</strong> has been verified with a Trust Score of <strong>${score}/100</strong>.</p>
        <p style="color:#64748b">Your verified badge is now live on the marketplace. Expect increased inquiries from buyers and investors.</p>
        <div style="margin:24px 0;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/marketplace" style="background:linear-gradient(135deg,#059669,#047857);color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700">
            View your listing →
          </a>
        </div>
        <p style="color:#94a3b8;font-size:11px;text-align:center">© 2025 AfriBizConnect Ltd.</p>
      </div>
    `,
  })
}
