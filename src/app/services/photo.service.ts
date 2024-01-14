import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { Photo } from '../models/photo';
import { ImageCreateDto } from '../dtos/image-create-dto';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService<Photo>{

  override path: string='photos';
  override create(entity: ImageCreateDto): Observable<Response> {
    return this.getHttpClient.post<Response>(environment.getApiUrl("/photos/create"),entity)
  }
}
