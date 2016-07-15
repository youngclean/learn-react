# learn-react
React入门学习

启动本地服务器，用的是express框架，简单，上手快
配置get,post请求，见app.js

examples中是每一个小示例。

https://devdocs.io/react/docs/glossary

React(虚拟)DOM术语
在React的术语中，有5种核心类型需要区分清楚

- ReactElement/ReactElement Factory
- ReactNode
- ReactComponent/ReactComponent Class

------

**ReactElement**

4种属性：type,props,key,ref

创建对象：

```var root = React.createElement('div');```

渲染节点到DOM中：

``` ReactDOM.render(root,document.getElementById('example')); ```

给DOM元素增加一些属性，第二个参数是属性，第三个参数是子元素

```
var child = React.createElement('li',null,'Text Content');

var root = React.createElement('ul',{className:"my-list"},child);

ReactDOM.render(root,document.getElementById('example'));
```


使用React JSX,会简单方便很多

```
var root = <ul className="my-lst">
                <li>Text Content</li>
            </ul>;
ReactDOM.render(root,document.getElementById('example'));
```

------

**Factories**

ReactElement-factory只是一个函数,生成一个带 type的ReactElement。

```
function createFactory(type) {
  return React.createElement.bind(null, type);
}
```

它允许你创建一个方便快捷而不用一直输入 React.createElement(div)

```
var div = React.createFactory('div');
var root = div({ className: 'my-div' });
ReactDOM.render(root, document.getElementById('example'));
```

React有内置的factories为常用的html标签

```
var root = React.DOM.ul({ className: 'my-list' },
             React.DOM.li(null, 'Text Content')
           );
```

如果使用JSX，就没有必要使用factories。JSX同样提供快速便捷的方式来创建ReactElement。

------

**React Nodes**

一个ReactNode可以有以下几种形式：

- ReactElement
- string (aka ReactText)
- number (aka ReactText)
- ReactNodes Array(aka ReactFragment)

------

**React Components**

如果只使用ReactElement并没有利用React的优势，还可以使用ReactComponents创建有状态的encapsulations

ReactComponent Class简单的只是个javaScript类（或者“构造函数”）

```
var MyComponent = React.createClass({
    render: function(){
       ...
    }
});
```

当调用了这个constructor后，将返回一个至少带有render方法的对象，该对象被称为ReactComponent。

```
var component = new MyComponent(props); // never do this
```

除非测试，一般不会这样调用constructor。通常通过createElement来获得ReactElement.
```
var element = React.createElement(MyComponent);
```

或使用JSX:

```
var element = <MyComponent />;
var component = ReactDOM.render(element, document.getElementById('example'));
```

```
var componentA = ReactDOM.render(<MyComponent />, document.getElementById('example'));
var componentB = ReactDOM.render(<MyComponent />, document.getElementById('example'));
componentA === componentB; // true
```
This is why you shouldn't construct your own instance. Instead, ReactElement is a virtual ReactComponent before it gets constructed. An old and new ReactElement can be compared to see if a new ReactComponent instance should be created or if the existing one should be reused.

The render method of a ReactComponent is expected to return another ReactElement. This allows these components to be composed. Ultimately the render resolves into ReactElement with a string tag which instantiates a DOM Element instance and inserts it into the document.

------

**Formal Type Definitions**

Entry Point

```
ReactDOM.render = (ReactElement,HTMLElement | SVGElement) => ReactComponent;
```

Nodes and Elements

```
type ReactNode = ReactElement | ReactFragment | ReactText;

type ReactElement = ReactComponentElement | ReactDOMElement;

type ReactDOMElement = {
  type : string,
  props : {
    children : ReactNodeList,
    className : string,
    etc.
  },
  key : string | boolean | number | null,
  ref : string | null
};

type ReactComponentElement<TProps> = {
  type : ReactClass<TProps> | ReactFunctionalComponent<TProps>,
  props : TProps,
  key : string | boolean | number | null,
  ref : string | null
};

type ReactFragment = Array<ReactNode | ReactEmpty>;

type ReactNodeList = ReactNode | ReactEmpty;

type ReactText = string | number;

type ReactEmpty = null | undefined | boolean;
```

Classes and Components

```
type ReactClass<TProps> = (TProps) => ReactComponent<TProps>;

type ReactComponent<TProps> = {
  props : TProps,
  render : () => ReactElement
};

type ReactFunctionalComponent<TProps> = (TProps) => ReactElement;
```
















