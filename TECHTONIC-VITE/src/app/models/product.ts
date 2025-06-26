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

export interface AdminFilter {
  id: number;
  filterName: string;
  filterSlug: string;
  values: Value[];
}


export interface Value {
  id: number
  value: string
}

export interface ProductCardPageResult {
  paginationData: PaginationData
  productCardDtos: ProductCardType[]
}

export type PaginationData = {
  totalCount: number
  start: number
  end: number
  pageSize: number
  currentPage: number
  totalPageNumber: number
}

export type TotalFilterDto = {
  priceRangeDto: PriceRangeDto
  filterDtos: Filter[]
}

export interface PriceRangeDto {
  minPrice: number
  maxPrice: number
}

export interface AdminProductCardType extends ProductCardType {
  stockQuantity: number;
  unitsSold: number;
}

export interface AdminProductCardPageResult {
  paginationData: PaginationData;
  productCardDtos: AdminProductCardType[];
}
export interface AdminProductReviewResponse {
  data: AdminProductReview[];
  totalCount: number;
}

export interface AdminProductReview {
  id: number;
  productId: number;
  reviewerName: string;
  comment: string;
  rating: number;
  createdAt: string; // ISO 8601 string (e.g., "2023-10-27T10:00:00Z")
}
export interface ProductReviewDto {
  comment: string;
  rating: number;
}