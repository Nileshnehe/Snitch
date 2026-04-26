import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useCart } from '../hook/useCart'
import { tokens } from './tokens'
import { formatCurrency } from './cartUtils'
import CartRow from './CartRow'
import CartSummary from './CartSummary'
import CartEmpty from './CartEmpty'
import FontLink from './FontLink'
import { useCallback } from 'react'
import debounce from "lodash/debounce"


const FREE_SHIPPING_THRESHOLD = 15000

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)
    const { handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem } = useCart()

    useEffect(() => {
        handleGetCart()
    }, [])

    // ✅ FIX: Use Redux state directly — no local quantity state needed
    // Local state caused refresh bug (quantities reset on reload)
    // const increase = (item) => {
    //     // console.log("item.variant:", item.variant)
    //     console.log("item.variant:", item.variant)
    //     handleIncrementCartItem?.({
    //         productId: item.product._id,
    //         variantId: item.variant
    //     })
    // }

    const increase = useCallback(
    debounce((item) => {
        handleIncrementCartItem?.({
            productId: item.product._id,
            variantId: item.variant
        })
    }, 500),
    []
)

    const decrease = (item) => {
        handleDecrementCartItem?.({
            productId: item.product._id,
            variantId: item.variant?._id
        })
    }

    const remove = (itemId) => {
        handleRemoveCartItem?.(itemId)
    }

    // ✅ FIX: removed items handled by Redux, not local Set
    const visibleItems = cartItems ?? []

    const subtotal = visibleItems.reduce((sum, item) => {
        return sum + (item.price?.amount ?? 0) * (item.quantity ?? 1)
    }, 0)

    const totalPieces = visibleItems.length

    if (!visibleItems.length) return <CartEmpty />

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
                                        qty={item.quantity ?? 1}  // ✅ FIX: directly from Redux
                                        onIncrease={() => increase(item)}
                                        onDecrease={() => decrease(item)}
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
                            <CartSummary subtotal={subtotal} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart