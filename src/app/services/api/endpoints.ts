export class Endpoints {
    static games(): string {
        return 'games';
    }

    static signup(): string {
        return 'signup';
    }

    static profile(): string {
        return 'profile';
    }

    static buyGame(gameId: number) {
        return `buy/game/${gameId}`
    }
}