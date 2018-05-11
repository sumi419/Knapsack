const fs = require('fs');

const argv = process.argv.slice(2);

// ratio? object value/size
// loop through array of objects
// get the rations of all objects by value/size
// store ratios
// sort rations in order
// then grab max ratios

// add an error check to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, 'utf8');

const lines = filedata.trim().split(/[\r\n]+/g);
// \n creates a new line
// at this point line is an array
// each element in array is each line in text file
// process the lines

const items = [];

for (let l of lines) {
  // take each element
  const [index, size, value] = l.split(' ').map((n) => parseInt(n));
  // 1 95 18 first l (one element)
  // 2 67 19 second l in iteration
  // split by the spaces in the string
  // takes one element and turns it into an array
  // ['1', '95', '18'] 'n' [index, size, value]
  // map over each 'n' convert strings to number

  // dynamic way of adding items to array
  // index of whatever that index is for that item
  items[index] = {
    // items at that index (ex: items at index 1)
    index, //sets first element in arr to index
    size, //sets second element
    value
  };
}

items.shift();

function knapsack(items, capacity) {
  let ratio = [];
  let n = 1;
  for (let i = 0; i < items.length; i++) {
    ratio.push(items[i].value / items[i].size);
    console.log(ratio);
  }

  items.sort(function(item1, item2) {
    const item1ratio = item1.value / item1.size;
    const item2ratio = item2.value / item2.size;
    return item1ratio < item2ratio ? 1 : 0;
    // 1 : 0 same as true : false
    // returns biggest ratio first
    // smallest size and biggest value
  });

  const selectedItems = [];

  selectedItems.push(items[0]);

  while (selectedItems.size < capacity) {
    selectedItems.push(items[n]);
    n += 1;
  }
  console.log(items);
  console.log(selectedItems);
}

console.log('knapsack implementation: ', knapsack(items, capacity));
