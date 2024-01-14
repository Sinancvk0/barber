import { Component, OnInit } from '@angular/core';
import { Photo } from '../../../models/photo';
import { PhotoService } from '../../../services/photo.service';
import { ImageCreateDto } from '../../../dtos/image-create-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxDropzoneModule,FormsModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent implements OnInit {
  photos:Photo[]=[]
  isShowGallery:boolean=false;
  isShowSlider:boolean=false;
  files: File[] = [];
  removedCount=0;

  constructor(private photoService:PhotoService){}
  onSelect(event:any) {
    this.removedCount=0;
    let files:File[]=event.addedFiles;
    files.forEach(file=>{
      let fileReader=new FileReader();
      fileReader.onloadend=()=>{
        let base64=fileReader.result as string;
        let index=this.files.length;
        this.files.push(file);
        let imageCreateDto:ImageCreateDto={
          imageBase64:base64,
          isResize:true,
          isShowGallery:this.isShowGallery,
          isShowSlider:this.isShowSlider
        }
        this.photoService.create(imageCreateDto).subscribe(result=>{
          this.files.splice(index-this.removedCount, 1);
          this.removedCount++
          if(files.length==this.removedCount){
            this.getList();
          }
        })

      };
      fileReader.readAsDataURL(file);
    })
  }

  ngOnInit(): void {
    this.getList();
  }


  getList(){
    this.photoService.getAll().subscribe(result=>{
      this.photos=result.data;
    });
  }
  deletePhotoById(id:number){
    this.photoService.deleteById(id).subscribe(result=>{
      this.getList();
    })
  }
}