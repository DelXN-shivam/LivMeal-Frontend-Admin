"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, CheckCircle, XCircle, AlertTriangle, User, Phone, Mail, Clock, DollarSign, Star } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function MessCard({ mess, status, onVerification }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusConfig = () => {
    switch (status) {
      case "verified":
        return {
          bgGradient: "from-blue-50 to-indigo-50",
          borderColor: "border-blue-100",
          hoverBorder: "hover:border-blue-200",
          textColor: "group-hover:text-blue-700",
          badgeBg: "bg-blue-100",
          badgeText: "text-blue-800",
          badgeBorder: "border-blue-200",
          icon: CheckCircle,
          label: "Verified",
        }
      case "pending":
        return {
          bgGradient: "from-indigo-50 to-blue-50",
          borderColor: "border-indigo-100",
          hoverBorder: "hover:border-indigo-200",
          textColor: "group-hover:text-indigo-700",
          badgeBg: "bg-indigo-100",
          badgeText: "text-indigo-800",
          badgeBorder: "border-indigo-200",
          icon: null,
          label: "Pending",
        }
      case "rejected":
        return {
          bgGradient: "from-red-50 to-pink-50",
          borderColor: "border-red-100",
          hoverBorder: "hover:border-red-200",
          textColor: "group-hover:text-red-700",
          badgeBg: "bg-red-100",
          badgeText: "text-red-800",
          badgeBorder: "border-red-200",
          icon: AlertTriangle,
          label: "Rejected",
        }
      default:
        return {
          bgGradient: "from-gray-50 to-slate-50",
          borderColor: "border-gray-100",
          hoverBorder: "hover:border-gray-200",
          textColor: "group-hover:text-gray-700",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-800",
          badgeBorder: "border-gray-200",
          icon: XCircle,
          label: "Unknown",
        }
    }
  }
  const config = getStatusConfig()
  const StatusIcon = config.icon

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div
          className={`group hover:shadow-xl transition-all duration-300 border ${config.borderColor} shadow-md bg-white/90 backdrop-blur-sm hover:-translate-y-1 ${config.hoverBorder} rounded-lg overflow-hidden cursor-pointer max-w-sm`}
        >
          <div className={`pb-3 bg-gradient-to-r ${config.bgGradient} p-4 border-b ${config.borderColor}`}>
            <div className="flex justify-between items-start">
              <h3 className={`text-lg font-semibold text-blue-900 ${config.textColor} transition-colors`}>
                {mess?.messName}
              </h3>
              <span
                className={`inline-flex items-center ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder} shadow-sm px-2 py-1 rounded-full text-xs`}
              >
                {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
                {config.label}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {/* Address */}
            <div className="flex items-start text-blue-700">
              <MapPin className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{mess?.address}</span>
            </div>
            {/* Owner for pending/rejected status */}
            {(status === "pending" || status === "rejected") && mess?.ownerName && (
              <div className="flex items-center text-blue-700">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">Owner: {mess?.ownerName}</span>
              </div>
            )}
            {/* Contact for pending/rejected status */}
            {(status === "pending" || status === "rejected") && mess?.mobile && (
              <div className="flex items-center text-blue-700">
                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{mess?.mobile}</span>
              </div>
            )}
            {/* Email for pending/rejected status */}
            {(status === "pending" || status === "rejected") && mess?.email && (
              <div className="flex items-center text-blue-700">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{mess?.email}</span>
              </div>
            )}
            {/* Meal Types */}
            <div className="flex items-center text-blue-700">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {mess?.messType === "both" ? "Veg & Non-Veg" : mess?.messType}
              </span>
              {mess?.deliveryAvailable && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                  Delivery Available
                </span>
              )}
            </div>
            {/* Action buttons for pending status - moved back inside */}
            {status === "pending" && onVerification && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onVerification(mess?._id, "accept")
                  }}
                  className="flex-1 flex items-center justify-center bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200 shadow-sm transition-all duration-200 hover:shadow-md py-2 px-4 rounded"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onVerification(mess?._id, "reject")
                  }}
                  className="flex-1 flex items-center justify-center bg-red-100 text-red-800 hover:bg-red-200 border border-red-200 shadow-sm transition-all duration-200 hover:shadow-md py-2 px-4 rounded"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
            {/* Show reason for rejected status (if available) */}
            {status === "rejected" && mess?.rejectionReason && (
              <div className="bg-red-50 border border-red-200 rounded p-2">
                <p className="text-red-700 text-xs">
                  <span className="font-medium">Rejection Reason:</span> {mess?.rejectionReason}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      {/* Added max-h and overflow-y-auto to DialogContent */}
      <DialogContent className="sm:max-w-[700px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">{mess?.messName}</DialogTitle>
          <DialogDescription className="text-gray-600">Detailed information about {mess?.messName}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Basic Info */}
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-base">{mess?.address}</p>
          </div>
          {mess?.ownerName && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <p className="text-gray-700 text-base">Owner: {mess?.ownerName}</p>
            </div>
          )}
          {mess?.mobile && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              <p className="text-gray-700 text-base">Contact: {mess?.mobile}</p>
            </div>
          )}
          {mess?.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <p className="text-gray-700 text-base">Email: {mess?.email}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              {mess?.messType === "both" ? "Veg & Non-Veg" : mess?.messType}
            </Badge>
            {mess?.deliveryAvailable && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Delivery Available
              </Badge>
            )}
            {mess?.serviceRadius && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                Service Radius: {mess.serviceRadius} km
              </Badge>
            )}
          </div>

          {/* Meal Timings */}
          {(mess?.breakfastTimings || mess?.lunchTimings || mess?.dinnerTimings) && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Clock className="w-5 h-5 text-gray-600 mr-2" /> Meal Timings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {mess?.breakfastTimings && (
                  <div className="bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                    <div className="text-gray-600 font-medium">Breakfast</div>
                    <div className="text-gray-800">
                      {mess.breakfastTimings.start} - {mess.breakfastTimings.end}
                    </div>
                  </div>
                )}
                {mess?.lunchTimings && (
                  <div className="bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                    <div className="text-gray-600 font-medium">Lunch</div>
                    <div className="text-gray-800">
                      {mess.lunchTimings.start} - {mess.lunchTimings.end}
                    </div>
                  </div>
                )}
                {mess?.dinnerTimings && (
                  <div className="bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                    <div className="text-gray-600 font-medium">Dinner</div>
                    <div className="text-gray-800">
                      {mess.dinnerTimings.start} - {mess.dinnerTimings.end}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subscription Plans */}
          {mess?.subscriptionPlans && mess.subscriptionPlans.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" /> Subscription Plans
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {mess.subscriptionPlans.map((plan) => (
                  <div key={plan._id} className="bg-white p-3 rounded-md border border-blue-100 shadow-sm">
                    <div className="text-blue-600 font-medium capitalize">{plan.name} Plan</div>
                    <div className="text-blue-800">₹{plan.price}</div>
                    {plan.onGoingDiscount && plan.discountOffer && (
                      <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded mt-1">
                        🎉 {plan.discountOffer}% Discount
                      </div>
                    )}
                    {plan.description && (
                      <p className="text-gray-500 text-xs mt-1">{plan.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos Section */}
          {mess?.photos && mess.photos.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Image
                  src="/icon.svg" // Replace with your actual icon
                  width={20}
                  height={20}
                  alt="Photo icon"
                  className="w-5 h-5 text-gray-600 mr-2"
                />
                Photos
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {mess.photos.map((photo) => (
                  <div key={photo._id} className="relative aspect-square overflow-hidden rounded-md">
                    {(photo.url && photo.url !== '') ? (
                      <Image
                        src={photo.url}
                        alt={`Photo of ${mess.messName}`}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Image
                        src="/placeholder." // Make sure this file exists in your public/ folder
                        alt="Placeholder.png"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Reviews Section */}
          {mess?.reviews && mess.reviews.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" /> Reviews
              </h4>
              <div className="space-y-4">
                {mess.reviews.map((review) => (
                  <div key={review._id} className="bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      {review.imgUrl && (
                        <Image
                          src={review.imgUrl || "/placeholder.svg"}
                          alt={review.name}
                          width={32}
                          height={32}
                          className="rounded-full mr-2 object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{review.name}</p>
                        <div className="flex items-center text-sm text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                          ))}
                          <span className="ml-1 text-gray-600">({review.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.description}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {mess?.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" /> Rejection Details
              </h4>
              <p className="text-red-700 text-sm">
                <span className="font-medium">Reason:</span> {mess?.rejectionReason}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}