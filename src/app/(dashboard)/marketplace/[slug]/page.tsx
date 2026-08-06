import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { BadgeCheck, Globe2, MapPin, Package, Clock, CreditCard, ArrowLeft, MessageSquare, Star, TrendingUp, ShieldCheck, ExternalLink } from 'lucide-react'

const TYPE_LABELS: Record<string,string> = { SUPPLIER:'Supplier', LOGISTICS_PROVIDER:'Logistics', DISTRIBUTOR:'Distributor', IMPORTER:'Importer', INVESTOR:'Investor' }
const COUNTRY_NAMES: Record<string,string> = { AE:'UAE', CN:'China', TR:'Turkey', IN:'India', DE:'Germany', KR:'South Korea', DK:'Denmark', CH:'Switzerland', US:'USA', FR:'France', NG:'Nigeria', KE:'Kenya', GH:'Ghana', ZA:'South Africa', ET:'Ethiopia', EG:'Egypt', SN:'Senegal' }

export async function generateStaticParams() {
  const businesses = await prisma.business.findMany({
    where: { verificationStatus: 'VERIFIED' },
    select: { slug: true },
  })
  return businesses.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = await prisma.business.findUnique({ where: { slug } })
  if (!business) return { title: 'Supplier not found' }
  return {
    title: `${business.name} — AfriBizConnect Verified Supplier`,
    description: business.description?.slice(0, 160) || `${business.name} is a verified supplier on AfriBizConnect.`,
    openGraph: { title: business.name, description: business.description?.slice(0, 160) || '' },
  }
}

