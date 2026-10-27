import React, { useState } from 'react'
import { 
  User, HardHat, ShieldCheck, ArrowRight, CheckCircle2, 
  MapPin, Camera, Sparkles, Building2, Layers, Cpu 
} from 'lucide-react'

export default function ThreeTierArchitectureSection({ onNavigateToDashboard, onOpenReportModal }) {
  const [activeTier, setActiveTier] = useState('citizen')

  const tiers = {
    citizen: {
      role: 'Tier 1: Citizen Web Interface',
      tagline: 'Friction-free civic sensing without mandatory mobile apps',
      icon: User,
      color: 'text-emerald-700 bg-emerald-100',
      features: [
        'HTML5 Geolocation API auto-captures exact GPS lat/lng coordinates',
        'Camera API handles real-time photo capture with auto-compression',
        'Community +1 support button prevents redundant duplicate reports',
        'Transparent 6-stage docket tracking with SMS & Web notification updates',
        'Citizen sign-off & 5-star quality ratings for completed municipal work'
      ],
      previewHeadline: 'Citizen Public Dashboard View',
      previewDetails: 'Report grievances in under 30 seconds. Track repair teams on a live map.'
    },
    authority: {
      role: 'Tier 2: Authority / Department Console',
      tagline: 'Priority-driven field dispatch for municipal engineering divisions',
      icon: HardHat,
      color: 'text-amber-700 bg-amber-100',
      features: [
        'Dedicated queues for Roads, Sanitation, Water Works, Streetlight, Drainage, PWD',
        'Grievances sorted automatically by AI Priority Rank (P1 Critical vs P2 vs P3)',
        'One-click field crew dispatch with citizen charter SLA countdown timers',
        'Mandatory post-repair photographic proof upload for audit compliance',
        'Official Action Taken Report (ATR) documentation logged to central registry'
      ],
      previewHeadline: 'Department Field Operations Console',
      previewDetails: 'Engineers view work orders, update repair progress, and upload photo proof.'
    },
    admin: {
      role: 'Tier 3: Municipal Administrator Command',
      tagline: 'Central governance, spatial deduplication, and cross-department triage',
      icon: ShieldCheck,
      color: 'text-indigo-700 bg-indigo-100',
      features: [
        'City-wide executive metrics: total dockets, resolution compliance, active P1 hazards',
        'PostGIS spatial buffer clustering auto-merges duplicate complaints within 50m',
        'Multi-modal AI confidence audits across CNN-RNN and SVM-NLP models',
        'Manual override tools for municipal commissioners and departmental triage heads',
        'Official Government Audit Report export (CSV/PDF) for Ministry compliance'
      ],
      previewHeadline: 'Municipal Command & Control Center',
      previewDetails: 'Commissioners govern cross-department SLAs and audit spatial clusters.'
    }
  }

  const current = tiers[activeTier]
  const Icon = current.icon

  return (
    <section id="architecture" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Three-Tier Governance Model (Section 6 &amp; 8.1)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Seamless Orchestration Across Citizens, Field Squads &amp; Commissioners
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Model-View-Controller (MVC) architecture provides tailored, role-specific consoles for all participants in the civic infrastructure resolution ecosystem.
          </p>
        </div>

        {/* 3 Tier Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {[
            { id: 'citizen', label: '1. Citizen Portal', icon: User },
            { id: 'authority', label: '2. Department Field Console', icon: HardHat },
            { id: 'admin', label: '3. Municipal Admin Command', icon: ShieldCheck }
          ].map(t => {
            const TIcon = t.icon
            const isSelected = activeTier === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a2240] text-white border-[#0a2240] shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  <TIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tier Details Showcase Box */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 Cols: Role Responsibilities */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d8a55]">
                  {current.role}
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {current.tagline}
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {current.features.map(f => (
                  <div key={f} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0d8a55] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onNavigateToDashboard}
                  className="px-6 py-3 rounded-2xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Launch {activeTier === 'citizen' ? 'Citizen Portal' : activeTier === 'authority' ? 'Department Queue' : 'Admin Console'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Visual Mockup Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${current.color} flex items-center justify-center font-bold text-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{current.previewHeadline}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  LIVE CONSOLE
                </span>
              </div>

              <p className="text-xs text-slate-500">
                {current.previewDetails}
              </p>

              {/* Sample Mini Table Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="text-slate-800">CP/2026/DL-48192</span>
                  <span className="text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded font-sans">P1 Critical</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">
                  Severe road cave-in and asphalt subsidence
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>MG Road, Sector 4</span>
                  <span className="font-bold text-[#0d8a55]">In Progress</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0d8a55] shrink-0" />
                <span>Instant bi-directional state synchronization via Supabase backend.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
