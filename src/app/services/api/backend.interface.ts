import { GamesResponse, GamesRequestParams, Game } from 'src/app/api-contracts/games';
import { Observable } from 'rxjs';
import { CreateProfileRequest, Profile } from 'src/app/api-contracts/profile';
import { AuthData } from 'src/app/api-contracts/auth-data';

export interface IBackendService {
    getGames(params?: GamesRequestParams): Promise<Observable<GamesResponse>>;
    signup(profile: CreateProfileRequest): Promise<Observable<AuthData>>;
    getProfile(): Promise<Observable<Profile>>;
    buyGame(game: Game): Promise<Observable<Profile>>;
    getGameById(id: number): Promise<Observable<Game>>;
    updateProfile(profile: Partial<Profile>): Promise<Observable<Profile>>;
    logout(): Promise<Observable<number>>;
}