import { B } from 'b_'; // TODO: optimize?

export default class ClassNameBuilder {
  b_: any

  constructor(options: any) {
    this.b_ = B(options);
  }

  stringify(block: any, elem: any, mods?: any, mixes?: any[], cls?: any) {
    return this.b_(block, elem, mods) +
      (mixes ? ' ' + mixes.map(mix => this.b_(mix.block || block, mix.elem, mix.mods)).join(' ') : '') +
      (cls ? ' ' + cls : '');
  }

  joinMixes(mix1: any, mix2?: any): any {
    if (Array.isArray(mix1)) {
      mix2 = mix1[1];
      mix1 = mix1[0];
    }

    if (!mix1 && !mix2) {
      return undefined;
    }

    let mixes: any[] = [];

    mix1 && (mixes = [...mixes, ...mix1]);
    mix2 && (mixes = [...mixes, ...mix2]);

    return mixes;
  }

}
