import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ProductVariation {
  name: string; // e.g., "Size", "Scent", "Color"
  options: {
    value: string; // e.g., "Small", "Large", "Lavender", "Vanilla"
    priceModifier?: number; // Additional price for this variation
    stock?: number; // Stock for this specific variation
  }[];
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  longDescription?: string; // Extended product description
  category: 'soap' | 'candle';
  price: number;
  images: string[];
  stock: number;
  ingredients?: string;
  scentNotes?: string;
  variations?: ProductVariation[]; // Product variations (size, scent, etc.)
  sensitivityLevel?: 'mild' | 'moderate' | 'sensitive' | 'very-sensitive'; // Skin sensitivity level
  benefits?: string[]; // Product benefits
  usageInstructions?: string; // How to use the product
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      enum: ['soap', 'candle'],
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    ingredients: {
      type: String,
    },
    scentNotes: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    variations: [
      {
        name: String,
        options: [
          {
            value: String,
            priceModifier: { type: Number, default: 0 },
            stock: Number,
          },
        ],
      },
    ],
    sensitivityLevel: {
      type: String,
      enum: ['mild', 'moderate', 'sensitive', 'very-sensitive'],
    },
    benefits: [String],
    usageInstructions: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search
ProductSchema.index({ name: 'text', description: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
