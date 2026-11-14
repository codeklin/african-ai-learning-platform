import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
  return <main className="login-state"><Link href="/" className="brand"><span className="brand-mark"><span /></span><span>gohper<span className="brand-ai">AI</span></span></Link><div className="login-state-card"><span className="login-state-icon"><Sparkles size={18} /></span><span className="detail-section-kicker">LEARNER ACCESS</span><h1>You can start without an account.</h1><p>Want to try a lesson before signing up? Browse the free courses. This preview does not save your progress.</p><Link href="/courses" className="button button-dark">Explore free courses <ArrowRight size={15} /></Link><Link href="/" className="login-home"><ArrowLeft size={13} /> Back to gohperAI</Link></div><small className="login-preview-note">Preview only. No account or payment is collected here.</small></main>
}
