import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePosts(title: string, content: string) {
        const postData: Post = { title: title, content: content};
        // Send Http request
    // console.log(postData);
        this.http.post(
            'https://angular-http-15d3c-default-rtdb.firebaseio.com/posts.json',
            postData).subscribe(responseData => {
                console.log(responseData);
         });
    }

    fetchPosts(){
        return this.http.get<{ [key: string]: Post }>('https://angular-http-15d3c-default-rtdb.firebaseio.com/posts.json')
        .pipe(
            map(responseData => {
            const postsArray: Post[] = [];
            for(const key in responseData){
                if(responseData.hasOwnProperty(key)) {
                    postsArray.push({...responseData[key], id: key});
                }
            }
            return postsArray;
        }),
        catchError(errorRes => {
            return throwError(errorRes);
        })
        );
        
    }

    deletePost() {
        return this.http.delete('https://angular-http-15d3c-default-rtdb.firebaseio.com/posts.json');
    }

} 