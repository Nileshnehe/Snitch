import React from 'react'
import { Link } from 'react-router'
import { tokens } from './tokens'
import FontLink from './FontLink'

const CartEmpty = () => (
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

export default CartEmpty