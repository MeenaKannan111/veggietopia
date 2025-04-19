// const apiUrl = 'http://localhost:3000/api';
// console.log('Script loaded'); // Add this line at the top of script.js
// document.getElementById('farmer-register-form')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('farmer-name').value;
//     const email = document.getElementById('farmer-email').value;
//     const password = document.getElementById('farmer-password').value;
//     const farmDetails = document.getElementById('farm-details').value;

//     const response = await fetch(`${apiUrl}/farmer/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, farm_details: farmDetails })
//     });

//     const data = await response.json();
//     alert(data.message);
// });

// document.getElementById('consumer-register-form')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('consumer-name').value;
//     const email = document.getElementById('consumer-email').value;
//     const password = document.getElementById('consumer-password').value;
//     const address = document.getElementById('consumer-address').value;

//     const response = await fetch(`${apiUrl}/consumer/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, address })
//     });

//     const data = await response.json();
//     alert(data.message);
// });

// // Chatbot interaction
// document.getElementById('send-chat')?.addEventListener('click', async () => {
//     const input = document.getElementById('chat-input').value;
//     if (!input) return; // Prevent sending empty messages

//     // Send the user input to the backend
//     const response = await fetch(`${apiUrl}/chatbot`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ input })
//     });

//     const data = await response.json();

//     // Update the chat log with user input and bot response
//     document.getElementById('chat-log').innerHTML += `<div>User: ${input}</div>`;
//     document.getElementById('chat-log').innerHTML += `<div>Bot: ${data.response}</div>`;
//     document.getElementById('chat-input').value = ''; // Clear input field
// });

// document.getElementById('login-form')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     try {
//         const response = await fetch(`${apiUrl}/consumer/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();
//         console.log('Login API Response:', data); // Debugging  

//         if (response.ok) {
//             alert('Login Successful!');

//             // Store token and user ID in localStorage
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('userId', data.user.id); // Ensure backend sends user ID

//             console.log("Stored Token:", localStorage.getItem('token'));
//             console.log("Stored User ID:", localStorage.getItem('userId'));

//             window.location.href = 'consumer-dashboard.html'; // Redirect to dashboard
//         } else {
//             alert(data.message || 'Login failed!');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         alert('Something went wrong. Please try again.');
//     }
// });

// async function loadProfile() {
//     console.log("🔍 Checking login status...");

//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     console.log("🔹 Stored Token:", token);
//     console.log("🔹 Stored User ID:", userId);

//     if (!token || !userId) {
//         alert('Not logged in!');
//         window.location.href = 'index.html';
//         return;
//     }

//     try {
//         console.log(`📡 Fetching profile from: ${apiUrl}/consumer/dashboard/${userId}`);

//         const response = await fetch(`${apiUrl}/consumer/dashboard/${userId}`, {
//             method: 'GET',
//             headers: { 'Authorization': `Bearer ${token}` }
//         });

//         console.log("🛜 Profile Fetch Response:", response);

//         if (!response.ok) {
//             throw new Error(`HTTP Error! Status: ${response.status}`);
//         }

//         const consumer = await response.json();
//         console.log("✅ Consumer Data:", consumer);

//         if (consumer && consumer.name) {
//             document.getElementById('consumer-profile').innerHTML = `
//                 <p><strong>Name:</strong> ${consumer.name}</p>
//                 <p><strong>Email:</strong> ${consumer.email}</p>
//                 <p><strong>Address:</strong> ${consumer.address}</p>
//             `;
//         } else {
//             document.getElementById('consumer-profile').innerHTML = `<p>No profile found.</p>`;
//         }
//     } catch (error) {
//         console.error('❌ Error loading profile:', error);
//         document.getElementById('consumer-profile').innerHTML = `<p>Failed to load profile.</p>`;
//     }
// }


// // Load Consumer Profile
// // async function loadProfile() {
// //     const token = localStorage.getItem('token');
// //     const userId = localStorage.getItem('userId');

// //     if (!token || !userId) {
// //         alert('Not logged in!');
// //         window.location.href = 'index.html';
// //         return;
// //     }

// //     try {
// //         const response = await fetch(`${apiUrl}/consumer/dashboard/${userId}`, {
// //             method: 'GET',
// //             headers: { 'Authorization': `Bearer ${token}` }
// //         });

// //         const consumer = await response.json();

// //         if (consumer) {
// //             document.getElementById('consumer-profile').innerHTML = `
// //                 <p><strong>Name:</strong> ${consumer.name}</p>
// //                 <p><strong>Email:</strong> ${consumer.email}</p>
// //                 <p><strong>Address:</strong> ${consumer.address}</p>
// //             `;
// //         } else {
// //             document.getElementById('consumer-profile').innerHTML = `<p>No profile found.</p>`;
// //         }
// //     } catch (error) {
// //         console.error('Error loading profile:', error);
// //         document.getElementById('consumer-profile').innerHTML = `<p>Failed to load profile.</p>`;
// //     }
// // }

