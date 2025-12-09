import React from "react";
import { Link } from "react-router-dom";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function CancelRefundPage() {
  return (
    <div
      className="min-h-screen py-10 px-6 md:px-14"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">

        {/* Back Link */}
        <Link
          to="/"
          className="inline-block text-sm font-semibold mb-4"
          style={{ color: COLORS.accent }}
        >
          ← Back to Home
        </Link>

        {/* Page Title */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: COLORS.primary }}
        >
          Cancellation & Refund Policy
        </h1>

        <p className="text-base leading-7 mb-6" style={{ color: COLORS.text }}>
          At <strong>Tehzeeb Creations</strong>, customer satisfaction is our priority.
          Please read the policy carefully before placing your order.
        </p>

        {/* Section Wrapper */}
        <div className="space-y-10">

          {/* 1. Order Cancellation */}
          <section>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: COLORS.primary }}>
              1. Order Cancellation Policy
            </h2>

            <h3 className="text-lg font-semibold mb-1" style={{ color: COLORS.text }}>
              1.1 Cancellation Before Shipment
            </h3>
            <p className="mb-3 text-sm leading-6" style={{ color: COLORS.text }}>
              You may cancel your order within <strong>2 hours</strong> of placing it,
              provided it has not been shipped yet. Contact our support team with your
              Order ID for cancellation.
            </p>

            <h3 className="text-lg font-semibold mb-1" style={{ color: COLORS.text }}>
              1.2 Cancellation After Shipment
            </h3>
            <p className="text-sm leading-6" style={{ color: COLORS.text }}>
              Once the order is shipped, it <strong>cannot be cancelled</strong>. However,
              you may still apply for a return after delivery (see policy below).
            </p>
          </section>

          {/* 2. Return & Exchange */}
          <section>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: COLORS.primary }}>
              2. Return & Exchange Policy
            </h2>

            <p className="text-sm mb-3 leading-6" style={{ color: COLORS.text }}>
              Returns are accepted only under the following conditions:
            </p>

            <ul className="list-disc ml-6 text-sm leading-6" style={{ color: COLORS.text }}>
              <li>Wrong product received</li>
              <li>Damaged or defective item</li>
              <li>Size mismatch for standard sizes</li>
              <li>Item differs from the website description</li>
            </ul>

            <p className="text-sm mt-3 leading-6" style={{ color: COLORS.text }}>
              <strong>Non-returnable items include:</strong>
            </p>

            <ul className="list-disc ml-6 text-sm leading-6" style={{ color: COLORS.text }}>
              <li>Products bought during sale/discount</li>
              <li>Used, washed, or altered items</li>
              <li>Items without original tags and packaging</li>
              <li>Hygiene-sensitive items</li>
            </ul>

            <p className="text-sm mt-4 leading-6" style={{ color: COLORS.text }}>
              Return requests must be raised within <strong>48 hours of delivery</strong>.
              Our QC team will verify and approve the request before pickup.
            </p>
          </section>

          {/* 3. Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: COLORS.primary }}>
              3. Refund Policy
            </h2>

            <p className="text-sm leading-6 mb-3" style={{ color: COLORS.text }}>
              Refunds will be initiated only after the returned item passes Quality Check.
            </p>

            <h3 className="text-lg font-semibold mb-1" style={{ color: COLORS.text }}>
              For Prepaid Orders:
            </h3>
            <p className="text-sm mb-3 leading-6" style={{ color: COLORS.text }}>
              Refund will be credited back to the original payment method within
              <strong> 3–7 business days</strong>.
            </p>

            <h3 className="text-lg font-semibold mb-1" style={{ color: COLORS.text }}>
              For COD Orders:
            </h3>
            <p className="text-sm leading-6 mb-2" style={{ color: COLORS.text }}>
              Refund will be processed via:
            </p>

            <ul className="list-disc ml-6 text-sm leading-6" style={{ color: COLORS.text }}>
              <li>UPI ID</li>
              <li>Bank Transfer</li>
            </ul>

            <p className="text-sm mt-2 leading-6" style={{ color: COLORS.text }}>
              Processing time remains <strong>3–7 business days</strong>.
            </p>
          </section>

          {/* 4. Exchange Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: COLORS.primary }}>
              4. Exchange Policy
            </h2>

            <p className="text-sm leading-6 mb-3" style={{ color: COLORS.text }}>
              Exchanges are available for:
            </p>

            <ul className="list-disc ml-6 text-sm leading-6" style={{ color: COLORS.text }}>
              <li>Wrong size</li>
              <li>Wrong color</li>
              <li>Incorrect product delivered</li>
            </ul>

            <p className="text-sm mt-3 leading-6" style={{ color: COLORS.text }}>
              If a replacement item is out of stock, a full refund or store credit will be issued.
            </p>
          </section>

          {/* 5. Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: COLORS.primary }}>
              5. Contact Information
            </h2>

            <p className="text-sm leading-6" style={{ color: COLORS.text }}>
              For cancellations, returns, or refunds, contact us:
            </p>

            <ul className="list-none mt-2 text-sm leading-7" style={{ color: COLORS.text }}>
              <li>📧 Email: <strong>tehzeebcreations.in@gmail.com</strong></li>
              <li>📞 WhatsApp: <strong>+91 9607 88851</strong></li>
              <li>🕒 Timings: 10 AM — 7 PM (Mon–Sat)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
