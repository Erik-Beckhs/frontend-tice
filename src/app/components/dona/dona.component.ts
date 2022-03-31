import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{
  
  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = ['valor1', 'valor2', 'valor3', 'valor4'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100, 25],
  ];

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6','#009FEE','#F02059' ] }
  ];

}
