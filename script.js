/* ============================================
   DECKERS API CATALOG - INTERACTIVE FUNCTIONALITY
   Search, Filter, and Documentation Viewer
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // API DATA - Complete documentation for each API
    // ============================================
    const apiData = {
        'product-api': {
            name: 'Product API',
            icon: '📦',
            version: 'v2.1.0',
            description: 'Complete CRUD operations for product management. This API allows you to create, read, update, and delete products in the Deckers catalog. It supports full inventory integration, variant management, and real-time stock synchronization across all channels.',
            baseUrl: 'https://api.deckers.com/v2/products',
            auth: 'OAuth 2.0',
            authNote: 'Bearer token required in Authorization header',
            rateLimit: '1000 requests/minute',
            methods: [
                { method: 'GET', desc: 'Retrieve products' },
                { method: 'POST', desc: 'Create products' },
                { method: 'PUT', desc: 'Update products' },
                { method: 'DELETE', desc: 'Delete products' }
            ],
            notes: [
                'All requests must include a valid OAuth 2.0 bearer token',
                'Product IDs are UUIDs and must be valid format',
                'Bulk operations support up to 100 items per request',
                'Images are automatically resized and optimized',
                'SKU must be unique across the entire catalog'
            ],
            endpoints: [
                {
                    method: 'GET',
                    path: '/products',
                    desc: 'List all products with pagination',
                    params: 'page, limit, sort, filter',
                    response: '200 OK - Array of product objects'
                },
                {
                    method: 'GET',
                    path: '/products/{id}',
                    desc: 'Get a single product by ID',
                    params: 'id (required)',
                    response: '200 OK - Product object'
                },
                {
                    method: 'POST',
                    path: '/products',
                    desc: 'Create a new product',
                    params: 'Product object in request body',
                    response: '201 Created - New product object'
                },
                {
                    method: 'PUT',
                    path: '/products/{id}',
                    desc: 'Update an existing product',
                    params: 'id (required), Product object in body',
                    response: '200 OK - Updated product object'
                },
                {
                    method: 'DELETE',
                    path: '/products/{id}',
                    desc: 'Delete a product',
                    params: 'id (required)',
                    response: '204 No Content'
                }
            ],
            examples: [
                {
                    title: 'Create Product Request',
                    type: 'request',
                    code: `POST /v2/products
Content-Type: application/json
Authorization: Bearer {token}

{
  "sku": "UGG-CLASSIC-001",
  "name": "UGG Classic Mini II",
  "description": "Iconic ankle-height boot",
  "category": "footwear",
  "brand": "UGG",
  "price": {
    "amount": 150.00,
    "currency": "USD"
  },
  "inventory": {
    "quantity": 500,
    "warehouse": "US-WEST-01"
  },
  "variants": [
    { "size": "7", "color": "Chestnut" },
    { "size": "8", "color": "Chestnut" }
  ]
}`
                },
                {
                    title: 'Create Product Response',
                    type: 'response',
                    code: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "prod_8f14e45f-ceea-467f-a8f1-2b5c45a8b9c2",
  "sku": "UGG-CLASSIC-001",
  "name": "UGG Classic Mini II",
  "status": "active",
  "created_at": "2026-01-30T10:30:00Z",
  "updated_at": "2026-01-30T10:30:00Z"
}`
                }
            ]
        },
        'sales-order-api': {
            name: 'Sales Order API',
            icon: '🛍️',
            version: 'v3.0.2',
            description: 'Create, update, and retrieve sales orders. This API manages the complete order lifecycle from creation to fulfillment, including real-time status tracking, payment processing integration, and shipping coordination.',
            baseUrl: 'https://api.deckers.com/v3/orders',
            auth: 'OAuth 2.0',
            authNote: 'Bearer token required in Authorization header',
            rateLimit: '500 requests/minute',
            methods: [
                { method: 'GET', desc: 'Retrieve orders' },
                { method: 'POST', desc: 'Create orders' },
                { method: 'PUT', desc: 'Update orders' }
            ],
            notes: [
                'Orders cannot be deleted, only cancelled',
                'Payment must be authorized before order creation',
                'Shipping address validation is automatic',
                'Order status webhooks are available',
                'Supports multi-currency transactions'
            ],
            endpoints: [
                {
                    method: 'GET',
                    path: '/orders',
                    desc: 'List all orders with filters',
                    params: 'status, date_from, date_to, customer_id',
                    response: '200 OK - Array of order objects'
                },
                {
                    method: 'GET',
                    path: '/orders/{id}',
                    desc: 'Get order details',
                    params: 'id (required)',
                    response: '200 OK - Order object with line items'
                },
                {
                    method: 'POST',
                    path: '/orders',
                    desc: 'Create a new sales order',
                    params: 'Order object in request body',
                    response: '201 Created - New order object'
                },
                {
                    method: 'PUT',
                    path: '/orders/{id}/status',
                    desc: 'Update order status',
                    params: 'id (required), status in body',
                    response: '200 OK - Updated order object'
                }
            ],
            examples: [
                {
                    title: 'Create Sales Order Request',
                    type: 'request',
                    code: `POST /v3/orders
Content-Type: application/json
Authorization: Bearer {token}

{
  "customer_id": "cust_12345",
  "channel": "web",
  "currency": "USD",
  "line_items": [
    {
      "sku": "UGG-CLASSIC-001",
      "quantity": 1,
      "unit_price": 150.00
    }
  ],
  "shipping_address": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "Los Angeles",
    "state": "CA",
    "postal_code": "90001",
    "country": "US"
  },
  "payment_method": "credit_card"
}`
                },
                {
                    title: 'Create Sales Order Response',
                    type: 'response',
                    code: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "ord_9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d",
  "order_number": "SO-2026-00001234",
  "status": "pending",
  "subtotal": 150.00,
  "tax": 12.38,
  "shipping": 0.00,
  "total": 162.38,
  "created_at": "2026-01-30T11:00:00Z"
}`
                }
            ]
        },
        'purchase-order-api': {
            name: 'Purchase Order API',
            icon: '📝',
            version: 'v2.5.1',
            description: 'Manage purchase orders from creation to receipt. This API handles vendor orders, approval workflows, and inventory synchronization. Track order status, manage vendor relationships, and automate reordering processes.',
            baseUrl: 'https://api.deckers.com/v2/purchase-orders',
            auth: 'API Key',
            authNote: 'X-API-Key header required',
            rateLimit: '300 requests/minute',
            methods: [
                { method: 'GET', desc: 'Retrieve POs' },
                { method: 'POST', desc: 'Create POs' },
                { method: 'PUT', desc: 'Update POs' },
                { method: 'DELETE', desc: 'Cancel POs' }
            ],
            notes: [
                'POs require approval for amounts over $10,000',
                'Vendor must be active in the system',
                'Supports partial receipts',
                'Automatic inventory update on receipt',
                'Email notifications sent on status changes'
            ],
            endpoints: [
                {
                    method: 'GET',
                    path: '/purchase-orders',
                    desc: 'List all purchase orders',
                    params: 'vendor_id, status, date_range',
                    response: '200 OK - Array of PO objects'
                },
                {
                    method: 'POST',
                    path: '/purchase-orders',
                    desc: 'Create new purchase order',
                    params: 'PO object in request body',
                    response: '201 Created - New PO object'
                },
                {
                    method: 'PUT',
                    path: '/purchase-orders/{id}/receive',
                    desc: 'Record receipt of goods',
                    params: 'id (required), receipt details',
                    response: '200 OK - Updated PO object'
                },
                {
                    method: 'DELETE',
                    path: '/purchase-orders/{id}',
                    desc: 'Cancel a purchase order',
                    params: 'id (required)',
                    response: '200 OK - Cancelled PO object'
                }
            ],
            examples: [
                {
                    title: 'Create Purchase Order',
                    type: 'request',
                    code: `POST /v2/purchase-orders
Content-Type: application/json
X-API-Key: {your-api-key}

{
  "vendor_id": "vnd_abc123",
  "expected_date": "2026-02-15",
  "warehouse": "US-WEST-01",
  "line_items": [
    {
      "sku": "RAW-SHEEPSKIN-001",
      "quantity": 1000,
      "unit_cost": 25.00
    }
  ],
  "notes": "Q1 inventory replenishment"
}`
                },
                {
                    title: 'Purchase Order Response',
                    type: 'response',
                    code: `HTTP/1.1 201 Created

{
  "id": "po_def456",
  "po_number": "PO-2026-00567",
  "status": "pending_approval",
  "vendor": {
    "id": "vnd_abc123",
    "name": "Premium Materials Co."
  },
  "total": 25000.00,
  "currency": "USD"
}`
                }
            ]
        },
        'invoice-api': {
            name: 'Invoice API',
            icon: '🧾',
            version: 'v1.8.0',
            description: 'Create and retrieve invoices. Generate invoices from completed orders, manage payment tracking, and integrate with accounting systems. Supports multiple formats including PDF generation and EDI.',
            baseUrl: 'https://api.deckers.com/v1/invoices',
            auth: 'OAuth 2.0',
            authNote: 'Bearer token required in Authorization header',
            rateLimit: '200 requests/minute',
            methods: [
                { method: 'GET', desc: 'Retrieve invoices' },
                { method: 'POST', desc: 'Create invoices' },
                { method: 'PUT', desc: 'Update payment status' }
            ],
            notes: [
                'Invoices are immutable once finalized',
                'Credit memos available for adjustments',
                'PDF generation is async - use webhook',
                'Supports NET 30, 60, 90 payment terms',
                'Auto-sync with QuickBooks and SAP'
            ],
            endpoints: [
                {
                    method: 'GET',
                    path: '/invoices',
                    desc: 'List all invoices',
                    params: 'customer_id, status, date_range',
                    response: '200 OK - Array of invoice objects'
                },
                {
                    method: 'GET',
                    path: '/invoices/{id}/pdf',
                    desc: 'Get invoice as PDF',
                    params: 'id (required)',
                    response: '200 OK - PDF binary'
                },
                {
                    method: 'POST',
                    path: '/invoices',
                    desc: 'Create invoice from order',
                    params: 'order_id, due_date',
                    response: '201 Created - Invoice object'
                },
                {
                    method: 'PUT',
                    path: '/invoices/{id}/payment',
                    desc: 'Record payment',
                    params: 'id, payment details',
                    response: '200 OK - Updated invoice'
                }
            ],
            examples: [
                {
                    title: 'Create Invoice from Order',
                    type: 'request',
                    code: `POST /v1/invoices
Content-Type: application/json
Authorization: Bearer {token}

{
  "order_id": "ord_9a8b7c6d-5e4f-3a2b",
  "payment_terms": "NET_30",
  "notes": "Thank you for your business!"
}`
                },
                {
                    title: 'Invoice Response',
                    type: 'response',
                    code: `HTTP/1.1 201 Created

{
  "id": "inv_xyz789",
  "invoice_number": "INV-2026-00789",
  "status": "pending",
  "customer": {
    "id": "cust_12345",
    "name": "John Doe"
  },
  "subtotal": 150.00,
  "tax": 12.38,
  "total": 162.38,
  "due_date": "2026-03-01",
  "pdf_url": null
}`
                }
            ]
        },
        'inventory-api': {
            name: 'Inventory API',
            icon: '📊',
            version: 'v4.0.0',
            description: 'Real-time inventory tracking across all warehouses. Check stock levels, manage allocations, receive low-stock alerts, and coordinate inventory movements between locations.',
            baseUrl: 'https://api.deckers.com/v4/inventory',
            auth: 'OAuth 2.0',
            authNote: 'Bearer token required in Authorization header',
            rateLimit: '2000 requests/minute',
            methods: [
                { method: 'GET', desc: 'Check inventory' },
                { method: 'POST', desc: 'Create adjustments' },
                { method: 'PUT', desc: 'Update allocations' }
            ],
            notes: [
                'Real-time updates via WebSocket available',
                'Supports multiple warehouse locations',
                'Automatic reorder point alerts',
                'Batch inventory counts supported',
                'Full audit trail for all movements'
            ],
            endpoints: [
                {
                    method: 'GET',
                    path: '/inventory',
                    desc: 'Get inventory levels',
                    params: 'sku, warehouse, include_allocated',
                    response: '200 OK - Inventory levels'
                },
                {
                    method: 'GET',
                    path: '/inventory/{sku}/history',
                    desc: 'Get inventory movement history',
                    params: 'sku (required), date_range',
                    response: '200 OK - Movement history'
                },
                {
                    method: 'POST',
                    path: '/inventory/adjust',
                    desc: 'Create inventory adjustment',
                    params: 'sku, quantity, reason',
                    response: '201 Created - Adjustment record'
                },
                {
                    method: 'POST',
                    path: '/inventory/transfer',
                    desc: 'Transfer between warehouses',
                    params: 'sku, from, to, quantity',
                    response: '201 Created - Transfer record'
                }
            ],
            examples: [
                {
                    title: 'Check Inventory Levels',
                    type: 'request',
                    code: `GET /v4/inventory?sku=UGG-CLASSIC-001&include_allocated=true
Authorization: Bearer {token}`
                },
                {
                    title: 'Inventory Response',
                    type: 'response',
                    code: `HTTP/1.1 200 OK

{
  "sku": "UGG-CLASSIC-001",
  "total_quantity": 500,
  "available": 420,
  "allocated": 80,
  "warehouses": [
    {
      "id": "US-WEST-01",
      "quantity": 300,
      "available": 250
    },
    {
      "id": "US-EAST-01", 
      "quantity": 200,
      "available": 170
    }
  ],
  "reorder_point": 100,
  "last_updated": "2026-01-30T12:00:00Z"
}`
                }
            ]
        },
        'payment-api': {
            name: 'Payment API',
            icon: '💳',
            version: 'v3.2.1',
            description: 'Process payments and refunds securely. Support multiple payment methods including credit cards, PayPal, and Apple Pay. PCI-DSS compliant with tokenization support.',
            baseUrl: 'https://api.deckers.com/v3/payments',
            auth: 'OAuth 2.0',
            authNote: 'Bearer token required, PCI scope required',
            rateLimit: '100 requests/minute',
            methods: [
                { method: 'GET', desc: 'Retrieve payments' },
                { method: 'POST', desc: 'Process payments' }
            ],
            notes: [
                'PCI-DSS Level 1 compliant',
                'Use tokenization for card storage',
                '3D Secure supported for EU transactions',
                'Refunds processed within 5-7 business days',
                'Supports partial refunds'
            ],
            endpoints: [
                {
                    method: 'POST',
                    path: '/payments/authorize',
                    desc: 'Authorize a payment',
                    params: 'amount, currency, payment_method',
                    response: '200 OK - Authorization object'
                },
                {
                    method: 'POST',
                    path: '/payments/capture',
                    desc: 'Capture authorized payment',
                    params: 'authorization_id, amount',
                    response: '200 OK - Capture object'
                },
                {
                    method: 'POST',
                    path: '/payments/refund',
                    desc: 'Process a refund',
                    params: 'payment_id, amount, reason',
                    response: '200 OK - Refund object'
                },
                {
                    method: 'GET',
                    path: '/payments/{id}',
                    desc: 'Get payment details',
                    params: 'id (required)',
                    response: '200 OK - Payment object'
                }
            ],
            examples: [
                {
                    title: 'Authorize Payment',
                    type: 'request',
                    code: `POST /v3/payments/authorize
Content-Type: application/json
Authorization: Bearer {token}

{
  "amount": 162.38,
  "currency": "USD",
  "payment_method": {
    "type": "card",
    "token": "tok_visa_4242"
  },
  "order_id": "ord_9a8b7c6d"
}`
                },
                {
                    title: 'Authorization Response',
                    type: 'response',
                    code: `HTTP/1.1 200 OK

{
  "id": "auth_abc123",
  "status": "authorized",
  "amount": 162.38,
  "currency": "USD",
  "expires_at": "2026-02-06T12:00:00Z",
  "card": {
    "brand": "visa",
    "last4": "4242"
  }
}`
                }
            ]
        },
        'customer-api': {
            name: 'Customer API',
            icon: '👤',
            version: 'v2.3.0',
            description: 'Manage customer profiles and preferences. Create, update, and retrieve customer data with full address and contact support. GDPR compliant with data export and deletion capabilities.',
            baseUrl: 'https://api.deckers.com/v2/customers',
            auth: 'OAuth 2.0',
            authNote: 'Bearer token required in Authorization header',
            rateLimit: '500 requests/minute',
            methods: [
                { method: 'GET', desc: 'Retrieve customers' },
                { method: 'POST', desc: 'Create customers' },
                { method: 'PUT', desc: 'Update customers' },
                { method: 'DELETE', desc: 'Delete customers' }
            ],
            notes: [
                'GDPR compliant - supports data export',
                'Email must be unique per customer',
                'Supports multiple addresses per customer',
                'Loyalty points integration available',
                'Customer merge supported for duplicates'
            ],
            endpoints: [
                {
                    method: 'GET',
                    path: '/customers',
                    desc: 'List all customers',
                    params: 'email, name, page, limit',
                    response: '200 OK - Array of customers'
                },
                {
                    method: 'GET',
                    path: '/customers/{id}',
                    desc: 'Get customer details',
                    params: 'id (required)',
                    response: '200 OK - Customer object'
                },
                {
                    method: 'POST',
                    path: '/customers',
                    desc: 'Create new customer',
                    params: 'Customer object in body',
                    response: '201 Created - Customer object'
                },
                {
                    method: 'DELETE',
                    path: '/customers/{id}',
                    desc: 'Delete customer (GDPR)',
                    params: 'id (required)',
                    response: '204 No Content'
                }
            ],
            examples: [
                {
                    title: 'Create Customer',
                    type: 'request',
                    code: `POST /v2/customers
Content-Type: application/json
Authorization: Bearer {token}

{
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1-555-123-4567",
  "addresses": [
    {
      "type": "shipping",
      "street": "123 Main St",
      "city": "Los Angeles",
      "state": "CA",
      "postal_code": "90001",
      "country": "US",
      "is_default": true
    }
  ],
  "preferences": {
    "marketing_emails": true,
    "sms_notifications": false
  }
}`
                },
                {
                    title: 'Customer Response',
                    type: 'response',
                    code: `HTTP/1.1 201 Created

{
  "id": "cust_12345",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "loyalty_points": 0,
  "created_at": "2026-01-30T14:00:00Z"
}`
                }
            ]
        },
        'shipping-api': {
            name: 'Shipping API',
            icon: '🚚',
            version: 'v1.2.0-beta',
            description: 'Calculate shipping rates and track deliveries. Integrate with UPS, FedEx, USPS, and DHL for real-time tracking and label generation.',
            baseUrl: 'https://api.deckers.com/v1/shipping',
            auth: 'API Key',
            authNote: 'X-API-Key header required',
            rateLimit: '300 requests/minute',
            methods: [
                { method: 'GET', desc: 'Get rates/tracking' },
                { method: 'POST', desc: 'Create shipments' }
            ],
            notes: [
                'Currently in beta - expect changes',
                'Supports UPS, FedEx, USPS, DHL',
                'Address validation included',
                'Webhook for tracking updates',
                'Batch label generation supported'
            ],
            endpoints: [
                {
                    method: 'POST',
                    path: '/shipping/rates',
                    desc: 'Get shipping rates',
                    params: 'origin, destination, packages',
                    response: '200 OK - Array of rate options'
                },
                {
                    method: 'POST',
                    path: '/shipping/labels',
                    desc: 'Generate shipping label',
                    params: 'shipment details',
                    response: '201 Created - Label with tracking'
                },
                {
                    method: 'GET',
                    path: '/shipping/track/{tracking_number}',
                    desc: 'Get tracking info',
                    params: 'tracking_number (required)',
                    response: '200 OK - Tracking events'
                }
            ],
            examples: [
                {
                    title: 'Get Shipping Rates',
                    type: 'request',
                    code: `POST /v1/shipping/rates
Content-Type: application/json
X-API-Key: {your-api-key}

{
  "origin": {
    "postal_code": "93012",
    "country": "US"
  },
  "destination": {
    "postal_code": "90001",
    "country": "US"
  },
  "packages": [
    {
      "weight": 2.5,
      "weight_unit": "lb",
      "dimensions": {
        "length": 12,
        "width": 8,
        "height": 6,
        "unit": "in"
      }
    }
  ]
}`
                },
                {
                    title: 'Shipping Rates Response',
                    type: 'response',
                    code: `HTTP/1.1 200 OK

{
  "rates": [
    {
      "carrier": "UPS",
      "service": "Ground",
      "rate": 8.99,
      "delivery_days": 5
    },
    {
      "carrier": "FedEx",
      "service": "Express",
      "rate": 24.99,
      "delivery_days": 2
    }
  ]
}`
                }
            ]
        }
    };

    // Common error codes for all APIs
    const commonErrors = [
        { code: '400', status: 'Bad Request', desc: 'Invalid request parameters or malformed JSON' },
        { code: '401', status: 'Unauthorized', desc: 'Missing or invalid authentication token' },
        { code: '403', status: 'Forbidden', desc: 'Insufficient permissions for this resource' },
        { code: '404', status: 'Not Found', desc: 'Resource does not exist' },
        { code: '409', status: 'Conflict', desc: 'Resource already exists or state conflict' },
        { code: '422', status: 'Unprocessable', desc: 'Validation error - check field values' },
        { code: '429', status: 'Too Many Requests', desc: 'Rate limit exceeded - retry after delay' },
        { code: '500', status: 'Server Error', desc: 'Internal server error - contact support' },
        { code: '503', status: 'Unavailable', desc: 'Service temporarily unavailable' }
    ];

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const filterTags = document.querySelectorAll('.filter-tag');
    const apiCards = document.querySelectorAll('.api-card');
    const apiCategories = document.querySelectorAll('.api-category');
    const statsNumber = document.querySelector('.stat-number');
    
    // Modal elements
    const modal = document.getElementById('apiModal');
    const modalClose = document.getElementById('modalClose');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    let activeFilter = 'all';

    // ============================================
    // SEARCH & FILTER FUNCTIONALITY
    // ============================================
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        apiCards.forEach(card => {
            const apiName = card.querySelector('.api-name').textContent.toLowerCase();
            const apiDescription = card.querySelector('.api-description').textContent.toLowerCase();
            const category = card.dataset.category || '';
            
            const matchesSearch = 
                apiName.includes(searchTerm) ||
                apiDescription.includes(searchTerm) ||
                category.includes(searchTerm);
            
            const matchesFilter = checkFilter(card, activeFilter);
            
            if (matchesSearch && matchesFilter) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide categories based on visible cards
        apiCategories.forEach(category => {
            const visibleCards = category.querySelectorAll('.api-card:not([style*="display: none"])');
            category.style.display = visibleCards.length > 0 ? '' : 'none';
        });
        
        updateStats(visibleCount);
        checkNoResults(visibleCount);
    }
    
    function checkFilter(card, filter) {
        if (filter === 'all') return true;
        if (filter === 'active') {
            return card.querySelector('.status-active') !== null;
        }
        const category = card.dataset.category || '';
        return category === filter;
    }
    
    function updateStats(count) {
        if (statsNumber) {
            statsNumber.textContent = count;
            statsNumber.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statsNumber.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    function checkNoResults(count) {
        const catalogContainer = document.querySelector('.catalog-container');
        let noResults = catalogContainer.querySelector('.no-results');
        
        if (count === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<h3>No APIs Found</h3><p>Try adjusting your search or filter criteria</p>';
                catalogContainer.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    function openModal(apiId) {
        const data = apiData[apiId];
        if (!data) return;
        
        // Populate modal header
        document.getElementById('modalIcon').textContent = data.icon;
        document.getElementById('modalTitle').textContent = data.name;
        document.getElementById('modalVersion').textContent = data.version;
        
        // Populate overview tab
        document.getElementById('modalDescription').textContent = data.description;
        document.getElementById('modalBaseUrl').textContent = data.baseUrl;
        document.getElementById('modalAuth').textContent = data.auth;
        document.getElementById('modalAuthNote').textContent = data.authNote;
        document.getElementById('modalRateLimit').textContent = data.rateLimit;
        
        // Populate methods
        const methodsList = document.getElementById('modalMethods');
        methodsList.innerHTML = data.methods.map(m => `
            <div class="method-item">
                <span class="method ${m.method.toLowerCase()}">${m.method}</span>
                <span>${m.desc}</span>
            </div>
        `).join('');
        
        // Populate notes
        const notesList = document.getElementById('modalNotes');
        notesList.innerHTML = data.notes.map(note => `<li>${note}</li>`).join('');
        
        // Populate endpoints tab
        const endpointsList = document.getElementById('modalEndpoints');
        endpointsList.innerHTML = data.endpoints.map((ep, index) => `
            <div class="endpoint-item" data-index="${index}">
                <div class="endpoint-header">
                    <span class="endpoint-method ${ep.method.toLowerCase()}">${ep.method}</span>
                    <span class="endpoint-path">${ep.path}</span>
                    <span class="endpoint-desc">${ep.desc}</span>
                </div>
                <div class="endpoint-details">
                    <div class="endpoint-section">
                        <h5>Parameters</h5>
                        <p>${ep.params}</p>
                    </div>
                    <div class="endpoint-section">
                        <h5>Response</h5>
                        <p>${ep.response}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers for endpoint expansion
        endpointsList.querySelectorAll('.endpoint-header').forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('expanded');
            });
        });
        
        // Populate examples tab
        const examplesContainer = document.getElementById('modalExamples');
        examplesContainer.innerHTML = data.examples.map(ex => `
            <div class="example-block">
                <div class="example-header">
                    <span class="example-title">${ex.title}</span>
                    <span class="example-type ${ex.type}">${ex.type}</span>
                </div>
                <div class="example-code">
                    <pre>${escapeHtml(ex.code)}</pre>
                </div>
            </div>
        `).join('');
        
        // Populate error codes tab
        const errorsTable = document.getElementById('modalErrors');
        errorsTable.innerHTML = commonErrors.map(err => `
            <tr>
                <td>${err.code}</td>
                <td>${err.status}</td>
                <td>${err.desc}</td>
            </tr>
        `).join('');
        
        // Reset to overview tab
        modalTabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        modalTabs[0].classList.add('active');
        document.getElementById('tab-overview').classList.add('active');
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    // Search functionality
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Filter tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            activeFilter = tag.dataset.filter || tag.textContent.toLowerCase();
            performSearch();
        });
    });
    
    // API card clicks - open modal
    apiCards.forEach(card => {
        card.addEventListener('click', () => {
            const apiId = card.dataset.api;
            openModal(apiId);
        });
        
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const apiId = card.dataset.api;
                openModal(apiId);
            }
        });
    });
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Modal tabs
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            modalTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
    
    // ============================================
    // INITIALIZE
    // ============================================
    filterTags[0]?.classList.add('active');
    
    console.log('🚀 Deckers API Catalog initialized');
});
