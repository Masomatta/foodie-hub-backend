# Foodie Hub Backend API
A RESTFUL API for managing restaurants, menu items, customers and orders.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Thunder Client

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Thunder Client (optional)

### Installation

```bash
git clone https://github.com/your-username/foodie-hub-backend.git
cd foodie-hub-backend
npm install
```

### Database Setup

```sql
CREATE DATABASE foodie_hub;
```

Run schema:
```sql
\i schema.sql
```


### Run the Server

```bash
npm start
```

Or if you have `nodemon` installed globally:

```bash
nodemon server.js
```

To ensure `nodemon` works locally for others, it’s included in `devDependencies`. Install it with:

```bash
npm install --save-dev nodemon
```

---

## API Reference

### Restaurants

| Method | Endpoint                |
|--------|-------------------------|
| GET    | `/restaurants`          |
| POST   | `/restaurants`          |
| PUT    | `/restaurants/:id`      |
| DELETE | `/restaurants/:id`      |
| GET    | `/restaurants/:id/menu` |

### Menu Items

| Method | Endpoint         |
|--------|------------------|
| POST   | `/menu`          |
| PUT    | `/menu/:id`      |
| DELETE | `/menu/:id`      |

### Customers

| Method | Endpoint                |
|--------|-------------------------|
| GET    | `/customers`            |
| POST   | `/customers`            |
| PUT    | `/customers/:id`        |
| DELETE | `/customers/:id`        |
| GET    | `/customers/:id/orders` |

### Orders

| Method | Endpoint              |
|--------|-----------------------|
| GET    | `/orders`             |
| POST   | `/orders`             |
| PUT    | `/orders/:id/status`  |
| DELETE | `/orders/:id`         |

---

## Thunder Client

File: `thunder-collection_foodie-hub.json`

### Import

1. Open VS Code
2. Go to Thunder Client
3. Collections > Import
4. Select file

---
