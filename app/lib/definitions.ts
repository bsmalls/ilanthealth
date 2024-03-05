export type Book = {
    id: string
    selfLink: string
    volumeInfo: VolumeInfo
}

export type VolumeInfo = {
    authors?: string[]
    categories?: string[]
    description?: string
    imageLinks?: ImageLinks
    language?: string
    mainCategory?: string
    pageCount?: number
    publishedDate?: string
    publisher?: string
    title?: string
}

export type ImageLinks = {
    smallThumbnail?: string
    thumbnail?: string
}

export type BookSearchResults = {
    items?: Book[];
    totalItems: number;
}