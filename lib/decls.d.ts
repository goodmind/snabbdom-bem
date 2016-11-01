import ClassNameBuilder from './ClassNameBuilder';
export default function bemReactCore(options: any, BaseComponent: any, classNameBuilder: ClassNameBuilder): {
    decl(base: any, fields?: any, staticFields?: any): any;
    declMod(predicate: (...args: any[]) => any, fields: any, staticFields?: any): any;
};
