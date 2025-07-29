'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lock, Eye, EyeOff, User, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Registration handlers
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : ""
      case "contact":
        if (!/^\d{10}$/.test(value)) return "Contact must be 10 digits"
        return ""
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : ""
      case "password":
        return value.length < 6 ? "Password must be at least 6 characters" : ""
      default:
        return ""
    }
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    
    if (name === "contact") {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length > 10) return
      setRegisterData({ ...registerData, [name]: digitsOnly })
    } else {
      setRegisterData({ ...registerData, [name]: value })
    }

    if (touchedFields[name]) {
      const error = validateField(name, value)
      setErrors({ ...errors, [name]: error })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouchedFields({ ...touchedFields, [name]: true })
    const error = validateField(name, value)
    setErrors({ ...errors, [name]: error })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors = {}
    Object.keys(registerData).forEach((key) => {
      const error = validateField(key, registerData[key])
      if (error) newErrors[key] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouchedFields(Object.keys(registerData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Registered:", registerData)
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getFieldIcon = (fieldName) => {
    const icons = {
      name: User,
      contact: Phone,
      email: Mail,
      password: Lock,
    }
    return icons[fieldName]
  }

  const isFieldValid = (fieldName) => {
    return touchedFields[fieldName] && !errors[fieldName] && registerData[fieldName]
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side with image */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md ml-24 flex flex-col items-center">
          <Image 
            src="/images/login.png"
            alt="Login Illustration"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
          />
          <div className="mt-8 text-center p-4 rounded-lg">
            <div className="flex justify-center mb-2">
              <Image 
                src="/images/livmeal.png"
                alt="LivMedI Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md py-12 px-12 bg-[#edf6f9] rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Admin Registration
          </h1>
          
          <motion.form 
            onSubmit={handleRegister} 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(registerData).map(([fieldName, value]) => {
              const Icon = getFieldIcon(fieldName);
              const isValid = isFieldValid(fieldName);
              const hasError = touchedFields[fieldName] && errors[fieldName];

              return (
                <motion.div key={fieldName} variants={itemVariants} className="space-y-2">
                  <label htmlFor={fieldName} className="block text-sm font-medium text-black mb-1 capitalize">
                    {fieldName === "contact" ? "Contact Number" : fieldName}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon
                        className={`h-4 w-4 ${
                          isValid ? "text-green-500" : hasError ? "text-red-500" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <input
                      id={fieldName}
                      name={fieldName}
                      type={
                        fieldName === "email"
                          ? "email"
                          : fieldName === "contact"
                            ? "tel"
                            : fieldName === "password"
                              ? showPassword
                                ? "text"
                                : "password"
                              : "text"
                      }
                      placeholder={`Enter your ${fieldName === "contact" ? "contact number" : fieldName}`}
                      value={value}
                      onChange={handleRegisterChange}
                      onBlur={handleBlur}
                      maxLength={fieldName === "contact" ? 10 : undefined}
                      className={`w-full px-4 py-3 pl-10 pr-10 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-1 bg-white ${
                        isValid
                          ? "border-green-500 focus:ring-green-500"
                          : hasError
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-700 focus:ring-blue-500"
                      }`}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {fieldName === "password" && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      )}
                      {isValid && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </motion.div>
                      )}
                      {hasError && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  {hasError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500"
                    >
                      {errors[fieldName]}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}

            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0077b6] hover:bg-[#0079ba] text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                  />
                ) : (
                  "Create Account"
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}