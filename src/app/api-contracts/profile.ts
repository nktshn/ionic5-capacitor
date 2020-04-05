import { Game } from './games';

export interface CreateProfileRequest {
    username: string;
    // TODO
}

export interface ProfileResponse {
    username: string;
    balance: number;
    games: Game[]
}