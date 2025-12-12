import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="content">
      <h2>Unauthorized</h2>
      <p>You do not have access to this area.</p>
    </div>
  `,
})
export class UnauthorizedComponent {}
