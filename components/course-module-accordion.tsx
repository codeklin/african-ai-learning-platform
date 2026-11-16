'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Module {
  title: string
  lessons: string[]
}

export default function CourseModuleAccordion({ modules }: { modules: Module[] }) {
  const [openIdx, setOpenIdx] = useState<number>(0)

  return (
    <div className="cdp-modules">
      {modules.map((mod, idx) => {
        const isOpen = openIdx === idx
        return (
          <div key={mod.title} className="cdp-module-card" data-open={isOpen ? 'true' : 'false'}>
            <div
              className="cdp-module-header"
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenIdx(isOpen ? -1 : idx) }}
              aria-expanded={isOpen}
            >
              <div className="cdp-module-left">
                <span className="cdp-module-num">{String(idx + 1).padStart(2, '0')}</span>
                <div className="cdp-module-info">
                  <h4>{mod.title}</h4>
                  <span className="cdp-module-count">{mod.lessons.length} LESSONS</span>
                </div>
              </div>
              <ChevronDown size={18} className="cdp-module-caret" />
            </div>

            {isOpen && (
              <div className="cdp-module-lessons">
                {mod.lessons.map((lesson, lIdx) => (
                  <div key={lesson} className="cdp-lesson-row">
                    <span className="cdp-lesson-num">{String(lIdx + 1).padStart(2, '0')}</span>
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
