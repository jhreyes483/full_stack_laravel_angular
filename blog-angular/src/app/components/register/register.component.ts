import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 componentename : string ='register';
}
