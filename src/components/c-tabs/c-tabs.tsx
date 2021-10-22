import { Component, Host, Element, State, h, Prop, Listen } from '@stencil/core';
import { loopAt, uid } from '../../utils/utils';

@Component({
  tag: 'c-tabs',
  shadow: false,
})
export class CTabs {
  @Prop() label: string;
  @Prop() selectedIndex = '0';

  @Element() el: HTMLElement;
  @State() tabList: HTMLCTabElement[] = [];

  @Listen('selecttab')
  selectTabHandler(e: CustomEvent) {
    this.tabList.forEach(tab => {
      tab.selected = false;
    });
    const tab = e.target as HTMLCTabElement;
    tab.selected = true;
    this.changePanel();
  }

  @Listen('selectprevtab')
  async selectPrevTabHandler(e: CustomEvent) {
    const tab = e.target as HTMLCTabElement;
    const i = this.tabList.findIndex(t => t.tabId === tab.tabId);
    if (i === -1) {
      return;
    }

    const prev = loopAt(this.tabList, i - 1);

    this.tabList.forEach(tab => {
      tab.selected = false;
    });

    await prev.selectAndFocus();

    this.changePanel();
  }

  @Listen('selectnexttab')
  async selectNextTabHandler(e: CustomEvent) {
    const tab = e.target as HTMLCTabElement;
    const i = this.tabList.findIndex(t => t.tabId === tab.tabId);
    if (i === -1) {
      return;
    }

    const next = loopAt(this.tabList, i + 1);

    this.tabList.forEach(tab => {
      tab.selected = false;
    });

    await next.selectAndFocus();

    this.changePanel();
  }

  componentDidRender() {
    this.el.querySelectorAll('c-tab').forEach((tab, i) => {
      const id = uid();
      tab.tabId = id;
      this.tabList.push(tab);
      if (i === parseInt(this.selectedIndex)) {
        tab.selected = true;
      }
    });

    this.el.querySelectorAll('c-tabpanel').forEach((tabpanel, i) => {
      const tab = this.tabList[i];
      tabpanel.tabId = tab.tabId;
    });

    this.changePanel();
  }

  changePanel() {
    this.el.querySelectorAll('c-tabpanel').forEach((tabpanel, i) => {
      const tab = this.tabList[i];
      tabpanel.selected = tab.selected;
    });
  }

  render() {
    return (
      <Host>
        <div role="tablist" aria-label={this.label}>
          <slot name="tab" />
        </div>
        <div class="c-tabs__tabpanel-container">
          <slot name="tabpanel" />
        </div>
      </Host>
    );
  }
}
