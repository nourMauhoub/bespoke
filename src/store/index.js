import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_PRODUCT(state, product) {
      state.products.unshift(product)
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) state.products.splice(index, 1, updatedProduct)
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error
      }
    },

    async addProduct({ commit }, product) {
      try {
        const response = await axios.post('https://fakestoreapi.com/products', product)
        commit('ADD_PRODUCT', response.data)
        return response.data
      } catch (error) {
        console.error('Error adding product:', error)
        throw error
      }
    },
    async updateProduct({ commit }, product) {
      try {
        const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, product)
        commit('UPDATE_PRODUCT', response.data)
        return response.data
      } catch (error) {
        console.error('Error updating product:', error)
        throw error
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${productId}`)
        commit('DELETE_PRODUCT', productId)
      } catch (error) {
        console.error('Error deleting product:', error)
        throw error
      }
    }

  },
  getters: {
    products: (state) => state.products,
  },
});