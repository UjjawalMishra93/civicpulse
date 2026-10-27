import React, { useState } from 'react'
import { 
  HardHat, AlertTriangle, CheckCircle2, Clock, MapPin, 
  Camera, Upload, ArrowUpRight, Search, Filter, ShieldCheck, 
  Sparkles, Wrench, Navigation, CheckCircle 
} from 'lucide-react'
import { useAuth, DEPARTMENTS } from '../../context/AuthContext'
import ResolutionProofModal from './ResolutionProofModal'

export default function OfficerDashboard() {
  const { profile } = useAuth()
  const defaultDept = profile?.department || 'Roads & Infrastructure'
  const [selectedDept, setSelectedDept] = useState(defaultDept)
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [proofModalOpen, setProofModalOpen] = useState(false)
  const [activeTicketForProof, setActiveTicketForProof] = useState(null)

  // Work orders assigned to this department
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'wo-1',
      ticket_id: 'CP-98124',
      title: 'Deep Pothole Cluster near Metro Pillar 42',
      category: 'Road & Potholes',
      address: 'MG Road, Central Zone',
      coordinates: '28.6139° N, 77.2090° E',
      visual_severity: 'Severe',
      priority_rank: 'P1 - Critical',
      cnn_score: 0.94,
      nlp_urgency: 'Immediate Hazard',
      status: 'Assigned',
      reported_at: '2 hours ago',
      sla_deadline: '4 hours remaining',
      assigned_crew: 'Road Squad Alpha (Van #12)',
      citizen_name: 'Priya Sharma',
      image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=80',
      resolution_proof: null
    },
    {
      id: 'wo-2',
      ticket_id: 'CP-98128',
      title: 'Cave-in on Right Carriage Lane (Rain Drainage)',
      category: 'Road & Potholes',
      address: 'Outer Ring Road, flyover exit',
      coordinates: '28.5355° N, 77.2410° E',
      visual_severity: 'Severe',
      priority_rank: 'P1 - Critical',
      cnn_score: 0.91,
      nlp_urgency: 'Traffic Hazard',
      status: 'In Progress',
      reported_at: '3 hours ago',
      sla_deadline: '3 hours remaining',
      assigned_crew: 'Heavy Machinery Div #2',
      citizen_name: 'Amit Patel',
      image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=80',
      resolution_proof: null
    },
    {
      id: 'wo-3',
      ticket_id: 'CP-98135',
      title: 'Speed Breaker White Thermoplastic Paint Worn Out',
      category: 'Road & Potholes',
      address: 'Vasant Vihar School Zone',
      coordinates: '28.5600° N, 77.1600° E',
      visual_severity: 'Moderate',
      priority_rank: 'P3 - Moderate',
      cnn_score: 0.62,
      nlp_urgency: 'Scheduled',
      status: 'In Progress',
      reported_at: '1 day ago',
      sla_deadline: '18 hours remaining',
      assigned_crew: 'Marking Squad #4',
      citizen_name: 'Rahul Sen',
      image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80',
      resolution_proof: null
    },
    {
      id: 'wo-4',
      ticket_id: 'CP-98011',
      title: 'Collapsed Curb Stone & Pedestrian Footpath Slab',
      category: 'Damaged Infrastructure',
      address: 'Connaught Place Block F',
      coordinates: '28.6315° N, 77.2167° E',
      visual_severity: 'High',
      priority_rank: 'P2 - High',
      cnn_score: 0.83,
      nlp_urgency: 'Standard',
      status: 'Resolved',
      reported_at: '2 days ago',
      sla_deadline: 'Completed on-time',
      assigned_crew: 'Civil Works Team #1',
      citizen_name: 'Sneha Roy',
      image_url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=80',
      resolution_proof: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
      resolution_remarks: 'Kerb stones reset and mortar cured. Footpath safety restored.'
    }
  ])

  // Dispatch crew action
  const handleStartWork = (id) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === id) {
        return { ...wo, status: 'In Progress' }
      }
      return wo
    }))
  }

  // Open resolution proof modal
  const handleOpenProofModal = (ticket) => {
    setActiveTicketForProof(ticket)
    setProofModalOpen(true)
  }

  // Handle resolution completion
  const handleCompleteResolution = (id, remarks, proofImage) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === id) {
        return {
          ...wo,
          status: 'Resolved',
          resolution_proof: proofImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
          resolution_remarks: remarks,
          sla_deadline: 'Completed on-time'
        }
      }
      return wo
    }))
  }

  // Filtered orders
  const filteredOrders = workOrders.filter(wo => {
    if (statusFilter !== 'All' && wo.status !== statusFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return wo.ticket_id.toLowerCase().includes(q) || wo.title.toLowerCase().includes(q) || wo.address.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      
      {/* Officer Command Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <HardHat className="w-3.5 h-3.5" />
              <span>Municipal Field Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {profile?.full_name || 'Rajesh Verma (AE)'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Designation: <strong>Assistant Engineer</strong> • Department: <strong className="text-amber-400">{selectedDept}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-300 font-bold hidden sm:block">Department:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">Active Work Orders</div>
            <div className="text-2xl font-black mt-1 text-white">{workOrders.length}</div>
            <div className="text-[10px] text-amber-400 mt-0.5">2 pending dispatch</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">P1 Critical Emergencies</div>
            <div className="text-2xl font-black mt-1 text-rose-400">
              {workOrders.filter(w => w.priority_rank.includes('P1')).length}
            </div>
            <div className="text-[10px] text-rose-300 mt-0.5">Automated AI priority flag</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">Department SLA Score</div>
            <div className="text-2xl font-black mt-1 text-emerald-400">96.4%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Avg resolution: 5.2 hrs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-slate-400 text-xs font-semibold">Resolved Today</div>
            <div className="text-2xl font-black mt-1 text-emerald-400">
              {workOrders.filter(w => w.status === 'Resolved').length}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Photo proofs uploaded</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket, road, address..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((wo) => (
          <div
            key={wo.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            {/* Left Column: Details */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                  {wo.ticket_id}
                </span>
                
                {/* Priority Rank Pill */}
                <span className={`text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1 ${
                  wo.priority_rank.includes('P1')
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : wo.priority_rank.includes('P2')
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{wo.priority_rank}</span>
                </span>

                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                  {wo.category}
                </span>

                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  CNN Visual Score: {Math.round(wo.cnn_score * 100)}%
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{wo.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {wo.address}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-[11px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border">
                    GPS: {wo.coordinates}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>Reported by: <strong className="text-slate-700">{wo.citizen_name}</strong> ({wo.reported_at})</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">
                  Assigned Unit: <strong className="text-slate-800">{wo.assigned_crew}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-md">
                  SLA: {wo.sla_deadline}
                </span>
              </div>

              {/* Resolution Remarks if Resolved */}
              {wo.status === 'Resolved' && wo.resolution_remarks && (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                  <strong>Resolution Audit Proof:</strong> {wo.resolution_remarks}
                </div>
              )}
            </div>

            {/* Right Column: Actions */}
            <div className="flex lg:flex-col items-center justify-end gap-2 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
              {wo.status === 'Assigned' && (
                <button
                  onClick={() => handleStartWork(wo.id)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Dispatch Squad & Start</span>
                </button>
              )}

              {wo.status === 'In Progress' && (
                <button
                  onClick={() => handleOpenProofModal(wo)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Proof & Resolve</span>
                </button>
              )}

              {wo.status === 'Resolved' && (
                <span className="px-4 py-2 rounded-xl bg-emerald-100 text-[#0d8a55] text-xs font-bold flex items-center gap-1.5 border border-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed & Logged</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resolution Proof Upload Modal */}
      <ResolutionProofModal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        ticket={activeTicketForProof}
        onResolve={handleCompleteResolution}
      />

    </div>
  )
}
