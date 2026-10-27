import React, { useState } from 'react'
import { X, Search, MapPin, CheckCircle, Clock, AlertTriangle, ShieldCheck, ArrowRight, Building2, User } from 'lucide-react'
import { useReports } from '../context/ReportsContext'

export default function TrackReportModal({ isOpen, onClose }) {
  const { reports, getReportByTicketId } = useReports()
  const defaultQuery = reports.length > 0 ? reports[0].ticket_id : 'CP/2026/DL-48192'
  const [ticketQuery, setTicketQuery] = useState(defaultQuery)
  const [searchedTicket, setSearchedTicket] = useState(reports.length > 0 ? reports[0] : null)
  const [notFound, setNotFound] = useState(false)

  if (!isOpen) return null

  const handleSearch = (e) => {
    e.preventDefault()
    const query = ticketQuery.trim().toLowerCase()
    const found = reports.find(r => 
      r.ticket_id?.toLowerCase() === query || 
      r.id?.toLowerCase() === query ||
      r.ticket_id?.toLowerCase().includes(query)
    )

    if (found) {
      setSearchedTicket(found)
      setNotFound(false)
    } else {
      setSearchedTicket(null)
      setNotFound(true)
    }
  }

  const getStageIndex = (status) => {
    switch (status) {
      case 'Reported': return 1
      case 'Approved / Verified': return 2
      case 'Assigned': return 3
      case 'In Progress': return 4
      case 'Resolved': return 5
      case 'Closed': return 6
      default: return 1
    }
  }

  const stages = [
    { name: 'Reported', desc: 'Citizen submitted via web portal' },
    { name: 'Approved / Verified', desc: 'Admin confirmed issue validity' },
    { name: 'Assigned', desc: 'Dispatched to competent department' },
    { name: 'In Progress', desc: 'Work crew executing repair on-site' },
    { name: 'Resolved', desc: 'Photo proof & ATR uploaded' },
    { name: 'Closed', desc: 'Citizen verified & audited' }
  ]

  const currentStage = searchedTicket ? getStageIndex(searchedTicket.status) : 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-slate-300 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a2240] text-white border-b-2 border-[#ff9933]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-white/10 text-white flex items-center justify-center font-bold">
              <Search className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Track Public Grievance Status
              </h2>
              <p className="text-xs text-slate-300">
                National 6-stage lifecycle tracking with official Action Taken Report (ATR)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 pb-3 border-b border-slate-200 bg-slate-50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={ticketQuery}
                onChange={(e) => setTicketQuery(e.target.value)}
                placeholder="Enter Docket Reference (e.g. CP/2026/DL-48192)"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-medium focus:ring-2 focus:ring-[#0a2240] focus:outline-none bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0a2240] hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick suggestions from real reports */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto text-[11px] text-slate-500">
            <span className="font-bold shrink-0">Recent Dockets:</span>
            {reports.slice(0, 3).map(r => (
              <button
                key={r.ticket_id}
                type="button"
                onClick={() => {
                  setTicketQuery(r.ticket_id)
                  setSearchedTicket(r)
                  setNotFound(false)
                }}
                className="px-2 py-0.5 rounded bg-white border border-slate-300 text-blue-900 font-mono text-[10px] hover:bg-blue-50 cursor-pointer shrink-0"
              >
                {r.ticket_id}
              </button>
            ))}
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="p-6 text-center text-slate-600 space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <div className="font-bold text-sm text-slate-800">Docket Reference Not Found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please ensure the docket number is entered correctly, or click one of the recent docket buttons above.
            </p>
          </div>
        )}

        {/* Details & Stepper */}
        {searchedTicket && !notFound && (
          <div className="p-6 overflow-y-auto space-y-5 text-left">
            
            {/* Ticket Info Card */}
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold text-blue-800 tracking-wide uppercase">
                    {searchedTicket.category}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                    {searchedTicket.title}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-800 shadow-2xs shrink-0">
                  {searchedTicket.ticket_id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Assigned Department:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-700" />
                    {searchedTicket.assigned_department}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Responsible Officer:</span>
                  <span className="font-medium text-slate-800">
                    {searchedTicket.assigned_officer || 'Zonal Duty Officer'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[11px] text-slate-500 block">Incident Location:</span>
                  <span className="font-medium text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {searchedTicket.address}
                  </span>
                </div>
              </div>

              {searchedTicket.official_remarks && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900">
                  <strong>Official Action Taken Report (ATR):</strong> {searchedTicket.official_remarks}
                </div>
              )}
            </div>

            {/* Stepper */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Grievance Resolution Progress:
              </div>
              <div className="space-y-3">
                {stages.map((stage, idx) => {
                  const stepNum = idx + 1
                  const isDone = stepNum < currentStage
                  const isCurrent = stepNum === currentStage
                  return (
                    <div key={stage.name} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-[#138808] text-white shadow-xs' 
                            : isCurrent 
                            ? 'bg-[#0a2240] text-white shadow-sm ring-4 ring-blue-100' 
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isDone ? <CheckCircle className="w-4 h-4" /> : stepNum}
                        </div>
                        {stepNum < stages.length && (
                          <div className={`w-0.5 h-6 mt-1 ${isDone ? 'bg-[#138808]' : 'bg-slate-200'}`} />
                        )}
                      </div>
                      <div className="pt-0.5">
                        <div className={`text-xs font-bold leading-tight ${isCurrent ? 'text-[#0a2240]' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                          {stage.name} {isCurrent && <span className="text-[10px] text-blue-700 font-bold ml-1.5">(CURRENT)</span>}
                        </div>
                        <div className="text-[11px] text-slate-500">{stage.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
