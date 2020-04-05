import { GamesResponse, GamesRequestParams } from 'src/app/api-contracts/games';
import { Observable } from 'rxjs';
import { CreateProfileRequest, ProfileResponse } from 'src/app/api-contracts/profile';
import { AuthData } from 'src/app/api-contracts/auth-data';

export interface IBackendService {
    getGames(params?: GamesRequestParams): Promise<Observable<GamesResponse>>;
    signup(profile: CreateProfileRequest): Promise<Observable<AuthData>>;
    getProfile(): Promise<Observable<ProfileResponse>>;
}