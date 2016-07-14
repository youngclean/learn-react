# learn-react
React入门学习

启动本地服务器，用的是express框架，简单，上手快
配置get,post请求，见app.js

examples中是每一个小示例。

React(虚拟)DOM术语
在React的术语中，有5种核心类型需要区分清楚

- ReactElement/ReactElement Factory
- ReactNode
- ReactComponent/ReactComponent Class

------

**ReactElement**
4种属性：type,props,key,ref
创建对象：```React.createElement```
> ```var root = React.createElement('div');```

渲染节点到DOM中：
> ```ReactDOM.render(root,document.getElementB)
yId('example'));```