import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(public http: HttpClient, 
    public configService: ConfigService) { }

  async getAll() {
    let taskRequest: Observable<any> = this.http.get<Array<Task>>(this.configService.apiURL + "/tasks.json");

    return new Promise<Array<Task>>((resolve, reject) => {
      taskRequest.subscribe((tasksFromServer: Array<Task>) => {
        let tasks : Array<Task> = [];

        tasksFromServer.forEach((task: Task) => {
          if (task.thumbnail_url)
            task.thumbnail_url = this.configService.apiURL + task.thumbnail_url;
          tasks.push(task);
        });

        resolve(tasks);
      });
    });
  }

  async get(id: number) {
    let request: Observable<any> = this.http.get<any>(this.configService.apiURL + "/tasks/" + id + ".json");

    return new Promise<any>((resolve, reject) => {
      request.subscribe((data: Task) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      });
    })
  }

  async create(task: Task) {
    let request: Observable<any> = this.http.post<any>(this.configService.apiURL + "/tasks.json", { task: task });

    return new Promise<any>((resolve, reject) => {
      request.subscribe((data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      });
    });
  }

  async update(task: Task) {
    let request: Observable<any> = this.http.patch<any>(this.configService.apiURL + "/tasks/" + task.id + ".json", { task: task });

    return new Promise<any>((resolve, reject) => {
      request.subscribe((data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      });
    });
  }

  async delete(task: Task) {
    let request: Observable<any> = this.http.delete<any>(this.configService.apiURL + "/tasks/" + task.id + ".json");

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