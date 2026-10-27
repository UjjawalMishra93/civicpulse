import React from 'react'
import { 
  Camera, 
  Brain, 
  MapPin, 
  Globe, 
  Users, 
  ShieldCheck 
} from 'lucide-react'

export default function FeaturesStrip() {
  const features = [
    {
      icon: Camera,
      title: 'Easy Reporting',
      description: 'Upload photos, add description and location in seconds.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Prioritization',
      description: 'Smart analysis of images & text to detect severity.',
    },
    {
      icon: MapPin,
      title: 'GPS Location',
      description: 'Get accurate location with one click.',
    },
    {
      icon: Globe,
      title: 'Track in Real-Time',
      description: 'Stay updated until resolution.',
    },
    {
      icon: Users,
      title: 'Crowdsourced Impact',
      description: 'More citizens, stronger communities.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent & Accountable',
      description: 'Builds trust with visible progress.',
    },
  ]

  return (
    <section id="features" className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a55]"></span>
          <span className="text-xs font-bold tracking-widest text-[#0d8a55] uppercase">
            Key Features
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a55]"></span>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-5 text-center">
          {features.map((item, idx) => {
            const Icon = item.icon
            return (
              <div 
                key={idx} 
                className="group p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 flex flex-col items-center"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7ee] text-[#0d8a55] flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:bg-[#0d8a55] group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
