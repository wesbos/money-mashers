import { animate } from './rain.js';

const sellButton = document.querySelector('.sell');
const spendButton = document.querySelector('.spend');
const cheatButton = document.querySelector('.cheat');
const animateDiv = document.querySelector('#animate');
const count = document.querySelector('.count');
const icon = document.querySelector('.icon');
const itemsDiv = document.querySelector('.items');

let money = 100;
const priceHigh = 17;
const priceLow = 1;
let moneyBagSize = 50;
const GROW = 70;

let items = ["📱", "💻", "📸", "🎧", "🎤", "🎧", "🎤", "🖥️"];

let myInventory = [...items];

function sell() {
  // When you sell, your money bag gets bigger!\
  // This is how much money you get, Here are the odds
  const moneySell = Math.round(Math.random() * (priceHigh - priceLow) + priceLow);
  if(myInventory.length === 0) {
    alert('You don\'t have any items to sell!');
    return;
  }
  // find the item to sell
  const item = myInventory[Math.floor(Math.random() * myInventory.length)];
  const itemIndex = myInventory.indexOf(item);
  myInventory = [
    ...myInventory.slice(0, itemIndex),
    ...myInventory.slice(itemIndex + 1)
  ];
  console.log(myInventory)
  populateIventory();
  money = money + moneySell;

  // update the text content of the count element
  count.textContent = `$${money}`;
  // update css variables
  // icon.style.setProperty('--font', `${moneyBagSize+=GROW}px`);
  icon.style.setProperty("--font", `${money / 2}px`);
  checkIfRich();
  explode(icon, ['🤑', '💵', '$'], 5)
}

function spend() {
  // When you sell, your money bag gets bigger!
  const moneySell = Math.round(Math.random() * (priceHigh - priceLow) + priceLow);
  // cHeck if they have that much money!
  if (moneySell > money) {
    alertNoMoney();
    return;
  }
  money = money - moneySell;
  // update the text content of the count element
  count.textContent = `$${money}`;
  // update css variables
  // icon.style.setProperty('--font', `${moneyBagSize-=GROW}px`);
  icon.style.setProperty("--font", `${money / 2}px`);
  // add an item to the inventory
  const item = items[Math.floor(Math.random() * items.length)];
  myInventory = [...myInventory, item];
  populateIventory();
  checkIfRich();
  explode(icon, ['💸'], 5)
}

function populateIventory() {
  // Count how many of each item we have
  const counts = myInventory.reduce((acc, item) => {
    acc.set(item, (acc.get(item) || 0) + 1);
    return acc;
  }, new Map());
  console.log(counts)

  const html = Array.from(counts).map(([item, count]) => {
    return `<span class="item">${item}<span>${count}</span></span>`;
  }).join('');

  itemsDiv.innerHTML = html;
}

populateIventory();

sellButton.addEventListener('click', sell);
spendButton.addEventListener('click', spend);

function explode(element, emojis, emojiCount = 60) {
  emojisplosion({
	  emojis,
    emojiCount,
    position() {
      const offset = element.getBoundingClientRect();
      const position = {
        x: offset.left + element.clientWidth / 2,
        y: offset.top + element.clientHeight / 2,
      };
      return position;
    },
  });
}

function alertNoMoney() {
  document.body.classList.add('no-money');
  setTimeout(() => {
    document.body.classList.remove('no-money');
  }, 1000);
}

function checkIfRich() {
  if(money > 1000) {
    explode(icon, items);
    // Make the bag smaller
    icon.classList.add('shrink');
    setTimeout(() => {
      // change it to another emoji
      icon.textContent = '👑';
      // Make it bigger
      icon.classList.remove('shrink');
      document.body.classList.add('rich');
    }, 3000)
  }
}

function cheatCode() {
  // const code = prompt(`What is the cheat code?`);
  const code = "🤑Ar13🤑";
  if(code === '🤑Ar13🤑') {
    animateDiv.style.display = 'block';

    // Add $50 every 0.05 seconds
    const moneyInterval = setInterval(() => {
      money+= 50;
      count.textContent = `$${money}`;
    }, 2);

    setTimeout(() => {
      animateDiv.style.display = 'none';
      clearInterval(moneyInterval);
    }, 10000);
  }
}


function shutDown() {
  document.body.classList.add('shut-down');

}

cheatButton.addEventListener('click', cheatCode);
export {}


