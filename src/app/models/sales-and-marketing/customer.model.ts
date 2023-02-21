export class CustomerModel {
  id: number = 0;
  code: string = '';
  customer: string = '';
  customer_type: string = '';
  address: string = '';
  status: string = '';
  remarks: string = '';
  city: string = '';
  province: string = '';
  country: string = '';
  zip_code: string = '';
  nature_of_business: string = '';
  tin: string = '';
  terms: string = '';
  customer_material?:any;
  customer_contact?:any;
}
