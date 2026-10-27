import React from 'react'
import { 
  Camera, 
  MapPin, 
  ArrowRight, 
  Brain, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Check, 
  ChevronRight,
  ShieldAlert,
  FileText,
  Menu,
  LayoutDashboard
} from 'lucide-react'

export default function Hero({ onOpenReportModal, onOpenTrackModal, onNavigateToDashboard }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: HERO CONTENT ================= */}
          <div className="lg:col-span-6 z-10 space-y-6 sm:space-y-8 text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f7ee] border border-[#c3edd5] text-[#0d8a55] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#0d8a55] animate-pulse"></span>
              <span>Smarter Cities • Stronger Communities</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
                Report Civic Issues.
              </h1>
              <div className="relative inline-block">
                <span className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#0d8a55] leading-[1.12]">
                  Create Real Change.
                </span>
                {/* Hand-drawn curved underline brush */}
                <svg 
                  className="w-full h-3.5 mt-0.5 text-[#0d8a55]" 
                  viewBox="0 0 260 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M3 10.5C65 2.5 195 2 257 8.5" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>

            {/* Description Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              CivicPulse is an AI-powered, crowdsourced platform that helps citizens report urban issues, while using intelligent prioritization and real-time tracking to ensure faster resolution and better public infrastructure.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={onOpenReportModal}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#0d8a55] hover:bg-[#096d43] shadow-lg shadow-emerald-700/25 active:scale-95 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
                <span>Report an Issue</span>
                <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={onOpenTrackModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Track Report</span>
              </button>

              <button 
                onClick={onNavigateToDashboard}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold text-[#0d8a55] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-[#0d8a55]" />
                <span>Live Dashboard</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Citizen Priya" 
                />
                <img 
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  alt="Citizen Rahul" 
                />
                <img 
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                  alt="Citizen Amit" 
                />
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-emerald-100 text-[#0d8a55] font-bold text-xs">
                  +
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900">
                  Join <span className="text-[#0d8a55]">50,000+</span> active citizens
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Together for cleaner, safer and better cities.
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: VISUAL MOCKUP & CARDS ================= */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center min-h-[580px]">
            
            {/* Background city boulevard scene with soft radial blend */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-90">
              <img 
                src="/hero-city.png" 
                alt="Modern City Boulevard" 
                className="w-full h-full object-cover object-right"
              />
              {/* Radial gradient mask: seamless fade from white on the left into the city on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>

            {/* Lush green foliage accent on the left corner */}
            <div className="absolute -left-12 bottom-6 w-52 h-52 pointer-events-none z-10 hidden sm:block">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                <path d="M40 180 C20 120, 40 60, 110 30 C130 90, 110 150, 40 180 Z" fill="#15803d" />
                <path d="M70 170 C50 110, 80 50, 150 40 C160 100, 130 150, 70 170 Z" fill="#16a34a" />
                <path d="M20 190 C10 140, 20 80, 80 70 C90 120, 70 170, 20 190 Z" fill="#22c55e" opacity="0.9" />
              </svg>
            </div>

            {/* Dotted decorative connection line (to Faster Resolution) */}
            <svg className="absolute -top-4 right-20 w-44 h-32 pointer-events-none z-10 hidden xl:block" fill="none">
              <path 
                d="M10 80 C 60 20, 100 20, 160 30" 
                stroke="#10b981" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
                strokeLinecap="round" 
              />
              <circle cx="10" cy="80" r="4" fill="#0d8a55" />
            </svg>

            {/* ================= SMARTPHONE CHASSIS ================= */}
            <div className="relative z-20 w-[290px] sm:w-[315px] rounded-[44px] bg-slate-900 p-3 shadow-2xl shadow-slate-900/35 border-[6px] border-slate-900 transition-transform duration-300 hover:scale-[1.01]">
              
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-slate-800 rounded-full"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-3"></div>
              </div>

              {/* Screen Inner */}
              <div className="relative w-full rounded-[34px] overflow-hidden bg-white text-slate-800 font-sans shadow-inner pt-7 pb-4 px-3.5 space-y-3">
                
                {/* In-App Header */}
                <div className="flex items-center justify-between pb-1 pt-1 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#0d8a55] flex items-center justify-center text-white">
                      <MapPin className="w-3 h-3 fill-white" />
                    </div>
                    <span className="text-xs font-black tracking-tight text-slate-900">
                      Civic<span className="text-[#0d8a55]">Pulse</span>
                    </span>
                  </div>
                  <button className="text-slate-600 p-0.5">
                    <Menu className="w-4 h-4" />
                  </button>
                </div>

                {/* In-App Mini Map View */}
                <div className="relative w-full h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                  {/* Stylized vector map grid */}
                  <div className="absolute inset-0 bg-[#eef3ea]">
                    {/* Roads and paths */}
                    <svg className="w-full h-full opacity-60" viewBox="0 0 200 100" preserveAspectRatio="none">
                      <path d="M-10 40 Q 60 50, 110 30 T 210 60" stroke="#cbd5e1" strokeWidth="14" fill="none" />
                      <path d="M-10 40 Q 60 50, 110 30 T 210 60" stroke="#ffffff" strokeWidth="10" fill="none" />
                      <path d="M90 -10 L 110 110" stroke="#cbd5e1" strokeWidth="12" fill="none" />
                      <path d="M90 -10 L 110 110" stroke="#ffffff" strokeWidth="8" fill="none" />
                      {/* Park green zone */}
                      <rect x="15" y="55" width="55" height="35" rx="6" fill="#d1fae5" />
                    </svg>
                  </div>

                  {/* Red Location Pin on Map */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce">
                      <MapPin className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <div className="w-4 h-1.5 bg-black/20 rounded-full blur-[1px]"></div>
                  </div>
                </div>

                {/* Active Issue Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 space-y-2 text-left">
                  
                  {/* Card Title & Priority Tag */}
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      Pothole on MG Road
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                      High Priority
                    </span>
                  </div>

                  {/* Photo & Metadata Row */}
                  <div className="flex items-center gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=150&auto=format&fit=crop&q=80" 
                      alt="Damaged Pothole" 
                      className="w-12 h-12 rounded-lg object-cover shadow-xs border border-slate-200"
                    />
                    <div className="flex-1 min-w-0 text-[11px]">
                      <div className="flex items-center justify-between text-slate-700 font-semibold">
                        <span>Photo</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500 truncate font-mono">
                        28.6139° N, 77.2090° E
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium truncate">
                        MG Road, New Delhi
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <FileText className="w-3 h-3" />
                      <span>Description</span>
                    </div>
                    <p className="text-[11px] text-slate-700 line-clamp-2 leading-tight">
                      Deep pothole, causing traffic hazard.
                    </p>
                  </div>
                </div>

                {/* In-App Confirm Button */}
                <button 
                  onClick={onOpenReportModal}
                  className="w-full py-2.5 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Issue Reported</span>
                </button>

              </div>
            </div>

            {/* ================= FLOATING BADGE 1: AI SEVERITY ANALYSIS ================= */}
            <div className="absolute -left-4 sm:-left-16 top-6 sm:top-10 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-float border border-slate-100 max-w-[210px] sm:max-w-[230px] animate-float-slow">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    AI Severity Analysis
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight">
                    Analyzing image & text...
                  </div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                    High Priority
                  </span>
                </div>
              </div>
            </div>

            {/* ================= FLOATING BADGE 2: REAL-TIME TRACKING STEPPER ================= */}
            <div className="absolute -left-6 sm:-left-20 bottom-1 sm:bottom-6 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-float border border-slate-100 w-[240px] sm:w-[270px] animate-float-reverse">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-[#e8f7ee] text-[#0d8a55] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 fill-[#0d8a55]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Real-time Tracking
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Assigned to Municipal Team
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="pt-3">
                <div className="relative flex items-center justify-between">
                  {/* Track line behind steps */}
                  <div className="absolute top-1/2 left-2 right-2 h-0.5 -translate-y-1/2 bg-slate-200 -z-0"></div>
                  <div className="absolute top-1/2 left-2 w-[70%] h-0.5 -translate-y-1/2 bg-[#0d8a55] -z-0"></div>

                  {/* Step 1: Reported */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[#0d8a55] ring-2 ring-white"></span>
                    <span className="text-[9px] font-semibold text-slate-600 mt-1">Reported</span>
                  </div>

                  {/* Step 2: Verified */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[#0d8a55] ring-2 ring-white"></span>
                    <span className="text-[9px] font-semibold text-slate-600 mt-1">Verified</span>
                  </div>

                  {/* Step 3: In Progress */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[#0d8a55] ring-2 ring-white"></span>
                    <span className="text-[9px] font-bold text-[#0d8a55] mt-1">In Progress</span>
                  </div>

                  {/* Step 4: Resolved */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-slate-300 ring-2 ring-white"></span>
                    <span className="text-[9px] font-medium text-slate-400 mt-1">Resolved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= FLOATING BADGE 3: FASTER RESOLUTION ================= */}
            <div className="absolute -right-2 sm:-right-8 top-4 sm:top-8 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-float border border-slate-100 max-w-[190px] sm:max-w-[210px] animate-float-slow">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e8f7ee] text-[#0d8a55] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    Faster Resolution
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Up to <span className="font-bold text-[#0d8a55]">70% faster</span> with AI prioritization
                  </div>
                </div>
              </div>
            </div>

            {/* ================= FLOATING BADGE 4: GPS LOCATION ================= */}
            <div className="absolute -right-2 sm:-right-6 bottom-16 sm:bottom-20 z-30 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-float border border-slate-100 flex items-center gap-2.5 animate-float-reverse">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#0d8a55] flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 fill-[#0d8a55]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-none">
                  GPS Location
                </div>
                <div className="text-[11px] font-mono font-medium text-slate-600 mt-0.5">
                  28.6139° N, 77.2090° E
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
