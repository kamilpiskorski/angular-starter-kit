// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Config
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  get<T>(endpoint: string, params: any = {}) {
    return this.httpClient.get<T>(`${environment.apiUrl}/${endpoint}`, {params});
  }

  post<T>(endpoint: string, body: any = {}) {
    return this.httpClient.post<T>(`${environment.apiUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string, params: any = {}) {
    return this.httpClient.delete<T>(`${environment.apiUrl}/${endpoint}`, {params});
  }
}