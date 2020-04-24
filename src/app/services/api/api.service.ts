import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  async get<TReqParams, TRes>(endpoint: string, params?: TReqParams): Promise<Observable<HttpResponse<TRes>>> {
    const baseUrl = environment.apiBaseUrl;
    const url = `${baseUrl}${endpoint}`;
    return this.http.get<TRes>(url, {
      params: this.getHttpParams(params),
      headers: await this.getHeaders(),
      observe: 'response',
    });
  }
  
  async post<TReq, TRes>(endpoint: string, body?: TReq, customHeaders?): Promise<Observable<HttpResponse<TRes>>> {
    const baseUrl = environment.apiBaseUrl;
    const url = `${baseUrl}${endpoint}`;
    return this.http.post<TRes>(url, body, {
      headers: await this.getHeaders(customHeaders),
      observe: 'response',
    });
  }

  async patch<TReq, TRes>(endpoint: string, body?: TReq, customHeaders?): Promise<Observable<HttpResponse<TRes>>> {
    const baseUrl = environment.apiBaseUrl;
    const url = `${baseUrl}${endpoint}`;
    return this.http.patch<TRes>(url, body, {
      headers: await this.getHeaders(customHeaders),
      observe: 'response',
    });
  }

  private async getHeaders(customHeaders?): Promise<HttpHeaders> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: await this.getAuthHeader(),
    };
    if (customHeaders) {
      for (const key in customHeaders) {
        if (customHeaders.hasOwnProperty(key)) {
          headers[key] = customHeaders[key];
        }
      }
    }
    return new HttpHeaders(headers);
  }

  private getHttpParams(params: { [index: string]: any } = {}): HttpParams {
    const httpParams: HttpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams.set(key, JSON.stringify(params[key]));
      }
    }
    return httpParams;
  }

  async getAuthHeader(): Promise<string> {
    // TODO
    return '';
  }
}
