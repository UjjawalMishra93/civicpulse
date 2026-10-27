import React, { useState } from 'react'
import { 
  Brain, Cpu, Eye, FileText, Layers, Sparkles, 
  CheckCircle2, ArrowRight, Gauge, Activity, ShieldAlert 
} from 'lucide-react'

export default function AiArchitectureSection() {
  const [activeDefect, setActiveDefect] = useState('pothole')

  const defectDemos = {
    pothole: {
      name: 'Severe Road Cave-In & Pothole Cluster',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      category: 'Road & Highway Infrastructure',
      cnnScore: 0.94,
      cnnFeatures: 'Depth: >18cm, Surface Area: 2.4m², Rim Fragmentation: High',
      nlpScore: 0.89,
      nlpKeywords: ['cave-in', 'two-wheeler hazard', 'traffic halt', 'dangerous'],
      priorityRank: 'P1 - Critical Emergency',
      priorityScore: 0.93,
      slaHours: 'Within 6 Hours Dispatch'
    },
    manhole: {
      name: 'Open / Broken Stormwater Manhole',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      category: 'Drainage & Stormwater Department',
      cnnScore: 0.97,
      cnnFeatures: 'Open Cavity Detected, Pedestrian Footpath Proximity: 1.2m',
      nlpScore: 0.96,
      nlpKeywords: ['open hole', 'child hazard', 'uncovered drain', 'life risk'],
      priorityRank: 'P1 - Critical Emergency',
      priorityScore: 0.97,
      slaHours: 'Immediate 4-Hour Response'
    },
    garbage: {
      name: 'Community Dumpster Overflow',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
      category: 'Solid Waste & Sanitation Department',
      cnnScore: 0.78,
      cnnFeatures: 'Volume Overflow: 3.2m³, Carriageway Intrusion: Moderate',
      nlpScore: 0.72,
      nlpKeywords: ['stench', 'spillover', 'bin full', 'market road'],
      priorityRank: 'P2 - High Urgency',
      priorityScore: 0.76,
      slaHours: 'Within 14 Hours Clearance'
    },
    streetlight: {
      name: 'Streetlight Dark Corridor (5 Poles Out)',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80',
      category: 'Electrical & Streetlighting Division',
      cnnScore: 0.61,
      cnnFeatures: 'Illumination Lux: 0.4 lx (Below Safety Baseline of 15 lx)',
      nlpScore: 0.58,
      nlpKeywords: ['darkness', 'women safety', 'fuse out', 'blind turn'],
      priorityRank: 'P2 - High Urgency',
      priorityScore: 0.60,
      slaHours: 'Within 18 Hours Repair'
    }
  }

  const current = defectDemos[activeDefect]

  return (
    <section id="ai-engine" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200">
            <Brain className="w-3.5 h-3.5" />
            <span>Multi-Modal AI Severity Detection (Section 7)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hybrid CNN-RNN Visual &amp; SVM-NLP Urgency Engine
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminating chronological backlogs through an automated mathematical severity index. Critical infrastructure hazards are scored in sub-seconds and escalated directly to departmental field command.
          </p>
        </div>

        {/* 3-Step Multi-Modal Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Step 1: CNN-RNN */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Visual Analysis Layer
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Hybrid CNN-RNN Model
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>CNN:</strong> Extracts spatial feature representations (depth, structural fissures, volumetric spill). <br />
              <strong>RNN:</strong> Evaluates spatial feature hierarchies across severity levels (Low, Moderate, High, Severe).
            </p>
          </div>

          {/* Step 2: SVM-NLP */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Textual Sentiment Layer
            </span>
            <h3 className="text-base font-bold text-slate-900">
              SVM with TF-IDF NLP
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Processes citizen complaint descriptions via tokenization, stop-word elimination, and TF-IDF vectorization. A trained Support Vector Machine evaluates urgency cues.
            </p>
          </div>

          {/* Step 3: Priority Index Integration */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#0d8a55] flex items-center justify-center font-bold">
              <Gauge className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d8a55] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Unified Priority Rank P
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Multi-Modal Synthesis
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              P = (w_v × S_visual) + (w_t × S_text) + B_hazard
            </p>
            <p className="text-[11px] text-slate-500">
              Dynamically maps to P1 (Critical), P2 (High), or P3 (Routine) with automated department dispatch timers.
            </p>
          </div>

        </div>

        {/* Interactive Defect Simulator */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                <span>Interactive AI Evaluation Sandbox</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight mt-1">
                Simulate Multi-Modal Severity Scoring on Real Civic Defects
              </h3>
            </div>

            {/* Defect Picker Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'pothole', label: 'Road Cave-In' },
                { id: 'manhole', label: 'Open Manhole' },
                { id: 'garbage', label: 'Garbage Dump' },
                { id: 'streetlight', label: 'Dark Corridor' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDefect(d.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDefect === d.id
                      ? 'bg-[#0d8a55] text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Simulation Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 5 Cols: Photographic Evidence Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-700 group">
                <img 
                  src={current.image} 
                  alt={current.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  CNN Feature Heatmap Active
                </div>
              </div>
              <div className="text-xs text-slate-400">
                Subject: <strong className="text-white">{current.name}</strong>
              </div>
            </div>

            {/* Right 7 Cols: Computed AI Scores Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Visual CNN-RNN Score */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">CNN-RNN Visual Severity:</span>
                    <span className="font-mono font-bold text-purple-400 text-sm">
                      {Math.round(current.cnnScore * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                      style={{ width: `${current.cnnScore * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {current.cnnFeatures}
                  </div>
                </div>

                {/* Textual SVM-NLP Score */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">SVM-NLP Text Urgency:</span>
                    <span className="font-mono font-bold text-blue-400 text-sm">
                      {Math.round(current.nlpScore * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                      style={{ width: `${current.nlpScore * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 flex flex-wrap gap-1">
                    {current.nlpKeywords.map(kw => (
                      <span key={kw} className="px-1.5 py-0.2 rounded bg-slate-700 text-slate-300 font-mono text-[9px]">
                        "{kw}"
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Resulting Priority Rank Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-800 to-slate-800 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Computed Priority Decision
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">
                    {current.priorityRank}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Dispatched to: <strong className="text-emerald-300">{current.category}</strong>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-xl inline-block">
                    {current.slaHours}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
