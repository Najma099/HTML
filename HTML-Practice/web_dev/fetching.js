import axios from "axios";
async function fetchData() {
    try{
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log(response);
    }
    catch(err) {
        console.log(err);
    }
    finally{
        console.log("Execution successfull");
    }
}

fetchData();
