"use client"

import { useState } from "react"
import { MapPin, Star, User, Plus, CheckCircle, XCircle, Eye } from "lucide-react"

export default function MessPage() {
  const [activeTab, setActiveTab] = useState("messList")
  const [messList, setMessList] = useState([
    { id: 1, name: "University Main Mess", location: "Campus Block A", status: "verified", rating: 4.5 },
    { id: 2, name: "North Campus Cafeteria", location: "North Dormitory", status: "verified", rating: 4.2 },
    { id: 3, name: "South Campus Food Court", location: "South Dormitory", status: "verified", rating: 3.9 },
  ])

  const [pendingList, setPendingList] = useState([
    { id: 4, name: "New Student Mess", location: "East Wing", status: "pending", owner: "John Smith" },
    { id: 5, name: "Campus Delight", location: "West Plaza", status: "pending", owner: "Sarah Johnson" },
    { id: 6, name: "Quick Bites", location: "Central Courtyard", status: "pending", owner: "Mike Brown" },
  ])

  const handleVerification = (id, action) => {
    if (action === "accept") {
      const verifiedMess = pendingList.find((mess) => mess.id === id)
      if (verifiedMess) {
        setMessList([
          ...messList,
          {
            ...verifiedMess,
            status: "verified",
            rating: 4.0,
          },
        ])
        setPendingList(pendingList.filter((mess) => mess.id !== id))
      }
    } else {
      setPendingList(pendingList.filter((mess) => mess.id !== id))
    }
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
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl px-4 py-2 rounded-md">
            <Plus className="w-4 h-4 mr-2" />
            Add New Mess
          </button>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="flex w-full max-w-md mb-8 bg-white shadow-sm border border-blue-100 rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab("messList")}
              className={`flex-1 py-2 px-4 text-center ${activeTab === "messList" ? 'bg-blue-100 text-blue-800 shadow-sm' : 'text-gray-600'}`}
            >
              Mess List
            </button>
            <button
              onClick={() => setActiveTab("pendingVerification")}
              className={`flex-1 py-2 px-4 text-center relative ${activeTab === "pendingVerification" ? 'bg-indigo-100 text-indigo-800 shadow-sm' : 'text-gray-600'}`}
            >
              Pending Verification
              {pendingList.length > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {pendingList.length}
                </span>
              )}
            </button>
          </div>

          {/* Verified Mess List */}
          {activeTab === "messList" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-blue-900">Verified Mess Facilities</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messList.map((mess) => (
                  <div
                    key={mess.id}
                    className="group hover:shadow-xl transition-all duration-300 border border-blue-100 shadow-md bg-white/90 backdrop-blur-sm hover:-translate-y-1 hover:border-blue-200 rounded-lg overflow-hidden"
                  >
                    <div className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                          {mess.name}
                        </h3>
                        <span className="inline-flex items-center bg-blue-100 text-blue-800 border border-blue-200 shadow-sm px-2 py-1 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      <div className="flex items-center text-blue-700">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{mess.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                          <span className="font-medium text-blue-800">{mess.rating}</span>
                          <span className="text-blue-600 text-sm ml-1">rating</span>
                        </div>

                        <button
                          className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 px-2 py-1 rounded text-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Verification */}
          {activeTab === "pendingVerification" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-blue-900">Pending Verification Requests</h2>
              </div>

              {pendingList.length === 0 ? (
                <div className="border-dashed border-2 border-blue-200 bg-blue-50/50 rounded-lg">
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-blue-400 mb-4" />
                    <p className="text-blue-700 text-lg font-medium">No pending verification requests</p>
                    <p className="text-blue-500 text-sm mt-1">All mess facilities have been processed</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingList.map((mess) => (
                    <div
                      key={mess.id}
                      className="group hover:shadow-xl transition-all duration-300 border border-indigo-100 shadow-md bg-white/90 backdrop-blur-sm hover:-translate-y-1 hover:border-indigo-200 rounded-lg overflow-hidden"
                    >
                      <div className="pb-3 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-indigo-100">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-blue-900 group-hover:text-indigo-700 transition-colors">
                            {mess.name}
                          </h3>
                          <span className="inline-flex items-center bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-sm px-2 py-1 rounded-full text-xs">
                            <XCircle className="w-3 h-3 mr-1" />
                            Pending
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-4">
                        <div className="flex items-center text-blue-700">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm">{mess.location}</span>
                        </div>

                        <div className="flex items-center text-blue-700">
                          <User className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm">Owner: {mess.owner}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleVerification(mess.id, "accept")}
                            className="flex-1 flex items-center justify-center bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200 shadow-sm transition-all duration-200 hover:shadow-md py-2 px-4 rounded"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleVerification(mess.id, "reject")}
                            className="flex-1 flex items-center justify-center bg-red-100 text-red-800 hover:bg-red-200 border border-red-200 shadow-sm transition-all duration-200 hover:shadow-md py-2 px-4 rounded"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
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