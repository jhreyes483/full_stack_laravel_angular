import { Component, Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
@Input() posts    : any;
@Input() identity : any;
@Input() url      : any;
@Output() param_post_id= new EventEmitter<any>();


deletePost(data: any) {
  this.param_post_id.emit(data);
}
}

/**
Uso en HTML

 <app-post-list 
 [posts]   ="posts"
 [identity]="identity"
 [url]     ="url"
 (param_post_id)="deletePost($event)"
 >

 </app-post-list>


 */


