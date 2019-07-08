import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {


  constructor(private _route: ActivatedRoute, private _router: Router,private blogHttpService: BlogHttpService,private toastr: ToastrService) {}

  public blogTitle:string;
  public blogBodyHtml:string;
  public blogDescription:string;
  public blogCategory:string;
  public possibleCategories=["Comedy","Drama","Action","Technology"];

  ngOnInit() {
  }

  public createBlog():any{
    let blogData ={
      title:this.blogTitle,
      description:this.blogDescription,
      blogBody:this.blogBodyHtml,
      category:this.blogCategory
    }
    this.blogHttpService.createBlog(blogData).subscribe(
      data => {
       console.log("Blog Created");
       this.toastr.success('Blog Posted Succesfully', 'Success!');
       setTimeout(()=>{
        this._router.navigate(['/blog',data.data.blogId]);
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

  resetCreateBlogForm(createBlogForm: NgForm) {
    createBlogForm.resetForm();
  }

}
