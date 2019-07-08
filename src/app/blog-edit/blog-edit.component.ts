import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories=["Comedy","Drama","Action","Technology"];

  constructor(private _route: ActivatedRoute, private _router: Router,private blogHttpService: BlogHttpService,private toastr: ToastrService) {}
  
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

  editThisBlog():any{
    this.blogHttpService.editBlog(this.currentBlog.blogId,this.currentBlog).subscribe(
      data => {
       console.log("Blog Created");
       this.toastr.success('Blog Edited Succesfully', 'Success!');
       setTimeout(()=>{
        this._router.navigate(['/blog',this.currentBlog.blogId]);
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

  cancelEditBlogForm() {
    this._router.navigate(['/blog',this.currentBlog.blogId]);
  }

}
