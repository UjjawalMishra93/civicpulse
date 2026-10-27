import React from 'react'
import { 
  Building2, ArrowRight, Clock, ShieldCheck, 
  MapPin, Wrench, Sparkles, CheckCircle2 
} from 'lucide-react'

export default function DepartmentDirectorySection({ onNavigateToDepartment }) {
  const departments = [
    {
      name: 'Roads & Highway Infrastructure',
      code: 'RHI-DIV-04',
      scope: 'Potholes, asphalt cave-ins, road rim damage, median dividers, speed breaker markings',
      slaHours: '24 - 48 Hours',
      nodal: 'Er. Rajesh Verma (EE Civil)',
      compliance: '96.2%',
      color: 'border-l-amber-500'
    },
    {
      name: 'Solid Waste & Sanitation Department',
      code: 'SWS-SEC-18',
      scope: 'Overflowing dumpsters, illegal commercial dumping, uncollected roadside garbage, waste clearance',
      slaHours: '12 - 24 Hours',
      nodal: 'Shri R. K. Meena (Chief Inspector)',
      compliance: '92.8%',
      color: 'border-l-emerald-500'
    },
    {
      name: 'Water Supply & Sewage Board',
      code: 'WSS-ZONE-B',
      scope: 'Main potable water pipeline burst, low pressure contamination, sewer line blockage, manhole overflows',
      slaHours: '8 - 18 Hours',
      nodal: 'Er. Karan Malhotra (Superintending Engineer)',
      compliance: '97.5%',
      color: 'border-l-blue-500'
    },
    {
      name: 'Electrical & Streetlighting Division',
      code: 'ESD-GRID-03',
      scope: 'High-mast light failure, dark corridor zones, exposed electrical cables, blown feeder pillar fuses',
      slaHours: '6 - 12 Hours',
      nodal: 'Er. Suresh Kumar (Divisional Engineer)',
      compliance: '98.4%',
      color: 'border-l-yellow-500'
    },
    {
      name: 'Drainage & Stormwater Department',
      code: 'DSD-SUB-12',
      scope: 'Open manhole covers, choked roadside stormwater drains, waterlogging in underpasses, broken gratings',
      slaHours: '12 - 36 Hours',
      nodal: 'Er. Vikas Saxena (Assistant Engineer)',
      compliance: '91.0%',
      color: 'border-l-teal-500'
    },
    {
      name: 'Public Works Department (PWD)',
      code: 'PWD-HQ-CENTRAL',
      scope: 'Damaged culvert bridge railings, footpath slabs, dangerous structural concrete, public boundary walls',
      slaHours: '48 - 72 Hours',
      nodal: 'Er. Anita Singhal (Superintending Engineer)',
      compliance: '89.4%',
      color: 'border-l-indigo-500'
    }
  ]

  return (
    <section id="departments" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0d8a55] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Citizen Charter Standards (MoHUA SLA)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Integrated Municipal Competent Authorities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every reported issue is mapped directly to the competent departmental squad with legally bound Citizen Charter resolution turnaround times.
          </p>
        </div>

        {/* 6 Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between border-l-4 ${dept.color} space-y-5 group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    {dept.code}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#0d8a55] border border-emerald-200">
                    {dept.compliance} SLA
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0d8a55] transition-colors">
                  {dept.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {dept.scope}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Charter SLA:</span>
                    <span className="font-bold text-slate-800 font-mono">{dept.slaHours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Nodal Authority:</span>
                    <span className="font-medium text-slate-700 truncate max-w-[170px]">{dept.nodal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToDepartment(dept.name)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0d8a55] hover:text-white text-slate-700 text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer group-hover:border-[#0d8a55]"
              >
                <span>Open {dept.name.split(' ')[0]} Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
