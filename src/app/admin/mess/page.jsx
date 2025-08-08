"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, CheckCircle, XCircle } from 'lucide-react'
import toast from "react-hot-toast"
import MessCard from "@/components/MessCard"
import axios from "axios"
import { Button } from "@/components/ui/button" // Added Button import

export default function MessPage() {
  const [activeTab, setActiveTab] = useState("messList")
  const [messList, setMessList] = useState([])
  const [loading, setLoading] = useState(false)
  const hasFetched = useRef(false)

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL // Ensure this environment variable is set

  // Fetch mess data on component mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      fetchMess()
    }
  }, [])

  const fetchMess = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/mess/all`)
      if (res.status === 200) {
        setMessList(res.data.data)
        toast.success("Mess data fetched successfully", {
          duration: 3000,
          style: {
            background: "#10B981",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        })
      } else {
        toast.error("Error fetching mess data", {
          duration: 4000,
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        })
      }
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Something went wrong. Please try again later.", {
        duration: 4000,
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter mess based on verification status
  const verifiedMess = messList.filter((mess) => mess.isVerified === "verified")
  const pendingMess = messList.filter((mess) => mess.isVerified === "pending")
  const rejectedMess = messList.filter((mess) => mess.isVerified === "rejected")

  const handleVerification = async (id, action) => {
    // Find the mess item using its _id
    const messItem = messList.find((mess) => mess._id === id)
    if (!messItem) {
      toast.error("Mess item not found.", {
        duration: 2000,
        style: { background: "#EF4444", color: "#fff" },
      })
      return
    }

    try {
      setLoading(true)
      // Determine the new status based on the action
      const newIsVerifiedStatus = action === "accept" ? "verified" : "rejected"
      const newRejectionReason = action === "reject" ? "Application rejected by admin" : null

      // Make API call to update verification status
      const res = await axios.patch(`${BASE_URL}/mess/update/${id}`, {
        isVerified: newIsVerifiedStatus,
        rejectionReason: newRejectionReason,
      })

      if (res.status === 200) {
        // Update local state
        setMessList((prevList) =>
          prevList.map((mess) =>
            mess._id === id
              ? {
                  ...mess,
                  isVerified: newIsVerifiedStatus,
                  rejectionReason: newRejectionReason,
                }
              : mess,
          ),
        )
        // Show appropriate toast
        if (action === "accept") {
          toast.success(`${messItem.messName} has been verified successfully! ✅`, {
            duration: 4000,
            style: {
              background: "#10B981",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          })
        } else {
          toast.error(`${messItem.messName} application has been rejected`, {
            duration: 4000,
            style: {
              background: "#EF4444",
              color: "#fff",
            },
          })
        }
      } else {
        toast.error(`Failed to update ${messItem.messName}. Server responded with status ${res.status}.`, {
          duration: 4000,
          style: { background: "#EF4444", color: "#fff" },
        })
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast.error("Failed to update verification status. Please try again.", {
        duration: 4000,
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (loading && messList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-blue-700 text-lg">Loading mess data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Mess Management</h1>
            <p className="text-blue-700">Manage and verify campus mess facilities</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchMess}
              disabled={loading}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full">
          <div className="flex w-full max-w-lg mb-8 bg-white shadow-sm border border-blue-100 rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab("messList")}
              className={`flex-1 py-2 px-4 text-center text-sm ${activeTab === "messList" ? "bg-blue-100 text-blue-800 shadow-sm" : "text-gray-600"}`}
            >
              Verified ({verifiedMess.length})
            </button>
            <button
              onClick={() => setActiveTab("pendingVerification")}
              className={`flex-1 py-2 px-4 text-center text-sm relative ${activeTab === "pendingVerification" ? "bg-indigo-100 text-indigo-800 shadow-sm" : "text-gray-600"}`}
            >
              Pending ({pendingMess.length})
            </button>
            <button
              onClick={() => setActiveTab("rejectedList")}
              className={`flex-1 py-2 px-4 text-center text-sm ${activeTab === "rejectedList" ? "bg-red-100 text-red-800 shadow-sm" : "text-gray-600"}`}
            >
              Rejected ({rejectedMess.length})
            </button>
          </div>
          {/* Verified Mess List */}
          {activeTab === "messList" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-blue-900">Verified Mess Facilities</h2>
              </div>
              {verifiedMess.length === 0 ? (
                <div className="border-dashed border-2 border-blue-200 bg-blue-50/50 rounded-lg">
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-blue-400 mb-4" />
                    <p className="text-blue-700 text-lg font-medium">No verified mess facilities yet</p>
                    <p className="text-blue-500 text-sm mt-1">Approve pending requests to see them here</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verifiedMess.map((mess) => (
                    <MessCard key={mess._id} mess={mess} status="verified" />
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Pending Verification */}
          {activeTab === "pendingVerification" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-blue-900">Pending Verification Requests</h2>
              </div>
              {pendingMess.length === 0 ? (
                <div className="border-dashed border-2 border-blue-200 bg-blue-50/50 rounded-lg">
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-blue-400 mb-4" />
                    <p className="text-blue-700 text-lg font-medium">No pending verification requests</p>
                    <p className="text-blue-500 text-sm mt-1">All mess facilities have been processed</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingMess.map((mess) => (
                    <MessCard
                      key={mess._id}
                      mess={mess}
                      status="pending"
                      onVerification={handleVerification} // Pass the function here
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Rejected List */}
          {activeTab === "rejectedList" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-blue-900">Rejected Applications</h2>
              </div>
              {rejectedMess.length === 0 ? (
                <div className="border-dashed border-2 border-red-200 bg-red-50/50 rounded-lg">
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-red-400 mb-4" />
                    <p className="text-red-700 text-lg font-medium">No rejected applications</p>
                    <p className="text-red-500 text-sm mt-1">All applications have been approved</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rejectedMess.map((mess) => (
                    <MessCard key={mess._id} mess={mess} status="rejected" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
