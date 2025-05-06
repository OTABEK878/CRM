import React, { useState } from 'react';
import { FaSortAlphaDown, FaSort, FaTimes } from 'react-icons/fa';
import './products.css';

const Products = ({ products, setProducts, deleteProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({ key: null, direction: null });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!newProduct.name.trim()) newErrors.name = "Tovar nomi talab qilinadi";
    if (!newProduct.price) newErrors.price = "Narhi talab qilinadi";
    if (!newProduct.quantity) newErrors.quantity = "Soni talab qilinadi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newItem = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };

    const updatedProducts = [...products, newItem];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    closeModal();
  };

  const handleUpdate = () => {
    if (!validate()) return;

    const updatedProduct = {
      ...currentProduct,
      name: newProduct.name,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };

    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Saqlash
    closeModal();
  };

  const handleClear = () => {
    setNewProduct({ name: '', price: '', quantity: '' });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleClear();
    setModalType('create');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let newDirection = 'asc';
    if (sortOrder.key === key && sortOrder.direction === 'asc') {
      newDirection = 'desc';
    }

    const sorted = [...products].sort((a, b) => {
      if (key === 'name') {
        return newDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return newDirection === 'asc' ? a[key] - b[key] : b[key] - a[key];
      }
    });
    setProducts(sorted);
    setSortOrder({ key, direction: newDirection });
  };

  const handleEdit = (product) => {
    setModalType('edit');
    setCurrentProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString()
    });
    setErrors({});
    setIsModalOpen(true);
  };

  return (
    <div className="products">
      <div className="products-header">
        <div>Total: {filteredProducts.length}</div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => setIsModalOpen(true)}>Create</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>
              Tovarlar
              <FaSortAlphaDown className="sort-icon" onClick={() => handleSort('name')} />
            </th>
            <th>
              Narhi
              <FaSort className="sort-icon" onClick={() => handleSort('price')} />
            </th>
            <th>
              Soni
              <FaSort className="sort-icon" onClick={() => handleSort('quantity')} />
            </th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString()}</td>
              <td>{product.quantity}</td>
              <td>{(product.price * product.quantity).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => {
                  deleteProduct(product.id);
                  const remaining = products.filter(p => p.id !== product.id);
                  localStorage.setItem('products', JSON.stringify(remaining)); // delete uchun ham localStorage yangilash
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains('modal-overlay')) {
              closeModal();
            }
          }}
        >
          <div className="modal">
            <FaTimes className="close-icon" onClick={closeModal} />
            <h2 style={{ textAlign: 'center' }}>
              {modalType === 'create' ? "Tovar Qo'shish" : "Tovarni Yangilash"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Tovar nomi"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            {errors.name && <small className="error">{errors.name}</small>}

            <input
              type="number"
              name="price"
              placeholder="Narhi"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            {errors.price && <small className="error">{errors.price}</small>}

            <input
              type="number"
              name="quantity"
              placeholder="Soni"
              value={newProduct.quantity}
              onChange={handleInputChange}
            />
            {errors.quantity && <small className="error">{errors.quantity}</small>}

            <div className="modal-buttons">
              <button onClick={modalType === 'create' ? handleCreate : handleUpdate}>
                {modalType === 'create' ? 'Create' : 'Update'}
              </button>
              <button onClick={handleClear}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
