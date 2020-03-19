import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chore } from '../interfaces/chore.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {
  constructor(public http: HttpClient,
    public configService: ConfigService) { }

  async allForChild(childId: number) {
    let request: Observable<any> = this.http.get(this.configService.apiURL + "/children/" + childId + "/chores.json");

    return new Promise<Array<Chore>>((resolve, reject) => {
      request.subscribe((chores: Array<Chore>) => {
        resolve(chores);
      });
    })
  }

  async toggleComplete(id: number, complete: boolean): Promise<void> {
    let choreRequest: Observable<any> = this.http.put(this.configService.apiURL + "/chores/" + id + "/toggle_complete.json", { chore: { complete: complete } });
    
    return new Promise<void>((resolve, reject) => {
      choreRequest.subscribe(data => {
        resolve();
      },
      error => {
        console.log(error);
        reject();
      }); 
    });
  }

  async create(chore: Chore) {
    let request: Observable<any> = this.http.post<any>(this.configService.apiURL + "/chores.json", { chore: chore });

    return new Promise<any>((resolve, reject) => {
      request.subscribe((data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      });
    });
  }

  async delete(choreId: number) {
    let request: Observable<any> = this.http.delete<any>(this.configService.apiURL + "/chores/" + choreId + ".json");

    return new Promise<any>((resolve, reject) => {
      request.subscribe((data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      });
    })
  }

}
