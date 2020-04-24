import { Game } from './games';

export interface CreateProfileRequest {
    username: string;
    // TODO
}

export interface Profile {
    username: string;
    balance: number;
    games: Game[];
    avatarLink: string;
    about: string;
}