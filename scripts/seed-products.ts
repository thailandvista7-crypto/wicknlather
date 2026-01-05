import mongoose from 'mongoose';
import Product from '../models/Product';
import dbConnect from '../lib/db';
import { slugify } from '../lib/utils';

const sampleProducts = [
  // Soaps
  {
    name: 'Lavender Dream Handmade Soap',
    description:
      'A calming blend of lavender essential oil and natural ingredients. Perfect for evening routines and promoting relaxation.',
    longDescription:
      'Our Lavender Dream Handmade Soap is crafted with the finest organic ingredients to provide a luxurious, calming experience. The soothing aroma of lavender essential oil helps reduce stress and promotes better sleep. Made with organic olive oil and shea butter, this soap gently cleanses while deeply moisturizing your skin. Perfect for those with sensitive skin, this soap is free from harsh chemicals and synthetic fragrances. Each bar is handcrafted with care, ensuring quality and attention to detail.',
    category: 'soap',
    price: 12.99,
    images: [
      'https://images.unsplash.com/photo-1600857062242-afd3c251b271?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
    ],
    stock: 50,
    ingredients: 'Organic Olive Oil, Coconut Oil, Shea Butter, Lavender Essential Oil, Sodium Hydroxide, Glycerin',
    scentNotes: 'Fresh lavender with subtle herbal undertones and a hint of floral sweetness',
    sensitivityLevel: 'sensitive',
    benefits: [
      'Calming and relaxing aroma',
      'Deeply moisturizing for dry skin',
      'Suitable for sensitive skin',
      'Promotes better sleep',
      '100% natural ingredients',
    ],
    usageInstructions:
      'Wet your hands or body, lather the soap, and gently massage onto skin. Rinse thoroughly with warm water. For best results, use daily in your morning or evening routine.',
    variations: [
      {
        name: 'Size',
        options: [
          { value: 'Standard (4oz)', priceModifier: 0, stock: 30 },
          { value: 'Large (6oz)', priceModifier: 3.99, stock: 20 },
        ],
      },
    ],
    featured: true,
  },
  {
    name: 'Vanilla Bean Luxury Soap',
    description:
      'Indulge in the warm, comforting scent of vanilla. This rich, creamy soap is perfect for dry skin, featuring natural vanilla extract and moisturizing cocoa butter.',
    longDescription:
      'Experience pure luxury with our Vanilla Bean Handmade Soap. This decadent bar combines the warm, comforting aroma of real vanilla extract with rich, moisturizing cocoa butter. Perfect for those with dry or mature skin, this soap provides intense hydration while leaving your skin soft and smooth. The creamy lather gently cleanses without stripping your skin of its natural oils. Made with premium ingredients and handcrafted to perfection.',
    category: 'soap',
    price: 14.99,
    images: [
      'https://images.unsplash.com/photo-1600857062242-afd3c251b271?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
    ],
    stock: 45,
    ingredients: 'Coconut Oil, Palm Oil, Cocoa Butter, Vanilla Extract, Sodium Hydroxide, Glycerin',
    scentNotes: 'Warm vanilla with creamy, sweet notes and a hint of caramel',
    sensitivityLevel: 'moderate',
    benefits: [
      'Intense moisturization',
      'Rich, creamy lather',
      'Warm, comforting scent',
      'Ideal for dry skin',
      'Luxurious feel',
    ],
    usageInstructions:
      'Apply to wet skin, create a rich lather, and massage gently. Rinse with warm water. Best used in the evening for a relaxing, spa-like experience.',
    variations: [
      {
        name: 'Size',
        options: [
          { value: 'Standard (4oz)', priceModifier: 0, stock: 25 },
          { value: 'Large (6oz)', priceModifier: 4.99, stock: 20 },
        ],
      },
    ],
    featured: true,
  },
  {
    name: 'Eucalyptus Mint Refreshing Soap',
    description:
      'Wake up your senses with this invigorating blend of eucalyptus and peppermint. Ideal for morning showers, this soap provides a refreshing, energizing experience.',
    longDescription:
      'Start your day right with our Eucalyptus Mint Refreshing Soap. This invigorating blend combines the cooling sensation of peppermint with the fresh, clean aroma of eucalyptus. Perfect for morning routines, this soap awakens your senses and leaves you feeling refreshed and energized. The natural menthol properties provide a cooling effect that soothes tired muscles. Made with organic oils and essential oils, this soap is perfect for all skin types.',
    category: 'soap',
    price: 13.99,
    images: [
      'https://images.unsplash.com/photo-1600857062242-afd3c251b271?w=800&h=800&fit=crop',
    ],
    stock: 40,
    ingredients: 'Olive Oil, Coconut Oil, Eucalyptus Essential Oil, Peppermint Essential Oil, Sodium Hydroxide',
    scentNotes: 'Cooling mint with fresh eucalyptus and a crisp, clean finish',
    sensitivityLevel: 'mild',
    benefits: [
      'Energizing and refreshing',
      'Cooling sensation',
      'Awakens the senses',
      'Great for morning use',
      'Natural deodorizing properties',
    ],
    usageInstructions:
      'Use in the morning for an energizing start to your day. Lather well and massage onto skin, paying special attention to areas that need refreshing. Rinse thoroughly.',
    featured: false,
  },
  {
    name: 'Rose Petal Delight Soap',
    description:
      'A romantic, floral soap made with real rose petals. This luxurious bar features rose essential oil and is perfect for sensitive skin. A beautiful gift for someone special.',
    longDescription:
      'Indulge in the romantic elegance of our Rose Petal Delight Soap. This luxurious bar is infused with real rose petals and pure rose essential oil, creating a sophisticated floral experience. Perfect for sensitive skin, this gentle formula soothes and hydrates while leaving behind a delicate, romantic fragrance. The natural rose petals add a touch of luxury and visual beauty. Ideal for special occasions or as a thoughtful gift.',
    category: 'soap',
    price: 15.99,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
    ],
    stock: 35,
    ingredients: 'Olive Oil, Shea Butter, Rose Essential Oil, Dried Rose Petals, Sodium Hydroxide, Glycerin',
    scentNotes: 'Floral rose with delicate, romantic undertones and a hint of sweetness',
    sensitivityLevel: 'very-sensitive',
    benefits: [
      'Gentle on sensitive skin',
      'Romantic, floral fragrance',
      'Visually beautiful with rose petals',
      'Deeply moisturizing',
      'Perfect for gifting',
    ],
    usageInstructions:
      'Gently lather on wet skin, allowing the rose petals to release their natural essence. Massage in circular motions and rinse with warm water. Perfect for evening routines.',
    variations: [
      {
        name: 'Scent Intensity',
        options: [
          { value: 'Light', priceModifier: 0, stock: 20 },
          { value: 'Medium', priceModifier: 1.99, stock: 10 },
          { value: 'Strong', priceModifier: 2.99, stock: 5 },
        ],
      },
    ],
    featured: true,
  },
  {
    name: 'Oatmeal & Honey Gentle Soap',
    description:
      'Soothing and gentle, perfect for sensitive or irritated skin. Made with colloidal oatmeal and raw honey, this soap provides natural exfoliation and moisturization.',
    longDescription:
      'Our Oatmeal & Honey Gentle Soap is specially formulated for sensitive and irritated skin. The colloidal oatmeal provides gentle exfoliation while soothing inflammation and irritation. Raw honey adds natural antibacterial properties and deep moisturization. This combination makes it perfect for those with eczema, psoriasis, or other skin conditions. The mild, natural scent won\'t irritate sensitive noses, and the gentle formula is safe for daily use.',
    category: 'soap',
    price: 13.99,
    images: [
      'https://images.unsplash.com/photo-1600857062242-afd3c251b271?w=800&h=800&fit=crop',
    ],
    stock: 42,
    ingredients: 'Olive Oil, Coconut Oil, Colloidal Oatmeal, Raw Honey, Sodium Hydroxide, Glycerin',
    scentNotes: 'Warm, sweet honey with earthy oatmeal notes',
    sensitivityLevel: 'very-sensitive',
    benefits: [
      'Soothes irritated skin',
      'Gentle exfoliation',
      'Natural antibacterial properties',
      'Ideal for eczema and psoriasis',
      'Hypoallergenic formula',
    ],
    usageInstructions:
      'Use daily on sensitive or irritated areas. Gently massage the soap onto wet skin, allowing the oatmeal to provide gentle exfoliation. Rinse thoroughly. Can be used multiple times daily if needed.',
    featured: false,
  },
  {
    name: 'Citrus Burst Energizing Soap',
    description:
      'A bright, uplifting blend of lemon, orange, and grapefruit essential oils. This zesty soap is perfect for starting your day with energy and positivity.',
    longDescription:
      'Energize your morning routine with our Citrus Burst Soap. This vibrant blend combines the zesty aromas of lemon, orange, and grapefruit essential oils to create an uplifting, invigorating experience. The natural citrus oils help brighten your mood and awaken your senses. Perfect for oily or combination skin, this soap helps balance oil production while providing gentle cleansing. The fresh, clean scent lingers subtly throughout the day.',
    category: 'soap',
    price: 12.99,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
    ],
    stock: 38,
    ingredients: 'Olive Oil, Coconut Oil, Lemon Essential Oil, Orange Essential Oil, Grapefruit Essential Oil, Sodium Hydroxide',
    scentNotes: 'Bright citrus with zesty, energizing notes of lemon, orange, and grapefruit',
    sensitivityLevel: 'mild',
    benefits: [
      'Energizing and uplifting',
      'Balances oily skin',
      'Bright, fresh scent',
      'Natural mood booster',
      'Refreshing feel',
    ],
    usageInstructions:
      'Use in the morning for an energizing start. Create a rich lather and massage onto skin. The citrus oils will invigorate your senses. Rinse with cool water for an extra refreshing feel.',
    featured: false,
  },
  // Candles
  {
    name: 'Sage & Cedarwood Candle',
    description:
      'A grounding, earthy scent that brings the outdoors in. This candle features sage and cedarwood essential oils for a calming, meditative atmosphere. Burns for 40+ hours.',
    longDescription:
      'Transform your space with our Sage & Cedarwood Candle. This grounding blend combines the cleansing properties of sage with the warm, woody aroma of cedarwood. Perfect for meditation, yoga, or simply creating a peaceful atmosphere, this candle helps reduce stress and promote relaxation. Made with 100% soy wax and a natural cotton wick, it burns cleanly for over 40 hours. The earthy, masculine scent is perfect for any room in your home.',
    category: 'candle',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
    stock: 30,
    ingredients: 'Soy Wax, Sage Essential Oil, Cedarwood Essential Oil, Natural Cotton Wick',
    scentNotes: 'Earthy sage with woody cedarwood base and subtle herbal notes',
    benefits: [
      'Grounding and calming',
      'Perfect for meditation',
      'Burns for 40+ hours',
      '100% natural soy wax',
      'Clean-burning formula',
    ],
    usageInstructions:
      'Trim wick to 1/4 inch before first use. Burn for 2-3 hours at a time to ensure even melting. Keep away from drafts and never leave burning unattended. Allow to cool completely before relighting.',
    variations: [
      {
        name: 'Size',
        options: [
          { value: 'Small (8oz)', priceModifier: 0, stock: 15 },
          { value: 'Medium (12oz)', priceModifier: 5.99, stock: 10 },
          { value: 'Large (16oz)', priceModifier: 9.99, stock: 5 },
        ],
      },
    ],
    featured: true,
  },
  {
    name: 'Vanilla Cinnamon Spice Candle',
    description:
      'The perfect cozy candle for autumn and winter. Warm vanilla meets spicy cinnamon for a comforting, homey fragrance that fills any room. Burns for 45+ hours.',
    longDescription:
      'Cozy up with our Vanilla Cinnamon Spice Candle, the perfect companion for chilly evenings. This warm, inviting blend combines the sweet comfort of vanilla with the spicy warmth of cinnamon. The rich, homey fragrance creates an atmosphere of comfort and relaxation, making it perfect for family gatherings or quiet evenings at home. Made with premium soy wax, this candle burns cleanly and evenly for over 45 hours, filling your space with its delightful aroma.',
    category: 'candle',
    price: 26.99,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
    stock: 28,
    ingredients: 'Soy Wax, Vanilla Extract, Cinnamon Essential Oil, Natural Cotton Wick',
    scentNotes: 'Warm vanilla with spicy cinnamon and a hint of nutmeg',
    benefits: [
      'Cozy, comforting scent',
      'Perfect for autumn/winter',
      'Burns for 45+ hours',
      'Creates warm atmosphere',
      'Great for entertaining',
    ],
    usageInstructions:
      'Burn for 2-4 hours at a time for best results. The warm scent is perfect for evening use. Keep wick trimmed and away from drafts. Extinguish when 1/2 inch of wax remains.',
    variations: [
      {
        name: 'Size',
        options: [
          { value: 'Small (8oz)', priceModifier: 0, stock: 10 },
          { value: 'Medium (12oz)', priceModifier: 6.99, stock: 12 },
          { value: 'Large (16oz)', priceModifier: 11.99, stock: 6 },
        ],
      },
    ],
    featured: true,
  },
  {
    name: 'Ocean Breeze Candle',
    description:
      'Fresh and clean, like a day at the beach. This candle combines sea salt, bergamot, and white musk for a crisp, refreshing scent. Perfect for bathrooms and living spaces.',
    longDescription:
      'Bring the ocean indoors with our Ocean Breeze Candle. This fresh, clean fragrance captures the essence of a seaside breeze with notes of sea salt, bergamot, and white musk. The crisp, refreshing scent is perfect for bathrooms, living rooms, or any space that needs a breath of fresh air. The light, airy fragrance won\'t overwhelm, making it ideal for those who prefer subtle scents. Made with natural soy wax for a clean, even burn.',
    category: 'candle',
    price: 23.99,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
    stock: 32,
    ingredients: 'Soy Wax, Sea Salt, Bergamot Essential Oil, White Musk, Natural Cotton Wick',
    scentNotes: 'Fresh ocean breeze with citrus top notes and clean, airy finish',
    benefits: [
      'Fresh, clean scent',
      'Perfect for bathrooms',
      'Light and airy fragrance',
      'Refreshing atmosphere',
      'Clean-burning soy wax',
    ],
    usageInstructions:
      'Burn for 2-3 hours to fill your space with the fresh ocean scent. Ideal for morning routines or when you need a refreshing pick-me-up. Keep away from water and drafts.',
    featured: false,
  },
  {
    name: 'Jasmine & Sandalwood Candle',
    description:
      'An exotic, luxurious blend of jasmine flowers and sandalwood. This elegant candle creates a sophisticated, romantic ambiance. Burns for 50+ hours.',
    longDescription:
      'Experience luxury with our Jasmine & Sandalwood Candle. This sophisticated blend combines the exotic, floral notes of jasmine with the rich, warm base of sandalwood. The elegant fragrance creates a romantic, intimate atmosphere perfect for special occasions or quiet evenings. The complex scent profile evolves as it burns, revealing different layers of fragrance. Made with premium soy wax, this candle burns for over 50 hours, providing long-lasting luxury.',
    category: 'candle',
    price: 28.99,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
    stock: 25,
    ingredients: 'Soy Wax, Jasmine Essential Oil, Sandalwood Essential Oil, Natural Cotton Wick',
    scentNotes: 'Floral jasmine with rich sandalwood base and exotic, luxurious undertones',
    benefits: [
      'Luxurious, exotic scent',
      'Romantic atmosphere',
      'Burns for 50+ hours',
      'Sophisticated fragrance',
      'Perfect for special occasions',
    ],
    usageInstructions:
      'Burn for 3-4 hours to fully develop the fragrance. The exotic scent is perfect for evening use or special occasions. Allow the wax to pool completely on first burn for even burning.',
    variations: [
      {
        name: 'Scent Intensity',
        options: [
          { value: 'Light', priceModifier: 0, stock: 10 },
          { value: 'Medium', priceModifier: 2.99, stock: 10 },
          { value: 'Strong', priceModifier: 4.99, stock: 5 },
        ],
      },
    ],
    featured: true,
  },
  {
    name: 'Pumpkin Spice Latte Candle',
    description:
      'Fall in a jar! This seasonal favorite combines pumpkin, cinnamon, nutmeg, and a hint of coffee for the ultimate cozy autumn scent. Limited edition.',
    longDescription:
      'Celebrate autumn with our limited edition Pumpkin Spice Latte Candle. This seasonal favorite captures the essence of your favorite fall beverage with notes of pumpkin, cinnamon, nutmeg, and a hint of coffee. The warm, spicy fragrance creates the perfect cozy atmosphere for crisp autumn days. Made with natural soy wax, this limited edition candle is available only during fall season. Stock up while supplies last!',
    category: 'candle',
    price: 25.99,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
    stock: 20,
    ingredients: 'Soy Wax, Pumpkin Spice Blend, Coffee Extract, Natural Cotton Wick',
    scentNotes: 'Warm pumpkin with spicy cinnamon, nutmeg, and a hint of coffee',
    benefits: [
      'Seasonal favorite',
      'Cozy autumn scent',
      'Limited edition',
      'Perfect for fall',
      'Warm, inviting fragrance',
    ],
    usageInstructions:
      'Enjoy during autumn months for the perfect seasonal atmosphere. Burn for 2-3 hours to fill your home with the warm, spicy scent. Perfect for cozy evenings by the fire.',
    featured: false,
  },
  {
    name: 'Lavender Fields Candle',
    description:
      'Drift away to a field of lavender with this calming, floral candle. Perfect for bedrooms and meditation spaces. Promotes relaxation and better sleep. Burns for 40+ hours.',
    longDescription:
      'Create a peaceful sanctuary with our Lavender Fields Candle. This calming, floral fragrance transports you to a serene lavender field, promoting relaxation and better sleep. The pure lavender essential oil helps reduce stress and anxiety, making it perfect for bedrooms, meditation spaces, or any area where you want to unwind. Made with 100% natural soy wax, this candle burns cleanly for over 40 hours, providing long-lasting tranquility.',
    category: 'candle',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
    stock: 35,
    ingredients: 'Soy Wax, Lavender Essential Oil, Natural Cotton Wick',
    scentNotes: 'Pure, calming lavender with herbal notes and a soft, floral finish',
    benefits: [
      'Promotes relaxation',
      'Helps with sleep',
      'Reduces stress and anxiety',
      'Perfect for bedrooms',
      'Natural sleep aid',
    ],
    usageInstructions:
      'Burn 30 minutes before bedtime to promote relaxation. The calming lavender scent helps prepare your mind and body for sleep. Keep in bedroom or meditation space for best results.',
    variations: [
      {
        name: 'Size',
        options: [
          { value: 'Small (8oz)', priceModifier: 0, stock: 20 },
          { value: 'Medium (12oz)', priceModifier: 5.99, stock: 10 },
          { value: 'Large (16oz)', priceModifier: 9.99, stock: 5 },
        ],
      },
    ],
    featured: true,
  },
];

async function seedProducts() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});

    for (const product of sampleProducts) {
      const slug = slugify(product.name);
      const existingProduct = await Product.findOne({ slug });

      if (!existingProduct) {
        await Product.create({
          ...product,
          slug,
        });
        console.log(`Created product: ${product.name}`);
      } else {
        console.log(`Product already exists: ${product.name}`);
      }
    }

    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
