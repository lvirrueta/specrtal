export interface tokenInterface {
    aud: string;
    email: string;
    exp: number;
    fullName: string;
    iat: number;
    id: number;
    role: {
        id: number;
        name: string;
    }
}

export interface tokensInterface {
    token: string;
    tokenDecrypt: tokenInterface;
}

export interface authInfo {
    token: string;
}

export interface sessionType {
    persistent: boolean
}
