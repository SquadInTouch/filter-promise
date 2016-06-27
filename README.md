# Filter-Promise

Library to bring human-oriented filtering for Promises.

## Which problem do we solve?

This library bring simplified filtering on content of Promise to your favorite Promise library ([Bluebird](http://bluebirdjs.com/)).

## Examples

```javascript

function getUserFromDB() {
   //...
   return Promise.resolve({
     name: 'John',
     age: '33'
   });
}

// with then-filter

const agedUser = getUserFromDB().then(filter( user => user.age > 30 ));


// without then-filter
const agedUser = getUserFromDB().then( user => {
    if(user.age > 30) return user;
    else throw new Error('User too young for that');
});

```

## Notes

ES6-only. `const` and `let` are everywhere

