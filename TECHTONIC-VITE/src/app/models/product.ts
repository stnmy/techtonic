export interface ProductDetailsType {
    id: number
    name: string
    slug: string
    description: string
    price: number
    discountPrice?: number
    brandName: string
    categoryName: string
    subCategoryName: string
    isFeatured: boolean
    isDealOfTheDay: boolean
    stockQuantity: number
    createdAt: string
    images: string[]
    attributes: Attribute[]
    reviews: Review[]
    questions: Question[]
    visitCount: number
  }


  export interface ProductCardType {
    id: number
    name: string
    slug: string
    price: number
    discountPrice?: number
    image: string
    attributes: Attribute[]
  }
  
  export interface Attribute {
    name: string
    value: string
    specificationCategory: string
  }
  
  export interface Review {
    reviewerName: string
    comment: string
    rating: number
    createdAt: string
  }
  
  export interface Question {
    questionText: string
    answer: string
    createdAt: string
  }
  
  export interface RelatedProduct {
    id: number
    name: string
    slug: string
    price: number
    discountPrice?: number
    image: string
  }

  export interface ProductDetailsApiResponse {
  product: ProductDetailsType;
  relatedProducts: RelatedProduct[];
}


  export interface Filter {
    filterName: string
    filterSlug: string
    values: Value[]
  }
  
  export interface Value {
    id: number
    value: string
  }