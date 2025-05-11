import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  templateUrl: './textarea-field.component.html',
  styleUrl: './textarea-field.component.scss'
})
export class TextareaFieldComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() maxlength?: number;
  @Input() rows: number = 3;
  @Input() value?: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.valueChange.emit(textarea.value);
  }
}
