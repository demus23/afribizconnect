'use client'
import { useState, useEffect } from 'react'
import { Copy, CheckCircle2, Lock, Loader2 } from 'lucide-react'

export default function DeveloperPage() {
  const [data, setData]     = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [lang, setLang]     = useState('cURL')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetch('/api/developer').then(r=>r.json()).then(setData).finally(()=>setLoading(false)) }, [])
  function copy(text: string) { navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#C9A84C' }} /></div>

  const examples: Record<string,string> = {
    cURL: `curl https://api.afribizconnect.com/v1/suppliers \\\n  -H "Authorization: Bearer ${data?.apiKey}"`,
    Python: `import requests\nres = requests.get(\n  "https://api.afribizconnect.com/v1/suppliers",\n  headers={"Authorization": "Bearer ${data?.apiKey}"}\n)\nprint(res.json())`,
    JavaScript: `const res = await fetch("https://api.afribizconnect.com/v1/suppliers", {\n  headers: { Authorization: "Bearer ${data?.apiKey}" }\n})\nconst data = await res.json()`,
  }

  return (
    <div className="space-y-6 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Developer API</h1>
        <p className="text-sm mt-1" style={{ color:'#64748b' }}>Programmatic access to suppliers, FX rates, trade intelligence, and RFQs</p>
      </div>

      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <div className="flex items-center gap-2 mb-4"><Lock className="h-4 w-4" style={{ color:'#C9A84C' }} /><h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Your API key</h2></div>
        <div className="flex gap-2 mb-3">
          <code className="flex-1 px-4 py-3 rounded-xl text-xs overflow-x-auto" style={{ background:'#0A0E1A', color:'#00D4AA', border:'1px solid #1A2540', whiteSpace:'nowrap', fontFamily:'monospace' }}>{data?.apiKey}</code>
          <button onClick={() => copy(data?.apiKey)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white" style={{ background: copied ? 'linear-gradient(135deg,#059669,#047857)' : 'linear-gradient(135deg,#1e40af,#2563eb)', whiteSpace:'nowrap' }}>
            {copied ? <><CheckCircle2 className="h-4 w-4" />Copied</> : <><Copy className="h-4 w-4" />Copy</>}
          </button>
        </div>
        <p className="text-xs" style={{ color:'#94a3b8' }}>Current plan: <strong style={{ color:'#374151' }}>{data?.plan}</strong> · {data?.limits?.[data?.plan]?.calls} calls/day · {data?.limits?.[data?.plan]?.rate}</p>
      </div>

      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Endpoints</h2>
        <div className="space-y-2">
          {data?.endpoints?.map((ep: any) => (
            <div key={ep.path} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'#f8fafc', border:'1px solid #f1f5f9' }}>
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: ep.method==='GET'?'#f0fdf4':'#eff6ff', color: ep.method==='GET'?'#059669':'#1e40af', fontFamily:'monospace', minWidth:'40px', textAlign:'center' }}>{ep.method}</span>
              <span className="text-sm flex-1 font-mono" style={{ color:'#0f172a' }}>{ep.path}</span>
              <span className="text-xs" style={{ color:'#64748b' }}>{ep.desc}</span>
              {ep.auth && <Lock className="h-3 w-3 shrink-0" style={{ color:'#94a3b8' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Quick start</h2>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background:'#f1f5f9' }}>
            {Object.keys(examples).map(l => (
              <button key={l} onClick={() => setLang(l)} className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all" style={lang===l?{ background:'white', color:'#0f172a', boxShadow:'0 1px 3px rgba(0,0,0,0.06)' }:{ color:'#64748b' }}>{l}</button>
            ))}
          </div>
        </div>
        <pre style={{ background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'12px', padding:'20px', fontSize:'12px', color:'#E8EDF5', overflowX:'auto', lineHeight:1.7, margin:0, fontFamily:'monospace' }}>{examples[lang]}</pre>
      </div>

      <div className="rounded-2xl border p-5" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a8a)', borderColor:'#1e40af' }}>
        <div className="text-xs font-black text-blue-300 mb-2 tracking-wider uppercase">Upgrade for full access</div>
        <div className="text-base font-black text-white mb-2">Growth plan unlocks 50,000 API calls/day</div>
        <p className="text-sm mb-4" style={{ color:'rgba(147,197,253,0.75)' }}>Build trade apps, CRMs, and dashboards on top of Africa's largest verified supplier and investment database.</p>
        <a href="/settings?tab=billing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black" style={{ background:'#C9A84C', color:'#0A0E1A', textDecoration:'none' }}>Upgrade plan →</a>
      </div>
    </div>
  )
}
