# Solana Realms TVL API

This project is an API that calculates and stores the Total Value Locked (TVL) in the treasury of DAOs created using specific Governance Program IDs on the Solana blockchain. The API can be used to fetch and update TVL data for different DAOs based on their Program ID.

## Features

- **Calculate TVL**: The API calculates the TVL of DAOs by summing the value of SOL and SPL tokens held in their treasury, converting these values to USD.
- **Update TVL**: The API supports updating the stored TVL data for a specific Program ID.
- **Fetch TVL**: Users can retrieve the latest TVL data for a given Program ID.

## Technologies Used

- **Node.js** and **Express**: For building the RESTful API.
- **MongoDB** and **Mongoose**: For storing and managing TVL data.
- **Solana Web3.js**: For interacting with the Solana blockchain.
- **@solana/spl-governance** and **@solana/spl-token**: For working with Solana DAOs and tokens.
- **Jupiter API**: For fetching token prices and converting them to USD.

## Project Structure

- `server.js`: The main server file that connects to MongoDB and sets up the API routes.
- `routes/tvl.js`: Contains the routes for updating and fetching TVL data.
- `models/tvl.js`: The Mongoose model for storing TVL data in MongoDB.
- `utils/calculateTotalTVL.js`: Logic for calculating the TVL of DAOs, including SOL and SPL token values.
- `utils/ConvertToUSD.js`: Utility for converting SOL to USD using the Jupiter API.
- `utils/TokenPriceInUSDC.js`: Utility for fetching the price of SPL tokens in USDC using the Jupiter API.

## API Endpoints

### 1. Update TVL

- **Endpoint**: `/api/update-tvl`
- **Method**: `GET`
- **Query Parameters**:
  - `programId`: The Program ID of the DAO whose TVL should be updated.
- **Response**: The updated TVL data.

### 2. Fetch TVL

- **Endpoint**: `/api/tvl`
- **Method**: `GET`
- **Query Parameters**:
  - `programId`: The Program ID of the DAO whose TVL should be fetched.
- **Response**: The stored TVL data.

## Environment Variables

Create a `.env` file in the root of the project and set the following environment variables:

```env
MONGO_URI=<Your MongoDB connection string>
DB_NAME=<Your MongoDB database name>
PORT=<Port number>
RPC_URL=<Solana RPC URL>
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd solana-realms-tvl-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file.

4. Start the server:

   ```bash
   npm start
   ```

## Usage

- To update the TVL of a DAO, make a `GET` request to `/api/update-tvl` with the `programId` query parameter.
- To fetch the TVL of a DAO, make a `GET` request to `/api/tvl` with the `programId` query parameter.

## Examples
1. Update:

    ```bash
        http://localhost:4000/api/update-tvl?programId=dgov7NC8iaumWw3k8TkmLDybvZBCmd1qwxgLAGAsWxf
    ```
2. Fetch:
    ```bash
        http://localhost:4000/api/tvl?programId=dgov7NC8iaumWw3k8TkmLDybvZBCmd1qwxgLAGAsWxf
    ```