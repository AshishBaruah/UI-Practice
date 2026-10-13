import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly isMenuOpen = signal(false);

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('firstMenuLink') private firstMenuLink?: ElementRef<HTMLAnchorElement>;
  @ViewChild('lastMenuLink') private lastMenuLink?: ElementRef<HTMLAnchorElement>;

  protected toggleMenu(): void {
    if (this.isMenuOpen()) {
      this.closeMenu(false);
      return;
    }

    this.isMenuOpen.set(true);
    setTimeout(() => this.firstMenuLink?.nativeElement.focus());
  }

  protected closeMenu(restoreFocus = true): void {
    this.isMenuOpen.set(false);

    if (restoreFocus) {
      setTimeout(() => this.menuToggle?.nativeElement.focus());
    }
  }

  protected trapMenuFocus(event: Event, boundary: 'first' | 'last'): void {
    const keyboardEvent = event as KeyboardEvent;
    const firstLink = this.firstMenuLink?.nativeElement;
    const lastLink = this.lastMenuLink?.nativeElement;
    if (!firstLink || !lastLink) return;

    if (boundary === 'first' && keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      lastLink.focus();
    } else if (boundary === 'last' && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      firstLink.focus();
    }
  }
}
