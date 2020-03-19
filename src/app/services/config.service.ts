import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public apiURL: string;
  constructor() { 
    // Do some loading of configuration here
    this.apiURL = "http://10.0.0.205:3000"
    //this.apiURL = "http://10.0.0.41:3000"
  }
}