import React from 'react'
import GovDepartmentDashboard from './GovDepartmentDashboard'

export default function DashboardView({ onBackToHome, onOpenReportModal, initialDepartment = 'All Departments' }) {
  return (
    <GovDepartmentDashboard 
      onBackToHome={onBackToHome}
      onOpenReportModal={onOpenReportModal}
      initialDepartment={initialDepartment}
    />
  )
}
