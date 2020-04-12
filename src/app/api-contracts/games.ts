export interface GamesResponse {
    games: Game[]
    amount: number;
}

export interface Game {
    id: number;
    title: string;
    description: string;
    coverUrl: string;
    price: number;
    distributor: string;
    rating: number;
    releaseDate: number; // unix timestamp
}

export interface GamesRequestParams {

}