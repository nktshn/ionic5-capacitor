import { GamesResponse, GamesRequestParams } from 'src/app/api-contracts/games';
import { Observable } from 'rxjs';

export interface IBackendService {
    getGames(params?: GamesRequestParams): Promise<Observable<GamesResponse>>
}