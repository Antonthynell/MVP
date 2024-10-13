'use client'

import { useState } from 'react'

type Stakeholder = {
  id: string
  name: string
  jobTitle: string
  email: string
  role: string
  score: number
  x: number
  y: number
}

export default function StakeholderMap() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { id: '1', name: 'John Doe', jobTitle: 'CEO', email: 'john@example.com', role: 'Decision Maker', score: 5, x: 50, y: 20 },
    { id: '2', name: 'Jane Smith', jobTitle: 'CTO', email: 'jane@example.com', role: 'Influencer', score: 3, x: 30, y: 60 },
  ])

  const handleDragStart = (e: React.DragEvent, stakeholder: Stakeholder) => {
    e.dataTransfer.setData('text/plain', stakeholder.id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text')
    const rect = e.currentTarget.getBoundingClientRect()
    const updatedStakeholders = stakeholders.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        }
      }
      return s
    })
    setStakeholders(updatedStakeholders)
  }

  return (
    <div className="w-full h-[600px] border border-gray-300 relative" onDragOver={handleDragOver} onDrop={handleDrop}>
      {stakeholders.map((stakeholder) => (
        <div
          key={stakeholder.id}
          draggable
          onDragStart={(e) => handleDragStart(e, stakeholder)}
          className="absolute cursor-move bg-white border border-gray-300 p-4 rounded shadow-md"
          style={{ left: `${stakeholder.x}%`, top: `${stakeholder.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <h3 className="font-bold">{stakeholder.name}</h3>
          <p className="text-sm text-gray-600">{stakeholder.jobTitle}</p>
          <p className="text-sm text-gray-600">{stakeholder.email}</p>
          <p className="text-sm font-semibold mt-2">Role: {stakeholder.role}</p>
          <p className="text-sm font-semibold">Score: {stakeholder.score}</p>
        </div>
      ))}
    </div>
  )
}