export interface CustomerModel {
    id:number,
    user_id: number;
    group_id: number;
    customer_number: string;
    business_name: string;
    business_manager: string;
    name: string;
    sur_name: string;
    description: string;
    email: string;
    phone: string;
    phone_lang: string;
    phone_mobil: string;
    phone_mobil_lang: string;
    fax: string;
    fax_lang:string;
    tax:string;
    tax_number:string;
    iban:string;
    bic:string;
    sepa:string;
    status: number;
    userName: string;
    userMail: string;
    groupName: string;
    groupStatus: number;
    locations: any;
}
