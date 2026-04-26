export const formatCurrency = (amount, currency = 'INR') =>
    `${currency} ${Number(amount).toLocaleString('en-IN')}`

export const getVariantDetails = (product, variantId) => {
    if (!product?.variants || !variantId) return null
    return product.variants.find(v => v._id === variantId) ?? null
}

export const getDisplayImage = (product, variant) => {
    if (variant?.images?.length) return variant.images[0].url
    if (product?.images?.length) return product.images[0].url
    return null
}