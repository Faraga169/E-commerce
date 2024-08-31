export interface subcategoriesres {
    results: number
    metadata: Metadata
    data: subcategories[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
  }
  
  export interface subcategories {
    _id: string
    name: string
    slug: string
    category: string
    createdAt: string
    updatedAt: string
  }
  