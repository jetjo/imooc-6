function GrandPa()
{
  function Parent()
  {
    function Son()
    {

    }

    Son.prototype = Object.create(Parent.prototype);
    Son.prototype.constructor = Son;
    Son.prototype.saySon = function ()
    {
      console.log('Son, hello world!!!');
    }

    return new Son();
  }

  Parent.Son = Parent;
  Parent.prototype.sayParent = function ()
  {
    console.log('Parent, hello world!!!');
  }

  return new Parent.Son();
}
GrandPa.Parent = GrandPa;
// GrandPa.Son = 

const son = new GrandPa.Parent();

const son1 = new GrandPa.Parent();

console.log(son, son1, son.__proto__, son1.__proto__, son.__proto__ === son1.__proto__);
console.log(son.__proto__.__proto__, son1.__proto__.__proto__, son.__proto__.__proto__ === son1.__proto__.__proto__);
console.log(son.__proto__.__proto__.__proto__, son1.__proto__.__proto__.__proto__, son.__proto__.__proto__.__proto__ === son1.__proto__.__proto__.__proto__);
