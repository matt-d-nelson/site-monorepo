export interface AlbumTrack {
    id: string,
    name: string,
    lyrics?: string
    audioUrl: string
    audioId: string
    trackPlacement: number
}

export interface Album {
    id: string,
    isDraft: boolean,
    name: string,
    description: string
    coverArtUrl: string
    coverArtId: string
    releaseDate: string
    tracks: AlbumTrack[]
}