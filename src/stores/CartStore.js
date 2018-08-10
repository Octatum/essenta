import { decorate, observable, action, computed } from 'mobx';

const ProductsLocalStorageKey = 'essenta_products';

class _CartStore {
  products = []

  constructor() {
    this.getItemsFromLocalStorage();
  }

  getItemsFromLocalStorage() {
    if (typeof(Storage) === 'undefined') return;

    const products = localStorage.getItem(ProductsLocalStorageKey);
 
    this.products = products ? JSON.parse(products) : [];
  }

  commitItemsToLocalStorage() {
    if (typeof(Storage) === 'undefined') return;
    
    localStorage.setItem(ProductsLocalStorageKey, JSON.stringify(this.products));
  }

  addProduct(product) {
    const productKey = `${product.name}-${product.color}-${product.size}-${product.fragance}`;
    const productsWithKey = this.products.filter(p => p.key === productKey);

    if(productsWithKey.length === 0) {
      this.products.push({
        key: productKey, 
        amount: 1,
        ...product
      });
    } else {
      this.increaseAmountOfProduct(productKey);
    }

    this.commitItemsToLocalStorage();
  }

  removeProduct(productKey) {
    this.products = this.products.filter((p) => p.key !== productKey);

    this.commitItemsToLocalStorage();
  }

  increaseAmountOfProduct(productKey) {
    const productsCopy = this.products.slice();

    const modifiedProducts = productsCopy.map(p => {
      if(p.key !== productKey) return p;

      return {
        ...p,
        amount: p.amount + 1,
      };
    })

    this.products = modifiedProducts;

    this.commitItemsToLocalStorage();
  }

  decreaseAmountOfProduct(productKey) {
    const productsCopy = this.products.slice();

    const modifiedProducts = productsCopy.map(p => {
      if(p.key !== productKey) return p;

      return {
        ...p,
        amount: p.amount > 1 ? p.amount - 1 : p.amount,
      };
    })

    this.products = modifiedProducts;

    this.commitItemsToLocalStorage();
  }

  get total() {
    console.log(this.products);
    return this.products.reduce((a, p) => a + parseInt(p.amount) * parseInt(p.price), 0);
  }
}

const CartStore = decorate(_CartStore, {
  products: observable,
  total: computed,
  addProduct: action("Add product"),
  getItemsFromLocalStorage: action("Retrieve items from local storage"),
  removeProduct: action("Remove product"),
  increaseAmountOfProduct: action("Increase amount of product"),
  decreaseAmountOfProduct: action("Decrease amount of product"),
});

export default CartStore;