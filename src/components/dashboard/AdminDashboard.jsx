import React, { useState } from 'react'
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Building2, 
  MapPin, Brain, Download, Sparkles, Filter, Search, 
  Layers, Users, ArrowUpRight, BarChart3, Clock, RefreshCw 
} from 'lucide-react'
import { useAuth, DEPARTMENTS } from '../../context/AuthContext'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function AdminDashboard() {
  const { profile } = useAuth()
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [exportNotice, setExportNotice] = useState(false)

  // Incoming reports for triage
  const [reports, setReports] = useState([
    {
      id: 'adm-1',
      ticket_id: 'CP-98124',
      title: 'Deep Pothole Cluster near Metro Pillar 42',
      category: 'Road & Potholes',
      address: 'MG Road, New Delhi',
      visual_severity: 'Severe',
      priority_rank: 'P1 - Critical',
      cnn_score: 0.94,
      nlp_score: 0.89,
      status: 'Approved / Verified',
      assigned_department: 'Roads & Infrastructure',
      assigned_officer: 'Rajesh Verma (AE)',
      created_at: '2 hours ago',
      duplicates_merged: 3
    },
    {
      id: 'adm-2',
      ticket_id: 'CP-98125',
      title: 'Overflowing Community Garbage Dumpster',
      category: 'Garbage Overflow',
      address: 'Lajpat Nagar Market Gate 2',
      visual_severity: 'High',
      priority_rank: 'P2 - High',
      cnn_score: 0.82,
      nlp_score: 0.78,
      status: 'Reported',
      assigned_department: null,
      assigned_officer: null,
      created_at: '4 hours ago',
      duplicates_merged: 1
    },
    {
      id: 'adm-3',
      ticket_id: 'CP-98126',
      title: 'Main Pipeline Burst - Clean Water Waste',
      category: 'Water Leakage',
      address: 'Sector 14 Main Road',
      visual_severity: 'Severe',
      priority_rank: 'P1 - Critical',
      cnn_score: 0.96,
      nlp_score: 0.92,
      status: 'Assigned',
      assigned_department: 'Water Supply & Drainage',
      assigned_officer: 'Karan Mehra',
      created_at: '30 mins ago',
      duplicates_merged: 5
    },
    {
      id: 'adm-4',
      ticket_id: 'CP-98127',
      title: 'Streetlight Pole Blown Fuse (Dark Corridor)',
      category: 'Streetlight Outage',
      address: 'Outer Ring Road Flyover ramp',
      visual_severity: 'Moderate',
      priority_rank: 'P3 - Moderate',
      cnn_score: 0.61,
      nlp_score: 0.54,
      status: 'In Progress',
      assigned_department: 'Streetlighting & Electrical',
      assigned_officer: 'Suresh Kumar',
      created_at: '1 day ago',
      duplicates_merged: 0
    },
    {
      id: 'adm-5',
      ticket_id: 'CP-98130',
      title: 'Severely Damaged Culvert Bridge Railing',
      category: 'Damaged Infrastructure',
      address: 'Barapullah Drain Bridge near Nizamuddin',
      visual_severity: 'Severe',
      priority_rank: 'P1 - Critical',
      cnn_score: 0.95,
      nlp_score: 0.91,
      status: 'Reported',
      assigned_department: null,
      assigned_officer: null,
      created_at: '15 mins ago',
      duplicates_merged: 2
    }
  ])

  // Department SLA performance metrics
  const departmentStats = [
    { name: 'Roads & Infrastructure', total: 412, resolvedRate: 94.2, pending: 18, avgSla: '4.8 hrs' },
    { name: 'Solid Waste & Sanitation', total: 528, resolvedRate: 91.5, pending: 34, avgSla: '3.2 hrs' },
    { name: 'Water Supply & Drainage', total: 241, resolvedRate: 96.8, pending: 9, avgSla: '6.1 hrs' },
    { name: 'Streetlighting & Electrical', total: 189, resolvedRate: 98.1, pending: 4, avgSla: '2.4 hrs' },
    { name: 'Public Works', total: 112, resolvedRate: 88.4, pending: 12, avgSla: '12.0 hrs' }
  ]

  // Assign department
  const handleAssign = (id, dept) => {
    setReports(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: 'Assigned',
          assigned_department: dept,
          assigned_officer: `${dept.split(' ')[0]} Squad Leader`
        }
      }
      return r
    }))
  }

  // Verify / Approve
  const handleApprove = (id) => {
    setReports(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Approved / Verified' }
      }
      return r
    }))
  }

  // Export Audit simulation
  const handleExport = () => {
    setExportNotice(true)
    setTimeout(() => setExportNotice(false), 3000)
  }

  // Filtered reports
  const filtered = reports.filter(r => {
    if (selectedDeptFilter !== 'All' && r.assigned_department !== selectedDeptFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return r.ticket_id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.address.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      
      {/* Admin Executive Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Municipal Central Command & Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {profile?.full_name || 'Dr. Anita Desai (Commissioner)'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Centralized city grievance triage, PostGIS spatial deduplication, and cross-department SLA performance governance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit Report</span>
            </button>
          </div>
        </div>

        {/* 4 City-Wide KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">City-Wide Grievances</div>
            <div className="text-2xl font-black mt-1 text-white">1,482</div>
            <div className="text-[10px] text-indigo-300 mt-0.5">+14% reporting surge this week</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">Overall Resolution Rate</div>
            <div className="text-2xl font-black mt-1 text-emerald-400">89.6%</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">Compliant with National MoHUA SLAs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">AI Deduplicated Complaints</div>
            <div className="text-2xl font-black mt-1 text-amber-400">327 Merged</div>
            <div className="text-[10px] text-amber-300 mt-0.5">PostGIS spatial buffer (r &lt; 50m)</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">Active P1 Life Hazards</div>
            <div className="text-2xl font-black mt-1 text-rose-400">6 Open</div>
            <div className="text-[10px] text-rose-300 mt-0.5">Escalated to Zonal Commissioners</div>
          </div>
        </div>
      </div>

      {exportNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center justify-between animate-in fade-in">
          <span>Official Municipal Grievance Audit Trail (CSV &amp; PDF) downloaded successfully.</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
      )}

      {/* Two Column Grid: AI Deduplication Engine & Department SLA Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: AI Multi-Modal Engine & Spatial Clustering */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Multi-Modal Severity &amp; Deduplication Engine</h3>
                <p className="text-xs text-slate-500">Hybrid CNN-RNN Visual Classifier + SVM-NLP Urgency Evaluator</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
              Active v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500">CNN Visual Model</div>
              <div className="text-lg font-black text-slate-900 mt-1">94.8%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Pothole &amp; defect detection accuracy</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500">SVM-NLP Text Classifier</div>
              <div className="text-lg font-black text-slate-900 mt-1">91.2%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Hazard urgency keyword sentiment</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500">Spatial Deduplication</div>
              <div className="text-lg font-black text-emerald-600 mt-1">327 Saved</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Prevented duplicate crew dispatches</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Live Spatial Cluster Alert:</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Ticket <strong>CP-98124</strong> on MG Road received 3 duplicate citizen reports within 25 meters. The AI engine merged duplicates automatically and elevated the priority rank from <strong>P2 (High)</strong> to <strong>P1 (Critical)</strong> due to crowdsourced density.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Department SLA Performance */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0d8a55]" />
              <span>Department SLAs</span>
            </h3>
            <span className="text-[11px] text-slate-400">Live Compliance</span>
          </div>

          <div className="space-y-3 pt-1">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 truncate pr-2">{dept.name}</span>
                  <span className="font-bold text-[#0d8a55]">{dept.resolvedRate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#0d8a55] rounded-full"
                    style={{ width: `${dept.resolvedRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{dept.pending} pending work orders</span>
                  <span>Avg SLA: {dept.avgSla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Triage & Routing Console */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">City Triage &amp; Department Routing Console</h3>
            <p className="text-xs text-slate-500">Review AI severity scores, verify citizen reports, and dispatch municipal departments</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Ticket &amp; Category</th>
                <th className="py-3 px-3">Title &amp; Location</th>
                <th className="py-3 px-3">AI Multi-Modal Score</th>
                <th className="py-3 px-3">Duplicates</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3 text-right">Triage Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-slate-900">{item.ticket_id}</div>
                    <div className="text-[11px] text-[#0d8a55] font-semibold">{item.category}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 max-w-xs truncate">{item.title}</div>
                    <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{item.address}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-xl font-bold text-[11px] inline-flex items-center gap-1 ${
                      item.priority_rank.includes('P1')
                        ? 'bg-rose-100 text-rose-800'
                        : item.priority_rank.includes('P2')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      <AlertTriangle className="w-3 h-3" />
                      {item.priority_rank} ({Math.round(item.cnn_score * 100)}%)
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    {item.duplicates_merged > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        {item.duplicates_merged} merged
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">None</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-700 px-2 py-0.5 rounded-md bg-slate-100 text-[11px]">
                      {item.status}
                    </span>
                    {item.assigned_department && (
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[140px]">
                        {item.assigned_department}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      {item.status === 'Reported' && (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200"
                        >
                          Verify
                        </button>
                      )}

                      <select
                        value={item.assigned_department || ''}
                        onChange={(e) => handleAssign(item.id, e.target.value)}
                        className="text-xs font-bold px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="" disabled>Route Dept...</option>
                        {DEPARTMENTS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
