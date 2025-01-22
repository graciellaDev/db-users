export type apiUser = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export type apiDataUser = {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: apiUser[],
    support: {
        url: string,
        text: string
    }
}

export type apiResponse = {
    result: apiDataUser | null,
    error: string | null
}
