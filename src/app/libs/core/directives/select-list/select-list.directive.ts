// Angular
import { ContentChildren, Directive, QueryList } from '@angular/core';
// Models
import { SelectList } from '../../models';
// Directives
import { SelectOptionDirective } from '../select-option';

@Directive({
  selector: '[appSelectList]'
})
export class SelectListDirective extends SelectList {

  @ContentChildren(SelectOptionDirective)
  public optionList: QueryList<SelectOptionDirective>;

  constructor() {
    super();
  }
}
