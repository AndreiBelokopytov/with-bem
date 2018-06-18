# HOC for React that simplifies BEM usage

This project is highly inspired by [cn-decorator](https://github.com/alfa-laboratory/cn-decorator)

However `cn-decorator` has some disadvantages:

- it doesn't support Typescript
- it does monkey patching for component's render method that can not be considered as "react way"

`withBEM` is free from this disadvantages. It is fully compatible with Typescript and it works as react HOC passing `bem` object as a property.
