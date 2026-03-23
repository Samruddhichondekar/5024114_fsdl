import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {
  const headingRef = useRef(null);

  // --- State Hooks ---
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 55000, description: "High-end gaming laptop", category: "Electronics" },
    { id: 2, name: "Smartphone", price: 25000, description: "Latest Android smartphone", category: "Electronics" },
  ]);
  const [productInput, setProductInput] = useState({ name: "", price: "", description: "", category: "" });

  // --- useEffect for heading styling ---
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.style.color = "#007bff";
      headingRef.current.style.transition = "all 0.3s ease";
    }
  }, []);

  // --- Handlers ---
  const handleProductChange = (e) => setProductInput({ ...productInput, [e.target.name]: e.target.value });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (Object.values(productInput).some((v) => !v)) return alert("Please fill all fields!");
    setProducts([...products, { ...productInput, id: Date.now() }]);
    setProductInput({ name: "", price: "", description: "", category: "" });
  };

  // --- Pages Object ---
  const pages = {
    home: {
      path: "/",
      element: (
        <div style={styles.page}>
          <h2 ref={headingRef} style={styles.heading}>Welcome to the Multi-Page Dashboard</h2>
          <p style={styles.text}>Explore our interactive dashboard built with React Router, hooks, and dynamic rendering.</p>
          
          {/* Info Cards */}
          <div style={styles.cardContainer}>
            <div style={styles.infoCard}>
              <h3>Total Products</h3>
              <p>{products.length}</p>
            </div>
            <div style={styles.infoCard}>
              <h3>Total Likes</h3>
              <p>{likes}</p>
            </div>
            <div style={styles.infoCard}>
              <h3>Total Dislikes</h3>
              <p>{dislikes}</p>
            </div>
          </div>

          <p style={styles.text}>Use the navigation above to check feedback and products. This demonstrates dynamic React rendering using hooks and refs.</p>
        </div>
      ),
      label: "Home",
    },
    feedback: {
      path: "/feedback",
      element: (
        <div style={styles.page}>
          <h2 style={styles.heading}>Feedback Page</h2>
          <p style={styles.text}>Your feedback helps us improve. Click the buttons below to submit likes or dislikes.</p>
          <div style={styles.buttonGroup}>
            <button style={{ ...styles.button, backgroundColor: "#28a745" }} onClick={() => setLikes(likes + 1)}>👍 Likes: {likes}</button>
            <button style={{ ...styles.button, backgroundColor: "#dc3545" }} onClick={() => setDislikes(dislikes + 1)}>👎 Dislikes: {dislikes}</button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p style={styles.text}>Recent Feedback:</p>
            <ul>
              {[...Array(likes)].map((_, i) => <li key={`like-${i}`}>👍 Like #{i + 1}</li>)}
              {[...Array(dislikes)].map((_, i) => <li key={`dislike-${i}`}>👎 Dislike #{i + 1}</li>)}
            </ul>
          </div>
        </div>
      ),
      label: "Feedback",
    },
    products: {
      path: "/products",
      element: (
        <div style={styles.page}>
          <h2 style={styles.heading}>Products Page</h2>
          <p style={styles.text}>Manage products in your catalog. Add new products using the form below.</p>

          {/* Product Form */}
          <form style={styles.form} onSubmit={handleProductSubmit}>
            {Object.keys(productInput).map((key) => (
              <input
                key={key}
                type={key === "price" ? "number" : "text"}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={productInput[key]}
                onChange={handleProductChange}
                style={styles.input}
              />
            ))}
            <button type="submit" style={{ ...styles.button, backgroundColor: "#007bff" }}>Add Product</button>
          </form>

          {/* Product Cards */}
          <h3 style={{ marginTop: "30px" }}>Product List</h3>
          <div style={styles.productList}>
            {products.map((p) => (
              <div key={p.id} style={styles.productCard}>
                <h4>{p.name}</h4>
                <p><strong>Price:</strong> ₹{p.price}</p>
                <p><strong>Category:</strong> {p.category}</p>
                <p><strong>Description:</strong> {p.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      label: "Products",
    },
  };

  return (
    <Router>
      <div style={styles.container}>
        {/* Navigation */}
        <nav style={styles.nav}>
          {Object.keys(pages).map((key) => (
            <NavLink
              key={key}
              to={pages[key].path}
              style={({ isActive }) => ({
                ...styles.navLink,
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#007bff" : "#333",
              })}
            >
              {pages[key].label}
            </NavLink>
          ))}
        </nav>

        {/* Routes */}
        <Routes>
          {Object.keys(pages).map((key) => (
            <Route key={key} path={pages[key].path} element={pages[key].element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

// --- Styles ---
const styles = {
  container: { padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", maxWidth: "900px", margin: "0 auto" },
  nav: { marginBottom: "20px", display: "flex", gap: "15px", borderBottom: "2px solid #eee", paddingBottom: "10px" },
  navLink: { textDecoration: "none", color: "#333" },
  page: { padding: "10px" },
  heading: { fontSize: "28px", marginBottom: "15px" },
  text: { fontSize: "16px", color: "#555" },
  buttonGroup: { display: "flex", gap: "15px", marginTop: "15px" },
  button: { padding: "10px 20px", border: "none", color: "#fff", cursor: "pointer", borderRadius: "5px", fontSize: "16px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" },
  productList: { display: "grid", gap: "15px", marginTop: "10px" },
  productCard: { padding: "15px", border: "1px solid #eee", borderRadius: "8px", backgroundColor: "#f9f9f9", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  cardContainer: { display: "flex", gap: "15px", marginTop: "20px", flexWrap: "wrap" },
  infoCard: { flex: "1 1 200px", backgroundColor: "#f1f5f9", padding: "15px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
};

export default App;