import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import DisplayProduct from "../pages/DisplayProduct";
import Pagination from "../components/Pagination";

function AllCategories() {

  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      setLoading(true);
      axios
          .get(`/products/category/${category}`)
          .then(({ data }) => {
              setLoading(false);
              setProducts(data);
          })
          .catch((e) => {
              setLoading(false);
              console.log(e.message);
          });
  }, [category]);

  if (loading) {
      <Loading />;
  }

  const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  function ProductSearch({ _id, category, name, pictures,price }) {
    return <DisplayProduct _id={_id} category={category} name={name} pictures={pictures} price={price} />;
}


  return (
    <>
      <div className="category-page-container">
        <div className="filters-container d-flex justify-content-center pt-4 pb-4">

        <h2 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h2> &nbsp;&nbsp;&nbsp;
        <input type="search" placeholder="Search here.." onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
        {productsSearch.length === 0 ? (
          <h1>No products to show</h1>
        ) : (
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }} className="col-lg-12">
                <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} dataLimit={8} tablePagination={false} />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  )
}

export default AllCategories;
