import React from 'react'
import { useNavigate } from 'react-router'
import { tokens } from './tokens'
import { formatCurrency } from './cartUtils'

const FREE_SHIPPING_THRESHOLD = 15000

const CartSummary = ({ subtotal }) => {
    const navigate = useNavigate()
    const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD

    return (
        <div
            className="p-8"
            style={{
                backgroundColor: tokens.surfaceLowest,
                boxShadow: '0 20px 40px rgba(27,28,26,0.05)',
            }}
        >
            <h2
                className="font-light mb-6"
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.75rem',
                    color: tokens.onSurface,
                }}
            >
                The Total
            </h2>

            <div style={{ height: 1, backgroundColor: tokens.surfaceHighest }} className="mb-6" />

            {/* Line items */}
            <div className="flex flex-col gap-4 mb-6">
                {[
                    { label: 'Subtotal', value: formatCurrency(subtotal), color: tokens.onSurface },
                    {
                        label: 'Shipping',
                        value: shippingFree ? 'Complimentary' : 'Complimentary over INR 15,000',
                        color: shippingFree ? '#5a7a5a' : tokens.muted,
                    },
                    { label: 'Duties & Taxes', value: 'Included', color: tokens.muted },
                ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-baseline">
                        <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: tokens.secondary }}>
                            {label}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-right" style={{ color }}>
                            {value}
                        </span>
                    </div>
                ))}
            </div>

            <div style={{ height: 1, backgroundColor: tokens.surfaceHighest }} className="mb-6" />

            {/* Grand total */}
            <div className="flex justify-between items-baseline mb-6">
                <span className="text-[10px] uppercase tracking-[0.22em] font-medium" style={{ color: tokens.onSurface }}>
                    Total
                </span>
                <span className="text-base uppercase tracking-[0.18em] font-medium" style={{ color: tokens.onSurface }}>
                    {formatCurrency(subtotal)}
                </span>
            </div>

            {/* Free shipping progress bar */}
            {!shippingFree && (
                <div className="mb-6">
                    <div
                        className="w-full h-[2px] rounded-full overflow-hidden"
                        style={{ backgroundColor: tokens.surfaceHighest }}
                    >
                        <div
                            className="h-full transition-all duration-500 rounded-full"
                            style={{
                                width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                                backgroundColor: tokens.primary,
                            }}
                        />
                    </div>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.14em]" style={{ color: tokens.muted }}>
                        {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} away from free shipping
                    </p>
                </div>
            )}

            {/* Checkout CTA */}
            <button
                className="w-full py-4 mb-3 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = tokens.primary
                    e.currentTarget.style.color = tokens.onSurface
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = tokens.onSurface
                    e.currentTarget.style.color = tokens.surface
                }}
            >
                Proceed to Checkout
            </button>

            <button
                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${tokens.outlineVariant}`,
                    color: tokens.onSurface,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = tokens.primary }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = tokens.outlineVariant }}
                onClick={() => navigate('/')}
            >
                Continue Shopping
            </button>

            {/* Payment badges */}
            <div className="flex flex-wrap gap-2 mt-5">
                {['Visa', 'Mastercard', 'UPI', 'COD', 'Net Banking'].map(p => (
                    <span
                        key={p}
                        className="px-2 py-1 text-[9px] uppercase tracking-[0.1em] font-semibold rounded"
                        style={{ border: `1px solid ${tokens.outlineVariant}`, color: tokens.secondary }}
                    >
                        {p}
                    </span>
                ))}
            </div>

            <p
                className="mt-5 text-center text-[9px] uppercase tracking-[0.14em] leading-relaxed"
                style={{ color: tokens.muted }}
            >
                Free returns within 14 days · Authenticity guaranteed
            </p>
        </div>
    )
}

export default CartSummary