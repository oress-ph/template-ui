import { environment } from "src/environments/environment";

export class AppSettings {
    public APIURLHost = environment.APIURLHost;
    public PalletWeightCapacity = 1000;
    public PalletVolumeCapacity = 1.2;
    public StagingRoomWeightCapacity = 100000;
    public StagingRoomVolumeCapacity = 120;

    // table list date format
    public date_list_format = 'dd MMM yyyy';
    public time_list_format ='hh:mm a'

    // p-calendar date format
    public date_detail_format_ts = 'dd MMM yyyy';
    public date_detail_format_html = "dd M yy";

    public date_time_detail_format_ts = 'dd MMM yyyy h:mm a';
    public date_time_detail_format_html = "dd MMM yyyy hh:mm a";

    // Laravel date format
    public date_format_laravel = 'yyyy-MM-dd';
    public time_format_laravel = 'hh:mm:ss';

    public company_logo: string = '../../../assets/images/logo/demo-logo.png';
    constructor() {
        let hostName = window.location.hostname;
        switch (hostName) {
            case 'berben-ui-demo.hiro-test.net':
                this.company_logo = '../../../assets/images/logo/logo/demo-logo.png';
                break;
            default:
                break;

        }
    }

    convertTime12to24 = (time12h:any) => {
        const [time, modifier] = time12h.split(' ');
        
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}`;
    }
    
    convertTime24to12 (time:any) {
        const time_part_array = time.split(":");
        let ampm = 'AM';
        if (time_part_array[0] >= 12) {
            ampm = 'PM';
        }
        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }
        const formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
        return formatted_time;
    }


}
