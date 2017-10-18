import { Input, OnDestroy, OnInit } from "@angular/core";
import { noop } from "lodash";

import { NgISInstance } from "./instantsearch/instantsearch-instance";

export default class BaseWidget implements OnInit, OnDestroy {
  // header footer
  @Input() public header?: string;
  @Input() public footer?: string;

  public widget?: Widget;
  public state?: object;

  constructor(private searchInstance: NgISInstance) {}

  public createWidget(connector: Connector, options: object = {}) {
    this.widget = connector(this.updateState, noop)(options);
  }

  public ngOnInit() {
    this.searchInstance.addWidget(this.widget);
  }

  public ngOnDestroy() {
    this.searchInstance.removeWidget(this.widget);
  }

  public updateState = (state, isFirstRendering) => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }

    this.state = state;
  };
}