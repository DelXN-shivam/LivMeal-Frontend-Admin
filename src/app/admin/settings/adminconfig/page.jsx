"use client"
import React, { useState } from 'react'
import axios from 'axios'

export default function AdminConfig() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;
  const [formData, setFormData] = useState({
    gst: '',
    platformFee: ''
  })
  const [errors, setErrors] = useState({
    gst: '',
    platformFee: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    // Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      // Clear error when valid input is entered
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    let valid = true
    const newErrors = { gst: '', platformFee: '' }

    if (!formData.gst) {
      newErrors.gst = 'GST is required'
      valid = false
    } else if (parseFloat(formData.gst) < 0) {
      newErrors.gst = 'GST cannot be negative'
      valid = false
    }

    if (!formData.platformFee) {
      newErrors.platformFee = 'Platform fee is required'
      valid = false
    } else if (parseFloat(formData.platformFee) < 0) {
      newErrors.platformFee = 'Platform fee cannot be negative'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus({ success: false, message: '' })

    try {
      // Simulate API request
    //   const response = await axios.patch(`${BASE_URL}/admin/config`, {
    //     gst: parseFloat(formData.gst),
    //     platformFee: parseFloat(formData.platformFee)
    //   })

     const response = await axios.patch(`http://localhost:3500/api/v1/admin/config`, {
        gst: parseFloat(formData.gst),
        platformFee: parseFloat(formData.platformFee)
      })

      setSubmitStatus({
        success: true,
        message: 'Configuration updated successfully!'
      })
    } catch (error) {
      console.error('Error updating configuration:', error)
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || 'Failed to update configuration'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Configuration</h1>
      
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="gst" className="block text-sm font-medium text-gray-700 mb-1">
              GST (%)
            </label>
            <input
              type="text"
              id="gst"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.gst ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter GST percentage"
              inputMode="numeric"
            />
            {errors.gst && <p className="mt-1 text-sm text-red-600">{errors.gst}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="platformFee" className="block text-sm font-medium text-gray-700 mb-1">
              Platform Fee (%)
            </label>
            <input
              type="text"
              id="platformFee"
              name="platformFee"
              value={formData.platformFee}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.platformFee ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter platform fee percentage"
              inputMode="numeric"
            />
            {errors.platformFee && <p className="mt-1 text-sm text-red-600">{errors.platformFee}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {submitStatus.message && (
            <div className={`mt-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}