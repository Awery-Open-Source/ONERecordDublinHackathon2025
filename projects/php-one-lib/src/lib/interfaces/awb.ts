export interface Piece {
    id?: number;
    awb_id?: number;
    one_record_id?: number;
    length: null | number;
    width: null | number;
    height: null | number;
    weight: null | number;
}

export interface Date {
    date: string,
    timezone_type: number,
    timezone: string
}

export interface Awb {
    id?: number;
    awb_no: null | string;
    weight: null | number;
    origin: string;
    destination: string;
    commodity_code: null | string;
    product_type_code: null | string;
    date_create?: Date;
    pieces: Piece[];
}
