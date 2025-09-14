#Getting Started#
```
npm i #install dependencies
npm run dev # run on http://localhost:5173
npm test # run Jest
npm run build # production build
npm run preview #preview build locally
```

#Technical Decisions and Assumptions#

**Stack and Tooling**
1. Vite + React19 : lean build suited for the assignment as a SPA
2. React Router v7 : with three pages to work with, i opt for a simple client side routing
3. Tailwind CSS : small production CSS 
4. Jest & RTL : focused on DOM to align with user's behaviours and experiences

**State Management**
1. React Context and use of useReducer for the cart portion
2. adding of clear actions like ADD, SET_QTY, REMOVE, CLEAR
3. to prevent re-renders, use of derived values like totalCount and totalPrice
4. did not use Redux, as its a small slice

**Data**
1. Direct fetch from Fake Store API with basic loading and error checks
2. Did not use react query to ensure lean bundle and less dependencies

**Cart Persistence**
1. Use of localStorage under scart_v1 with loadCart() and saveCart()
2. this to allow save on cart changes

**Assumptions**
1. We are working with SGD and tax and shipping are not in scope
2. totals are computed using reduce and displayed with toFixed(2)

**Tests**
1. Since the tests are mainly focused on the cart page, i worked on the tests like render, update qty, remove items, totals and empty state
2. localStorage is mocked and also clear per test to avoid leakage

