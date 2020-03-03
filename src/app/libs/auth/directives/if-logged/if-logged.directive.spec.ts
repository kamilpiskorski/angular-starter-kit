// Directives
import { IfLoggedDirective } from './if-logged.directive';

describe('IfLoggedDirective', () => {
  it('should create an instance', () => {
    const directive = new IfLoggedDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
