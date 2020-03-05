// Directives
import { DropdownDirective } from './menu.directive';

describe('MenuDirective', () => {
  it('should create an instance', () => {
    const directive = new DropdownDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
