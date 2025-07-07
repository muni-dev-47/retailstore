const array1 = [
  { itemName: 'Apple', qty: 13 },
  { itemName: 'Banana', qty: 2 }
];

const array2 = [
  { itemName: 'Apple', qty: 4 },
  { itemName: 'Orange', qty: 5 }
];

const merged = {...array1[0],...array2[0]};
console.log(merged)

// console.log([...array1, ...array2]);
// [...array1, ...array2].forEach(item => {
//   if (merged[item.itemName]) {
//     merged[item.itemName].qty += item.qty;
//   } else {
//     merged[item.itemName] = { ...item };
//   }
// });

// const result = Object.values(merged);

// console.log(result);


const arr =  [1,2,3,4,];

console.log(arr["0"])



console.log(typeof Number('6379688729'))