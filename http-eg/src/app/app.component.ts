import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorStatus = '';
  errorStatusMsg= '';

  constructor(private http: HttpClient, private postsService: PostsService) {}
  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },error => {
      this.error = error.message;
      this.errorStatus = error.status;
      this.errorStatusMsg = error.statusText;
    });
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },error => {
      this.error = error.message;
      this.errorStatus = error.status;
      this.errorStatusMsg = error.statusText;
    });
    
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }
}
