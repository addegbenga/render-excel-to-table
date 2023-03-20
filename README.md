<h1>React Table Excel Renderer</h1>

This library provides a simple way to render excel data on a table using React, React-Table, and XLSX.

<h3>Current Features</h3>
<ul>
   <li> Dynamically add additional columns to the table.</li>
   <li> Select a column and change the cell input type to a select dropdown, with the ability to add dropdown data.</li>
</ul>

<h3>Upcoming Features</h3>
<ul>
     <li> Validate the uploaded excel sheet to match the specified format.</li>
   <li>  Show visual indicators on cells that failed validation.</li>
    <li> Ability to select and delete multiple columns.</li>
</ul>

Installation

To install, simply run 

```
npm install react-table-excel-renderer
```

Usage

First, import the ExcelTable component from the library:

```
import { ExcelTable } from 'react-table-excel-renderer'
```
Next, pass the excel file data as a prop to the ExcelTable component:

```
<ExcelTable data={excelData} />
```
<h3>Notes</h3>
<p>The excel data should be in the form of an array of objects, where each object represents a row in the table and each property represents a column.</p>

<h3>Contributing</h3>

We welcome contributions! Feel free to submit a pull request with any improvements or bug fixes.
License

This library is licensed under the MIT license.