// // Load Available Products
// async function loadProducts() {
//     try {
//         const response = await fetch(`${apiUrl}/products`);
//         const products = await response.json();

//         if (products.length > 0) {
//             document.getElementById('product-list').innerHTML = products.map(product => `
//                 <div class="product">
//                     <h3>${product.name}</h3>
//                     <p>Price: $${product.price}</p>
//                     <p>Farmer: ${product.farmer_name}</p>
//                     <button onclick="placeOrder(${product.id})">Order Now</button>
//                 </div>
//             `).join('');
//         } else {
//             document.getElementById('product-list').innerHTML = `<p>No products available.</p>`;
//         }
//     } catch (error) {
//         console.error('Error loading products:', error);
//         document.getElementById('product-list').innerHTML = `<p>Failed to load products.</p>`;
//     }
// }

// // Place Order
// async function placeOrder(productId) {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//         alert('Please log in first!');
//         return;
//     }

//     try {
//         const response = await fetch(`${apiUrl}/consumer/order`, {
//             method: 'POST',
//             headers: { 
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json' 
//             },
//             body: JSON.stringify({ consumer_id: userId, product_id: productId })
//         });

//         const data = await response.json();
//         alert(data.message);
//     } catch (error) {
//         console.error('Error placing order:', error);
//         alert('Failed to place order.');
//     }
// }

// // Load Profile & Products on Page Load
// window.onload = function () {
//     loadProfile();
//     loadProducts();
// };


const apiUrl = 'http://localhost:3000/api'; 
console.log('Script loaded'); 

// ✅ LOGIN FUNCTION
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${apiUrl}/consumer/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        console.log('Login API Response:', data); // Debug response

        if (response.ok && data.token && data.user?.id) {  // ✅ Ensure user ID exists
            alert('Login Successful!');
            localStorage.setItem('token', data.token);  
            localStorage.setItem('userId', data.user.id); 
            console.log('Stored User ID:', data.user.id); 
            window.location.href = 'consumer-dashboard.html'; 
        } else {
            alert(data.message || 'Login failed!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again.');
    }
});


// ✅ LOAD PROFILE FUNCTION
async function loadProfile() {
    console.log("🔍 Checking login status...");

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log("🔹 Stored Token:", token);
    console.log("🔹 Stored User ID:", userId);

    if (!token || !userId) {
        alert('Not logged in! Redirecting...');
        window.location.href = 'index.html';
        return;
    }

    try {
        console.log(`📡 Fetching profile from: ${apiUrl}/consumer/dashboard/${userId}`);

        const response = await fetch(`${apiUrl}/consumer/dashboard/${userId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("🛜 Profile Fetch Response:", response);

        if (!response.ok) {
            console.error("❌ Profile fetch failed:", response.status, response.statusText);
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const consumer = await response.json();
        console.log("✅ Consumer Data:", consumer);

        if (consumer && consumer.name) {
            document.getElementById('consumer-profile').innerHTML = `
                <p><strong>Name:</strong> ${consumer.name}</p>
                <p><strong>Email:</strong> ${consumer.email}</p>
                <p><strong>Address:</strong> ${consumer.address}</p>
            `;
        } else {
            document.getElementById('consumer-profile').innerHTML = `<p>No profile found.</p>`;
        }
    } catch (error) {
        console.error('❌ Error loading profile:', error);
        document.getElementById('consumer-profile').innerHTML = `<p>Failed to load profile.</p>`;
    }
}

// ✅ LOAD PRODUCTS FUNCTION
async function loadProducts() {
    try {
        const response = await fetch(`${apiUrl}/products`);
        const products = await response.json();

        if (products.length > 0) {
            document.getElementById('product-list').innerHTML = products.map(product => `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Farmer: ${product.farmer_name}</p>
                    <button onclick="placeOrder(${product.id})">Order Now</button>
                </div>
            `).join('');
        } else {
            document.getElementById('product-list').innerHTML = `<p>No products available.</p>`;
        }
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('product-list').innerHTML = `<p>Failed to load products.</p>`;
    }
}

// ✅ PLACE ORDER FUNCTION
async function placeOrder(productId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        alert('Please log in first!');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/consumer/order`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ consumer_id: userId, product_id: productId })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order.');
    }
}

// ✅ RUN ON PAGE LOAD
window.onload = function () {
    if (window.location.pathname.includes("consumer-dashboard.html")) {
        loadProfile();
        loadProducts();
    }
};
