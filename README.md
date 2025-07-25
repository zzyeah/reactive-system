# reactive-system
实现响应式系统

## 响应式数据
针对对象添加拦截

## 细分读写操作
- 获取属性：读取
- 设置属性：写入
- 新增属性：写入
- 删除属性：写入
- 是否存在某个属性：读取
- 遍历属性：读取

## 拦截后对应的处理

不同的行为，拦截下来后要做的事情是不一样的。整体来讲分为两大类：

- 收集器：针对读取的行为，会触发收集器去收集依赖，所谓收集依赖，其实就是建立数据和函数之间的依赖关系
- 触发器：针对写入行为，触发器会工作，触发器所做的事情就是触发数据所关联的所有函数，让这些函数重新执行

下面是不同行为对应的事情：

- 获取属性：收集器
- 设置属性：触发器
- 新增属性：触发器
- 删除属性：触发器
- 是否存在某个属性：收集器
- 遍历属性：收集器

总结起来也很简单，**只要涉及到属性的访问，那就是收集器，只要涉及到属性的设置（新增、删除都算设置），那就是触发器**。