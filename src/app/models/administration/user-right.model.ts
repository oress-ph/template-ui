export class UserRightModel {
  id: number = 0;
  user_id: number = 0;
  system_module_id: number = 0;
  system_module: any;
  can_add: boolean = false;
  can_save: boolean = false;
  can_edit: boolean = false;
  can_delete: boolean = false;
  can_print: boolean = false;
  can_lock: boolean = false;
  can_unlock: boolean = false;
}
