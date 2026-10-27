import React, { useState, useEffect } from 'react'
import { 
  X, ShieldCheck, HardHat, AlertTriangle, CheckCircle2, 
  Clock, MapPin, Building2, Filter, ArrowUpRight, Upload, 
  ChevronRight, RefreshCw, Send, Sparkles 
} from 'lucide-react'
import { useAuth, ROLES, DEPARTMENTS } from '../context/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function RoleDashboardModal({ isOpen, onClose }) {
  const { profile } = useAuth()
  const role = profile?.role || ROLES.CITIZEN

  const [reports, setReports] = useState([
    {
      id: 'rep-01',
      ticket_id: 'CP-98124',
      title: 'Deep Pothole Cluster near Metro Pillar 42',
      category: 'Road & Potholes',
      address: 'MG Road, New Delhi',
      visual_severity: 'Severe',
      priority_score: 0.94,
      status: 'Approved / Verified',
      assigned_department: 'Roads & Infrastructure',
      assigned_officer: 'Rajesh Verma (AE)',
      created_at: '2 hours ago'
    },
    {
      id: 'rep-02',
      ticket_id: 'CP-98125',
      title: 'Overflowing Community Garbage Dumpster',
      category: 'Garbage Overflow',
      address: 'Lajpat Nagar Market Gate 2',
      visual_severity: 'High',
      priority_score: 0.82,
      status: 'Reported',
      assigned_department: null,
      assigned_officer: null,
      created_at: '4 hours ago'
    },
    {
      id: 'rep-03',
      ticket_id: 'CP-98126',
      title: 'Main Pipeline Burst - Clean Water Waste',
      category: 'Water Leakage',
      address: 'Sector 14 Main Road',
      visual_severity: 'Severe',
      priority_score: 0.96,
      status: 'Assigned',
      assigned_department: 'Water Supply & Drainage',
      assigned_officer: 'Karan Mehra',
      created_at: '30 mins ago'
    },
    {
      id: 'rep-04',
      ticket_id: 'CP-98127',
      title: 'Streetlight Pole Blown Fuse (Dark Zone)',
      category: 'Streetlight Outage',
      address: 'Outer Ring Road Flyover ramp',
      visual_severity: 'Moderate',
      priority_score: 0.61,
      status: 'In Progress',
      assigned_department: 'Streetlighting & Electrical',
      assigned_officer: 'Suresh Kumar',
      created_at: '1 day ago'
    }
  ])

  const [filterDept, setFilterDept] = useState('All')
  const [loading, setLoading] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [resolutionRemark, setResolutionRemark] = useState('')

  // Load from Supabase if live
  const fetchLiveReports = async () => {
    if (!isSupabaseConfigured) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data && data.length > 0) {
        setReports(data)
      }
    } catch (e) {
      console.warn('Live fetch note:', e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchLiveReports()
    }
  }, [isOpen])

  if (!isOpen) return null

  // Status transition handler for Authority / Admin
  const handleUpdateStatus = async (reportId, newStatus, department = null) => {
    // Local state update
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: newStatus,
          assigned_department: department || r.assigned_department
        }
      }
      return r
    }))

    // Supabase update if configured
    if (isSupabaseConfigured) {
      try {
        const updateData = { status: newStatus }
        if (department) updateData.assigned_department = department
        await supabase.from('reports').update(updateData).eq('id', reportId)
      } catch (err) {
        console.warn('Update note:', err.message)
      }
    }
  }

  // Filtered list
  const filteredReports = reports.filter(r => {
    if (role === ROLES.AUTHORITY && profile?.department) {
      return r.assigned_department === profile.department || r.category.toLowerCase().includes(profile.department.toLowerCase().split(' ')[0].toLowerCase())
    }
    if (filterDept !== 'All') {
      return r.assigned_department === filterDept
    }
    return true
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm ${
              role === ROLES.ADMIN ? 'bg-indigo-600' : 'bg-amber-600'
            }`}>
              {role === ROLES.ADMIN ? <ShieldCheck className="w-5 h-5" /> : <HardHat className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  {role === ROLES.ADMIN ? 'Municipal Administrator Portal' : 'Authority / Department Field Portal'}
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  role === ROLES.ADMIN 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {role === ROLES.ADMIN ? 'Full Triage Access' : profile?.department || 'Field Officer'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Logged in as <strong className="text-slate-800">{profile?.full_name}</strong> ({profile?.email})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveReports}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-200 transition-all text-xs font-medium flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Controls & Department Filter */}
        <div className="p-4 px-6 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Filter:
            </span>
            {role === ROLES.ADMIN ? (
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0d8a55]"
              >
                <option value="All">All Municipal Departments</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            ) : (
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Department: {profile?.department || 'Roads & Infrastructure'}
              </span>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> active civic grievances
          </div>
        </div>

        {/* Main List */}
        <div className="p-6 overflow-y-auto space-y-3.5 bg-slate-50/40 flex-1">
          {filteredReports.map((item) => (
            <div 
              key={item.id || item.ticket_id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-700 px-2 py-0.5 rounded-md bg-slate-100">
                    {item.ticket_id}
                  </span>
                  <span className="text-xs font-bold text-[#0d8a55] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {item.category}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    item.visual_severity === 'Severe' 
                      ? 'bg-rose-100 text-rose-700' 
                      : item.visual_severity === 'High' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    AI Severity: {item.visual_severity || 'High'} ({Math.round((item.priority_score || 0.85) * 100)}%)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    Status: <strong className="text-slate-800">{item.status}</strong>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.address}
                  </span>
                  {item.assigned_department && (
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.assigned_department}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons based on Role */}
              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                {role === ROLES.ADMIN ? (
                  <>
                    {/* Admin: Approve & Assign */}
                    {item.status === 'Reported' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Approved / Verified')}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-all"
                      >
                        Verify & Approve
                      </button>
                    )}
                    <select
                      value={item.assigned_department || ''}
                      onChange={(e) => handleUpdateStatus(item.id, 'Assigned', e.target.value)}
                      className="text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d8a55]"
                    >
                      <option value="" disabled>Assign Department...</option>
                      {DEPARTMENTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    {/* Authority: Start Work / Resolve */}
                    {item.status !== 'In Progress' && item.status !== 'Resolved' && item.status !== 'Closed' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'In Progress')}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        Start Work Order
                      </button>
                    )}
                    {item.status === 'In Progress' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Resolved')}
                        className="px-3 py-1.5 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Upload Proof & Resolve</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0d8a55]" />
            <span>AI Automated Priority Routing Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  )
}
