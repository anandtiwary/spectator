import { Component } from '@angular/core';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';

import { AutoFocusDirective } from './auto-focus.directive';

@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  isFocused = false;
}

describe('DatoAutoFocusDirective', function() {
  let host: SpectatorWithHost<AutoFocusDirective, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: AutoFocusDirective,
    host: CustomHostComponent
  });

  it('should be focused', () => {
    host = createHost(`<input datoAutoFocus="true">`);
    const instance = host.queryHost(AutoFocusDirective);
    expect(host.element).toBeFocused();
  });

  it('should NOT be focused', () => {
    host = createHost(`<input [datoAutoFocus]="false">`);
    expect(host.element).not.toBeFocused();
  });

  it('should work with dynamic input', () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);
    expect(host.element).not.toBeFocused();
    host.setHostInput({ isFocused: true });
    expect(host.element).toBeFocused();
  });

  it('should be able to type in input', () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);

    host.typeInElement('foo');
    expect(host.element).toHaveValue('foo');
  });
});
