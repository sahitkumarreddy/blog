import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public currentBlog;
  //dummy data
  public allBlogs = [
    {
      "blogId": "1",
      "user": {
        "id": "23143",
        "name": "Jimmy",
        "username": "Jimmy"
      },
      "title": "Being me",
      "description": "How to be a president",
      "created": "2019-03-17T03:53:36Z",
      "modified": "2019-03-20T03:53:36Z",
      "published": true,
      "tags": ["president", "usa", "john", "quincy", "adams"]
    },
    {
      "blogId": "2",
      "user": {
        "id": "23144",
        "name": "Carter",
        "username": "Carter"
      },
      "title": "Being",
      "description": "How to be a Carter",
      "created": "2019-03-17T03:53:36Z",
      "modified": "2019-03-20T03:53:36Z",
      "published": true,
      "tags": ["Carter", "usa", "john", "adams"]
    },
  ];


  constructor() { }

  public getAllBlogs(): any {
    return this.allBlogs;
  }

  public getSingleBlogInformation(currentBlogId): any {

    for (let blog of this.allBlogs) {
      if (blog.blogId === currentBlogId) {
        this.currentBlog = blog;
      }
    }
    return this.currentBlog;
  }

 
}
