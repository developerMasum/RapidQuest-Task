# E-commerce Data Visualization Web Application

This project is a full stack web application built to analyze e-commerce data from a sample Shopify store stored in MongoDB. The application provides a set of APIs to serve data for visualization on the frontend, enabling users to view various metrics and trends related to sales, customers, and geographic distribution.

## Live URL

[Rapid Quest ](https://rapid-quest-task-aug.vercel.app/)

## Features

- **Total Sales Over Time**: Visualizes sales data aggregated by daily, monthly, quarterly, and yearly intervals.
- **Sales Growth Rate Over Time**: Shows the growth rate of sales over different time periods.
- **New Customers Added Over Time**: Tracks and displays the addition of new customers over time.
- **Number of Repeat Customers**: Identifies and visualizes customers with more than one purchase across different time frames.
- **Geographical Distribution of Customers**: Displays the distribution of customers based on their city of residence on a map.
- **Customer Lifetime Value by Cohorts**: Groups customers based on the month of their first purchase and visualizes their lifetime value.

## Tech Stack

### Backend
- **Node.js** with **Express.js**: For building the REST API.
- **MongoDB**: For storing and querying the e-commerce data.
- **Mongoose**: For interacting with MongoDB.

### Frontend
- **React.js**: For building the user interface.
- **Chart.js**: For creating charts and visualizing data.
- **Leaflet.js**: For visualizing the geographical distribution of customers on a map.

### Deployment
- **Vercel**: For hosting the frontend and backend.

## API Endpoints

1. **Total Sales Over Time**  
   `GET /api/sales-over-time?interval=daily|monthly|quarterly|yearly`
   - Aggregates total sales based on the selected interval.

2. **Sales Growth Rate Over Time**  
   `GET /api/sales-growth-rate?interval=daily|monthly|quarterly|yearly`
   - Calculates the growth rate of sales over the specified interval.

3. **New Customers Added Over Time**  
   `GET /api/new-customers-over-time?interval=daily|monthly|quarterly|yearly`
   - Tracks the number of new customers added in the selected time frame.

4. **Number of Repeat Customers**  
   `GET /api/repeat-customers?interval=daily|monthly|quarterly|yearly`
   - Returns the number of customers who made more than one purchase within the specified interval.

5. **Geographical Distribution of Customers**  
   `GET /api/customer-geography`
   - Fetches customer data and returns it for mapping their locations based on city.

6. **Customer Lifetime Value by Cohorts**  
   `GET /api/customer-lifetime-value`
   - Groups customers by the month of their first purchase and calculates their lifetime value.

## Installation & Running Locally

## Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone [[https://github.com/yourusername/ecommerce-data-visualization.git](https://github.com/developerMasum/RapidQuest-Task)](https://github.com/developerMasum/RapidQuest-Task)
  
```
```bash
   cd client
npm install
npm run dev
```
```bash
   cd client
npm install
npm run dev
```
```bash
   cd ../server
npm install

```
```bash
  DATABASE_URL=mongodb+srv://db_user_read:zHLuO45zk1upaRmp@cluster0.aaflc.mongodb.net/RQ_Analytics?retryWrites=true&w=majority&appName=Cluster0
PORT=5000

```
```bash
   npm run start:dev

```

## 🔗 Visit My Profile Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-masum-fullstack.vercel.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mdmasumdev)


