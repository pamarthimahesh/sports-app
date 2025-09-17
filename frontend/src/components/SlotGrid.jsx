import React from 'react'

export default function SlotGrid({ slots, onPick }){
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))', gap:8 }}>
      {slots.map((s, i) => (
        <button key={i} disabled={!s.available}
          onClick={()=> onPick(s)}
          style={{ padding:10, border:'1px solid #ddd', borderRadius:8, background: s.available ? '#f7fff7' : '#f5f5f5' }}>
          <div style={{ fontWeight:600 }}>{s.start} – {s.end}</div>
          <div style={{ fontSize:12, color: s.available ? 'green' : 'crimson' }}>
            {s.available ? 'Available' : 'Booked'}
          </div>
        </button>
      ))}
    </div>
  )
}
