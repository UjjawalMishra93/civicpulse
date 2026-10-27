import React from 'react'
import { 
  Building2, Phone, Mail, MapPin, ExternalLink, 
  ShieldCheck, ArrowRight, Heart 
} from 'lucide-react'

export default function BottomBanner({ onOpenReportModal, onNavigateToDashboard }) {
  return (
    <footer className="bg-[#0a2240] text-white border-t-4 border-[#ff9933] overflow-hidden">
      
      {/* Top CTA Strip */}
      <div className="bg-[#0f2d52] border-b border-white/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Spot a hazard in your ward? Report in under 30 seconds.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              No app download required. Direct browser GPS &amp; AI severity categorization dispatched to municipal authorities.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenReportModal}
              className="px-6 py-3 rounded-2xl bg-[#ff9933] hover:bg-[#e68524] text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Report Grievance Now
            </button>
            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard('All Departments')}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              View Department Registry
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Ministry Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0a2240] flex items-center justify-center font-black text-base shadow-sm">
                GOI
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Civic<span className="text-emerald-400">Pulse</span>
                </span>
                <span className="text-[10px] text-amber-300 block uppercase tracking-widest font-bold">
                  National Smart City Grievance Redressal
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              An AI-Enabled Crowdsourced Civic Issue Reporting and Resolution System built in compliance with Ministry of Housing and Urban Affairs (MoHUA) e-Governance standards and the National Citizen Charter.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ministry of Housing &amp; Urban Affairs, Nirman Bhawan, New Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>support-civicpulse@nic.in • grievances-urban@gov.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Municipal Helplines (Emergency) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/10 pb-2">
              Citizen Emergency Helplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center justify-between">
                <span>Emergency Services:</span>
                <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">112</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Municipal Grievance Helpline:</span>
                <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">1913</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Delhi Jal Board (Water):</span>
                <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">1916</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Power &amp; Streetlight Hotline:</span>
                <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">1912</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Traffic Police Helpline:</span>
                <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">1095</strong>
              </li>
            </ul>
          </div>

          {/* Col 4: Integrated Municipal Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/10 pb-2">
              Integrated Authorities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Roads &amp; Highway Infrastructure (PWD)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Solid Waste &amp; Sanitation (MCD)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Water Supply &amp; Sewage Board (DJB)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Electrical &amp; Streetlighting Division
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Drainage &amp; Stormwater Management
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Public Works Department (Civil)
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/10 pb-2">
              National e-Governance
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>CPGRAMS Central Portal</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>Digital India Mission</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>Smart Cities Urban Mission</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>National Portal of India</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>PostGIS Spatial Standards</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Tricolor Strip */}
      <div className="bg-[#07172b] py-6 border-t border-white/10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 CivicPulse • Ministry of Housing &amp; Urban Affairs (MoHUA), Government of India. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer">Citizen Charter</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy &amp; Geolocation Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Hyperlinking Terms</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>

    </footer>
  )
}
