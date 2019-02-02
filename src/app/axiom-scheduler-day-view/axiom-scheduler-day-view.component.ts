import { AxiomSchedulerComponentCommon } from './../axiom-scheduler/axiom-scheduler.component';
import { Component, OnInit, Input, ViewEncapsulation, Renderer2, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import * as moment from 'moment';

export class AxiomSchedulerHour{
  start : moment.Moment;
  end : moment.Moment;
  constructor(start : moment.Moment){
    this.start = start;
    this.end  = this.start.clone().add('hours',1);
  }
}

@Component({
  selector: '[ax-scheduler-day-view]',
  templateUrl: './axiom-scheduler-day-view.component.html',
  styleUrls: ['./axiom-scheduler-day-view.component.scss'],
  encapsulation : ViewEncapsulation.None,
  host:{
    'class' : 'ax-scheduler__day-view'
  }
})
export class AxiomSchedulerDayViewComponent extends AxiomSchedulerComponentCommon implements OnInit,AfterViewInit {
  
  @Input() date : moment.Moment;
  public hours : AxiomSchedulerHour[];

  constructor(private _renderer : Renderer2,private _element : ElementRef) { 
    super();
  }

  ngOnInit() {
    this.date = this.date || moment(Date.now());
    this.setHours();
  }

  ngAfterViewInit(): void {

  }

  private setHours() : void {
    this.hours = [];
    for (let hour = 0; hour <= 23; hour++) {
      this.hours.push(new AxiomSchedulerHour(this.date.clone().startOf('day').add(hour,'hours')));
    }
  }

}
