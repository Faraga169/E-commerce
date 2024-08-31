import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NgxSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
   
    this.spinner.show();

    setTimeout(() => {
      
      this.spinner.hide();
    }, 5000);
  }

}
