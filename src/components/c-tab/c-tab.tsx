import { Component, Host, h, Prop, EventEmitter, Event, Method, State, Element } from '@stencil/core';

@Component({
  tag: 'c-tab',
  styleUrl: 'c-tab.css',
  shadow: false,
})
export class CTab {
  @Prop({ mutable: true, reflect: true }) tabId: string;
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  @Element() el: HTMLElement;

  @Event({
    eventName: 'selecttab',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  selectTab: EventEmitter;

  @Event({
    eventName: 'selectprevtab',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  selectPrevTab: EventEmitter;

  @Event({
    eventName: 'selectnexttab',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  selectNextTab: EventEmitter;

  @State() fromSelectAndFocus = false;

  @Method()
  async selectAndFocus() {
    this.selected = true;
    this.fromSelectAndFocus = true;
  }

  componentDidUpdate() {
    if (this.selected && this.fromSelectAndFocus) {
      this.el.querySelector('button').focus({ preventScroll: true });
      this.fromSelectAndFocus = false;
    }
  }

  onKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft': {
        this.selectPrevTab.emit();
        e.preventDefault();
        break;
      }
      case 'ArrowRight': {
        this.selectNextTab.emit();
        e.preventDefault();
        break;
      }
    }
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        // Stop the cursor browsing
        e.preventDefault();
        break;
      }
    }
  }

  render() {
    return (
      <Host role="presentation">
        <button
          type="button"
          role="tab"
          id={this.tabId}
          aria-selected={`${this.selected}`}
          aria-controls={`${this.tabId}-panel`}
          tabIndex={this.selected ? 0 : -1}
          onClick={this.selectTab.emit}
          onKeyUp={e => this.onKeyUp(e)}
          onKeyDown={e => this.onKeyDown(e)}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
