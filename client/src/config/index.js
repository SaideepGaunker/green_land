// This file defines various configuration objects and arrays that are used across the application for forms, menus, filters, and sorting options.
// These configurations provide a centralized way to manage form fields, menu items, categories, brands, filter options, and sorting criteria.

// Form Controls for User Registration
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
/* 
  Explanation:
  - `registerFormControls` defines the fields for the user registration form.
  - Each object represents a form field with properties like `name`, `label`, `placeholder`, `componentType`, and `type`.
*/

// Form Controls for User Login
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
/* 
  Explanation:
  - `loginFormControls` defines the fields for the user login form.
  - Similar to `registerFormControls`, it includes email and password fields.
*/

// Form Elements for Adding a Product
export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "collections", label: "Collections" },
      { id: "aesthetics", label: "Aesthetics" },
      { id: "kits", label: "Kits" },
      { id: "accessories", label: "Accessories" },
    ],
  },
  {
    label: "Need",
    name: "need",
    componentType: "select",
    options: [
      { id: "indoor", label: "Indoor" },
      { id: "outdoor", label: "Outdoor" },
      { id: "decors", label: "Decors" },
      { id: "gift", label: "Gift's" },
      { id: "seeds", label: "Seeds" },
      { id: "tools", label: "tools" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
/* 
  Explanation:
  - `addProductFormElements` defines the fields for adding a new product.
  - It includes text inputs, textareas, and select dropdowns for categories and needs.
*/

// Menu Items for the Shopping View Header
export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "collections",
    label: "Collections",
    path: "/shop/listing",
  },
  {
    id: "aesthetics",
    label: "Aesthetics",
    path: "/shop/listing",
  },
  {
    id: "kits",
    label: "Kits",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];
/* 
  Explanation:
  - `shoppingViewHeaderMenuItems` defines the navigation menu items for the shopping view header.
  - Each item has an `id`, `label`, and `path` for routing.
*/

// Mapping of Category Options
export const categoryOptionsMap = {
  collections: "collections",
  aesthetics: "Aesthetics",
  kits: "kits",
  accessories: "accessories",
};
/* 
  Explanation:
  - `categoryOptionsMap` maps category IDs to their display labels.
  - Useful for dynamically rendering category options in forms or filters.
*/

// Mapping of Brand/Need Options
export const brandOptionsMap = {
  indoor: "indoor",
  outdoor: "outdoor",
  decors: "decors",
  gift: "gift's",
  seeds: "Seeds",
  tools: "tools",
};
/* 
  Explanation:
  - `brandOptionsMap` maps need/brand IDs to their display labels.
  - Similar to `categoryOptionsMap`, it is used for dynamic rendering.
*/

// Filter Options for Products
export const filterOptions = {
  category: [
    { id: "collections", label: "Collections" },
    { id: "aesthetics", label: "Aesthetics" },
    { id: "kits", label: "Kits" },
    { id: "accessories", label: "Accessories" },
  ],
  need: [
    { id: "indoor", label: "indoor" },
    { id: "outdoor", label: "outdoor" },
    { id: "decors", label: "decors" },
    { id: "gift", label: "gift's" },
    { id: "seeds", label: "Seeds" },
    { id: "tools", label: "tools" },
  ],
};
/* 
  Explanation:
  - `filterOptions` defines the available filters for products, categorized by `category` and `need`.
  - Used in product listing pages to allow users to filter results.
*/

// Sorting Options for Products
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
/* 
  Explanation:
  - `sortOptions` defines the available sorting criteria for products.
  - Used in product listing pages to allow users to sort results.
*/

// Form Controls for Address Input
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
/* 
  Explanation:
  - `addressFormControls` defines the fields for entering an address.
  - Includes inputs for address, city, pincode, phone, and a textarea for notes.
*/