export default async function SupplierProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = await prisma.business.findUnique({
    where: { slug },
    include: { asSupplier: true, opportunities: { where: { isActive: true }, take: 3 } },
  })
  if (!business) notFound()

  const relatedBusinesses = await prisma.business.findMany({
    where: { verificationStatus:'VERIFIED', type: business.type, id: { not: business.id } },
    take: 4,
    select: { id:true, name:true, slug:true, country:true, trustScore:true, categories:true },
  })

  const trustColor = business.trustScore >= 80 ? '#00D4AA' : business.trustScore >= 60 ? '#C9A84C' : '#4A5568'

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto', fontFamily:'"Inter",system-ui,sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'24px' }}>
        <Link href="/marketplace" style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'#4A5568', textDecoration:'none' }}>
          <ArrowLeft size={14} /> Marketplace
        </Link>
        <span style={{ color:'#1A2540' }}>/</span>
        <span style={{ fontSize:'13px', color:'#E8EDF5' }}>{business.name}</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'24px', alignItems:'start' }}>

        {/* Main */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

          {/* Hero card */}
          <div style={{ background:'#0F1629', border:'1px solid #1A2540', borderRadius:'16px', padding:'32px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'20px', marginBottom:'24px' }}>
              <div style={{ width:'64px', height:'64px', borderRadius:'12px', background:'linear-gradient(135deg,#C9A84C22,#C9A84C11)', border:'1px solid #C9A84C33', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:'24px', fontWeight:900, color:'#C9A84C' }}>{business.name[0]}</span>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
                  <h1 style={{ fontSize:'22px', fontWeight:800, color:'#E8EDF5', margin:0, letterSpacing:'-0.02em' }}>{business.name}</h1>
                  {business.verificationStatus === 'VERIFIED' && (
                    <div style={{ display:'flex', alignItems:'center', gap:'4px', background:'#00D4AA15', border:'1px solid #00D4AA33', borderRadius:'20px', padding:'3px 10px' }}>
                      <BadgeCheck size={11} color="#00D4AA" />
                      <span style={{ fontSize:'10px', fontWeight:700, color:'#00D4AA', letterSpacing:'0.1em' }}>VERIFIED</span>
                    </div>
                  )}
                  <span style={{ fontSize:'11px', fontWeight:600, color:'#C9A84C', background:'#C9A84C15', border:'1px solid #C9A84C33', borderRadius:'4px', padding:'3px 8px' }}>
                    {TYPE_LABELS[business.type] || business.type}
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#4A5568' }}>
                    <MapPin size={12} /> {business.city ? `${business.city}, ` : ''}{COUNTRY_NAMES[business.country] || business.country}
                  </span>
                  {business.websiteUrl && (
                    <a href={business.websiteUrl} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#C9A84C', textDecoration:'none' }}>
                      <ExternalLink size={11} /> Website
                    </a>
                  )}
                  {business.employeeCount && (
                    <span style={{ fontSize:'12px', color:'#4A5568' }}>{business.employeeCount} employees</span>
                  )}
                </div>
              </div>
              <div style={{ textAlign:'center', flexShrink:0 }}>
                <div style={{ fontSize:'32px', fontWeight:900, color: trustColor, fontFamily:'monospace' }}>{business.trustScore}</div>
                <div style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.08em' }}>TRUST SCORE</div>
              </div>
            </div>

            {business.description && (
              <p style={{ fontSize:'14px', color:'#94A3B8', lineHeight:1.7, marginBottom:'20px' }}>{business.description}</p>
            )}

            {/* Categories */}
            {business.categories?.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
                {business.categories.map((c:string) => (
                  <span key={c} style={{ fontSize:'11px', padding:'4px 10px', background:'#1A2540', border:'1px solid #2A3550', borderRadius:'20px', color:'#94A3B8' }}>{c}</span>
                ))}
              </div>
            )}

            {/* Certifications */}
            {business.certifications?.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {business.certifications.map((c:string) => (
                  <span key={c} style={{ fontSize:'11px', padding:'4px 10px', background:'#00D4AA10', border:'1px solid #00D4AA33', borderRadius:'20px', color:'#00D4AA', display:'flex', alignItems:'center', gap:'4px' }}>
                    <ShieldCheck size={9} /> {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Trade details */}
          <div style={{ background:'#0F1629', border:'1px solid #1A2540', borderRadius:'16px', padding:'24px' }}>
            <h2 style={{ fontSize:'14px', fontWeight:700, color:'#E8EDF5', marginBottom:'20px', textTransform:'uppercase', letterSpacing:'0.08em' }}>Trade Details</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'16px' }}>
              {[
                { icon: Package, label:'Min. Order Value', val: business.minOrderValue ? `$${Number(business.minOrderValue).toLocaleString()}` : 'Negotiable' },
                { icon: Clock,   label:'Lead Time',       val: business.leadTimeDays ? `${business.leadTimeDays} days` : 'Contact for details' },
                { icon: Globe2,  label:'Target Markets',  val: business.targetMarkets?.slice(0,5).join(', ') || 'Global' },
                { icon: CreditCard, label:'Payment Terms',val: business.paymentTerms?.join(', ') || 'Contact for details' },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} style={{ padding:'16px', background:'#0A0E1A', borderRadius:'12px', border:'1px solid #1A2540' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                    <Icon size={13} color="#C9A84C" />
                    <span style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</span>
                  </div>
                  <div style={{ fontSize:'14px', fontWeight:600, color:'#E8EDF5' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplier profile extra */}
          {business.asSupplier && (
            <div style={{ background:'#0F1629', border:'1px solid #1A2540', borderRadius:'16px', padding:'24px' }}>
              <h2 style={{ fontSize:'14px', fontWeight:700, color:'#E8EDF5', marginBottom:'16px', textTransform:'uppercase', letterSpacing:'0.08em' }}>Supplier Capabilities</h2>
              <p style={{ fontSize:'14px', color:'#94A3B8', lineHeight:1.6, marginBottom:'16px' }}>{business.asSupplier.headline}</p>
              {business.asSupplier.specializations?.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
                  {business.asSupplier.specializations.map((s:string) => (
                    <span key={s} style={{ fontSize:'11px', padding:'4px 10px', background:'#C9A84C10', border:'1px solid #C9A84C33', borderRadius:'20px', color:'#C9A84C' }}>{s}</span>
                  ))}
                </div>
              )}
              <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
                {[
                  { label:'OEM capable',    val: business.asSupplier.oemCapable },
                  { label:'Private label',  val: business.asSupplier.privateLabel },
                  { label:'Samples available', val: business.asSupplier.sampleAvailable },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px' }}>
                    <span style={{ width:'16px', height:'16px', borderRadius:'50%', background: val ? '#00D4AA20' : '#1A2540', border:'1px solid', borderColor: val ? '#00D4AA' : '#2A3550', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', color: val ? '#00D4AA' : '#4A5568' }}>{val ? '✓' : '✗'}</span>
                    <span style={{ color: val ? '#E8EDF5' : '#4A5568' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

          {/* Contact CTA */}
          <div style={{ background:'#0F1629', border:'1px solid #C9A84C33', borderRadius:'16px', padding:'24px', textAlign:'center' }}>
            <div style={{ fontSize:'12px', color:'#4A5568', marginBottom:'8px' }}>Ready to source from</div>
            <div style={{ fontSize:'16px', fontWeight:700, color:'#E8EDF5', marginBottom:'20px' }}>{business.name}?</div>
            <Link href="/sourcing" style={{ display:'block', padding:'12px', background:'linear-gradient(135deg,#C9A84C,#E8B84B)', color:'#0A0E1A', borderRadius:'10px', textDecoration:'none', fontWeight:700, fontSize:'13px', marginBottom:'10px' }}>
              Post an RFQ
            </Link>
            <Link href="/messages" style={{ padding:'12px', background:'transparent', color:'#E8EDF5', border:'1px solid #1A2540', borderRadius:'10px', textDecoration:'none', fontWeight:600, fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
              <MessageSquare size={13} /> Send message
            </Link>
          </div>

          {/* Stats */}
          <div style={{ background:'#0F1629', border:'1px solid #1A2540', borderRadius:'16px', padding:'20px' }}>
            <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px' }}>Platform stats</div>
            {[
              { label:'Profile views',   val: business.asSupplier?.viewCount || 0 },
              { label:'Inquiries received', val: business.asSupplier?.inquiryCount || 0 },
              { label:'Active since',    val: new Date(business.createdAt).getFullYear() },
            ].map(s => (
              <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #1A2540' }}>
                <span style={{ fontSize:'12px', color:'#4A5568' }}>{s.label}</span>
                <span style={{ fontSize:'14px', fontWeight:700, color:'#E8EDF5', fontFamily:'monospace' }}>{s.val.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Related */}
          {relatedBusinesses.length > 0 && (
            <div style={{ background:'#0F1629', border:'1px solid #1A2540', borderRadius:'16px', padding:'20px' }}>
              <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px' }}>Similar suppliers</div>
              {relatedBusinesses.map(b => (
                <Link key={b.id} href={`/marketplace/${b.slug}`} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 0', borderBottom:'1px solid #1A2540', textDecoration:'none' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:'#1A2540', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:700, color:'#C9A84C', flexShrink:0 }}>{b.name[0]}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'12px', fontWeight:600, color:'#E8EDF5', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{b.name}</div>
                    <div style={{ fontSize:'10px', color:'#4A5568' }}>{COUNTRY_NAMES[b.country] || b.country}</div>
                  </div>
                  <div style={{ fontSize:'11px', fontWeight:700, color:'#00D4AA', fontFamily:'monospace' }}>{b.trustScore}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
