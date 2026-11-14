'use client'

import { useState } from 'react'
import { Calendar, Clock, Download, ExternalLink, CheckCircle2 } from 'lucide-react'

interface CalendarReminderProps {
  courseTitle?: string
  courseSlug?: string
  recommendedDurationMinutes?: number
}

const TIME_SLOTS = [
  { id: 'morning', label: '7:30 AM', timeStr: '073000', hour: 7, minute: 30, tag: 'Morning focus' },
  { id: 'afternoon', label: '1:00 PM', timeStr: '130000', hour: 13, minute: 0, tag: 'Lunch sprint' },
  { id: 'evening', label: '7:00 PM', timeStr: '190000', hour: 19, minute: 0, tag: 'Prime study' },
  { id: 'night', label: '9:00 PM', timeStr: '210000', hour: 21, minute: 0, tag: 'Night routine' },
]

export default function CalendarReminder({
  courseTitle = 'Build a Helpful AI App',
  courseSlug = 'build-a-helpful-ai-app',
  recommendedDurationMinutes = 20,
}: CalendarReminderProps) {
  const [selectedSlotId, setSelectedSlotId] = useState('evening')
  const [hasDownloaded, setHasDownloaded] = useState(false)

  const selectedSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[2]
  const courseUrl = `https://ituwa.africa/courses/${courseSlug}`

  // 1. Generate Google Calendar URL
  const generateGoogleCalendarUrl = () => {
    const now = new Date()
    // Start tomorrow or today depending on current hour
    const start = new Date(now)
    if (now.getHours() >= selectedSlot.hour) {
      start.setDate(start.getDate() + 1)
    }
    start.setHours(selectedSlot.hour, selectedSlot.minute, 0, 0)

    const end = new Date(start)
    end.setMinutes(end.getMinutes() + recommendedDurationMinutes)

    const pad = (n: number) => String(n).padStart(2, '0')
    const formatGDate = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

    const title = encodeURIComponent(`Daily AI Practice: ${courseTitle}`)
    const details = encodeURIComponent(
      `Time for your 20-minute daily practical AI sprint on ituwaAfrica.\n\nOpen your lesson here:\n${courseUrl}\n\nRule: Watch, build one piece, and keep momentum.`
    )
    const location = encodeURIComponent(courseUrl)
    const dates = `${formatGDate(start)}/${formatGDate(end)}`
    const rrule = encodeURIComponent('RRULE:FREQ=DAILY;COUNT=14')

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&recur=${rrule}`
  }

  // 2. Generate and download RFC 5545 .ics file for Apple Calendar / Outlook / Phone
  const handleDownloadIcs = () => {
    const now = new Date()
    const start = new Date(now)
    if (now.getHours() >= selectedSlot.hour) {
      start.setDate(start.getDate() + 1)
    }
    start.setHours(selectedSlot.hour, selectedSlot.minute, 0, 0)

    const end = new Date(start)
    end.setMinutes(end.getMinutes() + recommendedDurationMinutes)

    const pad = (n: number) => String(n).padStart(2, '0')
    const formatIcsDate = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ituwaAfrica//Learner Rhythm//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:ituwa-${courseSlug}-${Date.now()}@ituwa.africa`,
      `DTSTAMP:${formatIcsDate(new Date())}Z`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      'RRULE:FREQ=DAILY;COUNT=14',
      `SUMMARY:Daily AI Practice: ${courseTitle}`,
      `DESCRIPTION:Your 20-minute practical AI sprint on ituwaAfrica.\\n\\nContinue lesson:\\n${courseUrl}`,
      `URL:${courseUrl}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Time for your daily AI lesson',
      'TRIGGER:-PT5M',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `ituwa-daily-${courseSlug}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setHasDownloaded(true)
  }

  return (
    <div className="cal-reminder-box">
      <div className="cal-reminder-top">
        <div className="cal-reminder-icon-wrap" aria-hidden="true">
          <Calendar size={22} />
        </div>
        <div>
          <span className="cal-reminder-kicker">RETENTION RHYTHM · 14-DAY SPRINT</span>
          <h3 className="cal-reminder-title">Lock in 20 minutes a day</h3>
          <p className="cal-reminder-desc">
            Consistency beats marathon sessions. Add a daily practice reminder to your phone calendar so your lock screen nudges you at your preferred study time.
          </p>
        </div>
      </div>

      {/* Time Slot Picker */}
      <div className="cal-time-picker">
        <span className="cal-picker-label">
          <Clock size={14} /> Choose your daily study hour:
        </span>
        <div className="cal-slots-grid">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlotId === slot.id
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotId(slot.id)}
                className={`cal-slot-btn ${isSelected ? 'active' : ''}`}
              >
                <strong>{slot.label}</strong>
                <small>{slot.tag}</small>
              </button>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="cal-actions-row">
        <a
          href={generateGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-dark cal-btn-google"
          onClick={() => setHasDownloaded(true)}
        >
          <span>Add to Google Calendar</span>
          <ExternalLink size={15} />
        </a>

        <button
          type="button"
          onClick={handleDownloadIcs}
          className="button button-outline-warm cal-btn-ics"
        >
          <Download size={15} />
          <span>Download Apple / Phone (.ics)</span>
        </button>
      </div>

      {hasDownloaded ? (
        <div className="cal-success-note">
          <CheckCircle2 size={16} />
          <span>Reminder ready! Check your calendar app to confirm your 14-day sprint.</span>
        </div>
      ) : (
        <span className="cal-foot-note">
          No app download required. Integrates directly into your Google, iPhone, or Samsung calendar.
        </span>
      )}
    </div>
  )
}
