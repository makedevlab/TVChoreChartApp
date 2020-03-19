import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child } from '../interfaces/child.interface';
import { Chore } from '../interfaces/chore.interface';
import { ConfigService } from './config.service';
import { core } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  constructor(public http: HttpClient,
    public configService: ConfigService) { }

  async getAll() {
    let childrenRequest: Observable<any> = this.http.get<Array<Child>>(this.configService.apiURL + "/children.json");

    return new Promise<Array<Child>>((resolve, reject) => {
      childrenRequest.subscribe(data => {
        let children: Array<Child> = [];
      
        data.forEach((child: Child) => {
          if (child.photo_url)
            child.photo_url = this.configService.apiURL + child.photo_url;
          
          child.chores.forEach((chore: Chore) => {
            chore.completeInUi = chore.complete;
            if (chore.task.thumbnail_url)
              chore.task.thumbnail_url = this.configService.apiURL + chore.task.thumbnail_url;
          });

          children.push(child);
        });

        resolve(children);
      });
    });
  }

  async get(id: number) {
    let request: Observable<any> = this.http.get<Child>(this.configService.apiURL + "/children/" + id + ".json");

    return new Promise<Child>((resolve, reject) => {
      request.subscribe((child: Child) => {
        resolve(child);
      })
    });
  }

  async create(child: Child) {
    let request: Observable<any> = this.http.post<any>(this.configService.apiURL + "/children.json", { child: child });

    return new Promise<any>((resolve, reject) => {
      request.subscribe((data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      });
    });
  }

  async delete(child: Child) {
    let request: Observable<any> = this.http.delete<any>(this.configService.apiURL + "/children/" + child.id + ".json");

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
