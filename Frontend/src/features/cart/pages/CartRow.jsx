import React from 'react'
import { tokens } from './tokens'
import { formatCurrency, getVariantDetails, getDisplayImage } from './cartUtils'

const CartRow = ({ item, qty, onIncrease, onDecrease, onRemove }) => {
    const { product, variant: variantId, price } = item
    const variantDetail = getVariantDetails(product, variantId)
    const imageUrl = getDisplayImage(product, variantDetail)
    const displayPrice = price ?? variantDetail?.price ?? product?.price
    const stock = variantDetail?.stock
    const size = variantDetail?.size
    const color = variantDetail?.color
    const artNo = product?._id?.slice(-8).toUpperCase() || '—'

    return (
        <div
            className="flex gap-6 md:gap-8 p-6 md:p-8 transition-all duration-300"
            style={{ backgroundColor: tokens.surfaceLow }}
        >
            {/* Image */}
            <div
                className="flex-shrink-0 overflow-hidden"
                style={{
                    width: 'clamp(100px, 15vw, 160px)',
                    aspectRatio: '4/5',
                    backgroundColor: tokens.surfaceHighest,
                }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt={product?.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full" style={{ backgroundColor: tokens.surfaceHigh }} />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] mb-1" style={{ color: tokens.muted }}>
                        Snitch
                    </p>

                    <h2
                        className="font-light leading-tight mb-3"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                            color: tokens.onSurface,
                        }}
                    >
                        {product?.title}
                    </h2>

                    <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3" style={{ color: tokens.onSurface }}>
                        {displayPrice ? formatCurrency(displayPrice.amount, displayPrice.currency) : '—'}
                    </p>

                    <div
                        className="grid gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.12em] mb-4"
                        style={{ gridTemplateColumns: 'auto 1fr' }}
                    >
                        {[
                            { label: 'Art. no.', value: artNo },
                            { label: 'Color', value: color },
                            { label: 'Size', value: size },
                        ].filter(r => r.value).map(({ label, value }) => (
                            <React.Fragment key={label}>
                                <span style={{ color: tokens.muted }}>{label}</span>
                                <span className="capitalize" style={{ color: tokens.onSurfaceVariant }}>{value}</span>
                            </React.Fragment>
                        ))}
                        {stock !== undefined && (
                            <>
                                <span style={{ color: tokens.muted }}>Stock</span>
                                <span style={{ color: stock > 0 ? '#5a7a5a' : '#a05a5a' }}>
                                    {stock > 0 ? `${stock} available` : 'Out of stock'}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        {/* Stepper */}
                        <div className="flex items-center" style={{ border: `1px solid ${tokens.outlineVariant}` }}>
                            <button
                                onClick={onDecrease}
                                className="w-9 h-9 flex items-center justify-center text-sm transition-opacity hover:opacity-50"
                                style={{ color: tokens.onSurface, borderRight: `1px solid ${tokens.outlineVariant}` }}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span
                                className="w-10 text-center text-[11px] tracking-[0.12em] font-medium select-none"
                                style={{ color: tokens.onSurface }}
                            >
                                {qty}
                            </span>
                            <button
                                onClick={onIncrease}
                                className="w-9 h-9 flex items-center justify-center text-sm transition-opacity hover:opacity-50"
                                style={{ color: tokens.onSurface, borderLeft: `1px solid ${tokens.outlineVariant}` }}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        {/* Line total */}
                        <span className="text-[11px] uppercase tracking-[0.15em] font-medium" style={{ color: tokens.onSurface }}>
                            {displayPrice ? formatCurrency(displayPrice.amount * qty, displayPrice.currency) : ''}
                        </span>
                    </div>

                    <button
                        onClick={onRemove}
                        className="text-[10px] uppercase tracking-[0.22em] font-medium transition-all duration-200 hover:underline"
                        style={{ color: tokens.muted }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartRow