export interface Farm{
    owner: string;
    date: Date;
    location: string;
    variety: string;
    stage: string;
    schedule: any;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}
