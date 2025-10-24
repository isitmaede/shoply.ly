
<img width="1902" height="817" alt="Screenshot 2025-10-24 200239" src="https://github.com/user-attachments/assets/17bbc51d-0e02-469c-9752-71c05ab371fa" />

<img width="1897" height="836" alt="Screenshot 2025-10-24 200314" src="https://github.com/user-attachments/assets/efabae69-e628-410e-aa3a-2a1dec181816" />



<img width="1895" height="836" alt="Screenshot 2025-10-24 200357" src="https://github.com/user-attachments/assets/651f05b8-1fcd-4993-b155-a1c85695d56c" />

<img width="1920" height="818" alt="Screenshot 2025-10-24 200419" src="https://github.com/user-attachments/assets/6e91f7c0-8dd9-4507-8b2a-665dec0d80eb" />


<img width="1920" height="912" alt="Screenshot 2025-10-24 200440" src="https://github.com/user-attachments/assets/ddc820bb-856a-497c-beb9-7b0a22cbdd05" />


# 🚀 Universal E-Commerce Site Builder Template (Next.js & Tailwind CSS)

This project is a highly versatile and responsive **E-commerce Store template** designed to function as a core template within a site builder platform. It demonstrates modern front-end development practices, exceptional responsiveness, and user experience optimizations, all within an elegant Arabic-first (RTL) design context.

## ✨ Key Features and Technical Highlights

| Feature | Description | Skills Demonstrated |
| :--- | :--- | :--- |
| **Mobile-First & RTL Responsive Design** | Ensures perfect rendering on all screen sizes, with optimized layout and component scaling specifically for **Right-to-Left (RTL)** languages using Tailwind CSS utilities. | **Advanced Responsive Design, Tailwind CSS, Layout Adaptation (RTL/LTR)** |
| **Optimized State Management** | Efficient use of **React Hooks (`useState`, `useCallback`, `useMemo`)** for state management, particularly in the filtering and searching logic, resulting in faster UI updates. | **React Hooks, Performance Optimization (`useMemo`), Clean Architecture** |
| **Reusable UI Components** | Implementation of modular, highly reusable components like the custom **`Modal`** and **`ProductCard`**, ensuring code consistency and rapid future development. | **Component-Driven Development, Modular Design** |
| **Admin Functionality Simulation** | Includes a simulated administrative feature for adding new products (via **`AddProductModalContent`**), demonstrating form handling, file preview, and state updates. | **Form Handling, State Mutability, Simulated Back-End Logic** |
| **Real-World E-commerce Flow** | Integrated features like product searching, price filtering, and a ready-to-use **WhatsApp Order integration** for a complete, production-ready user flow. | **Business Logic Implementation, Third-Party API Integration (URL Scheme)** |
| **Next.js Font Optimization** | Utilizes the Next.js Font system to integrate the modern Arabic font **Tajawal**, ensuring fast loading and consistent typography. | **Next.js Fundamentals, Font Optimization** |

***

## 🛠️ Tech Stack

* **Framework:** **Next.js** (React)
* **Styling:** **Tailwind CSS** (Utility-First CSS)
* **Language:** **JavaScript (ES6+)**
* **Iconography:** **Lucide Icons**
* **Design Focus:** Arabic (RTL) Layout

***

## 💡 Code Highlights

The project effectively utilizes advanced React concepts to maintain performance:

### 1. Performance Optimization with `useMemo`

The product filtering logic is wrapped in `useMemo` to prevent unnecessary recalculations of the `filteredProducts` array on every render, ensuring a snappy search experience.

```javascript
// UniversalStore.js
const filteredProducts = useMemo(() => {
  return products.filter((p) => {
    // ... filtering logic
  });
}, [products, search, priceFilter]); // Dependencies ensure re-calculation only when necessary
2. Custom Modal Implementation
A single, dynamic Modal component is used for both viewing product details and adding new items, significantly reducing boilerplate code and improving maintainability.

JavaScript

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  // ... conditional rendering and shared styles
};

// Usage
<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
  {/* Modal Content */}
</Modal>
⚙️ Getting Started
Follow these steps to run the project locally and inspect the code:

Clone the Repository:

Bash

git clone [YOUR_REPOSITORY_LINK]
cd universal-e-commerce-store
Install Dependencies:

Bash

npm install
# or
yarn install
Run the Development Server:

Bash

npm run dev
# or
yarn dev
Open your browser to http://localhost:3000.
