import * as inherit from 'inherit';

class Component extends Object {
  constructor(public props: any) {
    super()
  }
}

export default inherit(Component, {
  __constructor(): void {
    this.__base.apply(this, arguments);
    this.willInit(this.props);
  },

  willInit(): void {
  },

  tag(): string {
    return 'div';
  },

  attrs(): null {
    return null;
  },

  mods(): null {
    return null;
  },

  cls(): string {
    return '';
  },

  mix(): null {
    return null;
  },

  render(_props: any, _children: any): any {
    const { props } = this,
      res = this.__render(
        this.tag(props),
        this.attrs(props),
        this.block,
        this.elem,
        this.mods(props),
        [props.mix, this.mix(props)],
        this.cls(props),
        this.content(props, props.children)
      );

    return this.wrap ? this.wrap(res) : res;
  },

  content(_: any, children: any): any {
    return children;
  }
});
