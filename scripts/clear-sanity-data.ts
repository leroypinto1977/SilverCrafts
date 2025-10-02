import { config } from 'dotenv'
import { createClient } from '@sanity/client'

// Load environment variables
config()

console.log('🔍 Checking environment variables:')
console.log('PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('TOKEN present:', !!process.env.SANITY_API_TOKEN)

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2025-09-29',
})

async function clearDocuments(type: string, name: string, icon: string) {
  console.log(`${icon} Clearing ${name}...`)
  try {
    // Debug: Let's see what draft documents exist
    if (type === 'product') {
      const allDrafts = await client.fetch(`*[_id match "drafts.**"]{ _id, _type }`)
      console.log(`   🔍 All draft documents found:`, allDrafts)
    }
    
    // Fetch all documents of this type (both published and drafts)
    const publishedDocs = await client.fetch(`*[_type == "${type}" && !(_id match "drafts.**")]`)
    const draftDocs = await client.fetch(`*[_type == "${type}" && _id match "drafts.**"]`)
    
    const totalDocs = publishedDocs.length + draftDocs.length
    console.log(`   Found ${totalDocs} ${name} to delete (${publishedDocs.length} published, ${draftDocs.length} drafts)`)
    
    if (totalDocs === 0) return

    // Delete all documents (both published and drafts) in batches
    const transaction = client.transaction()
    
    // Delete published documents
    publishedDocs.forEach((doc: any) => {
      transaction.delete(doc._id)
    })
    
    // Delete draft documents
    draftDocs.forEach((doc: any) => {
      transaction.delete(doc._id)
    })
    
    await transaction.commit()
    console.log(`   ✅ Deleted ${totalDocs} ${name}`)
  } catch (error) {
    console.error(`   ❌ Error clearing ${name}:`, error)
    throw error
  }
}

async function clearAllData() {
  console.log('🗑️  Starting data cleanup...')
  console.log('=====================================\n')

  try {
    // Clear products first (they have references to other documents)
    await clearDocuments('product', 'products', '🍴')
    
    // Clear collections
    await clearDocuments('collection', 'collections', '📦')
    
    // Clear materials
    await clearDocuments('material', 'materials', '🧱')
    
    // Clear categories
    await clearDocuments('category', 'categories', '🗂️')

    console.log('\n📈 Cleanup Summary:')
    console.log('==================')
    console.log('✅ All data cleared successfully!')
    console.log('🎯 Ready for fresh data import')

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    process.exit(1)
  }
}

// Run the cleanup
clearAllData()