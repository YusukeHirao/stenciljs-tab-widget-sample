import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'c-tabpanel',
  styleUrl: 'c-tabpanel.css',
  shadow: false,
})
export class CTabpanel {
  @Prop({ mutable: true, reflect: true }) tabId: string;
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  render() {
    return (
      <Host>
        <div
          role="tabpanel"
          id={`${this.tabId}-panel`}
          aria-labelledby={this.tabId}
          aria-hidden={`${!this.selected}`}
          tabIndex={0}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
