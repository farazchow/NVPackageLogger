import React from "react";

import SelectInput from "./SelectInput";
import { post } from "../../utilities";

export function LendDeskItemsForm() {
  // TODO: dropdown for residents
  // TODO:clear entries after submit
  // TODO: add worker when submitting (not to inputform)
  return (
    <form name="packageInputForm">
      <label htmlFor="resident">Resident: </label>
      <input type="text" id="resident"></input>  


      <label htmlFor="shipper">Desk Item: </label>
      {SelectInput("shipper", [
        "",
        "Broom",
        "Vacuum Cleaner",
        "Mop",
        "Moving Bin 1",
        "Moving Bin 2",
        "Biliardo",
        "Tennis Balls",
      ])}
    
           

      <input type="submit" value="Submit" onClick={clickHandler()} />
    </form>
  );
}

const clickHandler = () => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    if (handleValidation(document)) {
      const date = new Date();
      const body = {
        shipping_id: (document.getElementById("id") as HTMLInputElement).value,
        recipient: (document.getElementById("resident") as HTMLInputElement)
          .value,
        shipper: (document.getElementById("shipper") as HTMLInputElement).value,
        location: (document.getElementById("location") as HTMLInputElement)
          .value,
        notes: (document.getElementById("notes") as HTMLInputElement).value,
        createdAt: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`,
      };
      console.log(body);
      post("/api/package/postPackage", body).then((res) => {
        console.log("posted");
        // TODO insert code here to clear boxes from HTML
      });
    } else {
      console.log("Must fill out all fields!");
    }
  };
};

function handleValidation(document: Document) {
  const allElements = ["id", "resident", "shipper", "location", "notes"];
  for (var i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    if (!document.body.contains(document.getElementById(el))) {
      return false;
    }
  }
  return true;
}
































/* import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { dataCategories, dataProducts} from "../src/data";

export function LendDeskItems() {

    const defaultItemCategory = { categoryName: "Select Category ..." };
    const defaultItemProduct = { productName: "Select Product ..." };

    const App = () => {
    const [state, setState] = React.useState({
        category: null,
        product: null,
        products: dataProducts
    });

    const categoryChange = (event: DropDownListChangeEvent) => {
        const category = event.target.value;
        const products = dataProducts.filter(
        product => product.categoryId === category.categoryId
        );

        setState({
        ...state,
        category: category,
        products: products,
        product: null,
        });
    };

    const productChange = (event: DropDownListChangeEvent) => {
        setState({ ...state, product: event.target.value });
    };

    const category = state.category;
    const product = state.product;




    const hasCategory = category && category !== defaultItemCategory;
    const hasProduct = product && product !== defaultItemProduct;

    return (
        <div>
        <div style={{ display: "inline-block" }}>
            Categories
            <br />
            <DropDownList
            style={{ width: '300px' }}
            data={dataCategories}
            textField="categoryName"
            onChange={categoryChange}
            defaultItem={defaultItemCategory}
            value={category}
            />
        </div>
        <div style={{ display: "inline-block", marginLeft: "30px" }}>
            Products
            <br />
            <DropDownList
            style={{ width: '300px' }}
            disabled={!hasCategory}
            data={state.products}
            textField="productName"
            onChange={productChange}
            defaultItem={defaultItemProduct}
            value={product}
            />
        </div>
        </div>
    );
    };

}

ReactDOM.render(<App />, document.querySelector("my-app")); */
