// Directives
import { IfMobileDirective } from './if-mobile.directive';

describe('IfMobileDirective', () => {
  it('should create an instance', () => {
    const directive = new IfMobileDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
