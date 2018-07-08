export interface CustomerModel {
    user_id: number;
    group_id: number;
    customer_number: string;
    name: string;
    sur_name: string;
    description: string;
    email: string;
    phone: string;
    phone_mobil: string;
    fax: string;
    adr_address: string;
    adr_city: string;
    adr_country: string;
    adr_lat: number;
    adr_lng: number;
    adr_locality: string;
    adr_place_id: string;
    adr_postal_code: string;
    adr_route: string;
    adr_street_number: string;
    status: number;
    userName: string;
    userMail: string;
    groupName: string;
    groupStatus: number;
}
