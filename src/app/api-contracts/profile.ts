import { Game } from './games';

export interface CreateProfileRequest {
    nickname: string;
    // TODO
}

export interface ProfileResponse {
    nickname: string;
    balance: number;
    games: Game[]
}