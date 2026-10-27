import React, { useState, useEffect } from 'react'
import { 
  X, Camera, MapPin, Brain, AlertCircle, CheckCircle2, 
  UploadCloud, Loader2, Building2, FileText, ArrowRight, ShieldCheck 
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useReports, CATEGORY_TO_DEPARTMENT } from '../context/ReportsContext'

export default function ReportIssueModal({ isOpen, onClose, onNavigateToDepartment }) {
  const { user, profile } = useAuth()
  const { addReport } = useReports()

  const [formData, setFormData] = useState({
    title: '',
    category: 'Road & Potholes',
    description: '',
    latitude: '28.6139',
    longitude: '77.2090',
    address: 'MG Road, Connaught Place Corridor, New Delhi',
    citizenName: '',
    citizenPhone: ''
  })

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        citizenName: profile.full_name || prev.citizenName,
        citizenPhone: profile.phone || prev.citizenPhone
      }))
    }
  }, [profile])

  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiAnalyzing, setAiAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [submittedTicket, setSubmittedTicket] = useState(null)

  if (!isOpen) return null

  // Geolocation detector
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(4),
          longitude: pos.coords.longitude.toFixed(4),
          address: `Lat: ${pos.coords.latitude.toFixed(4)}° N, Lng: ${pos.coords.longitude.toFixed(4)}° E (Near Current Location)`
        }))
      },
      (err) => {
        console.warn("Location error:", err)
        alert("Using default capital coordinates: 28.6139° N, 77.2090° E (New Delhi)")
      }
    )
  }

  // Handle Photo Upload & Mock AI Severity Analysis
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
      
      // Trigger AI Severity Simulation
      setAiAnalyzing(true)
      setTimeout(() => {
        setAiAnalyzing(false)
        setAiResult({
          visualSeverity: 'High',
          confidence: '92.4%',
          suggestedPriority: 'Critical (P1)',
          cnnScore: 0.88
        })
      }, 1000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const created = await addReport({
        title: formData.title || `${formData.category} at ${formData.address}`,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        visual_severity: aiResult?.visualSeverity || 'Moderate',
        priority_score: aiResult?.cnnScore || 0.75,
        citizen_id: user?.id || null,
        citizen_name: formData.citizenName || profile?.full_name || 'Citizen Reporter',
        citizen_phone: formData.citizenPhone || profile?.phone || '',
        image_url: imagePreview
      })

      setSubmittedTicket(created)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseAndReset = () => {
    setSubmittedTicket(null)
    setImagePreview(null)
    setAiResult(null)
    onClose()
  }

  const assignedDepartment = CATEGORY_TO_DEPARTMENT[formData.category] || 'Public Works Department (PWD)'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Official Header */}
        <div className="px-6 py-4 bg-[#0a2240] text-white flex items-center justify-between border-b-2 border-[#ff9933]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm tracking-wider">
              GOI
            </div>
            <div>
              <div className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
                Ministry of Housing &amp; Urban Affairs • National Grievance Portal
              </div>
              <h2 className="text-base font-bold tracking-tight text-white">
                Register Public Civic Grievance
              </h2>
            </div>
          </div>
          <button 
            onClick={handleCloseAndReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submittedTicket ? (
          /* Submission Success / Official Receipt */
          <div className="p-8 space-y-6 text-left overflow-y-auto">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#0d8a55] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-emerald-950">
                  Grievance Registered Successfully &amp; Dispatched to Department
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Your complaint has been acknowledged into the central e-Governance registry and assigned directly to the competent municipal authority.
                </p>
              </div>
            </div>

            {/* Official Receipt Card */}
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Registration Acknowledgment
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 font-mono">
                  STATUS: REGISTERED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Official Tracking Reference:</span>
                  <span className="font-mono font-bold text-sm text-slate-900">{submittedTicket.ticket_id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Assigned Department:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-700" />
                    {submittedTicket.assigned_department}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Issue Category:</span>
                  <span className="font-semibold text-slate-800">{submittedTicket.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Location / Coordinates:</span>
                  <span className="font-semibold text-slate-800 truncate block">{submittedTicket.address}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  This ticket is now active on the <strong>{submittedTicket.assigned_department}</strong> dashboard for immediate inspection and field remediation.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Close Window
              </button>
              {onNavigateToDepartment && (
                <button
                  type="button"
                  onClick={() => {
                    handleCloseAndReset()
                    onNavigateToDepartment(submittedTicket.assigned_department)
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0a2240] hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>View in {submittedTicket.assigned_department.split(' ')[0]} Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Grievance Submission Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-left">
            
            {/* Department Auto-Routing Banner */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-950">
                <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  Designated Department: <strong>{assignedDepartment}</strong>
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Auto-Routed
              </span>
            </div>

            {/* Category & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Civic Grievance Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                >
                  {Object.keys(CATEGORY_TO_DEPARTMENT).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Subject / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Deep Pothole cluster near crossing"
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Detailed Grievance Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the defect, dimensions, impact on public safety or traffic..."
                className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-800 resize-none"
              />
            </div>

            {/* Location & GPS */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Incident Location &amp; Ward Coordinates *
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  <span>Fetch Browser GPS</span>
                </button>
              </div>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter street name, landmark, ward number..."
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            {/* Citizen Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Complainant Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.citizenName}
                  onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (SMS Updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.citizenPhone}
                  onChange={(e) => setFormData({ ...formData, citizenPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            {/* Media Upload & AI Severity */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Attach Photographic Evidence (Optional but Recommended)
              </label>

              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-300 aspect-video max-h-48">
                  <img src={imagePreview} alt="Defect" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setAiResult(null) }}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-white rounded-full hover:bg-slate-950"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {aiAnalyzing && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>AI Multi-Modal Severity Analysis in progress...</span>
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-blue-700 rounded-xl cursor-pointer bg-slate-50/70 hover:bg-blue-50/40 transition-colors text-center">
                  <Camera className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-slate-700">Click to upload photo evidence</span>
                  <span className="text-[10px] text-slate-400">JPG, PNG up to 10MB • Auto AI Severity Detection</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}

              {aiResult && (
                <div className="mt-2 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-950">
                  <span className="font-bold flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-[#0d8a55]" />
                    AI Detection: Severity {aiResult.visualSeverity} ({aiResult.confidence} confidence)
                  </span>
                  <span className="font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[11px]">
                    Priority P1
                  </span>
                </div>
              )}
            </div>

            {/* Submit Bar */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#0a2240] hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering with Ministry Portal...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Official Grievance</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}
