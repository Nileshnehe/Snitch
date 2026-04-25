import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCart} from '../hook/useCart'
import { Link, useNavigate } from 'react-router'

/* ─── Design tokens ─────────────────────────────────────────────────────────── */
const tokens = {
    surface: '#fbf9f6',
    surfaceLow: '#f5f3f0',
    surfaceLowest: '#ffffff',
    surfaceHigh: '#eae8e5',
    surfaceHighest: '#e4e2df',
    onSurface: '#1b1c1a',
    onSurfaceVariant: '#4d463a',
    secondary: '#7A6E63',
    muted: '#B5ADA3',
    primary: '#C9A96E',
    primaryDark: '#745a27',
    outlineVariant: '#d0c5b5',
    outline: '#7f7668',
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
const formatCurrency = (amount, currency = 'INR') =>
    `${currency} ${Number(amount).toLocaleString('en-IN')}`

const getVariantDetails = (product, variantId) => {
    if (!product?.variants || !variantId) return null
    return product.variants.find(v => v._id === variantId) ?? null
}

const getDisplayImage = (product, variant) => {
    if (variant?.images?.length) return variant.images[0].url
    if (product?.images?.length) return product.images[0].url
    return null
}

/* ─── Shared Nav ─────────────────────────────────────────────────────────────── */
// const Nav = ({ cartCount = 0 }) => {
   
// }

/* ─── Single Cart Row ────────────────────────────────────────────────────────── */
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
                    {/* Brand */}
                    <p className="text-[10px] uppercase tracking-[0.22em] mb-1" style={{ color: tokens.muted }}>
                        Snitch
                    </p>

                    {/* Title */}
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

                    {/* Price */}
                    <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3" style={{ color: tokens.onSurface }}>
                        {displayPrice ? formatCurrency(displayPrice.amount, displayPrice.currency) : '—'}
                    </p>

                    {/* Details grid */}
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
                                onClick={() => handleIncrementCartItem()}
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

                    {/* Remove */}
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

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)
    const { handleGetCart, handleIncrementCartItem } = useCart()
    const navigate = useNavigate()

    const [quantities, setQuantities] = useState({})
    const [removed, setRemoved] = useState(new Set())

    useEffect(() => {
        handleGetCart()
    }, [])

    /* Sync when Redux cartItems load */
    useEffect(() => {
        if (cartItems?.length) {
            setQuantities(prev => {
                const next = { ...prev }
                cartItems.forEach(item => {
                    if (!(item._id in next)) next[item._id] = item.quantity ?? 1
                })
                return next
            })
        }
    }, [cartItems])

    const increase = (item) => {
        const { _id, variant: variantId } = item
        setQuantities(prev => ({ ...prev, [_id]: (prev[_id] ?? 1) + 1 }))
        handleIncrementCartItem?.({ productId: _id, variantId })
    }

    const decrease = (id) =>
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) - 1) }))

    const remove = (id) =>
        setRemoved(prev => new Set([...prev, id]))

    const visibleItems = (cartItems ?? []).filter(item => !removed.has(item._id))

    const subtotal = visibleItems.reduce((sum, item) => {
        const qty = quantities[item._id] ?? item.quantity ?? 1
        return sum + (item.price?.amount ?? 0) * qty
    }, 0)

    const freeShippingThreshold = 15000
    const shippingFree = subtotal >= freeShippingThreshold
    const totalPieces = visibleItems.length

    const FontLink = () => (
        <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
            rel="stylesheet"
        />
    )

    /* ── Empty state ── */
    if (!visibleItems.length) {
        return (
            <>
                <FontLink />
                <div className="min-h-screen flex flex-col" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
                    
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-24 px-8 text-center">
                        <p
                            className="font-light leading-tight"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                color: tokens.onSurface,
                                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                            }}
                        >
                            Your selection is empty.
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: tokens.muted }}>
                            Curate your collection
                        </p>
                        <Link
                            to="/"
                            className="mt-4 px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
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
                            Explore the Archive
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    /* ── Main cart ── */
    return (
        <>
            <FontLink />
            <div
                className="min-h-screen pb-24 selection:bg-[#C9A96E]/30"
                style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}
            >
                

                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-12 lg:pt-20">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                        {/* ══ LEFT: Items (65%) ══ */}
                        <div className="w-full lg:w-[65%]">

                            {/* Heading */}
                            <div className="mb-10">
                                <h1
                                    className="font-light leading-[1.05] mb-2"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        color: tokens.onSurface,
                                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                    }}
                                >
                                    Your Selection
                                </h1>
                                <p className="text-[10px] uppercase tracking-[0.24em] font-medium" style={{ color: tokens.muted }}>
                                    {totalPieces} {totalPieces === 1 ? 'piece' : 'pieces'}
                                </p>
                            </div>

                            {/* UPI banner */}
                            <div
                                className="flex items-center gap-3 px-4 py-3 mb-8 text-[10px] uppercase tracking-[0.15em]"
                                style={{
                                    border: `1px solid ${tokens.outlineVariant}`,
                                    color: tokens.secondary,
                                    backgroundColor: tokens.surfaceLow,
                                }}
                            >
                                <span style={{ color: tokens.primary }}>✦</span>
                                UPI payment supports quicker refunds
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-4">
                                {visibleItems.map(item => (
                                    <CartRow
                                        key={item._id}
                                        item={item}
                                        qty={quantities[item._id] ?? item.quantity ?? 1}
                                        onIncrease={() => increase(item)}
                                        onDecrease={() => decrease(item._id)}
                                        onRemove={() => remove(item._id)}
                                    />
                                ))}
                            </div>

                            {/* Policy strip */}
                            <div
                                className="mt-10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[10px] uppercase tracking-[0.12em]"
                                style={{ borderTop: `1px solid ${tokens.surfaceHighest}`, color: tokens.muted }}
                            >
                                {[
                                    { label: 'Shipping', value: 'Complimentary over INR 15,000' },
                                    { label: 'Returns', value: 'Within 14 days of delivery' },
                                    { label: 'Authenticity', value: '100% Guaranteed' },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="font-medium mb-1" style={{ color: tokens.secondary }}>{label}</p>
                                        <p>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ══ RIGHT: Summary (35%, sticky) ══ */}
                        <div className="w-full lg:w-[35%] lg:sticky lg:top-28">
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
                                                    width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
                                                    backgroundColor: tokens.primary,
                                                }}
                                            />
                                        </div>
                                        <p className="mt-2 text-[9px] uppercase tracking-[0.14em]" style={{ color: tokens.muted }}>
                                            {formatCurrency(freeShippingThreshold - subtotal)} away from free shipping
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

                                {/* Continue shopping */}
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

                                {/* Fine print */}
                                <p
                                    className="mt-5 text-center text-[9px] uppercase tracking-[0.14em] leading-relaxed"
                                    style={{ color: tokens.muted }}
                                >
                                    Free returns within 14 days · Authenticity guaranteed
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart