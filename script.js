const apiUrl = 'http://localhost:3000/api';

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const messageDiv = document.getElementById('message'); // Get the message display area

    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
    });

    if (response.ok) {
        alert('Registration successful');
    } else {
        alert('Registration failed');
    }
}

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

        console.log('Login API Response:', data); // Debugging

        if (response.ok) {
            alert('Login Successful!');
            localStorage.setItem('token', data.token);  // Store token
            localStorage.setItem('userId', data.id);    // Store user ID
            window.location.href = 'consumer-dashboard.html'; // Redirect
        } else {
            alert(data.message || 'Login failed!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again.');
    }
});

// async function login() {
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;

//     const response = await fetch(`${apiUrl}/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     });

//     if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('token', data.token);
//         alert('Login successful');
//         fetchProducts();

        
//     } else {
//         alert('Login failed');
//     }
// }

async function fetchProducts() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/products`, {
        headers: {
            'Authorization': token
        }
    });

    if (response.ok) {
        const products = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
 products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(li);
        });
    } else {
        alert('Failed to fetch products');
    }
}