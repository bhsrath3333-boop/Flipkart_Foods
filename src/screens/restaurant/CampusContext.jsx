import React from 'react'
import { CAMPUS_CALENDAR } from '../../data/mockData'

export default function CampusContext() {
  return (
    <div>
      <div className="card">
        <div className="rp-section-title"><span className="rp-icon">🎓</span>Campus Calendar</div>
        <div style={{ fontSize: 11.5, color: '#878787', marginBottom: 4 }}>
          Upcoming campus events that typically drive demand spikes
        </div>
        {CAMPUS_CALENDAR.map((c) => (
          <div className="calendar-item" key={c.event}>
            <div className="cal-date">{c.date}</div>
            <div className="cal-body">
              <div className="cal-event">
                {c.event}
                <span className={`cal-type-tag ${c.type}`}>{c.type}</span>
              </div>
              <div className="cal-impact">💡 {c.impact}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ background: '#fff3e8', boxShadow: 'none', border: '1px solid #ffd8ae' }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: '#a83c00' }}>💡 Suggested Action</div>
        <div style={{ fontSize: 12, color: '#a86200', marginTop: 4, lineHeight: 1.5 }}>
          Mid-sem exams start Sep 3 — stock up on quick study snacks & coffee combos, and pre-batch
          your TiffinX menu 2 days ahead to handle the expected surge.
        </div>
      </div>
    </div>
  )
}
