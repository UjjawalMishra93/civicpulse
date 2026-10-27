import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export const CATEGORY_TO_DEPARTMENT = {
  'Road & Potholes': 'Roads & Highway Infrastructure',
  'Garbage Overflow': 'Solid Waste & Sanitation Department',
  'Water Leakage': 'Water Supply & Sewage Board',
  'Streetlight Outage': 'Electrical & Streetlighting Division',
  'Open Manhole': 'Drainage & Stormwater Department',
  'Damaged Infrastructure': 'Public Works Department (PWD)',
  'Other': 'General Municipal Administration'
}

export const DEPARTMENTS_LIST = [
  'All Departments',
  'Roads & Highway Infrastructure',
  'Solid Waste & Sanitation Department',
  'Water Supply & Sewage Board',
  'Electrical & Streetlighting Division',
  'Drainage & Stormwater Department',
  'Public Works Department (PWD)'
]

// Baseline official reports to ensure dashboard is functional out-of-the-box
const INITIAL_REPORTS = [
  {
    id: 'rep-init-01',
    ticket_id: 'CP/2026/DL-48192',
    title: 'Severe road cave-in and asphalt subsidence',
    category: 'Road & Potholes',
    description: 'Deep road depression near Metro Pillar 42 creating serious hazard for two-wheelers during peak traffic.',
    assigned_department: 'Roads & Highway Infrastructure',
    assigned_officer: 'Er. Rajesh Verma (Assistant Engineer)',
    address: 'MG Road, Outer Corridor, Sector 4, New Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    visual_severity: 'Severe',
    priority_score: 0.94,
    status: 'In Progress',
    citizen_name: 'Priya Sharma',
    citizen_phone: '+91 98765 43210',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=80',
    resolution_proof_url: null,
    official_remarks: 'Site inspected by Squad Alpha. Asphalt premix and vibratory roller dispatched.',
    created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
  },
  {
    id: 'rep-init-02',
    ticket_id: 'CP/2026/DL-48193',
    title: 'Overflowing commercial waste container & blocked access',
    category: 'Garbage Overflow',
    description: 'Community dumper overflowing for 48 hours. Waste spilling onto carriageway near market entrance.',
    assigned_department: 'Solid Waste & Sanitation Department',
    assigned_officer: 'Shri R. K. Meena (Sanitary Inspector)',
    address: 'Lajpat Nagar Central Market Gate 2, New Delhi',
    latitude: 28.5677,
    longitude: 77.2433,
    visual_severity: 'High',
    priority_score: 0.82,
    status: 'Reported',
    citizen_name: 'Amit Patel',
    citizen_phone: '+91 98112 34567',
    image_url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&auto=format&fit=crop&q=80',
    resolution_proof_url: null,
    official_remarks: null,
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'rep-init-03',
    ticket_id: 'CP/2026/DL-48194',
    title: 'Sub-main potable water pipeline rupture',
    category: 'Water Leakage',
    description: 'High-pressure clean water gushing from underground line, flooding street and causing water shortage in Block C.',
    assigned_department: 'Water Supply & Sewage Board',
    assigned_officer: 'Er. Karan Malhotra (Executive Engineer)',
    address: 'Block C, Vasant Vihar Main Road, New Delhi',
    latitude: 28.5583,
    longitude: 77.1638,
    visual_severity: 'Severe',
    priority_score: 0.96,
    status: 'In Progress',
    citizen_name: 'Dr. Sunita Rao',
    citizen_phone: '+91 98223 98765',
    image_url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=80',
    resolution_proof_url: null,
    official_remarks: 'Gate valve 4 isolated. Excavation team on site replacing 150mm ductile iron sleeve.',
    created_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
  },
  {
    id: 'rep-init-04',
    ticket_id: 'CP/2026/DL-48195',
    title: 'High-mast LED pole phase failure (Complete Dark Corridor)',
    category: 'Streetlight Outage',
    address: 'Ring Road Underpass, Near Flyover Ramp, New Delhi',
    description: 'Five consecutive poles dark on major vehicular transit curve.',
    assigned_department: 'Electrical & Streetlighting Division',
    assigned_officer: 'Er. Suresh Verma (Junior Engineer)',
    latitude: 28.5355,
    longitude: 77.2410,
    visual_severity: 'Moderate',
    priority_score: 0.65,
    status: 'Resolved',
    citizen_name: 'Rahul Sen',
    citizen_phone: '+91 98334 11223',
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80',
    resolution_proof_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
    official_remarks: 'Phase fuse in feeder pillar 3 replaced. Lux test completed and certified.',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  }
]

