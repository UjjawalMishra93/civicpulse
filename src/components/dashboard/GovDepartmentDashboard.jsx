import React, { useState, useMemo } from 'react'
import { 
  Building2, Search, Filter, Clock, MapPin, CheckCircle2, 
  AlertTriangle, ArrowUpRight, ShieldCheck, User, Phone, 
  Calendar, Eye, FileText, ChevronRight, RefreshCw, PlusCircle, 
  Check, X, MessageSquare, Bell, ArrowLeft, Printer, Download, 
  Send, Wrench, HardHat, ExternalLink, ChevronDown, Sparkles, 
  Compass, BarChart3, AlertCircle, CheckCircle, Layers 
} from 'lucide-react'
import { useReports, DEPARTMENTS_LIST, CATEGORY_TO_DEPARTMENT } from '../../context/ReportsContext'
import { useAuth } from '../../context/AuthContext'

export default function GovDepartmentDashboard({ onBackToHome, onOpenReportModal, initialDepartment = 'All Departments' }) {
  const { reports, updateReportStatus, loading } = useReports()
  const { profile } = useAuth()

  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment)
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [activeTabFilter, setActiveTabFilter] = useState('ALL') // 'ALL' | 'NEW' | 'IN_PROGRESS' | 'RESOLVED'
  const [searchQuery, setSearchQuery] = useState('')

  // Quick Action form state (Right panel in Image 3 style)
  const [atrStatus, setAtrStatus] = useState('In Progress')
  const [atrRemarks, setAtrRemarks] = useState('')
  const [atrOfficer, setAtrOfficer] = useState(profile?.full_name || 'Er. Rajesh Verma (AE)')
  const [atrSuccessMsg, setAtrSuccessMsg] = useState('')

  // Department Nodal Officers Roster (Official directory details)
  const DEPARTMENT_NODALS = {
    'Roads & Highway Infrastructure': {
      nodal: 'Er. Rajesh Verma',
      designation: 'Executive Engineer (Civil)',
      phone: '+91 (011) 2341-8901',
      zone: 'Zone 4, Central Highway Division',
      headquarters: 'PWD Bhawan, ITO Corridor, New Delhi',
      slaHours: '24 - 48 Hours',
      complianceRate: '96.2%'
    },
    'Solid Waste & Sanitation Department': {
      nodal: 'Shri R. K. Meena',
      designation: 'Chief Sanitation Officer',
      phone: '+91 (011) 2341-8902',
      zone: 'Sanitation Ward 18, South Zone',
      headquarters: 'Swachhata Kendra, Lajpat Nagar, New Delhi',
      slaHours: '12 - 24 Hours',
      complianceRate: '92.8%'
    },
    'Water Supply & Sewage Board': {
      nodal: 'Er. Karan Malhotra',
      designation: 'Superintending Engineer (Water Works)',
      phone: '+91 (011) 2341-8903',
      zone: 'Jal Sadan, South-West Sub-Division',
      headquarters: 'Delhi Jal Board Complex, Vasant Vihar',
      slaHours: '8 - 18 Hours',
      complianceRate: '97.5%'
    },
    'Electrical & Streetlighting Division': {
      nodal: 'Er. Suresh Kumar',
      designation: 'Divisional Engineer (Electrical)',
      phone: '+91 (011) 2341-8904',
      zone: 'Distribution Division #3',
      headquarters: 'Power Grid Office, Ring Road Sub-station',
      slaHours: '6 - 12 Hours',
      complianceRate: '98.4%'
    },
    'Drainage & Stormwater Department': {
      nodal: 'Er. Vikas Saxena',
      designation: 'Assistant Engineer (Drainage)',
      phone: '+91 (011) 2341-8905',
      zone: 'Stormwater Infrastructure Ward 12',
      headquarters: 'Flood & Drainage Control Office, Kashmere Gate',
      slaHours: '12 - 36 Hours',
      complianceRate: '91.0%'
    },
    'Public Works Department (PWD)': {
      nodal: 'Er. Anita Singhal',
      designation: 'Superintending Engineer (General Civil)',
      phone: '+91 (011) 2341-8906',
      zone: 'Public Infrastructure Central Zone',
      headquarters: 'PWD Headquarters, MSO Building, New Delhi',
      slaHours: '48 - 72 Hours',
      complianceRate: '89.4%'
    },
    'All Departments': {
      nodal: 'Dr. Anita Desai, IAS',
      designation: 'Municipal Commissioner & Central Director',
      phone: '+91 (011) 2341-9000',
      zone: 'All City Zones & Municipal Wards',
      headquarters: 'Civic Centre, Minto Road, New Delhi',
      slaHours: 'Citizen Charter Standard',
      complianceRate: '94.6%'
    }
  }

  const currentNodal = DEPARTMENT_NODALS[selectedDepartment] || DEPARTMENT_NODALS['All Departments']

  // Filtered reports for the selected department
  const departmentReports = useMemo(() => {
    return reports.filter(r => {
      if (selectedDepartment !== 'All Departments' && r.assigned_department !== selectedDepartment) {
        return false
      }
      if (activeTabFilter === 'NEW' && r.status !== 'Reported') return false
      if (activeTabFilter === 'IN_PROGRESS' && r.status !== 'In Progress') return false
      if (activeTabFilter === 'RESOLVED' && r.status !== 'Resolved' && r.status !== 'Closed') return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          r.ticket_id?.toLowerCase().includes(q) ||
          r.title?.toLowerCase().includes(q) ||
          r.address?.toLowerCase().includes(q) ||
          r.citizen_name?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [reports, selectedDepartment, activeTabFilter, searchQuery])

  // Active selected ticket for inspection/action (default to top item)
  const activeTicket = useMemo(() => {
    if (selectedTicketId) {
      const match = reports.find(r => r.ticket_id === selectedTicketId || r.id === selectedTicketId)
      if (match) return match
    }
    return departmentReports.length > 0 ? departmentReports[0] : null
  }, [reports, selectedTicketId, departmentReports])

  // Count by department
  const getDeptCount = (deptName) => {
    if (deptName === 'All Departments') return reports.length
    return reports.filter(r => r.assigned_department === deptName).length
  }

  // Handle Quick Action submit from right sidebar (Image 3 design)
  const handleAtrSubmit = (e) => {
    e.preventDefault()
    if (!activeTicket) return

    updateReportStatus(
      activeTicket.ticket_id,
      atrStatus,
      atrRemarks || 'Inspection completed. Work dispatched according to standard municipal operating procedure.',
      atrOfficer || 'Department Field Officer'
    )

    setAtrSuccessMsg(`Docket ${activeTicket.ticket_id} updated to "${atrStatus}" successfully!`)
    setAtrRemarks('')
    setTimeout(() => setAtrSuccessMsg(''), 4000)
  }

  // Calculate high level department metrics
  const totalInSelected = reports.filter(r => selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment).length
  const pendingInSelected = reports.filter(r => (selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment) && r.status !== 'Resolved' && r.status !== 'Closed').length
  const resolvedInSelected = reports.filter(r => (selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment) && (r.status === 'Resolved' || r.status === 'Closed')).length
  const p1Emergencies = reports.filter(r => (selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment) && (r.visual_severity === 'Severe' || r.visual_severity === 'High')).length

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#0d8a55]/20 selection:text-[#0d8a55]">
      
      {/* =========================================================================
          TOP NAVIGATION BAR (Inspired by Image 1 & Image 3)
      ========================================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            
            {/* Left: Brand Identity & Breadcrumb */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0d8a55] to-emerald-400 flex items-center justify-center text-white shadow-sm font-black text-sm">
                  CP
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                      Civic<span className="text-[#0d8a55]">Pulse</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#0d8a55] border border-emerald-200">
                      GovConsole
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Smart Cities e-Governance System
                  </span>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-200 hidden md:block" />

              {/* Breadcrumb Path */}
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="hover:text-slate-800 cursor-pointer" onClick={onBackToHome}>Portal</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-800 font-bold">{selectedDepartment}</span>
              </div>
            </div>

            {/* Right: Server Time, Search, Notifications, Officer Profile */}
            <div className="flex items-center gap-3">
              
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-[#0d8a55]" />
                <span className="font-medium">
                  {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-slate-700 font-semibold">
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
                </span>
              </div>

              {/* Return to Public Portal */}
              <button
                onClick={onBackToHome}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors relative cursor-pointer">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>
              </div>

              {/* Officer Profile Badge (Image 1 top right) */}
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0d8a55] to-teal-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {currentNodal.nodal.charAt(3) || 'E'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentNodal.nodal}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium truncate max-w-[130px]">
                    {currentNodal.designation.split('(')[0]}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN 3-COLUMN WORKSPACE
          [ Left Sidebar: Dept Directory ] + [ Middle: Dept Banner, Stats, Tables ] + [ Right: Quick Action Panel ]
      ========================================================================== */}
      <div className="flex-1 flex flex-col lg:flex-row w-full min-h-[calc(100vh-4rem)]">
        
        {/* =======================================================================
            LEFT SIDEBAR: DEPARTMENT DIRECTORY (Inspired by Image 2 & 3)
        ======================================================================== */}
        <aside className="w-full lg:w-64 xl:w-72 bg-white border-r border-slate-200/90 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Quick Action Report Button */}
            <button
              onClick={onOpenReportModal}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Civic Issue</span>
            </button>

            {/* Department Navigation Section */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Municipal Departments
              </div>
              <nav className="space-y-1">
                {DEPARTMENTS_LIST.map((dept) => {
                  const count = getDeptCount(dept)
                  const isSelected = selectedDepartment === dept
                  return (
                    <button
                      key={dept}
                      onClick={() => {
                        setSelectedDepartment(dept)
                        setSelectedTicketId(null)
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0d8a55] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-emerald-50/60 hover:text-[#0d8a55]'
                      }`}
                    >
                      <span className="truncate pr-2">{dept}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Quick Filter Section */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Docket Lifecycle Filter
              </div>
              <div className="space-y-1">
                {[
                  { id: 'ALL', label: 'All Dockets', count: totalInSelected },
                  { id: 'NEW', label: 'New / Registered', count: reports.filter(r => (selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment) && r.status === 'Reported').length },
                  { id: 'IN_PROGRESS', label: 'Work In Progress', count: reports.filter(r => (selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment) && r.status === 'In Progress').length },
                  { id: 'RESOLVED', label: 'Disposed / ATR Filed', count: resolvedInSelected }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTabFilter(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeTabFilter === item.id
                        ? 'bg-slate-100 text-slate-900 font-bold'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Officer Duty Card */}
          <div className="pt-4 mt-6 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-left">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Logged Duty Officer
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                {profile?.full_name || 'Officer Rajesh Verma'}
              </div>
              <div className="text-[10px] text-[#0d8a55] font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a55] animate-pulse" />
                Active Shift Verified
              </div>
            </div>
          </div>
        </aside>

        {/* =======================================================================
            CENTER COLUMN: DEPARTMENT BANNER, METRIC CARDS & GRIEVANCE TABLE
            (Structure directly modeled after Image 2 & 3)
        ======================================================================== */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-6 xl:p-8 space-y-6 overflow-x-hidden text-left">
          
          {/* Top Customer / Officer Header Card (Inspired by Image 2 top profile card) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0d8a55] to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 shrink-0">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {selectedDepartment}
                    </h1>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0d8a55] border border-emerald-200">
                      Active Department Queue
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {currentNodal.zone}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Nodal: <strong className="text-slate-800">{currentNodal.nodal}</strong> ({currentNodal.designation})</span>
                    <span className="text-slate-300">•</span>
                    <span>Helpline: <strong className="text-slate-700 font-mono">{currentNodal.phone}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right highlighted SLA compliance pill (Image 2 right card) */}
              <div className="flex items-center gap-3 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    SLA Compliance Standard
                  </div>
                  <div className="text-lg font-black text-[#0d8a55]">
                    {currentNodal.complianceRate}
                  </div>
                  <div className="text-[10px] text-slate-500">Target: {currentNodal.slaHours}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0d8a55] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

            </div>
          </div>

          {/* 4 Stat Cards Row (Exact structure from Image 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Docket Grievances */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0d8a55]" />
                  Total Dockets
                </span>
                <span className="text-[10px] text-slate-400 font-mono">100% AUDIT</span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-2xl font-black text-slate-900">{totalInSelected}</div>
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>Real-time DB Sync</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <div><strong className="text-slate-800">{pendingInSelected}</strong> Active</div>
                  <div><strong className="text-emerald-700">{resolvedInSelected}</strong> Disposed</div>
                </div>
              </div>
            </div>

            {/* Card 2: Field Action In-Progress */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Work In Progress
                </span>
                <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.2 rounded">ON SITE</span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-2xl font-black text-amber-900">
                    {reports.filter(r => (selectedDepartment === 'All Departments' || r.assigned_department === selectedDepartment) && r.status === 'In Progress').length}
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                    Squads en route / active
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <div>Avg: <strong className="text-slate-800">4.2 hrs</strong></div>
                  <div>Within SLA</div>
                </div>
              </div>
            </div>

            {/* Card 3: Disposed / ATR Filed */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0d8a55]" />
                  Disposed (ATR Filed)
                </span>
                <span className="text-[10px] text-[#0d8a55] font-bold bg-emerald-50 px-1.5 py-0.2 rounded">VERIFIED</span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-2xl font-black text-[#0d8a55]">{resolvedInSelected}</div>
                  <div className="text-[10px] text-[#0d8a55] font-medium mt-0.5">
                    Signed by Department AE
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <div>Proof: <strong className="text-slate-800">100%</strong></div>
                  <div>Photo attached</div>
                </div>
              </div>
            </div>

            {/* Card 4: Highlighted Theme Card (Like Image 2 right green gradient card) */}
            <div className="bg-gradient-to-br from-[#0d8a55] to-emerald-700 rounded-2xl p-4 text-white shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-100">
                <span>P1 Critical Alerts</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="py-1">
                <div className="text-3xl font-black text-white">{p1Emergencies}</div>
                <div className="text-[10px] text-emerald-100/90 mt-0.5">Immediate safety hazards flagged</div>
              </div>
              <button 
                onClick={() => setSearchQuery('Severe')}
                className="w-full mt-1 py-1 px-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold transition-colors cursor-pointer text-center"
              >
                Filter P1 Hazards
              </button>
            </div>

          </div>

          {/* Table Search & Tab Strip (Image 2 table header layout) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search docket ID, complainant, road..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0d8a55] bg-slate-50/50"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-medium">
                  Showing <strong className="text-slate-900">{departmentReports.length}</strong> grievances
                </span>
                <button
                  onClick={onOpenReportModal}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>New Report</span>
                </button>
              </div>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Docket ID</th>
                    <th className="py-3 px-4">Citizen Complainant</th>
                    <th className="py-3 px-4">Subject &amp; Locality</th>
                    <th className="py-3 px-4">Priority Rank</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Filing Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departmentReports.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-bold text-slate-700 text-xs">No grievances found in this queue.</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Use "New Report" to register an issue under this department.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    departmentReports.map((report) => {
                      const isSelected = activeTicket?.ticket_id === report.ticket_id
                      const isNewlyReported = report.status === 'Reported'

                      return (
                        <tr 
                          key={report.ticket_id || report.id}
                          onClick={() => setSelectedTicketId(report.ticket_id)}
                          className={`transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-emerald-50/70 border-l-4 border-l-[#0d8a55]' 
                              : 'hover:bg-slate-50/80'
                          }`}
                        >
                          {/* Docket ID */}
                          <td className="py-3 px-4 font-mono">
                            <span className="font-bold text-slate-900">{report.ticket_id}</span>
                            {isNewlyReported && (
                              <span className="block text-[9px] font-bold text-blue-700 tracking-wide mt-0.5 uppercase">
                                • NEW ENTRY
                              </span>
                            )}
                          </td>

                          {/* Citizen Complainant */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                                {(report.citizen_name || 'C').charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-800">{report.citizen_name || 'Anonymous Citizen'}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{report.citizen_phone || 'Web Portal'}</div>
                              </div>
                            </div>
                          </td>

                          {/* Title & Location */}
                          <td className="py-3 px-4 max-w-xs">
                            <div className="font-bold text-slate-900 truncate">{report.title}</div>
                            <div className="text-[11px] text-[#0d8a55] font-semibold">{report.category}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{report.address}</span>
                            </div>
                          </td>

                          {/* Priority */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              report.visual_severity === 'Severe' || report.visual_severity === 'High'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                report.visual_severity === 'Severe' || report.visual_severity === 'High' ? 'bg-rose-500' : 'bg-slate-400'
                              }`} />
                              {report.visual_severity === 'Severe' || report.visual_severity === 'High' ? 'P1 Critical' : 'P2 Routine'}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                              report.status === 'Resolved' || report.status === 'Closed'
                                ? 'bg-emerald-50 text-[#0d8a55] border border-emerald-200'
                                : report.status === 'In Progress'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                report.status === 'Resolved' || report.status === 'Closed'
                                  ? 'bg-[#0d8a55]'
                                  : report.status === 'In Progress'
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500 animate-pulse'
                              }`} />
                              {report.status}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                            {new Date(report.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </td>

                          {/* Action Button */}
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedTicketId(report.ticket_id)
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#0d8a55] hover:bg-[#096d43] text-white text-[11px] font-bold transition-all shadow-2xs"
                            >
                              Inspect / ATR
                            </button>
                          </td>

                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </main>

        {/* =======================================================================
            RIGHT COLUMN: STICKY QUICK ACTION & ATR PANEL (Inspired by Image 3)
        ======================================================================== */}
        <aside className="w-full lg:w-80 xl:w-96 bg-white border-l border-slate-200/90 p-5 shrink-0 space-y-5 text-left">
          
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Action Taken Report (ATR)
              </h3>
              <p className="text-[10px] text-slate-400">Department Inspection Console</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
              {activeTicket ? activeTicket.ticket_id : 'NO SELECTION'}
            </span>
          </div>

          {atrSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#0d8a55] shrink-0" />
              <span>{atrSuccessMsg}</span>
            </div>
          )}

          {activeTicket ? (
            <div className="space-y-4">
              
              {/* Selected Ticket Preview Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-[10px] font-bold text-[#0d8a55] uppercase tracking-wide">
                  {activeTicket.category}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {activeTicket.title}
                </h4>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{activeTicket.address}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-bold text-slate-800">{activeTicket.status}</span>
                </div>
                {activeTicket.official_remarks && (
                  <div className="p-2 bg-emerald-50/80 rounded-lg text-[10px] text-emerald-900 border border-emerald-200">
                    <strong>Logged ATR:</strong> "{activeTicket.official_remarks}"
                  </div>
                )}
              </div>

              {/* ATR Quick Entry Form */}
              <form onSubmit={handleAtrSubmit} className="space-y-3.5">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Update Disposal Status *
                  </label>
                  <select
                    value={atrStatus}
                    onChange={(e) => setAtrStatus(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d8a55]"
                  >
                    <option value="In Progress">In Progress (Crew Dispatched)</option>
                    <option value="Resolved">Resolved / Defect Rectified</option>
                    <option value="Approved / Verified">Approved / Under Scrutiny</option>
                    <option value="Closed">Closed &amp; Audited</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Field Officer In-Charge *
                  </label>
                  <input
                    type="text"
                    required
                    value={atrOfficer}
                    onChange={(e) => setAtrOfficer(e.target.value)}
                    placeholder="e.g. Er. Rajesh Verma"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0d8a55]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Action Taken Remarks (ATR) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={atrRemarks}
                    onChange={(e) => setAtrRemarks(e.target.value)}
                    placeholder="Document material used, squad dispatched, or defect rectification proof..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0d8a55] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Record Official ATR</span>
                </button>

              </form>

            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <FileText className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-700">No ticket selected</p>
              <p className="text-[10px] text-slate-400">Select any docket from the table to inspect and file ATR.</p>
            </div>
          )}

          {/* Quick Action Tiles (Matching Image 3 bottom right: Print, Export, View) */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Department Tools
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex flex-col items-center gap-1 text-slate-700 text-center cursor-pointer group"
              >
                <Printer className="w-4 h-4 text-slate-400 group-hover:text-[#0d8a55]" />
                <span className="text-[10px] font-bold">Print Docket</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Exporting official CSV docket statement for ${selectedDepartment}...`)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex flex-col items-center gap-1 text-slate-700 text-center cursor-pointer group"
              >
                <Download className="w-4 h-4 text-slate-400 group-hover:text-[#0d8a55]" />
                <span className="text-[10px] font-bold">Export ATR</span>
              </button>

              <button
                type="button"
                onClick={onOpenReportModal}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex flex-col items-center gap-1 text-slate-700 text-center cursor-pointer group col-span-2"
              >
                <PlusCircle className="w-4 h-4 text-[#0d8a55]" />
                <span className="text-[10px] font-bold text-[#0d8a55]">File Another Grievance in this Dept</span>
              </button>
            </div>
          </div>

        </aside>

      </div>

    </div>
  )
}
