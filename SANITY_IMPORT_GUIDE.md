# Sanity Import Guide for SilverCrafts

## 🚀 Quick Start

This guide will help you import your authentic CSV-based product catalog into Sanity Studio.

## ⚙️ Prerequisites

1. **Sanity Project**: You should already have a Sanity project set up
2. **Environment Variables**: Your `.env.local` should have:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-09-29
   ```

3. **Write Token**: You'll need a Sanity write token (see setup below)

## 🔑 Create Sanity Write Token

1. Go to [Sanity Management Console](https://manage.sanity.io/)
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API Token**
5. Name it: `Import Script Token`
6. Set permissions: **Editor** or **Administrator**
7. Copy the token

## 📝 Environment Setup

Add the write token to your `.env.local`:

```bash
# Add this line to your .env.local file
SANITY_WRITE_TOKEN=your-write-token-here
```

**⚠️ Important**: Never commit the write token to version control!

## 🎯 Import Process

The import script will process your CSV-based product catalog in this order:

### Phase 1: Foundation Data
1. **Categories** (16 items): Bowls, Chombu, Lamps, Plates, etc.
2. **Materials** (3 items): Pure Silver, Sterling Silver, Traditional Alloy
3. **Collections** (8 items): Sacred Motifs, Hand Engraved, etc.

### Phase 2: Products
4. **Products** (25+ items): Authentic silvercraft items with proper categorization

## 🚀 Run the Import

```bash
# Import all data to Sanity
npm run import-sanity
```

The script will:
- ✅ Create categories first (to establish references)
- ✅ Create materials and collections
- ✅ Create products with proper category/material/collection references
- ✅ Show progress and success/error counts
- ✅ Provide next steps

## 📊 What Gets Imported

### Categories (16):
- Bowls, Boxes, Chombu, Cups & Drinkware
- Glasses, Kamakshi Items, Kodam, Lamps & Lighting
- Panchapathram & Ritual Items, Plates & Serving
- Simil, Trays, Vel, Vessels & Cookware
- Coins & Bars, Other Items

### Products (25+):
- Plain Silver Bowl (25g) → Bowls
- Chombu Ashtalakshmi (250g) → Chombu
- Kuthuvizhaku Plain (100g) → Lamps & Lighting
- Glass Hand Engraving (80g) → Glasses
- Tray Ashtalakshmi (500g) → Trays
- Silver Coin (10g) → Coins & Bars
- And many more authentic items...

## 🎨 After Import

1. **Open Sanity Studio**:
   ```bash
   npx sanity dev
   ```

2. **Verify Import**: Check that all categories, materials, collections, and products were created

3. **Add Images**: Upload product images and link them to products

4. **Publish Content**: Make content live for your website

## 🔧 Troubleshooting

### Missing Environment Variables
```
❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable
```
**Solution**: Add the missing variable to `.env.local`

### Invalid Write Token
```
❌ Unauthorized
```
**Solution**: Check your `SANITY_WRITE_TOKEN` is correct and has write permissions

### Reference Errors
```
❌ Reference not found
```
**Solution**: The script imports in the correct order, so this shouldn't happen. Try re-running.

## 📈 Expected Output

```
🚀 Starting SilverCrafts CSV Data Import to Sanity...
===============================================

📊 Import Summary:
   Categories: 16
   Materials: 3
   Collections: 8
   Products: 25

🗂️  Importing Categories...
   ✅ Created category: Bowls
   ✅ Created category: Chombu
   ...

🧱 Importing Materials...
   ✅ Created material: Pure Silver (99.9%)
   ...

📦 Importing Collections...
   ✅ Created collection: Sacred Motifs Collection
   ...

🍴 Importing Products...
   ✅ Created product: Plain Silver Bowl - 25g (25g) → bowls
   ✅ Created product: Chombu Ashtalakshmi - 250g (250g) → chombu
   ...

📈 Import Summary:
==================
✅ categories: 16 items imported successfully
✅ materials: 3 items imported successfully
✅ collections: 8 items imported successfully
✅ products: 25 items imported successfully

🎯 Total Success: 67 items

🎉 All CSV data successfully imported to Sanity!
🎨 Next steps:
   1. Open Sanity Studio: npx sanity dev
   2. Upload product images
   3. Link images to products
   4. Publish your content
```

## 🎯 Next Steps

After successful import:
1. **Sanity Studio**: Open and verify all data
2. **Images**: Upload and link product images
3. **Website**: Your Next.js site will now display the imported products
4. **Customization**: Add more products or modify existing ones in Sanity Studio

---

🎉 **Ready to import your authentic South Indian silvercraft catalog!**