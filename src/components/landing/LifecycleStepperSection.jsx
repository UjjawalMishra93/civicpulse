import React, { useState } from 'react'
import { 
  CheckCircle2, Clock, ShieldCheck, MapPin, Camera, 
  ArrowRight, Sparkles, Check, ChevronRight 
} from 'lucide-react'

export default function LifecycleStepperSection({ onOpenTrackModal }) {
  const [activeStep, setActiveStep] = useState(4) // Default to 'In Progress'

  const stages = [
    {
      num: '01',
      title: 'Reported',
      actor: 'Citizen via Web',
      desc: 'Citizen captures photographic evidence and attaches browser GPS coordinates via HTML5 Location API.',
      time: 'T + 0 min',
      detail: 'Citizen submits issue via responsive browser portal. System generates unique tracking docket CP/2026/DL-XXXXX.'
    },
    {
      num: '02',
      title: 'Approved / Verified',
      actor: 'AI & Central Admin',
      desc: 'Multi-modal engine scores severity; PostGIS buffer checks for spatial duplicates within 50 meters.',
      time: 'T + 5 min',
      detail: 'Hybrid CNN-RNN scores visual defect. Duplicates within 50m radius merged into primary parent docket.'
    },
    {
      num: '03',
      title: 'Assigned',
      actor: 'Department Routing',
      desc: 'Automatic routing to competent authority (Roads, Sanitation, Water Works, Streetlight, Drainage, PWD).',
      time: 'T + 15 min',
      detail: 'Work order created in the designated department roster. Responsible Assistant Engineer notified via SMS/push.'
    },
    {
      num: '04',
      title: 'In Progress',
      actor: 'Zonal Field Squad',
      desc: 'Field crew dispatched on-site with required machinery, asphalt premix, or replacement fittings.',
      time: 'T + 2 hours',
      detail: 'Field squad vehicle GPS tracks arrival on site. Active status reflected live to citizen on public tracking portal.'
    },
    {
      num: '05',
      title: 'Resolved',
      actor: 'Field Inspector ATR',
      desc: 'Mandatory post-repair photographic evidence uploaded to tamper-proof audit trail alongside Action Taken Report.',
      time: 'T + 12 hours',
      detail: 'Engineer uploads completion photograph. Status transitions to Resolved with geotagged timestamp.'
    },
    {
      num: '06',
      title: 'Closed',
      actor: 'Citizen Sign-Off',
      desc: 'Citizen audits resolution proof, rates repair quality (1 to 5 stars), and case officially closes.',
      time: 'T + 24 hours',
      detail: 'Citizen receives SMS confirmation with review link. Feedback recorded in municipal governance ratings.'
    }
  ]

  return (
    <section id="lifecycle" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0d8a55] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Governance Transparency (Section 8.2)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The 6-Stage Tamper-Proof Resolution Lifecycle
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every civic grievance follows an auditable 6-stage state machine from citizen filing to final post-repair verification. No complaints are closed without photographic proof.
          </p>
        </div>

        {/* 6-Stage Stepper Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {stages.map((st, idx) => {
            const stepNum = idx + 1
            const isActive = activeStep === stepNum
            const isCompleted = activeStep > stepNum

            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(stepNum)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0d8a55] border-[#0d8a55] text-white shadow-md shadow-emerald-900/10 scale-102'
                    : isCompleted
                    ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 hover:bg-emerald-100/60'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {st.num}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#0d8a55]" />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ) : null}
                  </div>
                  <div className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {st.title}
                  </div>
                </div>

                <div className={`text-[10px] mt-3 font-medium ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {st.time}
                </div>
              </button>
            )
          })}
        </div>

        {/* Detailed Stage Breakdown Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-left mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-[#0d8a55]">
                  Stage {stages[activeStep - 1].num} of 06
                </span>
                <span className="text-xs text-slate-400 font-semibold">•</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Responsible Party: {stages[activeStep - 1].actor}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {stages[activeStep - 1].title} Phase
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {stages[activeStep - 1].detail}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenTrackModal}
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Track Live Docket Example</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Before vs After Photographic Evidence Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="text-[11px] font-bold text-[#0d8a55] uppercase tracking-wider">
                Mandatory Photographic Audit Proof
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Before &amp; After Physical Rectification Verification
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#0d8a55] border border-emerald-200">
              Docket CP/2026/DL-48192 • PWD Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Before Photo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Initial Defect Reported by Citizen
                </span>
                <span className="text-[10px] font-mono text-slate-400">Oct 24, 08:15 AM</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80" 
                  alt="Defect Before" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-mono text-white">
                  Lat: 28.6139° N, Lng: 77.2090° E (MG Road)
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Deep road depression and rim fragmentation blocking two lanes of traffic.
              </p>
            </div>

            {/* After Photo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-[#0d8a55]">
                  <CheckCircle2 className="w-4 h-4 text-[#0d8a55]" />
                  Completed Field Rectification by PWD Squad
                </span>
                <span className="text-[10px] font-mono text-[#0d8a55]">Oct 24, 03:45 PM (7.5 hrs)</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-emerald-300 group">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" 
                  alt="Defect After" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#0d8a55]/90 backdrop-blur-md text-[10px] font-mono text-white font-bold">
                  ATR Proof Verified by Er. Rajesh Verma (AE)
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Asphalt compacted with premix bitumen and 8-ton vibratory roller. Opened to normal traffic.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
