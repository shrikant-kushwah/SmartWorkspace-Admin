import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface MenuItem {
  label: string;
  path: string;
  roles?: string[];
}

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout">
      <aside class="sidebar">
        <h3>SmartWorkspace</h3>
        <nav>
          <a *ngFor="let item of menu" [routerLink]="item.path">{{
            item.label
          }}</a>
        </nav>
        <button class="secondary" (click)="logout.emit()">Logout</button>
      </aside>
      <main class="content">
        <ng-content></ng-content>
      </main>
    </div>
  `,
})
export class LayoutComponent {
  @Input() menu: MenuItem[] = [];
  @Output() logout = new EventEmitter<void>();
}
