export class TruckArrivalPluginModel {
  id: number = 0;
  ta_id: number = 0;
  slip_number: number = 0;
  plugin_station_id: number = 0;
  plugin_station: string = '';
  plugin_time: any = new Date();
  plugout_time: any = '';
  truckout_time: any = '';
  total_number_of_hours: any;
  temperature: string = '';
  startup_temperature: string = '';
  reefer_technician: string = '';
  remarks: string = '';
  status: string = '';
}
