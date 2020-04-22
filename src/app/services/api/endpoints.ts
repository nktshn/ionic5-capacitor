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

    static buyGame(id: number) {
        return `buy/game/${id}`
    }

    static gameById(id: number) {
        return `game/${id}`
    }
}