import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/dashboard">
       <h1 class="text-white text-center" style="font-size: 16px;">ROSALES Y ASOCIADOS</h1>
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
