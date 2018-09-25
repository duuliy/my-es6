<script>
   //类修饰器decorator
@decorator
class A{}
等于
ClassA{}
A=decorator(A)||A

//这方法用于继承与传参，但同样也是new一个构造函数才可用以

function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false

</script>