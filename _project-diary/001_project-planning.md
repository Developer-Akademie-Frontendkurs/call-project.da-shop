# Planning of the DA-Shop project

<!-- TOC -->

- [Description](#description)
- [Used technologies](#used-technologies)
- [In focus](#in-focus)
- [Not in focus](#not-in-focus)
- [Outstanding questions](#outstanding-questions)
- [Links](#links)

<!-- /TOC -->

## Description

This project is a collaborative project developed in the JavaScript (Advanced) Live Calls of the Developer Academy.
It is designed to review and reinforce familiar concepts in programming with JavaScript.

We will create a simple small store application with products, customer and employee accounts, shopping cart and
orders.

---

## Used technologies

- Plain JavaScript project
- Tailwind CSS library
- daisyUI
- NPM package json-server to build a fake backend

---

## In focus

- [ ] Employees
  - [ ] Initial employee must be inserted once if it does not yet exist in the database
  - [ ] can be created by other employees
  - [ ] must log in to be able to create products and view orders,
- [ ] Products (clothes, shoes, technical gadgets)
  - [ ] Employees can create, change and delete products
    - [ ] product image uploading
  - [ ] Customers are shown products in the store
  - [ ] can be added to a shopping cart by a customer
- [ ] Customer
  - [ ] have to be registered to set an order
- [ ] Shopping cart
  - [ ] is only temporary
- [ ] Orders
  - [ ] is created from temporary shopping cart

---

## Not in focus

- [ ] Employees
  - [ ] accounts can not be changed or delete for now
- [ ] Customers
  - [ ] accounts can not be changed or delete for now
- [ ] Invoicing
- [ ] Sending e-mails

---

## Outstanding questions

- [ ] Create a single page application?
  - [ ] yes
  - [ ] no

---

## Links

- [Tailwind](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [json-server](https://github.com/typicode/json-server/tree/v0)
