import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers:[Location]
})
export class BlogViewComponent implements OnInit {

  public currentBlog;
  constructor(private _route: ActivatedRoute, private _router: Router,private blogHttpService:BlogHttpService,private toastr: ToastrService,private location:Location) { }

  ngOnInit() {
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        this.currentBlog = data["data"];
        console.log(data);
      },
      error => {
        console.log(error.errorMessage);
      }
    );
  }

  deleteThisBlog():any{
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data => {
       console.log("Blog Deleted");
       this.toastr.success('Blog Deleted Succesfully', 'Deleted!');
       setTimeout(()=>{
        this._router.navigate(['/home']);
       },1000)
      },
      error => {
        console.log(error.errorMessage);
        this.toastr.error('Something Went Wrong', 'Error', {
          timeOut: 2000
        });
      }
    );
  }

  public goBackToPreviousPage():any{
    this.location.back();
  }
}
