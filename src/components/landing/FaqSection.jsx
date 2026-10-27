import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      q: 'Do citizens need to download a native Android or iOS application?',
      a: 'No. Unlike traditional portals such as Swachhata-MoHUA that mandate native app installation, CivicPulse is designed as a universal, cross-platform Progressive Web Application. It operates seamlessly across any modern web browser (Chrome, Safari, Edge, Firefox) using native browser Web APIs for high-precision GPS geolocation and camera capture.'
    },
    {
      q: 'How does the system prevent duplicate complaints for the same pothole or defect?',
      a: 'The system utilizes PostGIS spatial geodetic indexing with a 50-meter proximity buffer. When a complaint is submitted within 50 meters of an existing active ticket under the same category, the AI engine merges the reports into a primary parent docket, preventing duplicate crew dispatches while increasing the priority score based on crowdsourced complaint density.'
    },
    {
      q: 'How does the Multi-Modal AI determine whether an issue is P1 Critical or P3 Routine?',
      a: 'CivicPulse implements a dual-layer AI architecture: a hybrid Convolutional Neural Network and Recurrent Neural Network (CNN-RNN) extracts spatial feature maps to evaluate visual defect dimensions (e.g. pothole depth, structural cracks), while a Support Vector Machine with TF-IDF Natural Language Processing (SVM-NLP) evaluates textual urgency keywords (e.g. "danger", "collapse", "accident"). The combined weighted score generates an automated Priority Rank P.'
    },
    {
      q: 'How are complaints assigned to specific municipal departments?',
      a: 'Upon submission, the system executes an automated routing matrix that maps categories directly to competent authorities: Potholes route to Roads & Highway Infrastructure; overflowing bins route to Solid Waste & Sanitation; pipe bursts route to Water Supply & Sewage Board; streetlight dark corridors route to Electrical Division; and manholes route to Drainage & Stormwater.'
    },
    {
      q: 'What is the Action Taken Report (ATR) and photographic proof requirement?',
      a: 'To guarantee accountability and eliminate false resolutions, municipal field engineers cannot mark an issue "Resolved" without uploading post-repair photographic evidence and documented materials used. Once uploaded, the citizen receives an automated alert to review the repair photo and provide a 1-to-5 star quality sign-off.'
    }
  ]

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#0d8a55]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everything You Need to Know About CivicPulse
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Answers to common questions about our AI-enabled crowdsourcing architecture and municipal governance standards.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-[#0d8a55] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#0d8a55]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
