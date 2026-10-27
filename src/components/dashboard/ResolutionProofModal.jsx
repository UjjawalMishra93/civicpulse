import React, { useState } from 'react'
import { X, Upload, CheckCircle2, Camera, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'

export default function ResolutionProofModal({ isOpen, onClose, ticket, onResolve }) {
  const [remarks, setRemarks] = useState('')
  const [proofImage, setProofImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || !ticket) return null

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setProofImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!remarks.trim()) {
      setError('Please provide resolution remarks and repair summary.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      onResolve(ticket.id, remarks, proofImage)
      onClose()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0d8a55] text-white flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Upload Work Resolution Proof
              </h2>
              <p className="text-xs text-slate-500">
                Ticket: <span className="font-mono font-bold text-slate-800">{ticket.ticket_id}</span> • {ticket.category}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Issue Location & Title
            </label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
              <p className="font-bold text-slate-900">{ticket.title}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">{ticket.address}</p>
            </div>
          </div>

          {/* Photo Proof Upload */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Post-Repair Photographic Evidence (Mandatory for Audit)
            </label>
            {proofImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video group">
                <img src={proofImage} alt="Resolution Proof" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setProofImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/70 text-white rounded-full hover:bg-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-[#0d8a55] rounded-2xl cursor-pointer bg-slate-50/60 hover:bg-emerald-50/40 transition-all text-center">
                <Camera className="w-8 h-8 text-slate-400 mb-2 group-hover:text-[#0d8a55]" />
                <span className="text-xs font-bold text-slate-700">Click to capture or upload completed repair photo</span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPEG, PNG supported • Geotagged resolution stamp</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="hidden" 
                />
              </label>
            )}
          </div>

          {/* Resolution Remarks */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Inspector / Officer Remarks & Materials Used
            </label>
            <textarea
              required
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Cold mix asphalt patch applied, compacted with 8-ton vibratory roller. Manhole reinforced. Cleared for traffic."
              className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0d8a55] resize-none"
            />
          </div>

          {/* Verification Badge notice */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-[11px] text-amber-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Resolution proof will be logged into the public tamper-proof audit trail and notified to the citizen for sign-off.</span>
          </div>

          {/* Submit CTA */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Audit Proof...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Resolution & Close</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
