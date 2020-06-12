import { Component, OnInit, DoCheck } from '@angular/core';
import { PrbService } from 'src/app/models/prb-service';
import { ServicesService } from 'src/app/services/services.service';
import { SupplierService} from 'src/app/services/supplier.service';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ServicesService]
})
export class SearchComponent implements OnInit, DoCheck {
  public code = '';
  public prService: PrbService[];
  public services: PrbService[];
  //public items: any[]
  
  items: SelectItem[];
  selectedItem: string;

  
  responsiveOptions;
  constructor(
    private serviceService: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    /**
     *  this.cars = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'}
  ];

     * 
     */
   
  this.responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
  
this.items=[]

   }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('search');
   // console.log('params', this.code)
    this.services = this.serviceService.getServices();
   // console.log('los servicios', this.services);

    this.services.forEach(element => {
        this.items.push({
            label: element.description,
            value: element.name
        });
    });
    console.log('los servicios', this.items);
  }

  ngDoCheck(): void {
    this.code = this.route.snapshot.paramMap.get('search');
   // console.log('params', this.code)
    this.services = this.serviceService.getServices();
   // console.log('los servicios', this.services);

  }

}
