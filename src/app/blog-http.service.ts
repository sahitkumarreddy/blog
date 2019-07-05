import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public currentBlog;
  public allBlogs;
  public baseUrl = "https://blogapp.edwisor.com/api/v1/blogs";
  private authToken="";

  constructor(private _http:HttpClient) { }

  public getAllBlogs(): any {
    return this._http.get(this.baseUrl+'/all?authToken='+this.authToken)
    .pipe(catchError(this.errorHandler));
  }

  public getSingleBlogInformation(currentBlogId): any {
   return this._http.get(this.baseUrl+'/view/'+currentBlogId+'?authToken='+this.authToken)
   .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message);
  }

}
