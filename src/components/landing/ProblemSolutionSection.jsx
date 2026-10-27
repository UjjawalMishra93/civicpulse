import React, { useState } from 'react'
import { 
  X, Check, ArrowRight, Smartphone, Globe, 
  Clock, Zap, Layers, MapPin, ShieldCheck, 
  Sparkles, AlertCircle, CheckCircle2 
} from 'lucide-react'

export default function ProblemSolutionSection({ onOpenReportModal }) {
  const [activeTab, setActiveTab] = useState(0)

  const pillars = [
    {
      id: 'access',
      title: 'App Friction vs. Universal Web',
      shortTitle: 'Zero Install Barrier',
      icon: Globe,
      legacy: {
        title: 'Traditional Portals (Swachhata / Native Apps)',
        points: [
          'Forced app store download (40MB+)',
          'High friction for low-storage devices',
          'Citizens abandon reports midway'
        ],
        badge: 'Slow & Restrictive',
        badgeColor: 'bg-rose-100 text-rose-800'
      },
      modern: {
        title: 'CivicPulse Web Architecture',
        points: [
          'Instant access via any mobile web browser',
          'Native browser GPS & Camera API integration',
          'Report filed in under 30 seconds'
        ],
        badge: '0-Sec Universal Access',
        badgeColor: 'bg-emerald-100 text-[#0d8a55]',
        highlight: '100% Cross-Platform'
      }
    },
    {
      id: 'priority',
      title: 'FIFO Queue vs. AI P1 Priority',
      shortTitle: 'Smart AI Triage',
      icon: Zap,
      legacy: {
        title: 'Traditional Portals (CPGRAMS)',
        points: [
          'Chronological First-In, First-Out queue',
          'Dangerous cave-ins wait behind routine requests',
          'Manual administrative triage delays'
        ],
        badge: 'Chronological Backlog',
        badgeColor: 'bg-rose-100 text-rose-800'
      },
      modern: {
        title: 'CivicPulse Multi-Modal AI Layer',
        points: [
          'CNN-RNN scans visual defect depth & severity',
          'SVM-NLP detects hazard urgency keywords',
          'Severe hazards escalated to P1 in sub-seconds'
        ],
        badge: 'Sub-Second AI Escalation',
        badgeColor: 'bg-emerald-100 text-[#0d8a55]',
        highlight: '4.2x Faster Response'
      }
    },
    {
      id: 'duplicate',
      title: 'Duplicate Flooding vs. Spatial Merge',
      shortTitle: '50m PostGIS Merge',
      icon: MapPin,
      legacy: {
        title: 'Traditional Helplines',
        points: [
          '10+ calls for the same single pothole',
          'Redundant field squads sent to same location',
          'Municipal resources wasted on duplicates'
        ],
        badge: 'Redundant Dispatches',
        badgeColor: 'bg-rose-100 text-rose-800'
      },
      modern: {
        title: 'CivicPulse Geodetic Buffer Engine',
        points: [
          'PostGIS clusters reports within 50m radius',
          'Auto-merges into single parent work order',
          'Crowdsourced density boosts priority score'
        ],
        badge: 'Auto-Deduplication',
        badgeColor: 'bg-emerald-100 text-[#0d8a55]',
        highlight: '< 50m Spatial Buffer'
      }
    },
    {
      id: 'audit',
      title: 'Closed-Door Status vs. Photo Proof',
      shortTitle: 'Verified Photo Proof',
      icon: ShieldCheck,
      legacy: {
        title: 'Traditional Grievance Status',
        points: [
          'Cases closed without physical evidence',
          'Citizens left in the dark with no audit trail',
          'Low public trust and unresolved complaints'
        ],
        badge: 'No Visual Proof',
        badgeColor: 'bg-rose-100 text-rose-800'
      },
      modern: {
        title: 'CivicPulse 6-Stage Audit Trail',
        points: [
          'Field officer must upload completed repair photo',
          'Action Taken Report (ATR) logged to registry',
          'Citizen signs off with 5-star quality rating'
        ],
        badge: 'Mandatory Photo Proof',
        badgeColor: 'bg-emerald-100 text-[#0d8a55]',
        highlight: '100% Verified ATR'
      }
    }
  ]

  const activePillar = pillars[activeTab]

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header with Minimal Punchy Text */}
        <div className="max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0d8a55] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Civic Tech Paradigm Shift</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Old Municipal Portals vs. CivicPulse AI
          </h2>
          <p className="text-sm text-slate-500">
            How intelligent engineering eliminates administrative bottlenecks in civic resolution.
          </p>
        </div>

        {/* 4 Interactive Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            const isSelected = activeTab === idx
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d8a55] text-white shadow-md shadow-emerald-900/15 scale-102'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0d8a55]'}`} />
                <span>{p.shortTitle}</span>
              </button>
            )
          })}
        </div>

        {/* Side-by-Side Contrast Stage (Inspired by Linear / Stripe comparison cards) */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden mb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
            
            {/* Left Card: The Legacy Way (CPGRAMS / Old Portals) */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${activePillar.legacy.badgeColor}`}>
                    {activePillar.legacy.badge}
                  </span>
                  <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                    <X className="w-4 h-4" /> The Old Way
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {activePillar.legacy.title}
                </h3>

                <ul className="space-y-2.5">
                  {activePillar.legacy.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2.5 h-2.5" />
                      </div>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-200">
                Result: High citizen frustration and delayed repairs.
              </div>
            </div>

            {/* Right Card: The CivicPulse AI Innovation */}
            <div className="bg-gradient-to-b from-emerald-50/80 to-white rounded-2xl p-6 border-2 border-emerald-300 shadow-xs flex flex-col justify-between space-y-5 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${activePillar.modern.badgeColor}`}>
                    {activePillar.modern.badge}
                  </span>
                  <span className="text-xs font-bold text-[#0d8a55] flex items-center gap-1">
                    <Check className="w-4 h-4" /> CivicPulse AI
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {activePillar.modern.title}
                </h3>

                <ul className="space-y-2.5">
                  {activePillar.modern.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#0d8a55] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-200 text-xs">
                <span className="font-bold text-[#0d8a55]">Automated Redressal</span>
                <span className="font-mono font-bold text-[11px] text-slate-700 bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">
                  {activePillar.modern.highlight}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Sleek Micro-Tiles Strip Below (Quick skimmable cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0d8a55] flex items-center justify-center shrink-0 font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Zero-Install Web</div>
              <div className="text-[11px] text-slate-400">Works in any mobile browser</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">AI Priority Triage</div>
              <div className="text-[11px] text-slate-400">Life hazards prioritized to P1</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">50m Spatial Merge</div>
              <div className="text-[11px] text-slate-400">PostGIS prevents duplicate calls</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Mandatory Proof</div>
              <div className="text-[11px] text-slate-400">Photo proof required to close</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
