'use client'

import { useState } from 'react'
import { Check, ExternalLink, FileText, RotateCcw } from 'lucide-react'

const assignments = [
  'Channel concept submission',
  'Niche validation worksheet',
  'Channel branding project',
  '30-day publishing calendar',
  'Original video production assignment',
  'Thumbnail design assignment',
  'Analytics review assignment',
  'Monetization readiness checklist',
]

const policyLinks = [
  { label: 'YouTube Partner Program overview', href: 'https://support.google.com/youtube/answer/72851' },
  { label: 'Channel monetization policies', href: 'https://support.google.com/youtube/answer/1311392' },
  { label: 'Disclose altered or synthetic content', href: 'https://support.google.com/youtube/answer/14328491' },
  { label: 'Copyright on YouTube', href: 'https://support.google.com/youtube/answer/2797466' },
]

export default function CreatorProjectStudio() {
  const [checked, setChecked] = useState<string[]>([])
  const [concept, setConcept] = useState('')
  const [niche, setNiche] = useState('')
  const [reviewDate, setReviewDate] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')

  const toggle = (item: string) => setChecked((current) => current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item])
  const reset = () => { setChecked([]); setConcept(''); setNiche(''); setReviewDate(''); setReviewNotes('') }

  return <section className="creator-studio" aria-labelledby="creator-studio-title">
    <div className="creator-studio-heading"><div><span className="detail-section-kicker">CREATOR FIELDWORK / PROJECTS</span><h2 id="creator-studio-title">Build your channel, one proof point at a time.</h2><p>Use this workspace to draft ideas and track practice assignments. This demo does not save your work after you leave.</p></div><FileText size={22} aria-hidden="true" /></div>
    <div className="creator-project-grid">
      <label className="creator-field">Channel concept submission<textarea value={concept} onChange={(event) => setConcept(event.target.value)} placeholder="Who is this channel for, what will it help them do, and what will make each video distinctly yours?" rows={4} /></label>
      <label className="creator-field">Niche validation worksheet<textarea value={niche} onChange={(event) => setNiche(event.target.value)} placeholder="Note audience questions, evidence of demand, competing formats, your perspective, and a small test you can run." rows={4} /></label>
    </div>
    <div className="creator-assignment-block"><div className="creator-subhead"><h3>Project assignments</h3><span>{checked.length} / {assignments.length} marked complete</span></div><div className="creator-assignment-list">{assignments.map((item) => <label key={item} className="creator-assignment"><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} /><span className="creator-check"><Check size={12} /></span><span>{item}</span></label>)}</div></div>
    <div className="creator-policy-card"><div className="creator-subhead"><div><span className="detail-section-kicker">POLICY CHECK / REVIEW BEFORE PUBLISHING</span><h3>Learn from the current source.</h3></div><ExternalLink size={17} aria-hidden="true" /></div><p>Policies change. Before each publishing cycle and monetization review, open the official pages below, check their “last updated” details, note the date and any relevant change, then re-check before applying for YPP. Course completion is educational only; it does not establish eligibility or guarantee acceptance.</p><p><strong>Review status:</strong> Learner verification required before relying on current policy.</p><div className="creator-policy-review"><label className="creator-field policy-date">Last reviewed on<input type="date" value={reviewDate} onChange={(event) => setReviewDate(event.target.value)} /></label><label className="creator-field policy-date">Policy changes / follow-up notes<textarea value={reviewNotes} onChange={(event) => setReviewNotes(event.target.value)} rows={2} placeholder="Record any changed requirements and what you need to update." /></label></div><ul>{policyLinks.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={12} /></a></li>)}</ul></div>
    <div className="creator-studio-footer"><p><strong>Originality first.</strong> Keep your own editorial judgement, research, narration, and meaningful creative contribution central. Fact-check AI outputs, respect rights and licenses, and disclose realistic altered or synthetic content when YouTube requires it.</p><button type="button" className="creator-reset" onClick={reset}><RotateCcw size={13} /> Reset this demo workspace</button></div>
  </section>
}
