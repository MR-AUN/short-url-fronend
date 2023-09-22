interface ShorterPayload {
    long_url: string
}

interface ShorterResponse {
    short_id: string;
    long_url: string
    shorter_url: string
    view_count: number
    createdAt: string
}