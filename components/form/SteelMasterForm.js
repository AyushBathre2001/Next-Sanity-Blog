"use client";
import {
  createQuoteRequest,
  subscribedUser
} from "@/lib/sanity/client";
import React, { useState } from "react";

const SteelMasterForm = () => {
  const [formData, setFormData] = useState({
    product: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    deliveryDate: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const products = [
    "Structural Floor Decking 2WH-36 (54/305)",
    "Structural Floor Decking 3WH-36 (76/305)",
    "Z Purlin",
    "C Purlin",
    "Cladding Profiles",
    "Storage Shed",
    "Garden Sheds",
    "Villa Sheds",
    "Utility Cabins",
    "Fencing",
    "Other Accessories",
    "Edge Trim and Flashing",
    "Gutter"
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product) {
      newErrors.product = "Please select a product";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = "Delivery date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await createQuoteRequest({
        product: formData.product,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        delivery_date: formData.deliveryDate
      });
      console.log("Form submitted:", response);
      setIsSubmitted(true);
      setFormData({
        product: "",
        fullName: "",
        email: "",
        phone: "",
        location: "",
        deliveryDate: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full rounded-lg border border-green-200 bg-green-50 p-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-green-800">
          Thank You!
        </h3>
        <p className="text-[14px] text-green-600">
          Your quote request has been submitted successfully.
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h2 className="mb-2 font-bebas_neue text-2xl font-normal tracking-wide">
          Get a Custom Quote
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="product"
            className="mb-1 block text-sm font-medium">
            Which product are you interested in?
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 shadow-sm outline-none ${
              errors.product ? "border-red-300" : "border-gray-300"
            }`}>
            <option value="">Select a product</option>
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
          {errors.product && (
            <p className="mt-1 text-sm text-red-600">
              {errors.product}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 shadow-sm outline-none ${
              errors.fullName ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 shadow-sm outline-none ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 shadow-sm outline-none ${
              errors.phone ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-1 block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 shadow-sm outline-none ${
              errors.location ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your location"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="deliveryDate"
            className="mb-1 block text-sm font-medium">
            Delivery date
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 shadow-sm outline-none ${
              errors.deliveryDate
                ? "border-red-300"
                : "border-gray-300"
            }`}
          />
          {errors.deliveryDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.deliveryDate}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Get Quote"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-500">
        We respect your privacy and will contact you shortly.
      </p>
    </div>
  );
};

export default SteelMasterForm;
