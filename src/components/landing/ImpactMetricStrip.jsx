import React from 'react'
import { Zap, ShieldCheck, Cpu, MapPin, Building2, CheckCircle2 } from 'lucide-react'

export default function ImpactMetricStrip() {
  const metrics = [
    {
      stat: '4.2x',
      label: 'Faster Triage & Routing',
      sub: 'vs manual CPGRAMS queues',
      icon: Zap,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      stat: '< 50m',
      label: 'PostGIS Geodetic Buffer',
      sub: 'Automatic spatial deduplication',
      icon: MapPin,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      stat: '94.8%',
      label: 'CNN-RNN AI Accuracy',
      sub: 'Visual defect severity scoring',
      icon: Cpu,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      stat: '6 Stages',
      label: 'Transparent Lifecycle',
      sub: 'Tamper-proof audit logging',
      icon: ShieldCheck,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      stat: '100%',
      label: 'Browser Web Accessible',
      sub: 'Zero native app download friction',
      icon: Building2,
      color: 'text-teal-600 bg-teal-50'
    }
  ]

  return (
    <section className="relative z-10 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/90">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {metrics.map((m, idx) => {
            const Icon = m.icon
            return (
              <div 
                key={m.label} 
                className={`flex flex-col text-left ${idx > 0 ? 'sm:pl-6' : ''} ${idx > 0 && idx % 2 === 0 ? 'pt-4 sm:pt-0' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-xl ${m.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                    {m.stat}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {m.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {m.sub}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
