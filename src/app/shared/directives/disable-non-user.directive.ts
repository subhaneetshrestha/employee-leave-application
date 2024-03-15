import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Leave, UserLeave } from '../../pages/leave/types/leave.types';

@Directive({
  standalone: true,
  selector: '[disableField]',
})
export class DisableNonUserDirective implements OnInit {
  @Input({ required: true }) comparisonData!: Leave;
  @Input() user: UserLeave | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.comparisonData.employeeId !== this.user?.employeeId) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    }
  }
}