const ReportsContext = createContext(null)

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState(() => {
    // Check localStorage first for persisted user submissions
    const saved = localStorage.getItem('civicpulse_reports')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {
        console.warn('Failed parsing cached reports:', e)
      }
    }
    return INITIAL_REPORTS
  })
  const [loading, setLoading] = useState(false)

  // Fetch from live Supabase on mount
  useEffect(() => {
    async function syncSupabase() {
      if (!isSupabaseConfigured) return
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          // Normalize Supabase fields to match local format
          const formatted = data.map(item => ({
            ...item,
            assigned_department: item.assigned_department || CATEGORY_TO_DEPARTMENT[item.category] || 'Public Works Department (PWD)',
            official_remarks: item.official_remarks || null
          }))

          // Merge without losing any client newly added reports
          setReports(prev => {
            const map = new Map()
            // Add server items
            formatted.forEach(r => map.set(r.ticket_id, r))
            // Keep local items if not yet synced
            prev.forEach(r => {
              if (!map.has(r.ticket_id)) map.set(r.ticket_id, r)
            })
            const merged = Array.from(map.values())
            localStorage.setItem('civicpulse_reports', JSON.stringify(merged))
            return merged
          })
        }
      } catch (err) {
        console.warn('Supabase initial fetch note:', err.message)
      } finally {
        setLoading(false)
      }
    }

    syncSupabase()

    // Setup Supabase Realtime channel if available
    let channel = null
    if (isSupabaseConfigured) {
      channel = supabase
        .channel('public:reports')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = {
              ...payload.new,
              assigned_department: payload.new.assigned_department || CATEGORY_TO_DEPARTMENT[payload.new.category] || 'Public Works Department (PWD)'
            }
            setReports(prev => {
              if (prev.some(r => r.ticket_id === newItem.ticket_id)) return prev
              const updated = [newItem, ...prev]
              localStorage.setItem('civicpulse_reports', JSON.stringify(updated))
              return updated
            })
          } else if (payload.eventType === 'UPDATE') {
            setReports(prev => {
              const updated = prev.map(r => r.id === payload.new.id ? { ...r, ...payload.new } : r)
              localStorage.setItem('civicpulse_reports', JSON.stringify(updated))
              return updated
            })
          }
        })
        .subscribe()
    }

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  // Add new civic report (from Citizen modal)
  const addReport = async (reportData) => {
    const assignedDept = CATEGORY_TO_DEPARTMENT[reportData.category] || 'Public Works Department (PWD)'
    const generatedTicketId = `CP/2026/DL-${Math.floor(10000 + Math.random() * 90000)}`

    const newReport = {
      id: `rep-${Date.now()}`,
      ticket_id: generatedTicketId,
      title: reportData.title || `${reportData.category} at ${reportData.address}`,
      category: reportData.category,
      description: reportData.description || 'Public infrastructure issue reported by citizen via web portal.',
      assigned_department: assignedDept,
      assigned_officer: `${assignedDept.split(' ')[0]} Duty Officer`,
      address: reportData.address || 'MG Road, New Delhi',
      latitude: parseFloat(reportData.latitude) || 28.6139,
      longitude: parseFloat(reportData.longitude) || 77.2090,
      visual_severity: reportData.visual_severity || 'Moderate',
      priority_score: reportData.priority_score || 0.75,
      status: 'Reported',
      citizen_id: reportData.citizen_id || null,
      citizen_name: reportData.citizen_name || 'Anonymous Citizen',
      citizen_phone: reportData.citizen_phone || '',
      image_url: reportData.image_url || null,
      resolution_proof_url: null,
      official_remarks: null,
      created_at: new Date().toISOString()
    }

    // 1. Immediately update local state & localStorage so UI is instantaneous
    setReports(prev => {
      const updated = [newReport, ...prev]
      localStorage.setItem('civicpulse_reports', JSON.stringify(updated))
      return updated
    })

    // 2. Persist to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('reports').insert([
          {
            ticket_id: newReport.ticket_id,
            title: newReport.title,
            category: newReport.category,
            description: newReport.description,
            assigned_department: newReport.assigned_department,
            assigned_officer: newReport.assigned_officer,
            address: newReport.address,
            latitude: newReport.latitude,
            longitude: newReport.longitude,
            visual_severity: newReport.visual_severity,
            priority_score: newReport.priority_score,
            status: 'Reported',
            citizen_id: newReport.citizen_id,
            citizen_name: newReport.citizen_name,
            citizen_phone: newReport.citizen_phone,
            image_url: newReport.image_url,
            created_at: newReport.created_at
          }
        ])
        if (error) {
          console.warn('Supabase insert note:', error.message)
        }
      } catch (err) {
        console.warn('Supabase insert error (fallback preserved in local cache):', err.message)
      }
    }

    return newReport
  }

  // Update status (by Department Officer or Admin)
  const updateReportStatus = async (ticketIdOrId, newStatus, remarks = null, officerName = null) => {
    setReports(prev => {
      const updated = prev.map(r => {
        if (r.id === ticketIdOrId || r.ticket_id === ticketIdOrId) {
          return {
            ...r,
            status: newStatus,
            official_remarks: remarks || r.official_remarks,
            assigned_officer: officerName || r.assigned_officer,
            updated_at: new Date().toISOString()
          }
        }
        return r
      })
      localStorage.setItem('civicpulse_reports', JSON.stringify(updated))
      return updated
    })

    // Also update Supabase
    if (isSupabaseConfigured) {
      try {
        const updatePayload = {
          status: newStatus,
          updated_at: new Date().toISOString()
        }
        if (remarks) updatePayload.official_remarks = remarks
        if (officerName) updatePayload.assigned_officer = officerName

        await supabase
          .from('reports')
          .update(updatePayload)
          .or(`id.eq.${ticketIdOrId},ticket_id.eq.${ticketIdOrId}`)
      } catch (e) {
        console.warn('Supabase update note:', e.message)
      }
    }
  }

  // Filter helper
  const getReportsByDepartment = (dept) => {
    if (!dept || dept === 'All Departments') return reports
    return reports.filter(r => r.assigned_department === dept)
  }

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        addReport,
        updateReportStatus,
        getReportsByDepartment,
        getReportByTicketId: (tid) => reports.find(r => r.ticket_id === tid || r.id === tid)
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}

export function useReports() {
  const ctx = useContext(ReportsContext)
  if (!ctx) throw new Error('useReports must be used within ReportsProvider')
  return ctx
}
