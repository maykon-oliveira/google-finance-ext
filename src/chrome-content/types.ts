export interface DOMMessage {
    action: "GET_DOM";
}

export interface DOMActive {
    name: string;
    price: number;
    color: string;
}

export interface Active {
    name: string;
    color: string;
    low: number;
    currentPrice: number;
    hight: number;
    tracking: boolean;
    reachedOut: boolean;
}

export const SCHEDULER_NAME = "GF_SCHEDULER_UPDATE";