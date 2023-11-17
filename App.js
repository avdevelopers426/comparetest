import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.keenfootwear.com/products.json');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once after the initial render

 const customBtoa = (input) => {
    // Use encodeURIComponent to ensure special characters are handled correctly
    return btoa(unescape(encodeURIComponent(input)));
  };


  const convertDataToCSV = () => {
    if (!data) {
      console.error('No data to convert to CSV');
      return;
    }

   const headers = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Variant Barcode",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Google Shopping / Google Product Category",
  "Google Shopping / Gender",
  "Google Shopping / Age Group",
  "Google Shopping / MPN",
  "Google Shopping / AdWords Grouping",
  "Google Shopping / AdWords Labels",
  "Google Shopping / Condition",
  "Google Shopping / Custom Product",
  "Google Shopping / Custom Label 0",
  "Google Shopping / Custom Label 1",
  "Google Shopping / Custom Label 2",
  "Google Shopping / Custom Label 3",
  "Google Shopping / Custom Label 4",
  "Variant Image",
  "Variant Weight Unit",
  "Variant Tax Code",
  "Cost per item",
  "Price / International",
  "Compare At Price / International",
  "Status"
];

const rows = [];

data.products.forEach((product) => {
  let x=0
  product.variants.forEach((variant) => {
    console.log(product);

    const row = [
      `"${product.handle}"`,
      `"${x === 0 ? product.title : ''}"`,
      `"${x === 0 ? product.body_html.replace(/"/g, '""') : ''}"`,
      `"${x === 0 ? product.vendor : ''}"`, // Apply condition for product.vendor
      `"${x === 0 ? product.product_type : ''}"`, // Apply condition for product.product_type
      `"${x === 0 ? product.tags : ''}"`, // Apply condition for product.tags
      `""`,
      `"${x === 0 ? product.published_at : ''}"`, // Apply condition for product.published_at
      `"${product.options[0]?.name || ''}"`,
      `"${(variant.option1? variant.option1 : '')}"`,
      `"${product.options[1]?.name || ''}"`,
      `"${(variant.option2?variant.option2 : '')}"`,
      `"${product.options[2]?.name || ''}"`,
      `"${(variant.option3?variant.option3: '')}"`,
      `"${variant.sku}"`,
      `"${variant.grams}"`,
      `"${variant.inventory_tracker || ''}"`,
      `"${variant.inventory_policy || 'deny'}"`,
      `"${variant.fulfillment_service || 'manual'}"`,
      `"${variant.price}"`,
      `"${variant.compare_at_price}"`,
      `"${variant.available ? 'TRUE' : 'FALSE'}"`,
      `"${variant.taxable ? 'TRUE' : 'FALSE'}"`,
      `"${variant.barcode || ''}"`,
      `"${variant.image?.src || ''}"`,
      `"${variant.image?.position || ''}"`,
      '""', // Image Alt Text (empty value)
      '"FALSE"', // Gift Card
      '""', // SEO Title (empty value)
      '""', // SEO Description (empty value)
      '""', // Google Shopping / Google Product Category (empty value)
      '""', // Google Shopping / Gender (empty value)
      '""', // Google Shopping / Age Group (empty value)
      '""', // Google Shopping / MPN (empty value)
      '""', // Google Shopping / AdWords Grouping (empty value)
      '""', // Google Shopping / AdWords Labels (empty value)
      '""', // Google Shopping / Condition (empty value)
      '""', // Google Shopping / Custom Product (empty value)
      '""', // Google Shopping / Custom Label 0 (empty value)
      '""', // Google Shopping / Custom Label 1 (empty value)
      '""', // Google Shopping / Custom Label 2 (empty value)
      '""', // Google Shopping / Custom Label 3 (empty value)
      '""', // Google Shopping / Custom Label 4 (empty value)
      `"${variant.image?.src || ''}"`,
      '""', // Variant Weight Unit (empty value)
      '""', // Variant Tax Code (empty value)
      '""', // Cost per item (empty value)
      '""', // Price / International (empty value)
      '""', // Compare At Price / International (empty value)
      '"active"'
    ];


    x=x+1;

    rows.push(row.join(','));
  });
});
// Convert to a blob
    const csvContent = [headers.join(',')];
    csvContent.push(...rows);
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'your-file.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error fetching data</p>;
  }

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        {/* Your existing component content */}

        <button onClick={convertDataToCSV}>Download CSV</button>
      </header>
    </div>
  );
};

export default App;
