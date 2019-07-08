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
  private authToken = "OGZiMGE4NTEzMzI0NDg5MDJmNTgxMDI3YzhkMzEzOTRjZWZiYzMxZmQyNTZiMzFiZmRiOTcxOWE4NWZjZDE5Zjg0ZTExYTQ3ZTAzNGUyNjAwM2M3NDQzYjk0YzczNjNjYzU4NGJmNmZjNTg4MmU5NTFjZmU4YThlYjYwZTg4NmMxZWE5";

  constructor(private _http: HttpClient) { }

  public getAllBlogs(): any {
    return this._http.get(this.baseUrl + '/all?authToken=' + this.authToken)
      .pipe(catchError(this.errorHandler));
  }

  public getSingleBlogInformation(currentBlogId): any {
    return this._http.get(this.baseUrl + '/view/' + currentBlogId + '?authToken=' + this.authToken)
      .pipe(catchError(this.errorHandler));
  }

  public editBlog(blogId, blogData): any {
    return this._http.put(this.baseUrl +'/'+ blogId + '/edit?authToken=' + this.authToken, blogData)
      .pipe(catchError(this.errorHandler));
  }
  public createBlog(blogData): any {
    return this._http.post(this.baseUrl + '/create?authToken=' + this.authToken, blogData)
      .pipe(catchError(this.errorHandler));
  }

  public deleteBlog(blogId): any {
    let data={};
    return this._http.post(this.baseUrl +'/'+ blogId + '/delete?authToken=' + this.authToken, data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message);
  }

}
