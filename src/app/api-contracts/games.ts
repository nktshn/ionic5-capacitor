export interface GamesResponse {
    games: Game[]
    amount: number;
}

export interface Game {
    gameId: number;
    title: string;
    description: string;
    coverUrl: string;
    price: number;
    distributor: string;
    rating: number;
}

export interface GamesRequestParams {
    
}