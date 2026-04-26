import productModel from "../models/product.model.js";


export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({ _id: productId });

    if (!product) return 0;

    //  Agar variantId nahi hai (simple product)
    if (!variantId) return product.stock;

    //  Agar variantId hai (variant wala product)
    const variant = product.variants.find(v => v._id.toString() === variantId);

    if (!variant) return 0;

    return variant.stock;
}