
export interface Image {
    id: string;
    urls: {
        small: string,
        regular: string
    };
    description: string;
    alt_description: string;
}

export interface ResponseObject {
    results: Image[];
    total_pages: number;
}

export interface RequestBody {
    page: number;
    query: string;
    perPage: number;
}