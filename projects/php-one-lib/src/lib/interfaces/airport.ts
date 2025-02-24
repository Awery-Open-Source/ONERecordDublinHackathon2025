export interface Airport {
    id: number;
    hub_city_id: number;
    hub_city: string | null;
    iata: string;
    fake_iata: string;
    icao: string;
    city: string;
    latitude: number;
    longitude: number;
    airport_name: string;
    port_type: string;
    gmt: string;
    timezone: string;
    runway_ft: number;
    country_id: number;
    inactive: number;
    country_name: string;
    country_code: string;
    country_region: string;
    tarmac: string | null;
    opening_hours: string | null;
    label: string;
}
