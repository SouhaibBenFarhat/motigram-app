import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Converters } from '../../utility/converters';
import { AuthService } from '../auth-service/auth.service';


@Injectable()
export class UploadService {

  headers;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.converter = new Converters();
    this.global = new Globals();
  }



  uploadPostThumbnail(file: File): any {
    let formData: FormData = new FormData();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });

    return new Promise((resolve, reject) => {
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', this.global.urls['upload'], formData, { headers: this.headers, reportProgress: true });
      this.http.request(req).subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * data.loaded / data.total);
          console.log(`File is ${percentDone}% uploaded.`);
        }
        else if (data instanceof HttpResponse) {
          resolve(data);
        }
      }, (err) => {
        reject(err);
      });

    })
  }

}
