import React, { useState } from 'react'
import { 
  FileText, Clock, CheckCircle2, AlertCircle, MapPin, 
  ThumbsUp, Camera, MessageSquare, Star, ArrowUpRight, 
  Sparkles, ShieldCheck, ChevronRight, Share2, PlusCircle 
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function CitizenDashboard({ onOpenReportModal, onOpenTrackModal }) {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState('my-reports') // 'my-reports' | 'community' | 'proofs'
  const [ratedTickets, setRatedTickets] = useState({})

  // Citizen's own submitted reports
  const [myReports, setMyReports] = useState([
    {
      id: 'rep-c1',
      ticket_id: 'CP-89241',
      title: 'Dangerous Pothole on Main Road (Near Bus Stand)',
      category: 'Road & Potholes',
      address: 'MG Road, Pillar 42, New Delhi',
      submitted_at: 'Oct 25, 2026',
      status: 'In Progress',
      stageIndex: 4, // 1 to 6
      severity: 'Severe',
      aiScore: '94%',
      department: 'Roads & Infrastructure',
      officer: 'Rajesh Verma (AE)',
      estimatedSla: 'Within 6 hours',
      upvotes: 14,
      image_before: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=80',
      image_after: null
    },
    {
      id: 'rep-c2',
      ticket_id: 'CP-78119',
      title: 'Overflowing Secondary Waste Bin',
      category: 'Garbage Overflow',
      address: 'Sector 4 Community Center',
      submitted_at: 'Oct 22, 2026',
      status: 'Resolved',
      stageIndex: 5,
      severity: 'High',
      aiScore: '86%',
      department: 'Solid Waste & Sanitation',
      officer: 'Sunil Kumar',
      estimatedSla: 'Completed in 14 hrs',
      upvotes: 8,
      image_before: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&auto=format&fit=crop&q=80',
      image_after: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
      resolution_remark: 'Dumpster cleared, pressure washed, and twice-daily schedule implemented.'
    },
    {
      id: 'rep-c3',
      ticket_id: 'CP-64023',
      title: 'High Pressure Drinking Water Pipe Leakage',
      category: 'Water Leakage',
      address: 'Block B Market crossing',
      submitted_at: 'Oct 19, 2026',
      status: 'Closed',
      stageIndex: 6,
      severity: 'High',
      aiScore: '89%',
      department: 'Water Supply & Drainage',
      officer: 'Karan Mehra',
      estimatedSla: 'Completed in 8 hrs',
      upvotes: 21,
      image_before: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=80',
      image_after: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
      resolution_remark: 'Gasket replacement complete and pressure tested.'
    }
  ])

  // Ward community complaints to avoid duplicates
  const [communityReports, setCommunityReports] = useState([
    {
      id: 'comm-1',
      ticket_id: 'CP-99012',
      title: 'Streetlight Pole Blown Fuse (Dark Corridor)',
      category: 'Streetlight Outage',
      address: 'Ring Road underpass near Flyover',
      upvotes: 34,
      status: 'Assigned',
      department: 'Streetlighting & Electrical',
      reported_time: '3 hours ago',
      hasUpvoted: false
    },
    {
      id: 'comm-2',
      ticket_id: 'CP-99014',
      title: 'Open Drainage Manhole Cover Broken',
      category: 'Open Manhole',
      address: 'Near Government High School Gate',
      upvotes: 52,
      status: 'In Progress',
      department: 'Public Works',
      reported_time: '1 hour ago',
      hasUpvoted: true
    },
    {
      id: 'comm-3',
      ticket_id: 'CP-99020',
      title: 'Fallen Tree Branch Obstructing Left Lane',
      category: 'Damaged Infrastructure',
      address: 'Nehru Place Outer Circle',
      upvotes: 19,
      status: 'Approved / Verified',
      department: 'Horticulture & Roads',
      reported_time: '45 mins ago',
      hasUpvoted: false
    }
  ])

  const handleUpvoteCommunity = (id) => {
    setCommunityReports(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          hasUpvoted: !c.hasUpvoted,
          upvotes: c.hasUpvoted ? c.upvotes - 1 : c.upvotes + 1
        }
      }
      return c
    }))
  }

  const handleRateResolution = (ticketId, stars) => {
    setRatedTickets(prev => ({ ...prev, [ticketId]: stars }))
  }

  const stagesList = [
    'Reported',
    'Approved / Verified',
    'Assigned',
    'In Progress',
    'Resolved',
    'Closed'
  ]

  return (
    <div className="space-y-6">
      
      {/* Citizen Hero & Metric Strip */}
      <div className="bg-gradient-to-r from-emerald-800 via-[#0d8a55] to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Smart Ward Citizen Hub • Ward 42</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Hello, {profile?.full_name || 'Civic Champion'}!
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl">
              Track your civic grievance resolutions in real-time, view photographic audit proof, or report new hazards with AI severity classification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="px-5 py-3 rounded-2xl bg-white text-[#0d8a55] hover:bg-emerald-50 text-xs font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report New Issue</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-emerald-200 text-xs font-semibold">My Filed Issues</div>
            <div className="text-2xl font-black mt-1">{myReports.length}</div>
            <div className="text-[10px] text-emerald-100/80 mt-0.5">100% digital audit trail</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-emerald-200 text-xs font-semibold">Active Resolution</div>
            <div className="text-2xl font-black mt-1">
              {myReports.filter(r => r.status === 'In Progress' || r.status === 'Assigned').length}
            </div>
            <div className="text-[10px] text-emerald-100/80 mt-0.5">Field crew dispatched</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-emerald-200 text-xs font-semibold">Resolved & Closed</div>
            <div className="text-2xl font-black mt-1">
              {myReports.filter(r => r.status === 'Resolved' || r.status === 'Closed').length}
            </div>
            <div className="text-[10px] text-emerald-100/80 mt-0.5">Verified with photo proof</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-emerald-200 text-xs font-semibold">Civic Karma Score</div>
            <div className="text-2xl font-black mt-1 flex items-center gap-1.5">
              <span>380</span>
              <span className="text-xs text-amber-300 font-bold">★ Lvl 3</span>
            </div>
            <div className="text-[10px] text-emerald-100/80 mt-0.5">Active Community Sensor</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('my-reports')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'my-reports'
                ? 'bg-[#0d8a55] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            My Reported Issues ({myReports.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'community'
                ? 'bg-[#0d8a55] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Ward Community Feed</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-[#0d8a55] font-bold">
              {communityReports.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('proofs')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'proofs'
                ? 'bg-[#0d8a55] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Before & After Audit Gallery
          </button>
        </div>
      </div>

      {/* Tab 1: My Reported Issues with 6-stage lifecycle stepper */}
      {activeTab === 'my-reports' && (
        <div className="space-y-4">
          {myReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-5"
            >
              {/* Top Row: Ticket info & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                    {report.ticket_id}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-[#0d8a55] border border-emerald-100">
                    {report.category}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                    report.severity === 'Severe' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    AI Priority: {report.severity} ({report.aiScore})
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {report.submitted_at}
                  </span>
                  <span className="font-bold text-[#0d8a55] bg-emerald-50/70 px-2.5 py-1 rounded-lg">
                    SLA: {report.estimatedSla}
                  </span>
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="text-base font-bold text-slate-900">{report.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{report.address}</span>
                  <span className="text-slate-300">•</span>
                  <span>Assigned Dept: <strong className="text-slate-700">{report.department}</strong></span>
                  {report.officer && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span>Officer: <strong className="text-slate-700">{report.officer}</strong></span>
                    </>
                  )}
                </div>
              </div>

              {/* 6-Stage Progress Stepper (from Synopsis) */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  6-Stage Resolution Lifecycle:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {stagesList.map((stageName, idx) => {
                    const stepNumber = idx + 1
                    const isDone = stepNumber < report.stageIndex
                    const isCurrent = stepNumber === report.stageIndex
                    return (
                      <div
                        key={stageName}
                        className={`p-2.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : isCurrent
                            ? 'bg-[#0d8a55] border-[#0d8a55] text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold">0{stepNumber}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : isCurrent ? (
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-300" />
                          )}
                        </div>
                        <div className="text-[11px] font-bold leading-tight">{stageName}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* If Resolved: Citizen Rating & Proof */}
              {report.status === 'Resolved' && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0d8a55]" />
                      Resolution Completed by Field Team
                    </div>
                    <div className="text-xs text-slate-600">
                      "{report.resolution_remark}"
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Rate Quality:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRateResolution(report.ticket_id, star)}
                          className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          <Star 
                            className={`w-4 h-4 ${
                              (ratedTickets[report.ticket_id] || 0) >= star 
                                ? 'text-amber-400 fill-amber-400' 
                                : ''
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    {ratedTickets[report.ticket_id] && (
                      <span className="text-xs font-bold text-emerald-700 ml-1">Feedback saved!</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Ward Community Feed (Upvoting to avoid duplicates) */}
      {activeTab === 'community' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Smart Deduplication:</strong> If your issue is already listed below, click <strong>"+1 Me Too"</strong> instead of filing a duplicate report. The AI engine increases its priority score!
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {communityReports.map((c) => (
              <div 
                key={c.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-500">{c.ticket_id}</span>
                    <span className="text-[10px] font-bold text-[#0d8a55] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {c.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{c.title}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{c.address}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Assigned: <strong className="text-slate-700">{c.department}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{c.reported_time}</span>
                  <button
                    onClick={() => handleUpvoteCommunity(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      c.hasUpvoted
                        ? 'bg-[#0d8a55] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#0d8a55]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{c.hasUpvoted ? 'Supported' : '+1 Me Too'} ({c.upvotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Before & After Audit Proof Gallery */}
      {activeTab === 'proofs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myReports.filter(r => r.image_after).map((r) => (
            <div key={r.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-700">{r.ticket_id}</span>
                  <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-[#0d8a55]">
                  Resolution Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Before Repair (Reported)
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200">
                    <img src={r.image_before} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    After Repair (Officer Proof)
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-emerald-300">
                    <img src={r.image_after} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                <span className="font-bold text-slate-800">Officer Note:</span> {r.resolution_remark}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
