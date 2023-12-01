import { Component , OnInit} from '@angular/core';
import { TestService } from '../../services/test/test.service'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  constructor(private _dataService: TestService) {}


  ngOnInit() {
    this.getPeti();
  }

  getPeti(){
    this._dataService.getPosts().subscribe((data) => {
        console.log(data,'data')
    });
  }

}
