import { GamesResponse } from 'src/app/api-contracts/game';
import { Observable } from 'rxjs';

export interface IBackendService {
    getGames(): Promise<Observable<GamesResponse>>
}