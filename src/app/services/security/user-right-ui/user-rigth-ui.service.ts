import { Injectable } from '@angular/core';
import { UserRightModel } from 'src/app/models/administration/user-right.model';

@Injectable({
  providedIn: 'root'
})
export class UserRigthUiService {

  constructor() { }

  public pageRight(module: string): any {

    let user_rigths = localStorage.getItem('user_rigths');
    if (user_rigths != null) {

      let _rights: UserRightModel = new UserRightModel();
      let data = JSON.parse(user_rigths);
      for (var i = 0; i < data.length; i++) {
        if (data[i].system_module.system_module === module) {

          _rights = data[i];
          break;
        }
      }

      return _rights.id == 0 ? null : _rights;
    }

    return null;
  }

  public pageModules(): UserRightModel[] {

    let user_rigths = localStorage.getItem('user_rigths');

    if (user_rigths != null) {

      let _rights: UserRightModel[] = [];
      let data = JSON.parse(user_rigths);
      for (var i = 0; i < data.length; i++) {
        if (data[i].system_module.system_module.includes('Detail') == false) _rights.push(data[i]);
      }

      return _rights;
    }

    return [];
  }
}
