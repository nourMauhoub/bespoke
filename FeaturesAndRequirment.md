
# Features & Requirements

## Core Features
- **Search**: Users can search products by title/description.
- **Filtering**: Filter products by category.
- **Sorting**: Sort products by price or title.
- **Admin Dashboard**: Add/edit/delete products (CRUD).

## How Requirements Were Addressed
- **State Management**: Vuex for centralized data flow.
- **API Integration**: FakeStoreAPI for product data.
- **Responsive Design**: Tailwind CSS UI.

# Design Decisions

## Component Structure
- Reusable components: `ProductsComponent`, `SearchProductsComponent`, `AdminFormModal`.
- Modular Vuex stores: `products`, `admin`.

## API Strategy
- Real-time data fetching from FakeStoreAPI.
- Local state simulation for admin edits (POST/PUT/DELETE).