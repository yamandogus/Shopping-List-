import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, FormLabel, Table } from 'react-bootstrap';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import IconButton from './components/IconButton';
import JSConfetti from 'js-confetti'
import Fuse from 'fuse.js';


const shops = [
  {
    id: 1,
    name: "Migros",
  },
  {
    id: 2,
    name: "CarrefourSA",
  },
  {
    id: 3,
    name: "Özdilek",
  },
  {
    id: 4,
    name: "Trendyol",
  },
  {
    id: 5,
    name: "Amazon",
  },
];

const categories = [
  {
    id: 1,
    name: "Oyuncak",
  },
  {
    id: 2,
    name: "Elektronik",
  },
  {
    id: 3,
    name: "Şarküteri",
  },
  {
    id: 4,
    name: "Bakliyat",
  },
  {
    id: 5,
    name: "Fırın",
  },
];

function App() {

 const[products, setProducts]=useState([])
 const[productName, setProductName]=useState("")
 const[shopsName, setShopsName]=useState("")
 const[categoryName, setCategoryName]=useState("")

 const[filteredShopId, setFilteredShopId]= useState("")
 const[filteredCategoryId, setFilteredCategoryId]= useState("")
 const[filteredStatus, setFilteredStatus]= useState("")
 const[filteredName, setFilteredName]= useState("")

 const addNewProduct= (e)=>{
  e.preventDefault();
  const newProduct ={
    id:nanoid(),
    name:productName,
    shop:shopsName,
    category:categoryName,
 }
 setProducts([...products, newProduct])
 setProductName("")
 setShopsName("")
 setCategoryName("")
 }

 const handlePruductTrClick = (id) => {
  const updatedProducts = products.map((product) =>
    product.id === id ? { ...product, isBought: true } : product
  );
  if(updatedProducts.every((receipt)=> !!receipt.isBought)){
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti()
  alert("Alışveriş tamamlandı")
}
  setProducts(updatedProducts);
};

const filteredProducts = products.filter((product)=>{
  let result = true;

  const fuse = new Fuse(products,{
    keys:["name"],
  });
  const res = fuse.search(filteredName)

  console.log("res", res);
  //name filter
 if(filteredName !== "" && !res.find(resFilt => resFilt.item.id === product.id)){
  result = false
 }
// check
if(filteredStatus){ 
   
  if(filteredStatus ==="bought" && !product.isBought){
    result = false;
  }else if(filteredStatus === "notBought" && product.isBought){
    result = false;
  }
}
 //shop filter
if(filteredShopId !== "" && product.shop !== filteredShopId){
  result = false
}  
// category filter
if(filteredCategoryId !== "" && product.category !== filteredCategoryId){
  result = false
}  
  return result;
});


  return (
    <>
    <Container className='mt-2 containerBg'>
    <h1 className='text-center mb-5'>Alışveriş Listesi</h1>
     <Form onSubmit={addNewProduct}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <FormLabel >Ürün ekleyiniz:</FormLabel>
        <Form.Control
        value={productName}
        onChange={(e)=>{setProductName(e.target.value)}}
         type="text" placeholder='Lütfen bir ürün ismi giriniz'
         required
           />
      </Form.Group>
      <FormLabel>Market seçiniz:</FormLabel>
      <Form.Select
      className='custom-select'
      value={shopsName}
      onChange={(e)=>{setShopsName(e.target.value)}}
       aria-label="Floating label select example"
       required
       >
       <option value="" disabled>Bir market seçiniz</option>
        {shops.map((shop) => {
        return  <option key={shop.id} value={shop.id}>{shop.name}</option>
        })}
      </Form.Select>
      <FormLabel className='cateFilt'>Kategori seçiniz:</FormLabel>
      <Form.Select
      className='custom-select'
      value={categoryName}
      onChange={(e)=>{setCategoryName(e.target.value)}}
       aria-label="Floating label select example"
       required

       >
       <option value="" disabled>Bir kategori seçiniz</option>
        {categories.map((category)=>{
            return  <option key={category.id} value={category.id}>{category.name}</option>
        })}
      </Form.Select>
      <div className='text-center mt-3 mb-2'>
        <Button type='submit'>Ürünü Ekle</Button>
      </div>
    </Form>
      

      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <FormLabel >Ürün Filtrele</FormLabel>
        <Form.Control
        value={filteredName}
        onChange={(e)=>{setFilteredName(e.target.value)}}
         type="text" placeholder='Lütfen bir ürün ismi giriniz'  />
      </Form.Group>
      <Form.Group >
      <Form.Check className="mb-3"
            inline
            label="Tümünü Göster"
            name="group1"
            value={"all"}
            type={"radio"}
            id={`inline-radio-1`}
            onChange={()=>setFilteredStatus("")}
          />
          <Form.Check
            inline
            label="Satın Alındı"
            name="group1"
            value={"bought"}
            type={"radio"}
            id={`inline-radio-2`}
            onChange={(e) => setFilteredStatus(e.target.value)}
          />
          <Form.Check
            inline
            label="Satın Alınmadı"
            name="group1"
            value={"notBought"}
            type={"radio"}
            id={`inline-radio-3`}
            onChange={(e) => setFilteredStatus(e.target.value)}
          />
      </Form.Group>
       <br />
      <FormLabel>Market Filtrele:</FormLabel>
      <Form.Select
      className='custom-select'
      value={filteredShopId}
      onChange={(e)=>{setFilteredShopId(e.target.value)}}
       aria-label="Floating label select example"
       required
       >
       <option></option>
        {shops.map((shop) => {
        return  <option key={shop.id} value={shop.id}>{shop.name}</option>
        })}
      </Form.Select>
      <FormLabel className='cateFilt'>Kategori Filtrele:</FormLabel>
      <Form.Select
      className='custom-select'
      value={filteredCategoryId}
      onChange={(e)=>{setFilteredCategoryId(e.target.value)}}
       aria-label="Floating label select example"
       required
       >
        <option></option>
        {categories.map((category)=>{
        return  <option key={category.id} value={category.id}>{category.name}</option>
        })}
      </Form.Select>
    </Form>

    <Table className='mt-5 tableTT' striped bordered hover>
      <thead>
        <tr>
        <th>Ürün Kodu-ID</th>
          <th>Ürün İsmi</th>
          <th>Market</th>
          <th>Kategori</th>
          <th>Sil</th>
        </tr>
      </thead>
      <tbody>
          {filteredProducts.map(product=>(
            <tr 
            className={product.isBought ? "is-bought": ""}
            onClick={() => handlePruductTrClick(product.id)}
            key={product.id}>
            <td className='custom-table'>{product.id}</td>
            <td>{product.name}</td>
            <td>
                {shops.find(shop => shop.id == product.shop)?.name || "Bilinmeyen Market"}
              </td>
              <td>
                {categories.find(category => category.id == product.category)?.name || "Bilinmeyen kategori"}
              </td>
              <td width={25} className='text-center'><IconButton
              deleteClick={()=>{
                setProducts(products.filter((productFilter=>
                  productFilter.id !== product.id
                )));
              }}
            /></td>
            </tr>
          ))}   
      </tbody>
    </Table>
    </Container>
    </>
  )
}

export default App
