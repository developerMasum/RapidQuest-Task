import React from "react";

// Define the data structure for cohort data
interface CohortData {
  _id: string; // e.g., "2022-01"
  totalCLV: number; // Total Customer Lifetime Value for the cohort
  customerCount: number; // Number of customers in the cohort
}

// Static data for cohorts
const cohortData: CohortData[] = [
  { _id: "2022-01", totalCLV: 628226.5, customerCount: 114 },
  { _id: "2022-02", totalCLV: 530000.0, customerCount: 95 },
  { _id: "2022-03", totalCLV: 490000.0, customerCount: 120 },
  { _id: "2022-04", totalCLV: 600000.0, customerCount: 130 },
  { _id: "2022-05", totalCLV: 620000.0, customerCount: 110 },
  { _id: "2022-06", totalCLV: 570000.0, customerCount: 125 },
];

const CohortAnalysisTable: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h2>Cohort Analysis Table</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Date
            </th>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Customer Count
            </th>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Total CLV
            </th>
          </tr>
        </thead>
        <tbody>
          {cohortData.map((cohort) => (
            <tr key={cohort._id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {cohort._id}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {cohort.customerCount}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                ${cohort.totalCLV.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CohortAnalysisTable;
