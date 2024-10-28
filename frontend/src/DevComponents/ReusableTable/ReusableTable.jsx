// Table.js
import React from "react";
import Spinner from "../Spinner/Spinner";
import "./ReusableTable.css";

/**
 * Table Component
 *
 * @param {Array} columns - An array of column configurations. Each configuration should include:
 *   - `header`: The column header label.
 *   - `accessor`: The key in the data object to display in the column.
 * @param {Array} data - The data to display in the table, where each item represents a row.
 * @param {Object} actions - An object with optional functions `onEdit` and `onDelete`.
 * @returns JSX.Element - A rendered table component.
 *
 * Example:
 * const columns = [
 *   { header: 'Name', accessor: 'name' },
 *   { header: 'Email', accessor: 'email' }
 * ];
 * const data = [{ name: 'John Doe', email: 'john@example.com' }];
 * const actions = { onEdit: (row) => console.log(row), onDelete: (row) => console.log(row) };
 */
const Table = ({
  columns,
  data,
  actions = {},
  title = "New Table",
  loading = false,
}) => {
  const parseData = (row, col) => {
    const data = row[col.accessor];
    if (typeof data === "boolean") {
      return JSON.stringify(data);
    }
    if (!data) {
      for (const key in row) {
        if (typeof row[key] === "object") {
          for (const subKey in row[key]) {
            if (subKey === col.accessor) {
              return row[key][subKey];
            }
          }
        }
      }
    }

    return data;
  };

  return (
    <div className="table-container">
      <h1>{title}</h1>
      {loading ? (
        <Spinner /> // Display spinner if loading is true
      ) : (
        <div className="table-main">
          <table className="table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.accessor}>{col.header}</th>
                ))}
                {(actions.onEdit || actions.onDelete) && (
                  <th key={"actions"}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col.accessor}>{parseData(row, col)}</td>
                  ))}
                  {(actions.onEdit || actions.onDelete) && (
                    <td className="table-actions">
                      <div>
                        {actions.onEdit && (
                          <button
                            className="table-button edit-button"
                            onClick={() => actions.onEdit(row)}
                          >
                            Edit
                          </button>
                        )}
                        {actions.onDelete && (
                          <button
                            className="table-button delete-button"
                            onClick={() => actions.onDelete(row)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
